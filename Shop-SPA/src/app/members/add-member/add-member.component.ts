import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/_services/branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  branches: any[];
  model: any = {};
  constructor(private branchService: BranchService, private router: Router,
              private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.branchService.getBranches()
      .subscribe((res: any) => {
        console.log(res);
        this.branches = res;
      }, error => {
        // this.alertify.error(error);
      });
  }

  addUser() {
    console.log(this.model);
    this.userService.addMember(this.model).subscribe(next => {
      this.alertify.success('New Member added successfully');
      this.router.navigate(['/members/list']);
    }, error => {
      console.log(error.error);
      this.alertify.error(error.error);
    });
  }
}
