import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../_services/alertify.service';
import { BranchService } from '../../_services/branch.service';
import { BrandService } from '../../_services/brand.service';
import { ReportingService } from '../../_services/reporting.service';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stock-warehouse',
  templateUrl: './stock-warehouse.component.html',
  styleUrls: ['./stock-warehouse.component.scss']
})
export class StockWarehouseComponent implements OnInit {
  baseUrl = environment.apiUrl;

  userParams: any = {};
  partyId: number;
  branchName: any;
  breadCrumbItems: Array<{}>;
  dataReport: any[];
  branches: any[];
  brands: any[];


  data: any;
  keyword = 'productName';
  productAutoName: any;
  showProductheader: boolean = false;
  errorMsg: string;
  isLoadingResult: boolean;


  constructor(private brandService: BrandService,
    private branchService: BranchService,  private http: HttpClient,
    private spinner: NgxSpinnerService, private alertify: AlertifyService,
    private reporting: ReportingService) {
  }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Stocks' }, { label: 'Warehouse Stock', active: true }];
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

  //product
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
    this.userParams.productId = 0;
  }

  selectProduct(item) {
    this.userParams.productId = item.id;
    this.showProductheader = false;
  }

  resetFilters() {
    this.userParams.productId = 0;
    this.userParams.branchId = 0;
    this.userParams.fromDate = moment(new Date()).format("YYYY-M-D HH:mm:ss");
    this.userParams.toDate = moment(new Date()).format("YYYY-M-D HH:mm:ss");
  }

  loadMembers() {
    this.userParams.fromDate = moment(this.userParams.fromDate).format("YYYY-M-D HH:mm:ss");
    this.userParams.toDate = moment(this.userParams.toDate).format("YYYY-M-D HH:mm:ss");
    this.reporting.getStockByWarehouse(this.userParams)
      .subscribe((res: any) => {
        console.log(res);
        this.dataReport = res.body;
      }, error => {
        this.alertify.error(error);
      });
  }


}
