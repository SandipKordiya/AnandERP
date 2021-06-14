import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from 'src/app/_forms/my-service.service';

const noop = () => {};

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  // properties
  breadCrumbItems: Array<{}>;
  isBillingEnabled: boolean = false;
  PartyDueDays: number;
  taxTypeList: any = ['IntraState', 'InterState'];
  Todaydate = new Date();

  constructor(private _service: MyServiceService) {
    this.breadCrumbItems = [
      { label: 'PURCHASE' },
      { label: 'New PURCHASE Invoice', active: true },
    ];
  }
  // form input values
  addPurchaseForm = new FormGroup({
    invoiceNo: new FormControl(''),
    branch: new FormControl(1),
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
    Tax: new FormControl('1'),
    Amount: new FormControl(''),
  });

  generateInvoiceNo() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName = localStorage.getItem('branchName');
    this.addPurchaseForm.patchValue({
      invoiceNo: branchName.slice(0, 3).toUpperCase() + '/T-' + result,
    });
    // this.model.invoiceNo =
    //   branchName.slice(0, 3).toUpperCase() + '/T-' + result;
    return result;
  }
  AddSale() {
    console.log(this.addPurchaseForm.value);
  }
  ngOnInit() {
    this.generateInvoiceNo();
    console.log(new Date());
  }
}
