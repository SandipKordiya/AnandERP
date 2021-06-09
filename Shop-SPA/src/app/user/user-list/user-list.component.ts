import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[];
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.userService.getMembers()
      .subscribe((res: any) => {
        console.log(res);
        this.users = res;
      }, error => {
        this.alertify.error(error);
      });
  }
}
