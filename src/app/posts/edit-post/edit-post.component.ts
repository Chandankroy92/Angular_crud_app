import { updatePost } from './../state/posts.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../../models/posts.model';
import { getPostById } from './../state/posts.selector';
import { AppState } from './../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.store.select(getPostById).subscribe((post) => {
      debugger;
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          email: post.email,
          firstName: post.first_name,
          lastName: post.last_name,
        });
      }
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
      ]),
      firstName: new FormControl(null, [
        Validators.required,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {

    const email = this.postForm.value.email;
    const first_name = this.postForm.value.firstName;
    const last_name = this.postForm.value.lastName;

    const post: Post = {
      id: this.post.id,
      email,
      first_name,
      last_name
    };

    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
