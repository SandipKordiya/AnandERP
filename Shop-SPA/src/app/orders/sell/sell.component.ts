import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyServiceService } from 'src/app/_forms/my-service.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { ShopService } from 'src/app/_services/shop.service';


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
  isSchemeApplied;
  scheme = null;
  public currentUser: number = parseInt(localStorage.getItem('userId'));

  constructor(
    private _service: MyServiceService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private shopService: ShopService,
    private router: Router
  ) {
    this.breadCrumbItems = [
      { label: 'PURCHASE' },
      { label: 'New PURCHASE Invoice', active: true },
    ];
  }

  // form input values
  addSaleForm = new FormGroup({
    invoiceNo: new FormControl('', Validators.required),
    branch: new FormControl('1', Validators.required),
    party: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    due: new FormControl(new Date(), Validators.required),
    TaxType: new FormControl('', Validators.required),
    productData: new FormControl('', Validators.required),
    batchNumber: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    invQuantity: new FormControl('', Validators.required),
    freeQuantity: new FormControl('', Validators.required),
    mrp: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    otherDiscount: new FormControl('', Validators.required),
    Tax: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required),
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
  getSchemeByProductId() {
    console.log('isscheme', this.isSchemeApplied);
    let f = this.addSaleForm.value;
    if (f.productData.id && f.batchNumber) {
      this.productService.getScheme(f.productData.id).subscribe(
        (res: any) => {
          console.log('scheme', res);
          if (res != null) {
            this.scheme = res;
          } else {
            this.scheme = null;
          }
          this.ChangeTotalAmount();
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
  toggleScheme(value) {
    console.log(value.checked);
    if (value.checked) {
      this.isSchemeApplied = true;
    } else {
      this.isSchemeApplied = false;
    }
    this.onChangeBatchProduct();
  }
  public onChangeBatchProduct() {
    let e = this.addSaleForm.value.batchNumber;
    this.getSchemeByProductId();
    this.currentBatchProduct = this.batchProducts.find((f) => f.batchNo === e);
    console.log(this.currentBatchProduct);

    this.addSaleForm.patchValue({
      expireDate: this.currentBatchProduct?.expireDate,
      invQuantity: 0,
      mrp: this.currentBatchProduct.mrp,
      discount: this.currentBatchProduct.mrpDiscount,
      otherDiscount: this.currentBatchProduct.otherDiscount,
      Tax: this.currentBatchProduct.taxId,
      batchNumber: e,
    });
    if (this.isSchemeApplied && this.scheme) {
      this.addSaleForm.patchValue({
        quantity: this.scheme.quantity,
        freeQuantity: this.scheme.schQuantity,
        rate: this.scheme.schRate,
      });
    } else {
      this.addSaleForm.patchValue({
        quantity: 1,
        freeQuantity: 0,
        rate: this.currentBatchProduct.rate,
      });
    }
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
  getOrderFromRepo(): void {
    this.shopService.getSaleOrder(this.orderId).subscribe((data) => {
      // this.order = data;
      // this.model.invoiceNo = data.invoiceNo;
      // this.partyId = data.partyId;
      // this.model.taxType = data.taxType;
      // this.model.saleDate = moment(data.saleDate).format('DD/MM/YYYY');
      // this.model.dueDate = moment(data.dueDate).format('DD/MM/YYYY');
      // this.model.branchId = data.branchId;
      // this.model.status = data.status;
      // this.finalGrossAmount = data.grossAmount;
      // this.finalTotalTaxAmount = data.taxAmount;
      // this.finalRoundOffAmount = data.roundOff;
      // this.finalGrandTotalAmount = data.netAmount;
      this.status = data.status;
      this.addSaleForm.patchValue({
        invoiceNo: data.invoiceNo,
        branch: data.branchId,
        party: data.partyId,
        // PDate: moment(data.purchaseDate).format('DD/MM/YYYY'),
      });
      console.log('order', data);
      this.getOrderItemsFromRepo(data.id);
      this.MainPostObject = {
        products: this.products,
        invoiceNo: data.invoiceNo,
        partyId: data.partyId,
        // purchaseDate: moment(data.purchaseDate).format('YYYY-M-D'),
        saleDate: moment(data.date).format('YYYY-M-D'),
        dueDate: moment(data.due).format('YYYY-M-D'),
        TaxType: data.TaxType,
        branchId: data.branchId,
      };
      console.log('order', data);
      this.getOrderItemsFromRepo(data.id);
    });
  }

  getOrderItemsFromRepo(id): void {
    this.shopService.getSaleOrderItems(id).subscribe((data) => {
      data.forEach((element, i) => {
        data[i].mRP = element.mrp;
        data[i].mRPDiscount = element.mrpDiscount;
      });
      this.products = data;
      this.ChangeTotalAmount();

      console.log('order items', this.products);
    });
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
      freeQuantity: formData.freeQuantity,
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
      freeQuantity: formData.freeQuantity,
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
      saleDate: moment(f.date).format('YYYY-M-D'),
      dueDate: moment(f.due).format('YYYY-M-D'),
      branchId: f.branch,
      TaxType: f.TaxType,
    };
    this.emptyForm();
    console.log(this.addSaleForm.value);
  }

  submitSale(finalComponent) {
    this.spinner.show();
    const SaleModel: any = {
      invoiceNo: this.MainPostObject.invoiceNo,
      partyId: this.MainPostObject.partyId,
      taxType: this.MainPostObject.TaxType,
      saleDate: moment(this.MainPostObject.date).format('YYYY-M-D'),
      dueDate: moment(this.MainPostObject.due).format('YYYY-M-D'),
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
      SaleModel.SalesItems = this.products;

      this.shopService.addSale(this.currentUser, SaleModel).subscribe(
        (next) => {
          this.alertify.success('New sale entry Added.');
          this.router.navigate(['/order/sale/list']);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
      console.log(SaleModel);
    } else {
      SaleModel.status = this.status;
      const saleUpdateModel = {
        purchaseForUpdateDto: SaleModel,
        purchaseOrderItems: this.products,
      };

      this.shopService.updateSale(this.orderId, saleUpdateModel).subscribe(
        (next) => {
          this.alertify.success('sale entry updated.');
          this.router.navigate(['/order/sale/list']);
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
      console.log(saleUpdateModel);
    }
    this.spinner.hide();
  }
  ngOnInit() {
    this.branchId = parseInt(localStorage.getItem('branchId'));
    this.orderId = this.route.snapshot.params.id;

    this.generateInvoiceNo();
    if (this.orderId) {
      this.getOrderFromRepo();
    }
  }
}
