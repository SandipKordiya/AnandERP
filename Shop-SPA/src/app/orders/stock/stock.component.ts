import { ShopService } from './../../_services/shop.service';
import { AlertifyService } from './../../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Product } from '../../_models/product';
import { BranchService } from '../../_services/branch.service';
import csc from 'country-state-city';

import * as moment from 'moment';
import { AuthService } from '../../_services/auth.service';
import { TaxService } from '../../_services/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { Options } from 'select2';
import { Observable } from 'rxjs';
import { Select2OptionData } from 'ng-select2';
import { ProductService } from '../../_services/product.service';
import { NumberFormatPipe } from '../../shared/pipes/number.pipe';

const noop = () => {
};


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  baseUrl = environment.apiUrl;
  breadCrumbItems: Array<{}>;
  model: any = {};
  // products: Product[] = [];
  products: any[] = [];
  branches: any[];
  taxes: any[];
  invoiceNumber: any;
  partyId: number;
  finalGrossAmount = 0;
  finalDiscountAmount = 0;
  finalTotalTaxAmount = 0;
  finalRoundOffAmount = 0;
  finalGrandTotalAmount = 0;
  finalOtherAmount = 0;
  finalCalculatedAmount: number = 0;
  currentUser: number = parseInt(localStorage.getItem('userId'));
  taxTypeList: any = ['IntraState', 'InterState'];
  showProductheader: boolean = false;

  keyword = 'productName';
  keywordParty = 'name';
  partyAutoSelect: any;
  isProductAdd: boolean = true;
  states: any;


  data: any;
  errorMsg: string;
  isLoadingResult: boolean;
  public batchProducts: any[] = [];



  dataParty: any;
  errorMsgParty: string;
  isLoadingResultParty: boolean;

  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };
  productAutoName: any;
  purchaseDate: any;
  productExpireDate: any;
  productTax: string;
  productTaxRate: number;

  orderId: number;
  type: string;
  order: any;
  btn: string = 'Save';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, private branchService: BranchService,
    private authService: AuthService, private taxService: TaxService, private router: Router,
    private spinner: NgxSpinnerService, private alertify: AlertifyService,
    private shopService: ShopService,
    private _decimalPipe: DecimalPipe, private formatPipe: NumberFormatPipe) {
  }

  ngOnInit() {
    this.getList();
    this.breadCrumbItems = [{ label: 'Stock' }, { label: 'New Stock Invoice', active: true }];

    this.model.fromBranchId = parseInt(localStorage.getItem('branchId'));
    this.model.isForStock = false;
    this.getTaxList();
    this.generateInvoiceNo('Sale');

    this.purchaseDate = new Date();

    this.orderId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;

    if (this.orderId != undefined) {
      this.getOrderFromRepo();
      this.btn = 'Update';
    }
    // var doc = (document.getElementById('.product')); 
    const el = document.querySelector('.product input'); // first
    el.setAttribute("tabindex", '2');
    console.log('doc', el)
    this.states = csc.getStatesOfCountry('101');

  }

  getOrderFromRepo(): void {
    this.shopService.getPurchaseOrder(this.orderId).subscribe(data => {
      this.order = data;
      this.model.invoiceNo = data.invoiceNo;
      // this.partyId = data.partyId;
      this.model.fromBranchId = data.fromBranchId;
      this.model.purchaseDate = moment(data.purchaseDate).format('DD/MM/YYYY');
      this.model.branchId = data.branchId;
      this.model.status = data.status;
      this.finalGrossAmount = data.grossAmount;
      this.finalTotalTaxAmount = data.taxAmount;
      this.finalRoundOffAmount = data.roundOff;
      this.finalGrandTotalAmount = data.netAmount;
      // this.getPartyServerResponse(data.partyName);
      console.log('order', data);
      this.getOrderItemsFromRepo(data.id);
    });
  }

  getOrderItemsFromRepo(id): void {
    this.shopService.getPurchaseOrderItems(id).subscribe(data => {
      this.products = data;
      console.log('order items', this.products);
    });
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private onProductChangeCallback: (_: any) => void = noop;

  onChange(event) {
    // console.log(event);
    this.purchaseDate = event;
    this.onBlur();
  }

  todate(value) {
    this.purchaseDate = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.purchaseDate);
  }


  onProductChange(event) {
    // console.log(event);
    this.productExpireDate = event;
    this.onProductBlur();
  }

  productExpireDateSelect(value) {
    this.productExpireDate = new Date(value);
  }

  onProductBlur() {
    this.onProductChangeCallback(this.productExpireDate);
  }

  getServerResponse(event) {
    this.isLoadingResult = true;
    this.http.get(this.baseUrl + 'product/find/purchase/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.data = [];
          // this.errorMsg = data.Error;
        } else {
          console.log(data);
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
  selectBatch() {
    console.log('this.model.productId', this.model.productId, '-batchNo-', this.model.batchNo)
    var data = this.batchProducts.find(x => x.id === this.model.productId && x.batchNo === this.model.batchNo);
    console.log('data batch', data)
    this.selectEvent(data);
  }

  selectProduct(item) {
    this.model.productId = item.id;
    this.model.productName = item.productName;
    this.productExpireDate = moment(item.expireDate).format('L');
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
    this.getProductsByProductIdAndPartyId(item.id);
    this.getTaxList();
    this.onTaxSelect(item.taxId);
  }
  selectEvent(item) {
    console.log('item p', item);
    this.model.productId = item.id;
    this.model.productName = item.productName;
    this.model.batchNo = item.batchNo;
    this.productExpireDate = moment(item.expireDate).format('L');
    this.model.quantity = 1;
    this.model.mrp = item.mrp;
    this.model.invQuantity = 0;
    this.model.freeQuantity = 0;
    this.model.mRPDiscount = 0;
    this.model.discount = 0;
    this.model.otherDiscount = 0;
    this.model.rate = item.rate;
    // this.model.amount = item.rate * item.quantity;
    this.model.saleRate = item.saleRate;
    this.model.taxId = item.taxId;
    this.model.stock = item.stock;
    this.model.pastSaleRate = item.pastSaleRate;
    // this.onTaxSelect(item.taxId);

    console.log('amount', item.rate * item.quantity)
    this.getTaxList();
    this.onTaxSelect(item.taxId);
    this.onchangeQty();
  }

  onchangeQty() {
    let grossamount = 0;
    let mrpdiscountAmount = 0;
    let discountCount = 0;
    let otherdiscountCount = 0;

    grossamount = this.model.rate * this.model.quantity;
    console.log('grossamount', grossamount)

    if (this.model.discount > 0) {
      discountCount = (grossamount * this.model.discount) / 100;
      this.model.discountCount = discountCount;
      console.log('discount', discountCount);
    } else {
      this.model.discountCount = 0;
    }
    grossamount = grossamount - discountCount;
    console.log('grossamount', grossamount)

    if (this.model.otherDiscount > 0) {
      otherdiscountCount = (grossamount * this.model.otherDiscount) / 100;
      this.model.otherdiscountCount = otherdiscountCount;
      console.log('otherdiscountCount', otherdiscountCount)
    } else {
      this.model.otherdiscountCount = 0;
    }
    grossamount = grossamount - otherdiscountCount;
    console.log('grossamount', grossamount)

    const tax = (grossamount * this.productTaxRate) / 100;
    this.model.taxAmount = tax;
    console.log('tax', tax)
    let grosswithTax = (grossamount + tax).toFixed(2);
    this.model.amount = parseFloat(grosswithTax);

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  productOpened() {
    this.showProductheader = true;
  }
  productClosed() {
    this.showProductheader = false;
  }



  generateInvoiceNo(type) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName = localStorage.getItem('branchName');
    this.model.invoiceNo = branchName.slice(0, 3).toUpperCase() + '/S-' + result;
    return result;
  }

  AddProduct() {
    console.log('this.model.expireDate', this.model.expireDate)
    var data = this.products.find(x => x.productId === this.model.productId && x.batchNo === this.model.batchNo);
    this.onchangeQty();
    if (data) {
      let index = this.products.indexOf(data);

      if (this.isProductAdd) {
        this.products[index].fromBranchId = this.model.fromBranchId,
          this.products[index].isForStock = this.model.isForStock,
          this.products[index].quantity = parseInt(this.model.quantity) + parseInt(this.products[index].quantity);
        this.model.quantity = this.products[index].quantity;
        this.products[index].batchNo = this.model.batchNo;
        this.products[index].mRPDiscount = this.model.mRPDiscount;
        this.products[index].expireDate = moment(this.productExpireDate).format('YYYY-M-D');
        this.products[index].mRP = this.model.mrp;
        this.products[index].rate = this.model.rate;
        this.products[index].saleRate = this.model.saleRate;
        this.products[index].schQuantity = this.model.schQuantity;
        this.products[index].discount = this.model.discount;
        this.products[index].otherDiscount = this.model.otherDiscount;
        this.products[index].amount = parseFloat((parseFloat(this.model.amount) + parseFloat(this.products[index].amount)).toFixed(2));
        this.model.amount = this.products[index].amount.toFixed(2);
        this.products[index].taxId = this.model.taxId;
        this.products[index].taxRate = this.productTaxRate;
        this.products[index].taxAmount = this.model.taxAmount;
        this.products[index].taxName = this.productTax;
      } else {
        this.products[index].isForStock = this.model.isForStock,
          this.products[index].fromBranchId = this.model.fromBranchId,
          this.products[index].quantity = parseInt(this.model.quantity);
        this.products[index].batchNo = this.model.batchNo;
        this.products[index].mRPDiscount = this.model.mRPDiscount;
        this.products[index].expireDate = moment(this.productExpireDate).format('YYYY-M-D');
        this.products[index].mRP = this.model.mrp;
        this.products[index].rate = this.model.rate;
        this.products[index].saleRate = this.model.saleRate;
        this.products[index].schQuantity = this.model.schQuantity;
        this.products[index].discount = this.model.discount;
        this.products[index].otherDiscount = this.model.otherDiscount;
        this.products[index].amount = this.model.amount;
        this.products[index].taxId = this.model.taxId;
        this.products[index].taxRate = this.productTaxRate;
        this.products[index].taxAmount = this.model.taxAmount;
        this.products[index].taxName = this.productTax;
      }


    } else {
      const item = {
        isForStock: this.model.isForStock,
        fromBranchId: this.model.fromBranchId,
        productId: this.model.productId,
        productName: this.model.productName,
        branchId: this.model.branchId,
        batchNo: this.model.batchNo,
        mRPDiscount: this.model.mRPDiscount,
        expireDate: moment(this.productExpireDate).format('YYYY-M-D'),
        mRP: this.model.mrp,
        rate: this.model.rate,
        saleRate: this.model.saleRate,
        quantity: this.model.quantity,
        schQuantity: this.model.schQuantity,
        discount: this.model.discount,
        otherDiscount: this.model.otherDiscount,
        amount: this.model.amount,
        taxId: this.model.taxId,
        taxRate: this.productTaxRate,
        taxAmount: this.model.taxAmount,
        taxName: this.productTax
      };
      // const disAmount1 = (item.discount * (item.mRP * item.quantity)) / 100;
      // const disAmount2 = (item.otherDiscount * (item.mRP * item.quantity)) / 100;    
      console.log('add product', item);
      this.products.push(item);
    }
    this.searchCleared();
    this.getColumnTotal();
    this.clearProduct();
    this.onChangeSearch('');
    this.isProductAdd = true;
    console.log('this.finalGrandTotalAmount', this.finalGrandTotalAmount)
  }

  clearProduct(): void {
    this.model.batchNo = '';
    this.productExpireDate = '';
    this.model.quantity = 0;
    this.model.schQuantity = 0;
    this.model.mrp = 0;
    this.model.rate = 0;
    this.model.saleRate = 0;
    this.model.mRPDiscount = 0;
    this.model.discount = 0;
    this.model.otherDiscount = 0;
    this.model.taxId = 0;
    this.model.amount = 0;
  }

  editProduct(item: any): void {
    const index: number = this.products.indexOf(item);
    this.model.productId = this.products[index].productId;
    this.productAutoName = this.products[index].productName;
    this.model.productName = this.products[index].productName;
    this.model.batchNo = this.products[index].batchNo;
    this.productExpireDate = this.products[index].expireDate;
    this.model.quantity = this.products[index].quantity;
    this.model.schQuantity = this.products[index].schQuantity;

    if (this.orderId != undefined) {
      this.model.mrp = this.products[index].mrp;
      this.model.mRPDiscount = this.products[index].mrpDiscount;
    }
    if (this.orderId === undefined) {
      this.model.mrp = this.products[index].mRP;
      this.model.mRPDiscount = this.products[index].mRPDiscount;
    }

    this.model.rate = this.products[index].rate;
    this.model.saleRate = this.products[index].saleRate;

    this.model.discount = this.products[index].discount;
    this.model.otherDiscount = this.products[index].otherDiscount;
    this.model.taxId = this.products[index].taxId;
    this.model.amount = this.products[index].amount;
    this.model.taxAmount = this.products[index].taxAmount;
    this.productTaxRate = this.products[index].taxRate;
    this.productTax = this.products[index].taxName;
    this.isProductAdd = false;
  }

  getColumnTotal() {
    const { GrossAmount, TotalTaxAmount, GrandTotalAmount, discount, otherDiscount } = this.products.reduce((acc, item) => {
      acc.GrossAmount = parseFloat(acc.GrossAmount) + (parseFloat(item.rate) * parseFloat(item.quantity));
      acc.TotalTaxAmount = parseFloat(acc.TotalTaxAmount) + parseFloat(item.taxAmount);
      acc.GrandTotalAmount = parseFloat(acc.GrandTotalAmount) + parseFloat(item.amount);
      acc.discount = parseFloat(acc.discount) + ((parseFloat(acc.GrossAmount) * parseFloat(item.discount)) / 100);
      acc.otherDiscount = parseFloat(acc.otherDiscount) + (((parseFloat(acc.GrossAmount) - parseFloat(acc.discount)) * parseFloat(item.otherDiscount)) / 100);
      return acc;
    }, {
      GrossAmount: 0,
      TotalTaxAmount: 0,
      GrandTotalAmount: 0,
      discount: 0,
      otherDiscount: 0
    });
    this.finalDiscountAmount = discount + otherDiscount;
    this.finalGrossAmount = GrossAmount;
    this.finalTotalTaxAmount = TotalTaxAmount;
    this.finalGrandTotalAmount = parseFloat((this._decimalPipe.transform(GrandTotalAmount, "1.0-0")).replace(/,/g, ''));
    this.finalRoundOffAmount = parseFloat((this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2));
  }


  deleteProduct(item: any): void {
    const index: number = this.products.indexOf(item);
    console.log('delete index', index);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.getColumnTotal();
    }
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

  onTaxSelect(id: number) {
    let item = this.taxes.find(x => x.id === id);
    this.productTaxRate = item.rate;
    this.productTax = item.name;
    console.log('taxrate', this.productTaxRate)
    console.log('item', item)
    this.onchangeQty();
  }

  onOtherChange() {
    if (this.finalOtherAmount == undefined) {
      this.finalOtherAmount = 0;
    }
    this.finalCalculatedAmount = this.finalGrandTotalAmount + this.finalOtherAmount;
  }
  submitPurchase() {
    const purchaseModel = {
      invoiceNo: this.model.invoiceNo,
      // partyId: this.partyId,
      // orderDate: this.model.date,
      fromBranchId: this.model.fromBranchId,
      // taxType: this.model.taxtype,
      purchaseDate: moment(this.purchaseDate).format('YYYY-M-D'),
      isForStock: this.model.isForStock,
      branchId: this.model.branchId,
      status: "Unpaid",
      grossAmount: this.finalGrossAmount,
      discountAmount: this.finalDiscountAmount,
      taxAmount: this.finalTotalTaxAmount,
      roundOff: this.finalRoundOffAmount,
      netAmount: this.finalGrandTotalAmount,
      description: null,
      stockItems: this.products
    };
    console.log(purchaseModel);
    this.shopService.addStock(this.currentUser, purchaseModel).subscribe(next => {
      this.alertify.success('New purchase entry Added.');
      this.router.navigate(['/order/stock/list']);
    }, error => {
      this.alertify.error(error.error);
    });

  }

  getProductsByProductIdAndPartyId(id: number): void {
    this.shopService.getProductsByProductIdByBatch(id, this.model.fromBranchId).subscribe(next => {
      this.batchProducts = next;
      console.log('batchProducts', this.batchProducts)
    }, error => {
      this.alertify.error(error.error);
    });
  }


}
