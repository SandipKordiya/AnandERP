import { ShopService } from './../_services/shop.service';
import { AlertifyService } from './../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { BranchService } from '../_services/branch.service';

import * as moment from 'moment';
import { TaxService } from '../_services/tax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  baseUrl = environment.apiUrl;
  model: any = {};
  // products: Product[] = [];
  products: any[] = [];
  branches: any[];
  taxes: any[];
  invoiceNumber: any;
  partyId: number;
  grossAmount = 0;
  discountAmount = 0;
  totalTaxAmount = 0;
  grandTotalAmount = 0;
  currentUser: number =  parseInt(localStorage.getItem('userId'));


  keyword = 'productName';
  keywordParty = 'name';

  headinghtml = 'Product     |    Batch | Quantity | Rate | MRP | Sale Price'


  data: any;
  errorMsg: string;
  isLoadingResult: boolean;


  dataParty: any;
  errorMsgParty: string;
  isLoadingResultParty: boolean;

  constructor(private http: HttpClient, private branchService: BranchService,
    private taxService: TaxService, private router: Router,
              private spinner: NgxSpinnerService, private alertify: AlertifyService, private shopService: ShopService) {
  }

  ngOnInit() {
    this.getList();
    this.generateInvoiceNo();
    this.model.branchId = parseInt(localStorage.getItem('branchId'));
    this.getTaxList();

  }

  getServerResponse(event) {
    this.isLoadingResult = true;
    this.http.get(this.baseUrl + 'order/find/sellproducts/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.data = [];
          // this.errorMsg = data.Error;
        } else {
          console.log('data', data);
          this.data = data;
        }

        this.isLoadingResult = false;
      });
  }

  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }

  selectEvent(item) {
    console.log(item);
    this.model.productId = item.id;
    this.model.productName = item.productName;
    this.model.batchNo = item.batchNo;
    this.model.expireDate = item.expireDate;
    this.model.rate = item.rate;
    this.model.productName = item.productName;
    this.model.qty = 1;
    this.model.mrp = item.mrp;
    this.model.saleRate = item.saleRate;
    this.model.mRPDiscount = item.mRPDiscount;
    this.model.discount = 0;
    this.model.otherDiscount = 0;
    this.model.amount = item.mrp * this.model.qty;
    this.model.purchaseQuantity = item.purchaseQuantity;
    this.model.sellQuantity = item.sellQuantity;
  }

  onchangeQty() {
    this.model.amount = this.model.mrp * this.model.qty;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }


  getPartyServerResponse(event) {
    this.isLoadingResultParty = true;
    this.http.get(this.baseUrl + 'party/find/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.dataParty = [];
          // this.errorMsgParty = data.Error;
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
  }
  onPartyChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onPartyFocused(e) {
    // do something when input is focused
  }

  generateInvoiceNo() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName =  localStorage.getItem('branchName');

    this.invoiceNumber = branchName.slice(0, 4) + '/' + result;
    return result;
  }

  AddProduct() {
    const item = {
      productId: this.model.productId,
      productName: this.model.productName,
      branchId: this.model.branchId,
      batchNo: this.model.batchNumber,
      mRPDiscount: this.model.mRPDiscount,
      ExpireDate: moment(this.model.expired).format('YYYY-M-D'),
      mRP: this.model.mrp,
      rate: this.model.rate,
      saleRate: this.model.saleRate,
      quantity: this.model.qty,
      discount: this.model.discount,
      otherDiscount: this.model.otherDiscount,
      amount: this.model.amount * this.model.qty,
      taxId: this.model.taxId,
      orderType: "Sell"
    };
    const disAmount1 = (item.discount * (item.mRP * item.quantity)) / 100;
    const disAmount2 = (item.otherDiscount * (item.mRP * item.quantity)) / 100;
    this.grossAmount += item.amount;
    this.discountAmount += disAmount1 + disAmount2;
    this.grandTotalAmount = this.grossAmount - this.discountAmount;
    console.log('add product', item);
    this.products.push(item);
  }
  getTotalAmount() {
    if (this.products) {
      return this.products.map(t => t.amount).reduce((a, value) => a + value, 0);
    }
    return 0;
  }
  getList() {
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

  getTaxList() {
    this.spinner.show();
    this.taxService.getTaxes()
      .subscribe((res: any) => {
        console.log(res);
        this.taxes = res;
        this.spinner.hide();
      }, error => {
        this.alertify.error(error);
      });
  }

  submitSell() {
    const sellModel = {
      orderNumber: this.invoiceNumber,
      partyId: this.partyId,
      // orderDate: this.model.date,
      // dueDate: this.model.date,
      taxType: this.model.taxtype,
      orderDate: moment(this.model.date).format('YYYY-M-D'),
      dueDate: moment(this.model.date).format('YYYY-M-D'),
      branchId: this.model.branchId,
      status: "Unpaid",
      grossAmount: this.grossAmount,
      discountAmount: this.discountAmount,
      taxAmount: 0,
      roundOff: 0,
      netAmount: this.grandTotalAmount,
      description: 0,
      orderItems: this.products,
      orderType: "Sell"
    };
    console.log(sellModel);
    this.shopService.addSale(this.currentUser, sellModel).subscribe(next => {
      this.alertify.success('New sell entry Added.');
      this.router.navigate(['/order/sell/list']);
    }, error => {
      this.alertify.error(error.error);
    });

  }
}
