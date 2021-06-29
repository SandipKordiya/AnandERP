import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';

import { CityService } from './city.service';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CitySelectComponent),
    },
  ],
})
export class CitySelectComponent implements OnInit {
  constructor(
    private CityService: CityService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {}

  @Input() skipIndex;
  @Input() stateId: number;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<number>();

  public Cities;
  private onChange: (name: string) => void;
  private onTouched: () => void;

  public city = new FormControl();

  public getStateList() {
    this.spinner.show();
    if (this.stateId !== 0)
      this.CityService.getCity(this.stateId).subscribe(
        (res: any) => {
          console.log(res);
          this.spinner.hide();
          this.Cities = res;
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.alertify.error('State ' + error.statusText);
        }
      );
  }
  handleChangeCity(e) {
    this.onChange(this.city.value);
    this.onChangeHandler.emit(this.city.value);
  }
  handleBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.city.setValue(parseInt(obj));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.getStateList();
  }
  ngOnInit() {}
}
