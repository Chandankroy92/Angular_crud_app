import { Post } from './../models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {

    
    return this.http
      .get<Post[]>(`https://reqres.in/api/users?page=2`)
      .pipe(
        map((data:any) => {
          let posts: Post[] = [];
          posts = data.data
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://reqres.in/api/users`,
      post
    );
  }

  updatePost(post: Post) {
    debugger;
    const postData = {
      [post.id]: { email: post.email, first_name: post.first_name, last_name: post.last_name },
    };
    return this.http.patch(
      `https://reqres.in/api/users/${post.id}`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://reqres.in/api/users/${id}`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://reqres.in/api/users/${id}`
    );
  }
}
