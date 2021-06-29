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
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { StateService } from './state.service';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StateSelectComponent),
    },
  ],
})
export class StateSelectComponent implements OnInit, OnChanges {
  constructor(
    private StateService: StateService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {}

  @Input() skipIndex;
  @Input() countryId: number;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<number>();

  public states;
  private onChange: (name: string) => void;
  private onTouched: () => void;

  public state = new FormControl();

  public getStateList() {
    this.spinner.show();
    if (this.countryId !== 0)
      this.StateService.getState(this.countryId).subscribe(
        (res: any) => {
          console.log(res);
          this.spinner.hide();
          this.states = res;
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.alertify.error('State ' + error.statusText);
        }
      );
  }
  handleChangeState(e) {
    this.onChange(this.state.value);
    this.onChangeHandler.emit(this.state.value);
  }
  handleBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.state.setValue(parseInt(obj));
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
    console.log(this.countryId);
  }
  ngOnInit() {}
}
