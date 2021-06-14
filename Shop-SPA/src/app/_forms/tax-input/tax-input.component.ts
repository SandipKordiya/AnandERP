import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TaxService } from 'src/app/_services/tax.service';

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
  @Input() disabled;
  @Input() skipIndex;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<string>();

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
        console.log(res);
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
    console.log(this.tax.value);
    this.onChange(this.tax.value);
    this.tax.setValue(parseInt(this.tax.value));
    let taxObject = { taxes: this.taxes, id: this.tax.value };
    this.onChangeHandler.emit(taxObject);
  }
  writeValue(obj: any): void {
    console.log(obj);
    if (obj) {
      this.tax.setValue(parseInt(obj));
      let taxObject = { taxes: this.taxes, id: obj };
      this.onChangeHandler.emit(taxObject);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit() {
    this.getTaxList();
  }
}
