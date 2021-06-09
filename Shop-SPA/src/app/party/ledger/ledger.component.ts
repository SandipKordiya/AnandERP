import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../_services/party.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PartyLedger } from './partyLedger';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  userParams: any = {};
  users: PartyLedger[];
  partyId: number;
  breadCrumbItems: Array<{}>;
  baseUrl = environment.apiUrl;

  dataParty: any;
  errorMsgParty: string;
  keywordParty = 'name';
  partyAutoSelect: any;
  isLoadingResultParty: boolean;

  //sum
  TotalDebit = 0;
  TotalCredit = 0;
  TotalClosing = 0;

  constructor(private partyService: PartyService, private http: HttpClient,) {
    this.breadCrumbItems = [{ label: 'Party Ledger' }, { label: 'Ledger', active: true }];

  }

  ngOnInit() {
    this.userParams.isSale = true;
    this.userParams.fromDate = moment(new Date("2021-04-01")).format("YYYY-M-D");
    this.userParams.toDate = moment(new Date()).format("YYYY-M-D");
  }

  getPartyServerResponse(event) {
    this.isLoadingResultParty = true;
    this.http.get(this.baseUrl + 'party/find/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.dataParty = [];
        } else {
          console.log(data);
          this.dataParty = data;
        }

        this.isLoadingResultParty = false;
      });
  }

  searchPartyCleared() {
    console.log('searchCleared');
    this.dataParty = [];
  }

  selectPartyEvent(item) {
    console.log(item);
    this.partyId = item.id;
    this.userParams.partyId = item.id;
  }

  onPartyChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onPartyFocused(e) {
    // do something when input is focused
  }

  resetFilters() {
    this.userParams.isSale = true;
    this.userParams.partyId = 0;
    this.userParams.fromDate = moment(new Date()).format("YYYY-M-D");
    this.userParams.toDate = moment(new Date()).format("YYYY-M-D");
  }

  loadMembers() {
    console.log('userParams', this.userParams)
    this.userParams.fromDate = moment(this.userParams.fromDate).format("YYYY-MM-DD");
    this.userParams.toDate = moment(this.userParams.toDate).format("YYYY-MM-DD");
    this.partyService.getPartyLedger(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.body;
        this.getColumnTotal();
      }, error => {
        // this.alertify.error(error);
      });
  }

  getColumnTotal() {
    const { debit, credit, closing } = this.users.reduce((acc, item) => {
      acc.debit = acc.debit + item.debit;
      acc.credit = acc.credit + item.credit;
      acc.closing = item.closing;
      return acc;
    }, {
      debit: 0,
      credit: 0,
      closing: 0
    });
    this.TotalDebit = debit;
    this.TotalCredit = credit;
    this.TotalClosing = closing;
    // this.finalRoundOffAmount = parseFloat((this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2));
  }

}
