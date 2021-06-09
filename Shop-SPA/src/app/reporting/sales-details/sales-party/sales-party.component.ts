import { Component, Input, OnInit } from '@angular/core';
import { ReportingService } from '../../../_services/reporting.service';
import { SalesDetails } from './sales-detail';

@Component({
  selector: 'app-sales-party',
  templateUrl: './sales-party.component.html',
  styleUrls: ['./sales-party.component.scss']
})
export class SalesPartyComponent implements OnInit {
  @Input() partyId: number;
  @Input() userParams: any = {};
  dataReport: any[];

  //sum
  TotalQty = 0;
  TotalAmount = 0;

  constructor(private reporting: ReportingService) { }

  ngOnInit() {
    this.userParams.partyId = this.partyId;
    this.loadMembers();
  }


  loadMembers() {
    this.reporting.getSaleDetails(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.dataReport = res.body;
        this.getColumnTotal();
      }, error => {
        // this.alertify.error(error);
      });
  }

  getColumnTotal() {
    const { quantity, amount } = this.dataReport.reduce((acc, item) => {
      acc.quantity = acc.quantity + item.quantity;
      acc.amount = acc.amount + item.amount;
      return acc;
    }, {
      quantity: 0,
      amount: 0
    });
    this.TotalQty = quantity;
    this.TotalAmount = amount;
    // this.finalRoundOffAmount = parseFloat((this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2));
  }

}
