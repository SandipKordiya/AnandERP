import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  products: any[] = [];
  public MainPostObject: any;
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
  saleRate;
  orderId;
  status = 'Unpaid';

  public currentUser: number = parseInt(localStorage.getItem('userId'));

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
    batchNumber: new FormControl(''),
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
          this.addSaleForm.patchValue({
            batchNumber: this.batchProducts[0].batchNo,
          });
          // this.onChangeBatchProduct(this.batchProducts[0].batchNo);
          this.onChangeBatchProduct();

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

  public onChangeBatchProduct() {
    let e = this.addSaleForm.value.batchNumber;

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
      batchNumber: e,
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
    let _otherDiscount = this.addSaleForm.value.otherDiscount;
    let _taxid = this.addSaleForm.value.Tax;
    let _mrp = this.addSaleForm.value.mrp;
    // TaxPercentage
    // taxe rate
    try {
      let mrp = _mrp;
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
        if (this.taxSaleMargin > 0) {
          mrp = mrp / taxValue;
          let rate = this.taxSaleMargin;
          let quantity = 0;
          let schquantity = 0;
          let discount = 0;
          quantity = _quantity;
          schquantity = 0;
          const rateValue = (mrp * rate) / 100;
          let qtyRatio =
            ((mrp - rateValue) * quantity) / (quantity + schquantity);
          const rateDiscount = (qtyRatio * discount) / 100;

          qtyRatio = qtyRatio - rateDiscount;

          this.saleRate = parseFloat(qtyRatio.toFixed(2));
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

  // edit/delete product
  handleEditProduct(e) {
    this.addSaleForm.patchValue({
      // branch: e.branchId,
      // party: e.partyData,
      productData: e.productData ? e.productData : e.productId,
      batchNumber: e.batchNo,
      expireDate: e.expireDate,
      mrp: e.mRP,
      quantity: e.quantity,
      schQuantity: e.schQuantity,
      rate: e.rate,
      discount: e.discount,
      OtherDiscount: e.otherDiscount,
      Tax: e.taxId,
      Amount: e.amount,
    });
    // this.taxSaleMargin = e.taxMargin;
    this.TaxPercentage = e.taxRate;
    this.TaxAmount = e.taxAmount;

    this.onChangeBatchProduct();
    console.log(e);
  }

  handleDeleteProduct(e) {
    let deleteProduct = this.products.findIndex(
      (p) => p.batchNumber === e.batchNumber
    );
    console.log(deleteProduct);
    this.products.splice(deleteProduct, 1);
  }

  // form submit function
  emptyForm() {
    this.addSaleForm.patchValue({
      productData: '',
      batchNumber: '',
      expireDate: '',
      mrp: '',
      quantity: 0,
      freeQuantity: 0,
      rate: '',
      discount: 0,
      OtherDiscount: 0,
      Tax: '',
      Amount: '',
    });
    this.currentBatchProduct = null;
    this.taxSaleMargin = 0;
    this.TaxPercentage = 0;
    this.TaxAmount = 0;
  }

  private addNewProduct() {
    let formData = this.addSaleForm.value;
    const item = {
      partyId: formData.party.id,
      productId: formData.productData.id,
      productName: formData.productData.productName,
      branchId: formData.branch,
      batchNo: formData.batchNumber,
      mRPDiscount: 0,
      expireDate: moment(formData.expireDate).format('YYYY-M-D'),
      mRP: formData.mrp,
      rate: formData.rate,
      saleRate: this.saleRate,
      quantity: formData.quantity,
      schQuantity: formData.freeQuantity,
      discount: formData.discount,
      otherDiscount: formData.otherDiscount,
      amount: formData.Amount,
      taxId: formData.Tax,
      taxRate: this.TaxPercentage,
      taxAmount: this.TaxAmount,
      taxName: 'GST ' + this.TaxPercentage,
      partyData: formData.party,
      productData: formData.productData,
    };
    let productObject = {
      ...item,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };

    console.log(productObject);
    this.products.push(productObject);
  }

  private updateProduct(productObjectIndex) {
    let formData = this.addSaleForm.value;

    const item = {
      partyId: formData.party.id,
      productId: formData.productData.id,
      productName: formData.productData.productName,
      branchId: formData.branch,
      batchNo: formData.batchNumber,
      mRPDiscount: 0,
      expireDate: moment(formData.expireDate).format('YYYY-MM-DD'),
      mRP: formData.mrp,
      rate: formData.rate,
      saleRate: formData.saleRate,
      quantity: formData.quantity,
      schQuantity: formData.schQuantity,
      discount: formData.discount,
      otherDiscount: formData.otherDiscount,
      amount: formData.Amount,
      taxId: formData.Tax,
      taxRate: this.TaxPercentage,
      taxAmount: this.TaxAmount,
      taxName: 'GST ' + this.TaxPercentage,
      partyData: formData.party,
      productData: formData.productData,
    };
    let productObject = {
      ...item,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };
    this.products[productObjectIndex] = productObject;
    console.log('updatedProductObject', productObject);
  }

  AddSale() {
    this.ChangeTotalAmount();
    let f = this.addSaleForm.value;
    let productObject = {
      ...this.addSaleForm.value,
      taxAmount: this.TaxAmount,
      taxPercentage: this.TaxPercentage,
      taxMargin: this.taxSaleMargin,
      discountAmount: this.DiscountAmount,
      otherDiscountAmount: this.OtherDiscountAmount,
    };

    let isOldProduct = this.products.findIndex(
      (p) => p.batchNo === productObject.batchNumber
    );
    if (isOldProduct >= 0) {
      this.updateProduct(isOldProduct);
    } else {
      this.addNewProduct();
    }
    this.MainPostObject = {
      products: this.products,
      invoiceNo: f.invoiceNo,
      partyId: f.party.id,
      purchaseDate: moment(f.PDate).format('YYYY-M-D'),
      branchId: f.branch,
    };
    this.emptyForm();
    console.log(this.addSaleForm.value);
  }

  submitSale(finalComponent) {
    this.spinner.show();
    const purchaseModel: any = {
      invoiceNo: this.MainPostObject.invoiceNo,
      partyId: this.MainPostObject.partyId,
      taxType: this.MainPostObject.taxType,
      purchaseDate: this.MainPostObject.purchaseDate,
      branchId: this.MainPostObject.branchId,
      status: 'Unpaid',
      grossAmount: finalComponent.finalGrossAmount,
      discountAmount: finalComponent.finalDiscountAmount,
      taxAmount: finalComponent.finalTotalTaxAmount,
      roundOff: finalComponent.finalRoundOffAmount,
      netAmount: finalComponent.finalGrandTotalAmount,
      description: null,
    };

    if (this.orderId === undefined) {
      purchaseModel.PurchaseOrderItems = this.products;
      // this.shopService.addPurchase(this.currentUser, purchaseModel).subscribe(
      //   (next) => {
      //     this.alertify.success('New purchase entry Added.');
      //     this.router.navigate(['/order/purchase/list']);
      //     console.log(next);
      //     this.spinner.hide();
      //   },
      //   (error) => {
      //     this.alertify.error(error.message);
      //     console.log(error);
      //     this.spinner.hide();
      //   }
      // );
      console.log(purchaseModel);
    } else {
      purchaseModel.status = this.status;
      const purchaseUpdateModel = {
        purchaseForUpdateDto: purchaseModel,
        purchaseOrderItems: this.products,
      };
      // this.shopService
      //   .updatePurchase(this.orderId, purchaseUpdateModel)
      //   .subscribe(
      //     (next) => {
      //       this.alertify.success('purchase entry updated.');
      //       this.router.navigate(['/order/purchase/list']);
      //       this.spinner.hide();
      //     },
      //     (error) => {
      //       this.alertify.error(error.message);
      //       this.spinner.hide();
      //     }
      //   );
      console.log(purchaseUpdateModel);
    }
    this.spinner.hide();
  }
  ngOnInit() {
    this.branchId = parseInt(localStorage.getItem('branchId'));

    this.generateInvoiceNo();
    console.log(new Date());
  }
}
