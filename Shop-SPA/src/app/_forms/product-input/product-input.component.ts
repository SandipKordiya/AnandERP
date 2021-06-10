import {
  Component,
  forwardRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { isBs3 } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ProductInputComponent),
    },
  ],
})
export class ProductInputComponent implements OnInit, ControlValueAccessor {
  constructor(private _service: MyServiceService) {}
  isBs3 = isBs3();

  // public suggestions$ = new FormControl('');
  public search;
  noResult = false;
  suggestions$: Observable<any[]>;
  errorMessage: string;
  searching = false;
  searchFailed = false;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<string>();

  private onChange: (name: string) => void;
  private onTouched: () => void;
  product = new FormControl();

  // search
  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.search);
    }).pipe(
      tap(() => (this.searching = true)),
      switchMap((query: string) =>
        this._service.getPoductList(query).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
  }

  // typeahead functions
  onSelectHandler(e) {
    this.onChange(e);
    this.onTouched();
    this.onChangeHandler.emit(e);
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  // reactive form functions
  writeValue(obj: any): void {
    this.product.setValue(obj);
    this.search = obj.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
