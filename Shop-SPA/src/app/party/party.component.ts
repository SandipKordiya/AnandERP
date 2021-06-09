import { PartyService } from './../_services/party.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Party } from '../_models/party';
import { OrderSortableDirective, SortEvent } from '../_directives/orders-sortable.directive';
import { Observable } from 'rxjs';
import { PartyFilterService } from './partyFilter.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  parties: Party[];
  // Table data
  //  ordersData: Order[];
  breadCrumbItems: Array<{}>;
  id: number;
  tables$: Observable<Party[]>;
  total$: Observable<number>;
  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private partyService: PartyService, private route: ActivatedRoute, 
    private alertify: AlertifyService,
    public service: PartyFilterService,
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'All Parties', active: true }];

    this.getList();
  }


  getList() {

    this.partyService.getParties()
      .subscribe((res: any) => {
        console.log(res);
        this.parties = res;
      }, error => {
        // this.alertify.error(error);
      });
  }

  deleteParty(id: number) {
    this.partyService.deleteParty(id).subscribe(next => {
      this.alertify.success('Party Deleted successfully');
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }

  /**
 * Sort table data
 * @param param0 sort the column
 *
 */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  changed(id: number, event: any) {
    console.log(event)
    this.partyService.updatePartyStatus(id, event)
      .subscribe((res: any) => {
        console.log(res);
        this.alertify.success('Party billing enabled');
      }, error => {
        this.alertify.error(error);
      });
  }


}
