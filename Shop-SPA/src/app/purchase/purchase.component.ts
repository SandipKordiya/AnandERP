import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from '../_services/branch.service';
import { AuthService } from '../_services/auth.service';
import { TaxService } from '../_services/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private branchService: BranchService,

    private taxService: TaxService
  ) {
    this.breadCrumbItems = [
      { label: 'PURCHASE' },
      { label: 'New PURCHASE Invoice', active: true },
    ];
  }
  breadCrumbItems: Array<{}>;
  products: any[] = [
    {
      invoiceNo: '1223',
      branch: 1,
      party: {
        id: 2011,
        partyTypeId: 1,
        partyCode: '345',
        name: 'Test Sandip',
        invoiceName: '',
        address: 'Sandip Parmar',
        countryId: 101,
        stateId: 4030,
        cityId: 57606,
        area: 'Sahibaug',
        pincode: null,
        telephone: '',
        mobile: '1234567',
        webSite: '',
        email: '',
        gstin: '',
        panNo: '',
        adharNo: '',
        cinNo: null,
        openingBalance: 0,
        balanceSign: '',
        currentBalance: 0,
        creditDays: 15,
        creditAmount: 0,
        referance: '',
        note: '',
        created: '2021-05-18T09:01:32.3053526',
        branchId: 1,
        isBillingEnabled: true,
        billingActionDate: null,
        isBlocked: false,
        blockedDate: null,
        partyType: {
          id: 1,
          type: 'test',
          prefixCode: null,
          isAccountledger: false,
          created: '2021-06-01T11:16:36.259882',
        },
        branch: null,
        country: null,
        state: null,
        city: null,
        purchaseOrders: null,
        sales: null,
      },
      PDate: '11/11/2021',
      TaxType: 'IntraState',
      productData: {
        id: 2018,
        productName: 'test',
        brandId: 1,
        brandName: 'test',
        mrp: 150,
        saleMargin: 16,
        taxId: 1,
        taxName: 'GST 5',
        taxRate: 5,
      },
      batchNumber: '123',
      expireDate: '6/6/2021',
      mrp: 151,
      quantity: 1,
      schQuantity: 0,
      rate: 150,
      discount: 5,
      OtherDiscount: 5,
      Tax: 1,
      Amount: 141.75,
      taxAmount: 6.75,
      taxPercentage: 5,
      taxMargin: 16,
      discountAmount: 7.5,
      otherDiscountAmount: 7.5,
    },
  ];
  // input properties
  taxes: any[];
  branches: any[];
  taxTypeList: any = ['IntraState', 'InterState'];

  // additional form fields
  taxSaleMargin: number;
  TaxPercentage: number;
  TaxAmount: number;
  DiscountAmount: number;
  OtherDiscountAmount: number;
  // this property is for callbacks
  updateFinal: number = 0;

  // form input values
  addPurchaseForm = new FormGroup({
    invoiceNo: new FormControl('', Validators.required),
    branch: new FormControl(1, Validators.required),
    party: new FormControl('', Validators.required),
    PDate: new FormControl('', Validators.required),
    TaxType: new FormControl('', Validators.required),
    productData: new FormControl('', Validators.required),
    batchNumber: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
    mrp: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required),
    schQuantity: new FormControl(0, Validators.required),
    rate: new FormControl('', Validators.required),
    discount: new FormControl(0, Validators.required),
    OtherDiscount: new FormControl(0, Validators.required),
    Tax: new FormControl(1, Validators.required),
    Amount: new FormControl('', Validators.required),
  });
  // other properties
  get partyData() {
    return this.addPurchaseForm.get('party');
  }

  // get data for dropdown - methods
  public getTaxList() {
    this.spinner.show();
    this.taxService.getTaxes().subscribe(
      (res: any) => {
        this.taxes = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.alertify.error(error);
      }
    );
  }
  public getBrancheList() {
    this.spinner.show();
    this.branchService.getBranches().subscribe(
      (res: any) => {
        this.branches = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();

        this.alertify.error(error);
      }
    );
  }

  // on select methods party/product dropdown
  public onChangeParty(e) {
    this.spinner.show();
    console.log('Parent', e);
    //     let taxType
    //     if (e.stateId == 4030)
    //     taxType = "IntraState";
    // if (e.stateId != 4030)
    // this.model.taxType = "InterState";
    this.addPurchaseForm.patchValue({
      PDate: new Date(e.created),
      TaxType: e.stateId == 4030 ? 'IntraState' : 'InterState',
    });

    this.spinner.hide();
  }
  public onChangeProduct(e) {
    this.spinner.show();
    console.log('Parent', e);
    this.addPurchaseForm.patchValue({
      mrp: e.mrp,
      quantity: 1,
      Tax: e.taxId,
    });
    this.taxSaleMargin = e.saleMargin;

    this.spinner.hide();
  }

  // on change input feilds
  handleRateChange(_value) {
    this.ChangeTotalAmount();
  }
  handleQuantityChange(_value) {
    this.ChangeTotalAmount();
  }
  handleTaxRateChange(_value) {
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
    let _quantity = this.addPurchaseForm.value.quantity;
    let _rate = this.addPurchaseForm.value.rate;
    let _discount = this.addPurchaseForm.value.discount;
    let _otherDiscount = this.addPurchaseForm.value.OtherDiscount;
    let _taxid = this.addPurchaseForm.value.Tax;
    // TaxPercentage
    // taxe rate
    try {
      let TaxPercentage = this.taxes.find((e) => e.id === _taxid);
      this.TaxPercentage = TaxPercentage.rate;
      // percentage to value( don't try to understand just ask me i'll explain)
      let taxValue = (_rate / 100) * TaxPercentage.rate;
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
        this.addPurchaseForm.patchValue({
          Amount: temp_amount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // edit/delete product
  handleEditProduct(e) {
    this.addPurchaseForm.patchValue({
      invoiceNo: e.invoiceNo,
      branch: e.branch,
      party: e.party,
      PDate: e.PDate,
      TaxType: e.TaxType,
      productData: e.productData,
      batchNumber: e.batchNumber,
      expireDate: e.expireDate,
      mrp: e.mrp,
      quantity: e.quantity,
      schQuantity: e.schQuantity,
      rate: e.rate,
      discount: e.discount,
      OtherDiscount: e.OtherDiscount,
      Tax: e.Tax,
      Amount: e.Amount,
    });
    this.taxSaleMargin = e.taxMargin;
    this.TaxPercentage = e.taxPercentage;
    this.TaxAmount = e.taxAmount;

    console.log(e);
  }
  handleDeleteProduct(e) {
    let deleteProduct = this.products.findIndex(
      (p) => p.batchNumber === e.batchNumber && p.invoiceNo === e.invoiceNo
    );
    console.log(deleteProduct);

    this.products.splice(deleteProduct, 1);
  }
  // form submit function
  emptyForm() {
    this.addPurchaseForm.patchValue({
      productData: '',
      batchNumber: '',
      expireDate: '',
      mrp: '',
      quantity: 1,
      schQuantity: 0,
      rate: '',
      discount: 0,
      OtherDiscount: 0,
      Tax: 1,
      Amount: '',
    });
    this.taxSaleMargin = 0;
    this.TaxPercentage = 0;
    this.TaxAmount = 0;
  }
  private addNewProduct() {
    let productObjecct = {
      ...this.addPurchaseForm.value,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };

    console.log(productObjecct);
    this.products.push(productObjecct);
  }

  private updateProduct(productObjecctIndex) {
    let productObjecct = {
      ...this.addPurchaseForm.value,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };
    this.products[productObjecctIndex] = productObjecct;
    console.log('updatedProductObjecct', productObjecct);
  }

  AddProduct() {
    this.ChangeTotalAmount();

    let productObjecct = {
      ...this.addPurchaseForm.value,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };

    let isOldProduct = this.products.findIndex(
      (p) =>
        p.batchNumber === productObjecct.batchNumber &&
        p.invoiceNo === productObjecct.invoiceNo
    );
    if (isOldProduct >= 0) {
      this.updateProduct(isOldProduct);
    } else {
      this.addNewProduct();
    }

    this.emptyForm();

    this.updateFinal += 1;
  }

  ngOnInit() {
    this.getBrancheList();
    this.getTaxList();
  }
}
