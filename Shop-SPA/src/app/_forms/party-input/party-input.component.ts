import {
  Component,
  forwardRef,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  modalRef;
  @Output() onChangeHandler: EventEmitter<any> = new EventEmitter<string>();
  @Input() activetabIndex;
  @ViewChild('PartyRef') PartyRef: ElementRef;

  private onChange: (name: string) => void;
  private onTouched: () => void;

  public party = new FormControl();
  partyData: any[];
  isvalidParty: boolean = false;
  constructor(
    private _service: MyServiceService,
    private modalService: BsModalService
  ) {}

  ngAfterViewInit() {
    if (this.activetabIndex) {
      console.log(this.PartyRef);
      this.PartyRef.nativeElement.focus();
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // search
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
    this.onChangeHandler.emit(e.item);
    this.partyData = e.item;
    this.isvalidParty = true;
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  // reactive form functions
  writeValue(obj: any): void {
    // this will run when id is passed by parent
    // console.log('TYPE OF PARTY INPUT', typeof obj, obj);
    if (obj === '') {
      this.party.setValue('');
      this.search = '';
    } else if (obj && typeof obj !== 'object') {
      this.searching = true;
      this._service.getParty(obj).subscribe((party) => {
        this.searching = false;

        this.party.setValue(party.name);

        this.search = party.name;

        this.onChange(party);

        this.onChangeHandler.emit(party);

        catchError(() => {
          this.searchFailed = true;

          return of([]);
        });
      });
    } else if (obj && typeof obj === 'object') {
      this.party.setValue(obj.name);

      this.search = obj.name;
    }

    // this.party.setValue(obj);
    // this.search = obj.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
