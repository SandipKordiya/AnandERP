import {
  Component,
  forwardRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Observable, Observer, of, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-party-input',
  templateUrl: './party-input.component.html',
  styleUrls: ['./party-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PartyInputComponent),
    },
  ],
})
export class PartyInputComponent implements OnInit, ControlValueAccessor {
  public search;
  noResult = false;
  suggestions$: Observable<any[]>;
  errorMessage: string;
  searching = false;
  searchFailed = false;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<string>();

  private onChange: (name: string) => void;
  private onTouched: () => void;
  party = new FormControl();

  constructor(private _service: MyServiceService) {}

  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.search);
    }).pipe(
      tap(() => (this.searching = true)),
      switchMap((query: string) =>
        this._service.getPartyList(query).pipe(
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
    this.onChangeHandler.emit(e);
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  // reactive form functions
  writeValue(obj: any): void {
    this.party.setValue(obj);
    this.search = obj.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
