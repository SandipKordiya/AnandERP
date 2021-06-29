import { EventEmitter } from '@angular/core';
import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';

import { CityService } from '../city-select/city.service';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CountrySelectComponent),
    },
  ],
})
export class CountrySelectComponent implements OnInit {
  constructor(
    private CountryService: CountryService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {}

  @Input() skipIndex;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<number>();

  public Countries;
  private onChange: (name: string) => void;
  private onTouched: () => void;

  public country = new FormControl();
  public branches;

  public getCountryList() {
    this.spinner.show();
    this.CountryService.getCountry().subscribe(
      (res: any) => {
        console.log(res);
        this.spinner.hide();
        this.Countries = res;
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        this.alertify.error('State ' + error.statusText);
      }
    );
  }
  handleChangeCountry(e) {
    this.onChange(this.country.value);
    this.onChangeHandler.emit(this.country.value);
  }
  handleBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.country.setValue(parseInt(obj));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.getCountryList();
  }
}
