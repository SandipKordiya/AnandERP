import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl = environment.apiUrl;
  model: any = {};
  public currentUser: number = parseInt(localStorage.getItem('userId'));
  public invoiceNo: any;
  public partyId: any;
  public rate: any;

  public products: any;
  public productId: any;
  productAutoName: any;
  public keyword = 'productName';
  public batchNo: any;
  errorMsg: string;
  isLoadingResult: boolean;
  showProductheader: boolean = false;

  constructor(private http: HttpClient) { }


  getServerResponse(event) {
    this.isLoadingResult = true;
    this.http.get(this.baseUrl + 'product/find/purchase/' + event)
      .subscribe(data => {
        if (data == undefined) {
          this.products = [];
        } else {
          console.log(data);
          this.showProductheader = true;
          this.products = data;
        }

        this.isLoadingResult = false;
      });
  }

  searchCleared() {
    console.log('searchCleared');
    this.showProductheader = false;
    this.productAutoName = '';
    this.products = [];
    // this.clearProduct();
  }

  selectProduct(item) {
    this.model.productId = item.id;
    this.model.productName = item.productName;
    // this.productExpireDate = moment(item.expireDate).format('L');
    this.model.quantity = 1;
    this.model.mrp = item.mrp;
    this.model.saleMargin = item.saleMargin;
    this.model.invQuantity = 0;
    this.model.freeQuantity = 0;
    this.model.mRPDiscount = 0;
    this.model.discount = 0;
    this.model.otherDiscount = 0;

    // this.model.rate = item.rate;  
    // this.model.amount = item.rate * item.quantity;
    this.model.saleRate = item.saleRate;
    this.model.taxId = item.taxId;
    this.model.stock = item.stock;
    this.showProductheader = false;
    // this.getProductsByProductIdAndPartyId(item.id);
    // this.onTaxSelect(item.taxId);
  }
}