import { AuthService } from './../../auth/auth.service';
import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent  implements OnInit , OnDestroy {

   posts: Post [] = [
  // { title: "first post", content: "this is the first post "},
  //  { title: '2 post', content: 'this is the 2 post '},
  // { title: '3 post', content: 'this is the 3 post '}

  ];
  userIsAuthenticated = false;
  isloading = false;
  private PostsSab: Subscription;
  private authStatusSubs: Subscription;
constructor(public  postsService: PostsService , private authService: AuthService ) {

}
ngOnInit() {
  this.isloading = true;
  this.postsService.getPosts();
  this.PostsSab = this.postsService.getPostUpdateListener().
  subscribe((posts: Post []) => {
    this.isloading = false;
    this.posts = posts;
  });
  this.userIsAuthenticated=this.authService.getIsAuth();
  this.authStatusSubs = this.authService.getAuthStatusListener()
  .subscribe(isAuthenticated =>{
    this.userIsAuthenticated = isAuthenticated;

  });
}
ngOnDestroy() {
  this.PostsSab.unsubscribe();
  this.authStatusSubs.unsubscribe();
}
onDelete(postId: string) {
  this.postsService.deletePost(postId);
}
}
