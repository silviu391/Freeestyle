import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authServices';
import { UserService } from '../services/user.service';


@Component({
  templateUrl: `home.component.html`
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User | undefined;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  public ngOnInit() {
    this.loadAllUsers();
  }

  public ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
  public deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers;
    })
  }
  public loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users=users;
    })
  }
}

