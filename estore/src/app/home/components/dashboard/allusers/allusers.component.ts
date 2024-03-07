import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/home/services/users/user-service.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  users: any[] = [];

  constructor(
    private userService: UserService,
  ) { }

  allUsers(): void {
    this.subscriptions.add(
      this.userService.getAllusers().subscribe((users) => {
        this.users = users;
        console.log(this.users);
      })
    );
  }

  blockUser(email: string): void {
    this.subscriptions.add(
      this.userService.blockUser(email).subscribe((res) => {
        this.allUsers();
      })
    );
  }

  unblockUser(email: string): void {
    this.subscriptions.add(
      this.userService.unblockUser(email).subscribe((res) => {
        this.allUsers();
      })
    );
  }
  ngOnInit(): void {
    this.allUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
