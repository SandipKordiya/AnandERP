import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})
export class ListMembersComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.userService.getMembers()
      .subscribe((res: any) => {
        console.log(res);
        this.users = res;
      }, error => {
        // this.alertify.error(error);
      });
  }

}
