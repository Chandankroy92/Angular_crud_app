import { addPost } from './../state/posts.actions';
import { Post } from './../../models/posts.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      userId: new FormControl(null, [
        Validators.required,
      ]),
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

  // showDescriptionErrors() {
  //   const descriptionForm = this.postForm.get('description');
  //   if (descriptionForm.touched && !descriptionForm.valid) {
  //     if (descriptionForm.errors.required) {
  //       return 'Description is required';
  //     }

  //     if (descriptionForm.errors.minlength) {
  //       return 'Description should be of minimum 10 characters length';
  //     }
  //   }
  // }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      id: this.postForm.value.userId,
      email: this.postForm.value.email,
      first_name: this.postForm.value.firstName,
      last_name: this.postForm.value.lastName
    };

    this.store.dispatch(addPost({ post }));
  }
}
