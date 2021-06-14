import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TaxService } from 'src/app/_services/tax.service';
import { BranchInputComponent } from '../branch-input/branch-input.component';

@Component({
  selector: 'app-tax-input',
  templateUrl: './tax-input.component.html',
  styleUrls: ['./tax-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TaxInputComponent),
    },
  ],
})
export class TaxInputComponent implements OnInit, ControlValueAccessor {
  taxes;
  public tax = new FormControl();
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private taxService: TaxService
  ) {}
  private onChange: (name: string) => void;
  private onTouched: () => void;
  public getTaxList() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      (res: any) => {
        this.taxes = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.alertify.error(error);
      }
    );
  }
  handleBlur() {
    this.onTouched();
  }
  handleTaxRateChange($event) {
    this.onChange(this.tax.value);
  }
  writeValue(obj: any): void {
    this.tax.setValue(obj);
    console.log(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit() {}
}
