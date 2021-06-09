import { Directive, EventEmitter, Input, Output } from '@angular/core';
export type SortProductDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortProductDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortProductDirection;
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

export class ProductSortableDirective {

  constructor() { }

  @Input() sortable: string;
  @Input() direction: SortProductDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
