import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BranchService } from 'src/app/_services/branch.service';
import { DateInputComponent } from '../date-input/date-input.component';

@Component({
  selector: 'app-branch-input',
  templateUrl: './branch-input.component.html',
  styleUrls: ['./branch-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BranchInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BranchInputComponent,
    },
  ],
})
export class BranchInputComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private branchService: BranchService,
    private alertify: AlertifyService
  ) {}
  public branch = new FormControl();
  public branches;
  public getBrancheList() {
    this.spinner.show();
    this.branchService.getBranches().subscribe(
      (res: any) => {
        this.branches = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();

        this.alertify.error(error);
      }
    );
  }
  ngOnInit() {}
}
