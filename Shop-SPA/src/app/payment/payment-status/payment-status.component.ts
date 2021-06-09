import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { AlertifyService } from '../../_services/alertify.service';
import { BranchService } from '../../_services/branch.service';
import { PartyService } from '../../_services/party.service';
import { PaymentService } from '../../_services/payment.service';


@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  baseUrl = environment.apiUrl;

  userParams: any = {};
  partyId: number;
  branchName: any;
  breadCrumbItems: Array<{}>;
  dataReport: any[];
  branches: any[];
  dataParty: any;
  errorMsgParty: string;
  keywordParty = 'name';
  partyAutoSelect: any;
  isLoadingResultParty: boolean;
  brands: any[];

  data: any;
  keyword = 'productName';
  productAutoName: any;
  showProductheader: boolean = false;
  errorMsg: string;
  isLoadingResult: boolean;


  //sum
  TotalDebit = 0;
  TotalCredit = 0;
  TotalClosing = 0;

  constructor(private partyService: PartyService,
    private http: HttpClient, private branchService: BranchService,
    private spinner: NgxSpinnerService, private alertify: AlertifyService, 
    private payment: PaymentService) {
  }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Report' }, { label: 'Party Payment Status', active: true }];
    this.userParams.branchId = parseInt(localStorage.getItem('branchId'));
    this.userParams.partyId = 0;
    this.userParams.fromDate = new Date();
    this.userParams.toDate = new Date();
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
    this.userParams.partyId = 0;
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
    this.userParams.partyId = 0;
    this.userParams.fromDate = moment(new Date()).format("YYYY-M-D");
    this.userParams.toDate = moment(new Date()).format("YYYY-M-D");
  }

  loadMembers() {
    this.userParams.fromDate = moment(this.userParams.fromDate).format("YYYY-MM-DD");
    this.userParams.toDate = moment(this.userParams.toDate).format("YYYY-MM-DD");
    this.payment.getPartyStatus(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.dataReport = res.body;
      }, error => {
        this.alertify.error(error);
      });
  }

}
