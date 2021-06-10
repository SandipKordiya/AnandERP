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
  products: any[] = [];
  // input properties
  taxes: any[];
  branches: any[];
  taxTypeList: any = ['IntraState', 'InterState'];
  taxSaleMargin: number;

  // form input values
  addPurchaseForm = new FormGroup({
    invoiceNo: new FormControl(''),
    branch: new FormControl(''),
    party: new FormControl([]),
    PDate: new FormControl(new Date()),
    TaxType: new FormControl(''),
    productData: new FormControl([]),
    batchNumber: new FormControl(''),
    expireDate: new FormControl(''),
    mrp: new FormControl(''),
    quantity: new FormControl(1),
    schQuantity: new FormControl(0),
    rate: new FormControl(''),
    discount: new FormControl(0),
    OtherDiscount: new FormControl(0),
    Tax: new FormControl(''),
    Amount: new FormControl(''),
  });

  handleRateChange(_value) {
    // console.log(_value);
    this.ChangeAmount();
  }
  handleQuantityChange(_value) {
    // console.log(_value);
    this.ChangeAmount();
  }
  handleTaxRateChange(_value) {
    // console.log(_value);
    this.ChangeAmount();
  }
  handleDiscountChange(_value) {
    // console.log(_value);
    this.ChangeAmount();
  }
  handleOtherDiscountChange(_value) {
    // console.log(_value);
    this.ChangeAmount();
  }
  // total amount calculation
  ChangeAmount() {
    let temp_amount: number = 0;
    // values from form
    let _quantity = this.addPurchaseForm.value.quantity;
    let _rate = this.addPurchaseForm.value.rate;
    let _discount = this.addPurchaseForm.value.discount;
    let _otherDiscount = this.addPurchaseForm.value.OtherDiscount;
    let _taxid = this.addPurchaseForm.value.Tax;
    // taxe rate
    try {
      let TaxPercentage = this.taxes.find((e) => e.id === _taxid);
      // percentage to value
      let taxValue = (_rate / 100) * TaxPercentage.rate;
      let discountValue = (_rate / 100) * _discount;
      let OtherdiscountValue = (_rate / 100) * _otherDiscount;

      if (_quantity > 0) {
        temp_amount = _rate;
        temp_amount *= _quantity;
        temp_amount += taxValue;
        if (discountValue > 0) {
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

  // get input dropdown - methods
  public getTaxList() {
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
  public getBrancheList() {
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

  // on select methods
  public onChangeParty(e) {
    console.log('Parent', e);
  }
  public onChangeProduct(e) {
    this.spinner.show();
    console.log('Parent', e);
    this.addPurchaseForm.patchValue({
      mrp: e.item.mrp,
      quantity: 1,
      Tax: e.item.taxId,
    });
    this.taxSaleMargin = e.item.saleMargin;
    this.spinner.hide();
  }

  // form submit function
  AddProduct() {
    console.log(this.addPurchaseForm.value);
    this.products.push(this.addPurchaseForm.value);
  }

  ngOnInit() {
    this.getBrancheList();
    this.getTaxList();
  }
}
