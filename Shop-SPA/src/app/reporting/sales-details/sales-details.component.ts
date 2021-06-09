import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../_services/alertify.service';
import { BranchService } from '../../_services/branch.service';
import { SaleService } from '../../_services/sale.service';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { PartyService } from '../../_services/party.service';
import { BrandService } from '../../_services/brand.service';
import { HttpClient } from '@angular/common/http';
import { ReportingService } from '../../_services/reporting.service';


@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit {
  baseUrl = environment.apiUrl;

  userParams: any = {};
  partyId: number;
  branchName: any;
  breadCrumbItems: Array<{}>;
  dataReport: any[];
  partyList: any[];
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



  constructor(private partyService: PartyService, private brandService: BrandService,
    private http: HttpClient, private branchService: BranchService,
    private spinner: NgxSpinnerService, private alertify: AlertifyService, 
    private reporting: ReportingService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Report' }, { label: 'Itemwise Purchase', active: true }];
    this.userParams.branchId = parseInt(localStorage.getItem('branchId'));
    this.userParams.partyId = 0;
    this.userParams.brandId = 0;
    this.userParams.productId = 0;
    this.userParams.partyTypeId = 0;
    this.userParams.fromDate = new Date();
    this.userParams.toDate = new Date();
    this.getBranchList();
    this.getBrandList();
  }

  getBrandList() {
    this.brandService.getBrands()
      .subscribe((res: any) => {
        console.log(res);
        this.brands = res;
      }, error => {
        this.alertify.error(error.error);
      });
  }

  getBranchList() {
    this.spinner.show();
    this.branchService.getBranches()
      .subscribe((res: any) => {
        console.log(res);
        this.branches = res;
        this.spinner.hide();
      }, error => {
        this.alertify.error(error.error);
      });
  }
  onBranchChange(item) {
    this.branchName = item.name;
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
    this.reporting.getSaleDetails(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.dataReport = res.body;
        this.filterParty();
      }, error => {
        this.alertify.error(error);
      });
  }


  onFocused(e) {
  }
  productOpened() {
    this.showProductheader = true;
  }
  productClosed() {
    this.showProductheader = false;
  }
  getServerResponse(event) {
    this.isLoadingResult = true;
    // this.http.get(this.baseUrl + 'product/find/sell/' + event)
    this.http.get(this.baseUrl + 'product/find/purchase/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.data = [];
          // this.errorMsg = data.Error;
        } else {
          console.log(data);
          this.showProductheader = true;
          this.data = data;
        }

        this.isLoadingResult = false;
      });
  }

  searchCleared() {
    console.log('searchCleared');
    this.showProductheader = false;
    this.productAutoName = '';
    this.data = [];
  }

  selectProduct(item) {
    this.showProductheader = false;
  }

  filterParty() {
    const key = 'partyId';
    this.partyList = [...new Map(this.dataReport.map(item =>
      [item[key], item])).values()];
    console.log('partyList', this.partyList)
  }
}
