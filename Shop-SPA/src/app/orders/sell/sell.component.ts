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
import { FormControl, FormGroup } from '@angular/forms';

const noop = () => {};

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  baseUrl = environment.apiUrl;
  model: any = {};
  // products: Product[] = [];
  products: any[] = [];
  branches: any[];
  taxes: any[];
  scheme: any;
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
  partyAutoSelect: any;
  keywordParty = 'name';

  data: any;
  public batchProducts: any[] = [];
  public options: Options;
  errorMsg: string;
  isLoadingResult: boolean;

  dataParty: any;
  errorMsgParty: string;
  isLoadingResultParty: boolean;
  PartyDueDays: number;
  isBillingEnabled: boolean;
  party: any;

  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  productAutoName: any;
  saleDate: any;
  dueDate: any;
  productExpireDate: any;
  productTax: string;
  productTaxRate: number;
  isProductAdd: boolean = true;
  states: any;

  orderId: number;
  type: string;
  order: any;
  btn: string = 'Save';

  saleForm = new FormGroup({
    invoiceNo: new FormControl(''),
    branchId: new FormControl(''),
    party: new FormControl(''),
  });

  handleAddProduct() {
    console.log(this.saleForm.value);
  }

  constructor(
    private http: HttpClient,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private taxService: TaxService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private _decimalPipe: DecimalPipe,
    private shopService: ShopService
  ) {
    this.breadCrumbItems = [
      { label: 'Sale' },
      { label: 'New Sale Invoice', active: true },
    ];
  }

  ngOnInit() {
    this.getList();

    this.model.branchId = parseInt(localStorage.getItem('branchId'));
    this.getTaxList();
    this.saleDate = new Date();
    this.dueDate = new Date();
    //  alert(this.model.branchId)
    this.generateInvoiceNo('Sale');

    this.orderId = this.route.snapshot.params.id;

    if (this.orderId != undefined) {
      this.getOrderFromRepo();
      this.btn = 'Update';
    }

    this.states = csc.getStatesOfCountry('101');
    // this.productExpireDate = '01/02/2021'
  }

  getOrderFromRepo(): void {
    this.shopService.getSaleOrder(this.orderId).subscribe((data) => {
      this.order = data;
      this.model.invoiceNo = data.invoiceNo;
      this.partyId = data.partyId;
      this.model.taxType = data.taxType;
      this.model.saleDate = moment(data.saleDate).format('DD/MM/YYYY');
      this.model.dueDate = moment(data.dueDate).format('DD/MM/YYYY');
      this.model.branchId = data.branchId;
      this.model.status = data.status;
      this.finalGrossAmount = data.grossAmount;
      this.finalTotalTaxAmount = data.taxAmount;
      this.finalRoundOffAmount = data.roundOff;
      this.finalGrandTotalAmount = data.netAmount;
      this.getPartyServerResponse(data.partyName);
      console.log('order', data);
      this.getOrderItemsFromRepo(data.id);
    });
  }

  getOrderItemsFromRepo(id): void {
    this.shopService.getSaleOrderItems(id).subscribe((data) => {
      this.products = data;
      console.log('order items', this.products);
    });
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private onChangedueCallback: (_: any) => void = noop;
  private onProductChangeCallback: (_: any) => void = noop;
  private onBatchChangeCallback: (_: any) => void = noop;

  onChange(event) {
    // console.log(event);
    this.saleDate = event;
    this.onBlur();
  }

  todate(value) {
    this.saleDate = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.saleDate);
  }

  ondueDateChange(event) {
    // console.log(event);
    this.dueDate = event;
    this.ondueBlur();
  }

  toduedate(value) {
    this.dueDate = new Date(value);
  }

  ondueBlur() {
    this.onChangedueCallback(this.dueDate);
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
    // this.http.get(this.baseUrl + 'product/find/sell/' + event)
    this.http
      .get(this.baseUrl + 'product/find/purchase/' + event)
      .subscribe((data) => {
        if (data == undefined) {
          this.data = [];
          // this.errorMsg = data.Error;
        } else {
          console.log('product', data);
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
    this.clearProduct();
  }

  selectBatch() {
    console.log(
      'this.model.productId',
      this.model.productId,
      '-batchNo-',
      this.model.batchNo
    );
    var data = this.batchProducts.find(
      (x) => x.id === this.model.productId && x.batchNo === this.model.batchNo
    );
    console.log('data batch', data);
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

    if (item.pastSaleRate == null) {
      this.getSchemeByProductId();
    }
    if (item.pastSaleRate != null) {
      this.model.rate = item.pastSaleRate;
      this.onchangeQty();
    }

    console.log('amount', item.rate * item.quantity);
  }

  onchangeQty() {
    let mrpdiscountAmount = 0;
    let discountCount = 0;
    let otherdiscountCount = 0;

    let grossamount = this.model.rate * this.model.quantity;
    console.log('grossamount', grossamount);

    if (this.model.mRPDiscount > 0) {
      mrpdiscountAmount = (grossamount * this.model.mRPDiscount) / 100;
      this.model.mrpdiscountAmount = mrpdiscountAmount;
      console.log('mrpdiscountAmount', mrpdiscountAmount);
    } else {
      this.model.mrpdiscountAmount = 0;
    }
    grossamount = grossamount - mrpdiscountAmount;

    if (this.model.discount > 0) {
      discountCount = (grossamount * this.model.discount) / 100;
      this.model.discountCount = discountCount;
      console.log('discount', discountCount);
    } else {
      this.model.discountCount = 0;
    }
    grossamount = grossamount - discountCount;
    console.log('grossamount', grossamount);

    if (this.model.otherDiscount > 0) {
      otherdiscountCount = (grossamount * this.model.otherDiscount) / 100;
      this.model.otherdiscountCount = otherdiscountCount;
      console.log('otherdiscountCount', otherdiscountCount);
    } else {
      this.model.otherdiscountCount = 0;
    }
    grossamount = grossamount - otherdiscountCount;
    console.log('grossamount', grossamount);

    const tax = (grossamount * this.productTaxRate) / 100;
    this.model.taxAmount = tax;
    console.log('tax', tax);

    this.model.amount = (grossamount + tax).toFixed(2);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {}
  productOpened() {
    this.showProductheader = true;
  }
  productClosed() {
    this.showProductheader = false;
  }

  getPartyServerResponse(event) {
    this.isLoadingResultParty = true;
    this.http
      .get(this.baseUrl + 'party/findFromSP/' + event)
      .subscribe((data) => {
        if (data == undefined) {
          this.dataParty = [];
          // this.errorMsgParty = data.Error;
        } else {
          console.log(data);
          this.dataParty = data;

          if (this.orderId !== undefined) {
            let party = this.dataParty.filter(
              (x) => x.Id == this.order.partyId
            );
            console.log('party', party);
            this.dataParty = party;
            this.partyAutoSelect = party[0].name;

            this.selectPartyEvent(party[0]);
          }
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
    this.PartyDueDays = item.totalDays;
    this.isBillingEnabled = item.isBillingEnabled;
    if (item.stateId == 4030) this.model.taxType = 'IntraState';

    if (item.stateId != 4030) this.model.taxType = 'InterState';
    this.partyId = item.id;
  }

  onPartyChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onPartyFocused(e) {
    // do something when input is focused
  }

  generateInvoiceNo(type) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName = localStorage.getItem('branchName');

    this.saleForm.patchValue({
      invoiceNo: branchName.slice(0, 3).toUpperCase() + '/T-' + result,
    });

    return result;
  }

  AddProduct() {
    console.log('this.model.expireDate', this.model.expireDate);
    var data = this.products.find(
      (x) =>
        x.productId === this.model.productId && x.batchNo === this.model.batchNo
    );
    this.onchangeQty();
    if (data) {
      let index = this.products.indexOf(data);

      if (this.isProductAdd) {
        this.products[index].quantity =
          parseInt(this.model.quantity) +
          parseInt(this.products[index].quantity);
        this.model.quantity = this.products[index].quantity;
        this.products[index].batchNo = this.model.batchNo;
        this.products[index].mRPDiscount = this.model.mRPDiscount;
        this.products[index].expireDate = moment(this.productExpireDate).format(
          'YYYY-M-D'
        );
        this.products[index].mRP = this.model.mrp;
        this.products[index].rate = this.model.rate;
        this.products[index].saleRate = this.model.saleRate;
        this.products[index].freeQuantity = this.model.freeQuantity;
        this.products[index].discount = this.model.discount;
        this.products[index].otherDiscount = this.model.otherDiscount;
        this.products[index].amount = parseFloat(
          (
            parseFloat(this.model.amount) +
            parseFloat(this.products[index].amount)
          ).toFixed(2)
        );
        this.model.amount = this.products[index].amount.toFixed(2);
        this.products[index].taxId = this.model.taxId;
        this.products[index].taxRate = this.productTaxRate;
        this.products[index].taxAmount = this.model.taxAmount;
        this.products[index].taxName = this.productTax;
        this.products[index].partyId = this.partyId;
      } else {
        this.products[index].quantity = parseInt(this.model.quantity);
        this.products[index].batchNo = this.model.batchNo;
        this.products[index].mRPDiscount = this.model.mRPDiscount;
        this.products[index].expireDate = moment(this.productExpireDate).format(
          'YYYY-M-D'
        );
        this.products[index].mRP = this.model.mrp;
        this.products[index].rate = this.model.rate;
        this.products[index].saleRate = this.model.saleRate;
        this.products[index].freeQuantity = this.model.freeQuantity;
        this.products[index].discount = this.model.discount;
        this.products[index].otherDiscount = this.model.otherDiscount;
        this.products[index].amount = this.model.amount;
        this.products[index].taxId = this.model.taxId;
        this.products[index].taxRate = this.productTaxRate;
        this.products[index].taxAmount = this.model.taxAmount;
        this.products[index].taxName = this.productTax;
        this.products[index].partyId = this.partyId;
      }
    } else {
      const item = {
        productId: this.model.productId,
        partyId: this.partyId,
        productName: this.model.productName,
        branchId: this.model.branchId,
        batchNo: this.model.batchNo,
        mRPDiscount: this.model.mRPDiscount,
        expireDate: moment(this.productExpireDate).format('YYYY-M-D'),
        mRP: this.model.mrp,
        rate: this.model.rate,
        saleRate: this.model.saleRate,
        quantity: this.model.quantity,
        freeQuantity: this.model.freeQuantity,
        discount: this.model.discount,
        otherDiscount: this.model.otherDiscount,
        amount: this.model.amount,
        taxId: this.model.taxId,
        taxRate: this.productTaxRate,
        taxAmount: this.model.taxAmount,
        taxName: this.productTax,
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
    console.log('this.finalGrandTotalAmount', this.finalGrandTotalAmount);
  }

  clearProduct(): void {
    this.model.batchNo = '';
    this.productExpireDate = '';
    this.model.quantity = 0;
    this.model.freeQuantity = 0;
    this.model.mrp = 0;
    this.model.rate = 0;
    this.batchProducts = [];
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
    this.model.freeQuantity = this.products[index].freeQuantity;

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
    this.getProductsByProductIdAndPartyId(this.products[index].productId);
    this.isProductAdd = false;
  }

  getColumnTotal() {
    const {
      GrossAmount,
      TotalTaxAmount,
      GrandTotalAmount,
      discount,
      otherDiscount,
    } = this.products.reduce(
      (acc, item) => {
        acc.GrossAmount =
          parseFloat(acc.GrossAmount) +
          parseFloat(item.rate) * parseFloat(item.quantity);
        acc.TotalTaxAmount =
          parseFloat(acc.TotalTaxAmount) + parseFloat(item.taxAmount);
        acc.GrandTotalAmount =
          parseFloat(acc.GrandTotalAmount) + parseFloat(item.amount);
        acc.discount =
          parseFloat(acc.discount) +
          (parseFloat(acc.GrossAmount) * parseFloat(item.discount)) / 100;
        acc.otherDiscount =
          parseFloat(acc.otherDiscount) +
          ((parseFloat(acc.GrossAmount) - parseFloat(acc.discount)) *
            parseFloat(item.otherDiscount)) /
            100;
        return acc;
      },
      {
        GrossAmount: 0,
        TotalTaxAmount: 0,
        GrandTotalAmount: 0,
        discount: 0,
        otherDiscount: 0,
      }
    );
    this.finalDiscountAmount = discount + otherDiscount;
    this.finalGrossAmount = GrossAmount;
    this.finalTotalTaxAmount = TotalTaxAmount;
    this.finalGrandTotalAmount = parseFloat(
      this._decimalPipe.transform(GrandTotalAmount, '1.0-0').replace(/,/g, '')
    );
    this.finalRoundOffAmount = parseFloat(
      (this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2)
    );
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
    this.branchService.getBranches().subscribe(
      (res: any) => {
        console.log(res);
        this.branches = res;
        this.spinner.hide();
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  getTaxList() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      (res: any) => {
        console.log(res);
        this.taxes = res;
        this.spinner.hide();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  onTaxSelect(id: number) {
    let item = this.taxes.find((x) => x.id === id);
    this.productTaxRate = item.rate;
    this.productTax = item.name;
    console.log('taxrate', this.productTaxRate);
    console.log('item', item);
    this.onchangeQty();
  }

  onOtherChange() {
    if (this.finalOtherAmount == undefined) {
      this.finalOtherAmount = 0;
    }
    this.finalCalculatedAmount =
      this.finalGrandTotalAmount + this.finalOtherAmount;
  }

  onRoundOffChange() {
    this.finalGrandTotalAmount += this.finalRoundOffAmount;
  }

  submitPurchase() {
    if (this.orderId == undefined) {
      const SaleModel = {
        invoiceNo: this.model.invoiceNo,
        partyId: this.partyId,
        taxType: this.model.taxtype,
        saleDate: moment(this.model.saleDate).format('YYYY-M-D'),
        dueDate: moment(this.model.dueDate).format('YYYY-M-D'),
        branchId: this.model.branchId,
        status: 'Unpaid',
        doctor: '',
        isRetail: false,
        grossAmount: this.finalGrossAmount,
        discountAmount: this.finalDiscountAmount,
        taxAmount: this.finalTotalTaxAmount,
        roundOff: this.finalRoundOffAmount,
        netAmount: this.finalGrandTotalAmount,
        description: null,
        SalesItems: this.products,
      };
      console.log('SaleModel', SaleModel);
      this.shopService.addSale(this.currentUser, SaleModel).subscribe(
        (next) => {
          this.alertify.success('New sale entry Added.');
          this.router.navigate(['/order/sale/list']);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    } else {
      console.log('this.model', this.model);
      const purchaseModel = {
        invoiceNo: this.model.invoiceNo,
        partyId: this.partyId,
        taxType: this.model.taxtype,
        saleDate: moment(this.model.saleDate, 'YYYY-M-D'),
        // dueDate: moment(this.model.dueDate).format('YYYY-M-D'),
        branchId: this.model.branchId,
        status: this.model.status,
        doctor: '',
        isRetail: false,
        grossAmount: this.finalGrossAmount,
        discountAmount: this.finalDiscountAmount,
        taxAmount: this.finalTotalTaxAmount,
        roundOff: this.finalRoundOffAmount,
        netAmount: this.finalGrandTotalAmount,
        description: null,
      };
      const saleUpdateModel = {
        saleForUpdateDto: purchaseModel,
        salesItems: this.products,
      };

      console.log(saleUpdateModel);
      this.shopService.updateSale(this.orderId, saleUpdateModel).subscribe(
        (next) => {
          this.alertify.success('sale entry updated.');
          this.router.navigate(['/order/sale/list']);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    }
  }

  getProductsByProductIdAndPartyId(id: number): void {
    this.shopService
      .getProductsByProductIdByParty(id, this.partyId, this.model.branchId)
      .subscribe(
        (next) => {
          this.batchProducts = next;
          console.log('batchProducts', this.batchProducts);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  getSchemeByProductId() {
    console.log('isscheme', this.model.isSchemeApplied);

    if (this.model.productId && this.model.batchNo) {
      this.productService.getScheme(this.model.productId).subscribe(
        (res: any) => {
          console.log('scheme', res);
          this.scheme = res;
          if (res == null) {
            this.model.freeQuantity = 0;
            this.onchangeQty();
            console.log('sch last rate', this.model.pastSaleRate);
            if (this.model.pastSaleRate != null)
              this.model.rate = this.model.pastSaleRate;

            if (this.model.pastSaleRate == null) this.getRate();
          }

          if (res != null) {
            this.model.isSchemeApplied = true;
            this.model.rate = this.scheme.schRate;
            this.model.schTotalQuantity = this.scheme.quantity;
            this.model.freeQuantity = this.scheme.schQuantity;
            this.onchangeQty();
          }

          this.spinner.hide();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    } else {
      this.alertify.error('Select Product and Batch Number');
    }
  }
  getRate(): void {
    let mrp = this.model.mrp;
    let tax = '1.' + ('00' + this.productTaxRate).slice(-2);
    console.log('tax', tax);
    let rate = this.model.saleMargin;
    let quantity = 0;
    let schquantity = 0;
    if (this.model.isSchemeApplied) {
      quantity = this.scheme.quantity;
      schquantity = this.scheme.schQuantity;
      this.model.freeQuantity = this.scheme.schQuantity;
    }
    if (!this.model.isSchemeApplied) {
      quantity = this.model.quantity;
      schquantity = 0;
      this.model.freeQuantity = 0;
    }

    let discount = this.model.discount;

    mrp = mrp / parseFloat(tax);
    const rateValue = (mrp * rate) / 100;
    let qtyRatio = ((mrp - rateValue) * quantity) / (quantity + schquantity);
    const rateDiscount = (qtyRatio * discount) / 100;

    qtyRatio = qtyRatio - rateDiscount;

    this.model.rate = parseFloat(qtyRatio.toFixed(2));
    this.onchangeQty();
    console.log('rate', qtyRatio);
  }
}
