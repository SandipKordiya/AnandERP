import { ShopService } from './../_services/shop.service';
import { AlertifyService } from './../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import csc from 'country-state-city';
import { BranchService } from '../_services/branch.service';

import * as moment from 'moment';
import { AuthService } from '../_services/auth.service';
import { TaxService } from '../_services/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NumberFormatPipe } from '../shared/pipes/number.pipe';
import { isUndefined } from 'ngx-bootstrap/chronos/utils/type-checks';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseTaxDetailsComponent } from './purchase-tax-details/purchase-tax-details.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

const noopLoop = () => {
};

export interface TaxCollection {
  amount: number;
  rate: number;
  cgst: number;
  sgst: number;
  igst: number;
  cess: number;
  tax: number;
  totalAmount: number;
}

interface GitHubUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  baseUrl = environment.apiUrl;
  breadCrumbItems: Array<{}>;
  model: any = {};
  // products: Product[] = [];
  products: any[] = [];
  gstTax: TaxCollection[] = [];
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

  search: string;
  suggestions$: Observable<GitHubUser[]>;
  errorMessage: string;
  selectedOption: any;
  typeaheadLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private http: HttpClient, private branchService: BranchService,
    private authService: AuthService, private taxService: TaxService, private router: Router,
    private spinner: NgxSpinnerService, private alertify: AlertifyService,
    private shopService: ShopService,
    private _decimalPipe: DecimalPipe, private formatPipe: NumberFormatPipe) {
  }

  ngOnInit() {
    this.getList();
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'New Purchase Invoice', active: true }];

    this.model.branchId = parseInt(localStorage.getItem('branchId'));
    this.getTaxList();
    this.purchaseDate = new Date();

    this.orderId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;

    if (this.orderId != undefined) {
      this.getOrderFromRepo();
      this.btn = 'Update';
    }

    this.states = csc.getStatesOfCountry('101');


    // this.suggestions$ = new Observable((observer: Observer<string>) => {
    //   observer.next(this.search);
    // }).pipe(
    //   switchMap((query: string) => {
    //     if (query) {
    //       console.log('query',query)
    //       // using github public api to get users by name
    //       return this.http.get<any>(
    //         this.baseUrl + 'product/find/purchase/' + query, {}).pipe(
    //         map((data: any) => data || []),
    //         tap(() => noop, err => {
    //           // in case of http error
    //           this.errorMessage = err && err.message || 'Something goes wrong';
    //         })
    //       );
    //     }

    //     return of([]);
    //   })
    // );

  }
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  getOrderFromRepo(): void {
    this.shopService.getPurchaseOrder(this.orderId).subscribe(data => {
      this.order = data;
      this.model.invoiceNo = data.invoiceNo;
      this.partyId = data.partyId;
      this.model.taxType = data.taxType;
      this.model.purchaseDate = moment(data.purchaseDate).format('DD/MM/YYYY');
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
    this.shopService.getPurchaseOrderItems(id).subscribe(data => {
      this.products = data;
      console.log('order items', this.products);
    });
  }

  private onTouchedCallback: () => void = noopLoop;
  private onChangeCallback: (_: any) => void = noopLoop;
  private onProductChangeCallback: (_: any) => void = noopLoop;

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

  selectEvent(item) {
    console.log('item', item);
    this.model.productId = item.id;
    this.model.productName = item.productName;
    this.model.batchNo = item.batchNo;
    this.model.rate = item.purchageRate;
    this.model.productName = item.productName;
    this.model.quantity = 1;
    this.model.mrp = item.mrp;
    this.model.saleMargin = item.saleMargin;
    // this.model.saleRate = item.quantity;
    this.model.schQuantity = 0;
    this.model.mRPDiscount = 0;
    this.model.discount = 0;
    this.model.otherDiscount = 0;
    this.model.amount = (item.purchageRate * this.model.quantity).toFixed(2);
    this.model.saleRate = item.saleRate;
    this.model.taxId = item.taxId;
    this.getTaxList();
    this.onTaxSelect(item.taxId);
    this.getRate();
    console.log('amount', item.purchageRate * this.model.quantity)
  }

  onchangeQty() {
    let grossamount = 0;
    let mrpdiscountAmount = 0;
    let discountCount = 0;
    let otherdiscountCount = 0;

    grossamount = this.model.rate * this.model.quantity;
    console.log('grossamount', grossamount)

    // if (this.model.mRPDiscount > 0) {
    //   mrpdiscountAmount = (grossamount * this.model.mRPDiscount) / 100;
    //   this.model.mrpdiscountAmount = mrpdiscountAmount;
    //   console.log('mrpdiscountAmount', mrpdiscountAmount)
    // } else {
    //   this.model.mrpdiscountAmount = 0;
    // }
    // grossamount = grossamount - mrpdiscountAmount;

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
    this.getRate();

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
          if (this.orderId !== undefined) {
            let party = this.dataParty.filter(x => x.Id == this.order.partyId);
            console.log('party', party)
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

    if (item.stateId == 4030)
      this.model.taxType = "IntraState";

    if (item.stateId != 4030)
      this.model.taxType = "InterState";

    this.partyId = item.id;
  }
  onPartyChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onPartyFocused(e) {
    // do something when input is focused
  }


  AddProduct() {
    console.log('this.model.expireDate', this.model.expireDate)
    var data = this.products.find(x => x.productId === this.model.productId && x.batchNo === this.model.batchNo);
    this.onchangeQty();
    if (data) {
      let index = this.products.indexOf(data);

      if (this.isProductAdd) {
        this.products[index].partyId = this.partyId,
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
        this.products[index].partyId = this.partyId,
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
        partyId: this.partyId,
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
    //testing 
    this.getTaxAmount();
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
    const { GrossAmount, TotalTaxAmount, GrandTotalAmount, discount, otherDiscount } =
      this.products.reduce((acc, item) => {
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
    if (this.orderId == undefined) {
      const purchaseModel = {
        invoiceNo: this.model.invoiceNo,
        partyId: this.partyId,
        taxType: this.model.taxtype,
        
        purchaseDate: moment(this.purchaseDate).format('YYYY-M-D'),
        branchId: this.model.branchId,
        status: "Unpaid",
        grossAmount: this.finalGrossAmount,
        discountAmount: this.finalDiscountAmount,
        taxAmount: this.finalTotalTaxAmount,
        roundOff: this.finalRoundOffAmount,
        netAmount: this.finalGrandTotalAmount,
        description: null,
        PurchaseOrderItems: this.products
      };
      console.log(purchaseModel);
      this.shopService.addPurchase(this.currentUser, purchaseModel).subscribe(next => {
        this.alertify.success('New purchase entry Added.');
        this.router.navigate(['/order/purchase/list']);
      }, error => {
        this.alertify.error(error.error);
      });
    } else {
      const purchaseModel = {
        invoiceNo: this.model.invoiceNo,
        partyId: this.partyId,
        taxType: this.model.taxtype,
        purchaseDate: moment(this.purchaseDate).format('YYYY-M-D'),
        branchId: this.model.branchId,
        status: this.model.status,
        grossAmount: this.finalGrossAmount,
        discountAmount: this.finalDiscountAmount,
        taxAmount: this.finalTotalTaxAmount,
        roundOff: this.finalRoundOffAmount,
        netAmount: this.finalGrandTotalAmount,
        description: null
      };
      const purchaseUpdateModel = {
        purchaseForUpdateDto: purchaseModel,
        purchaseOrderItems: this.products
      }

      console.log(purchaseUpdateModel);
      this.shopService.updatePurchase(this.orderId, purchaseUpdateModel).subscribe(next => {
        this.alertify.success('purchase entry updated.');
        this.router.navigate(['/order/purchase/list']);
      }, error => {
        this.alertify.error(error.error);
      });
    }


  }

  getRate(): void {

    let mrp = this.model.mrp;
    let tax = '1.' + ("00" + this.productTaxRate).slice(-2);
    console.log('tax', tax)
    let rate = this.model.saleMargin;
    let quantity = 0;
    let schquantity = 0;

    quantity = this.model.quantity;
    schquantity = 0;

    this.model.freeQuantity = 0;
    let discount = 0;

    mrp = mrp / parseFloat(tax);
    const rateValue = (mrp * rate) / 100;
    let qtyRatio = (mrp - rateValue) * quantity / (quantity + schquantity);
    const rateDiscount = qtyRatio * discount / 100;

    qtyRatio = qtyRatio - rateDiscount;

    this.model.saleRate = parseFloat(qtyRatio.toFixed(2));
    console.log('rate', qtyRatio)
  }

  getTaxAmount(): void {

  }

  openDialog(): void {
    this.gstTax = [];
    const TaxArray = this.products.filter(
      (thing, i, arr) => arr.findIndex(t => t.taxRate === thing.taxRate) === i
    );

    TaxArray.forEach(element => {
      let preElement;
      var filterProducts = this.products.filter((item) => item.taxRate === element.taxRate);
      const { GrossAmount, TotalTaxAmount, GrandTotalAmount } =
        filterProducts.reduce((acc, item) => {
          acc.GrossAmount = parseFloat(acc.GrossAmount) + (parseFloat(item.rate) * parseFloat(item.quantity));
          acc.TotalTaxAmount = parseFloat(acc.TotalTaxAmount) + parseFloat(item.taxAmount);
          acc.GrandTotalAmount = parseFloat(acc.GrandTotalAmount) + parseFloat(item.amount);
          return acc;
        }, {
          GrossAmount: 0,
          TotalTaxAmount: 0,
          GrandTotalAmount: 0
        });

      // this.model.taxType = "IntraState";

      // this.model.taxType = "InterState";


      this.gstTax.push(
        {
          amount: GrossAmount,
          rate: element.taxRate,
          cgst: TotalTaxAmount / 2,
          sgst: TotalTaxAmount / 2,
          igst: TotalTaxAmount,
          cess: 0,
          tax: TotalTaxAmount,
          totalAmount: GrandTotalAmount
        }
      )
    });
    console.log('distinct tax', this.gstTax);
    const dialogRef = this.dialog.open(PurchaseTaxDetailsComponent, {
      width: '600px',
      data: { gstTax: this.gstTax }
    });
  }

}
