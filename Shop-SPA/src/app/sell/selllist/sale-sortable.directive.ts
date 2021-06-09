import { Directive, EventEmitter, Input, Output } from '@angular/core';
export type SaleSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SaleSortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SaleSortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class SaleSortableDirective {

  constructor() { }

  @Input() sortable: string;
  @Input() direction: SaleSortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
