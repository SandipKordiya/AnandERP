import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import * as _moment from 'moment';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateInputComponent,
    },
  ],
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  @Input() skipIndex;
  @Input() minDate;
  @Input() disabled;

  public DateValue = new FormControl();

  private onChange: (date: any) => void;
  private onTouched: () => void;
  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  date;
  isValidDate = true;
  ngOnInit() {
    console.log(this.minDate);
  }
  // this function wiil check if date isvalid or not
  dateValidator(date: any) {
    try {
      let _Date: any = new Intl.DateTimeFormat().formatToParts(new Date(date));
      if (this.minDate) {
        let minDate: any = new Intl.DateTimeFormat().formatToParts(
          new Date(this.minDate)
        );
        console.log('minDate', minDate);
        let minDataNumber = `${minDate[4].value}${this.pad(
          minDate[0].value
        )}${this.pad(minDate[2].value)}`;

        let DataNumber = `${_Date[4].value}${this.pad(
          _Date[0].value
        )}${this.pad(_Date[2].value)}`;

        console.log(
          `${parseInt(minDataNumber)} > ${parseInt(DataNumber)}`,
          parseInt(minDataNumber) > parseInt(DataNumber)
        );
        if (parseInt(minDataNumber) < parseInt(DataNumber)) {
          return true;
        }
      } else if (_Date[4].value >= 1900) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }
  // this function will  convert any valid date to mm/dd/yyyy
  pad(d) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
  dateConverter(date: any) {
    try {
      let _Date: any = new Intl.DateTimeFormat().formatToParts(new Date(date));
      let month = this.pad(_Date[0].value);
      let day = this.pad(_Date[2].value);
      let year = _Date[4].value;
      var ConvertedDate = `${month}/${day}/${year}`;
      console.log('ConvertedDate', ConvertedDate);
      return ConvertedDate;
    } catch (error) {
      this.isValidDate = false;

      return false;
    }
  }

  dateChanged(e) {
    this.isValidDate = true;
    console.log('datecange');
    try {
      // let _Date = new Intl.DateTimeFormat().format(new Date(e));
      let isValid = this.dateValidator(e);
      if (isValid) {
        this.date = this.dateConverter(e);
        this.onChange(e);
      } else {
        this.isValidDate = false;
        this.onChange('');
      }
    } catch (error) {
      this.isValidDate = false;
      this.onChange('');
    }
  }

  // reactive form methods
  onBlur() {
    this.onTouched();
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    return null;
  }

  writeValue(obj: any): void {
    console.log(obj);
    if (obj) {
      this.isValidDate = true;
      try {
        // let _Date = new Intl.DateTimeFormat().format(new Date(obj));
        let isValid = this.dateValidator(obj);
        if (isValid) {
          let _Date = this.dateConverter(obj);
          this.DateValue.setValue(_Date);
          this.date = _Date;
        } else {
          this.isValidDate = false;
          this.DateValue.setValue('');
          this.date = '';
          this.dateChanged('');
        }
      } catch (error) {
        this.isValidDate = false;
      }
    }
    if (obj === '') {
      console.log('DATE IS EMPTY');
      // this.DateValue.setValue('');
      this.date = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
