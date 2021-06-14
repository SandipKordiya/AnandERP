import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyServiceService } from 'src/app/_forms/my-service.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShopService } from 'src/app/_services/shop.service';

const noop = () => {};

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  // properties
  breadCrumbItems: Array<{}>;
  taxes: any[];
  isBillingEnabled: boolean = false;
  PartyDueDays: number;
  taxTypeList: any = ['IntraState', 'InterState'];
  Todaydate = new Date();
  taxSaleMargin;
  batchProducts;
  branchId;
  currentBatchProduct: any;
  TaxAmount;
  TaxPercentage;
  DiscountAmount;
  OtherDiscountAmount;
  constructor(
    private _service: MyServiceService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private shopService: ShopService
  ) {
    this.breadCrumbItems = [
      { label: 'PURCHASE' },
      { label: 'New PURCHASE Invoice', active: true },
    ];
  }
  // form input values
  addSaleForm = new FormGroup({
    invoiceNo: new FormControl(''),
    branch: new FormControl('1'),
    party: new FormControl('', Validators.required),
    date: new FormControl(new Date()),
    due: new FormControl(new Date()),
    TaxType: new FormControl(''),
    productData: new FormControl(''),
    expireDate: new FormControl(''),
    quantity: new FormControl(''),
    invQuantity: new FormControl(''),
    freeQuantity: new FormControl(''),
    mrp: new FormControl(''),
    rate: new FormControl(''),
    discount: new FormControl(''),
    otherDiscount: new FormControl(''),
    Tax: new FormControl(''),
    Amount: new FormControl(''),
  });
  get partyData() {
    return this.addSaleForm.get('party');
  }
  get productDataFeild() {
    return this.addSaleForm.get('productData');
  }
  generateInvoiceNo() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName = localStorage.getItem('branchName');
    this.addSaleForm.patchValue({
      invoiceNo: branchName.slice(0, 3).toUpperCase() + '/T-' + result,
    });
    // this.model.invoiceNo =
    //   branchName.slice(0, 3).toUpperCase() + '/T-' + result;
    return result;
  }

  getProductsByProductIdAndPartyId(id: number): void {
    this.shopService
      .getProductsByProductIdByParty(id, this.partyData.value.id, this.branchId)
      .subscribe(
        (next) => {
          this.batchProducts = next;
          this.onChangeBatchProduct(this.batchProducts[0].batchNo);

          console.log('batchProducts', this.batchProducts);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  // update amount methods

  // on select methods party/product dropdown
  public onChangeParty(e) {
    this.spinner.show();
    console.log('Parent', e);
    this.addSaleForm.patchValue({
      PDate: new Date(e.created),
      TaxType: e.stateId == 4030 ? 'IntraState' : 'InterState',
    });

    this.spinner.hide();
  }
  public onChangeProduct(e) {
    this.spinner.show();
    console.log('Parent', e);
    this.addSaleForm.patchValue({
      mrp: e.mrp,
      quantity: 1,
      Tax: e.taxId,
    });
    this.getProductsByProductIdAndPartyId(e.id);
    this.taxSaleMargin = e.saleMargin;

    this.spinner.hide();
  }
  public onChangeBatchProduct(e) {
    console.log(e);
    this.currentBatchProduct = this.batchProducts.find((f) => f.batchNo === e);
    console.log(this.currentBatchProduct);
    this.addSaleForm.patchValue({
      expireDate: this.currentBatchProduct?.expireDate,
      quantity: 1,
      invQuantity: 0,
      freeQuantity: 0,
      mrp: this.currentBatchProduct.mrp,
      rate: this.currentBatchProduct.rate,
      discount: this.currentBatchProduct.mrpDiscount,
      otherDiscount: this.currentBatchProduct.otherDiscount,
      Tax: this.currentBatchProduct.taxId,
    });
    this.ChangeTotalAmount();
  }
  // on change input feilds
  handleRateChange(_value) {
    this.ChangeTotalAmount();
  }
  handleQuantityChange(_value) {
    this.ChangeTotalAmount();
  }
  handleTaxRateChange(_value) {
    console.log(_value);
    this.taxes = _value.taxes;
    this.ChangeTotalAmount();
  }
  handleDiscountChange(_value) {
    this.ChangeTotalAmount();
  }
  handleOtherDiscountChange(_value) {
    this.ChangeTotalAmount();
  }
  // total amount calculation
  public ChangeTotalAmount() {
    let temp_amount: number = 0;
    // values from form
    let _quantity = this.addSaleForm.value.quantity;
    let _rate = this.addSaleForm.value.rate;
    let _discount = this.addSaleForm.value.discount;
    let _otherDiscount = this.addSaleForm.value.OtherDiscount;
    let _taxid = this.addSaleForm.value.Tax;
    // TaxPercentage
    // taxe rate
    try {
      // this.TaxPercentage = _value.rate;
      let TaxPercentage = this.taxes.find((e) => e.id === _taxid);
      this.TaxPercentage = TaxPercentage.rate;
      // percentage to value( don't try to understand just ask me i'll explain)
      let taxValue = (_rate / 100) * this.TaxPercentage;
      let discountValue = (_rate / 100) * _discount;
      let OtherdiscountValue = (_rate / 100) * _otherDiscount;
      this.DiscountAmount = discountValue;
      this.OtherDiscountAmount = OtherdiscountValue;
      if (_discount > 0 || _otherDiscount > 0) {
        let taxDiscountValue = (taxValue / 100) * _discount;
        taxValue -= taxDiscountValue;
        let otherTaxdiscountValue = (taxValue / 100) * _otherDiscount;
        taxValue -= otherTaxdiscountValue;
      }
      this.TaxAmount = taxValue;
      if (_quantity > 0) {
        temp_amount = _rate;
        temp_amount *= _quantity;
        temp_amount += taxValue;
        if (_discount > 0) {
          temp_amount -= discountValue;
        }
        if (_otherDiscount > 0) {
          temp_amount -= OtherdiscountValue;
        }

        console.log('taxValue', taxValue, 'Amount', temp_amount);
        this.addSaleForm.patchValue({
          Amount: temp_amount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  AddSale() {
    console.log(this.addSaleForm.value);
  }
  ngOnInit() {
    this.branchId = parseInt(localStorage.getItem('branchId'));

    this.generateInvoiceNo();
    console.log(new Date());
  }
}
