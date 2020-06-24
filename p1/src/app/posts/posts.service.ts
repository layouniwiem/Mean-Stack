import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              name: post.name,
              text: post.text,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; name: string; text: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }
/*
  addPost(name: string, text: string) {
    const postData = new FormData();/*
    postData.append('name', name);
    postData.append("text", text);
  //  postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts/add_post',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

    const post: Post = {id: null, name: name, text: text };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts/add_post',
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        console.log(responseData.postId+"");
         //id= post.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }*/
  addPost(name: string, text: string) {
    const post: Post = { id: null, name: name, text: text };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts/add_post",
        post
      )
      .subscribe(responseData => {
        console.log(responseData);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, name: string, text: string) {
    const post: Post = { id: id, name: name, text: text };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
