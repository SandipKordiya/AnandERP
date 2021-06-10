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

  dateValue;
  @Input() skipIndex;
  private onChange: (date: any) => void;
  private onTouched: () => void;
  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };
  ngOnInit() {
    console.log(this.dateValue);
  }

  dateChanged(e) {
    console.log(e.value);

    this.onChange(e.value);
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
    this.dateValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
