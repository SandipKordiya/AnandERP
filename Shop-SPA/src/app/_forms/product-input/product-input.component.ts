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
import { ProductService } from 'src/app/_services/product.service';

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

  public search;
  public noResult = false;
  public suggestions$: Observable<any[]>;
  public errorMessage: string;
  public searching = false;
  public searchFailed = false;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<string>();

  private onChange: (name: string) => void;
  private onTouched: () => void;
  public product = new FormControl();

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
    this.onChange(e.item);
    this.onTouched();
    this.onChangeHandler.emit(e.item);
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  // reactive form functions
  writeValue(obj: any): void {
    // console.log('TYPE OF PRODUCT INPUT', typeof obj);

    if (obj === '') {
      this.product.setValue('');
      this.search = '';
    } else if (obj && typeof obj !== 'object') {
      this.searching = true;
      this._service.viewProduct(obj).subscribe((product: any) => {
        this.searching = false;

        this.product.setValue(product.productName);

        this.search = product.productName;

        this.onChange(product);
        this.onChangeHandler.emit(product);

        catchError(() => {
          this.searchFailed = true;

          return of([]);
        });
      });
    } else if (obj && typeof obj === 'object') {
      this.product.setValue(obj.productName);

      this.search = obj.productName;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
