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
    console.log(this.DateValue.value);
  }

  dateValidator(date: any) {
    try {
      let _Date: any = new Intl.DateTimeFormat().formatToParts(new Date(date));
      if (_Date[4].value >= 1900) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  dateChanged(e) {
    this.isValidDate = true;
    console.log('datecange');
    try {
      let _Date = new Intl.DateTimeFormat().format(new Date(e.target.value));
      let isValid = this.dateValidator(_Date);
      if (isValid) {
        this.date = _Date;
        this.onChange(_Date);
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
        let _Date = new Intl.DateTimeFormat().format(new Date(obj));
        let isValid = this.dateValidator(obj);
        if (isValid) {
          this.date = _Date;
          this.onChange(_Date);
          this.date = _Date;
          // this.DateValue.setValue(_Date);
        } else {
          this.isValidDate = false;
          this.onChange('');
        }
      } catch (error) {
        this.isValidDate = false;
        this.onChange('');
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
