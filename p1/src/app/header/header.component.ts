import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
userAuthenticated = false;
  private authListenerSubs: Subscription;
constructor(private authService: AuthService) {

}
ngOnInit() {
  this.userAuthenticated  = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
  .getAuthStatusListener()
  .subscribe(isAuthenticated => {
    this.userAuthenticated = isAuthenticated;
    });

}

ngOnDestroy() {
this.authListenerSubs.unsubscribe();
}
onLogout() {
  this.authService.logout();
}
}
