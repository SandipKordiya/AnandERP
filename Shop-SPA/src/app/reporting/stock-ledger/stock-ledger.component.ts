import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../_services/alertify.service';
import { BranchService } from '../../_services/branch.service';
import { BrandService } from '../../_services/brand.service';
import { ReportingService } from '../../_services/reporting.service';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stock-ledger',
  templateUrl: './stock-ledger.component.html',
  styleUrls: ['./stock-ledger.component.scss']
})
export class StockLedgerComponent implements OnInit {
  baseUrl = environment.apiUrl;

  userParams: any = {};
  partyId: number;
  branchName: any;
  breadCrumbItems: Array<{}>;
  dataReport: any[];
  branches: any[];
  brands: any[];

  //sum
  TotalDebit = 0;
  TotalCredit = 0;
  TotalClosing = 0;

  constructor(private brandService: BrandService,
    private branchService: BranchService,
    private spinner: NgxSpinnerService, private alertify: AlertifyService,
    private reporting: ReportingService) {
  }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Report' }, { label: 'Stock Ledger', active: true }];
    this.userParams.branchId = parseInt(localStorage.getItem('branchId'));
    this.userParams.partyId = 0;
    this.userParams.brandId = 0;
    this.userParams.productId = 0;
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

  resetFilters() {
    this.userParams.partyId = 0;
    this.userParams.fromDate = moment(new Date()).format("YYYY-M-D HH:mm:ss");
    this.userParams.toDate = moment(new Date()).format("YYYY-M-D HH:mm:ss");
  }

  loadMembers() {
    this.userParams.fromDate = moment(this.userParams.fromDate).format("YYYY-M-D HH:mm:ss");
    this.userParams.toDate = moment(this.userParams.toDate).format("YYYY-M-D HH:mm:ss");
    this.reporting.getStockLedger(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.dataReport = res.body;
      }, error => {
        this.alertify.error(error);
      });
  }


}
