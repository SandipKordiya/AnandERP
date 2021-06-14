import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BranchService } from 'src/app/_services/branch.service';

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
  ],
})
export class BranchInputComponent implements OnInit, ControlValueAccessor {
  constructor(
    private spinner: NgxSpinnerService,
    private branchService: BranchService,
    private alertify: AlertifyService
  ) {}
  @Input() skipIndex;
  private onChange: (name: string) => void;
  private onTouched: () => void;

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
  handleChangeBranch(e) {
    this.onChange(this.branch.value);
  }
  handleBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.branch.setValue(obj);
    console.log(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit() {
    this.getBrancheList();
  }
}
