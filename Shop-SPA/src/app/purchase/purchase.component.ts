import { AlertifyService } from './../_services/alertify.service';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from '../_services/branch.service';
import { TaxService } from '../_services/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ShopService } from '../_services/shop.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  partyMoreInfo;
  products: any[] = [];
  public MainPostObject: any;
  // input properties
  taxes: any[];
  taxTypeList: any = ['IntraState', 'InterState'];

  // additional form fields
  public orderId;

  taxSaleMargin: number;
  saleRate: number = 0;
  TaxPercentage: number;
  TaxAmount: number;
  DiscountAmount: number;
  OtherDiscountAmount: number;
  status = 'Unpaid';
  // this property is for callbacks
  updateFinal: number = 0;
  modalRef: BsModalRef;
  Todaydate = new Date();
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private shopService: ShopService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.breadCrumbItems = [
      { label: 'PURCHASE' },
      { label: 'New PURCHASE Invoice', active: true },
    ];
  }
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
    quantity: new FormControl(0, Validators.required),
    schQuantity: new FormControl(0, Validators.required),
    rate: new FormControl('', Validators.required),
    discount: new FormControl(0, Validators.required),
    otherDiscount: new FormControl(0, Validators.required),
    Tax: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required),
  });
  // other properties
  public currentUser: number = parseInt(localStorage.getItem('userId'));
  @ViewChild('InvoiceNumberField') Invoice: ElementRef;
  ngAfterViewInit() {
    this.Invoice.nativeElement.focus();
  }
  get partyData() {
    return this.addPurchaseForm.get('party');
  }
  get productDataFeild() {
    return this.addPurchaseForm.get('productData');
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // on select methods party/product dropdown
  public onChangeParty(e) {
    this.spinner.show();
    this.partyMoreInfo = e;
    console.log('Parent', e);
    //     let taxType
    //     if (e.stateId == 4030)
    //     taxType = "IntraState";
    // if (e.stateId != 4030)
    // this.model.taxType = "InterState";
    this.addPurchaseForm.patchValue({
      PDate: new Date(),
      TaxType: e.stateId == 4030 ? 'IntraState' : 'InterState',
    });

    this.spinner.hide();
  }
  public onChangeProduct(e) {
    this.spinner.show();
    console.log('Parent', e);
    if (!this.orderId)
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
    let _quantity = this.addPurchaseForm.value.quantity;
    let _rate = this.addPurchaseForm.value.rate;
    let _discount = this.addPurchaseForm.value.discount;
    let _otherDiscount = this.addPurchaseForm.value.otherDiscount;
    let _taxid = this.addPurchaseForm.value.Tax;
    let _mrp = this.addPurchaseForm.value.mrp;
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
        this.addPurchaseForm.patchValue({
          Amount: temp_amount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  // update purchase
  getOrderItemsFromRepo(id): void {
    this.shopService.getPurchaseOrderItems(id).subscribe((data) => {
      data.forEach((element, i) => {
        data[i].mRP = element.mrp;
        data[i].mRPDiscount = element.mrpDiscount;
      });
      this.products = data;
      this.ChangeTotalAmount();
      console.log('order items', this.products);
    });
  }
  getOrderFromRepo(): void {
    this.shopService.getPurchaseOrder(this.orderId).subscribe((data) => {
      this.status = data.status;
      this.addPurchaseForm.patchValue({
        invoiceNo: data.invoiceNo,
        branch: data.branchId,
        party: data.partyId,
        PDate: moment(data.purchaseDate).format('DD/MM/YYYY'),
      });
      console.log('order', data);
      this.getOrderItemsFromRepo(data.id);
      this.MainPostObject = {
        products: this.products,
        invoiceNo: data.invoiceNo,
        partyId: data.partyId,
        purchaseDate: moment(data.purchaseDate).format('YYYY-M-D'),
        branchId: data.branchId,
      };
    });
  }

  // edit/delete product
  handleEditProduct(e) {
    this.addPurchaseForm.patchValue({
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
      otherDiscount: e.otherDiscount,
      Tax: e.taxId,
      Amount: e.amount,
    });
    // this.taxSaleMargin = e.taxMargin;
    this.TaxPercentage = e.taxRate;
    this.TaxAmount = e.taxAmount;

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
    this.addPurchaseForm.patchValue({
      productData: '',
      batchNumber: '',
      expireDate: '',
      mrp: '',
      quantity: 0,
      schQuantity: 0,
      rate: '',
      discount: 0,
      otherDiscount: 0,
      Tax: '',
      Amount: '',
    });
    this.taxSaleMargin = 0;
    this.TaxPercentage = 0;
    this.TaxAmount = 0;
  }
  private addNewProduct() {
    let formData = this.addPurchaseForm.value;
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

    console.log(productObject);
    this.products.push(productObject);
  }

  private updateProduct(productObjectIndex) {
    let formData = this.addPurchaseForm.value;

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

  AddProduct() {
    this.ChangeTotalAmount();
    let f = this.addPurchaseForm.value;
    let productObject = {
      ...this.addPurchaseForm.value,
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

    this.updateFinal += 1;
  }

  submitPurchase(finalComponent) {
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
      this.shopService.addPurchase(this.currentUser, purchaseModel).subscribe(
        (next) => {
          this.alertify.success('New purchase entry Added.');
          this.router.navigate(['/order/purchase/list']);
          console.log(next);
          this.spinner.hide();
        },
        (error) => {
          this.alertify.error(error.message);
          console.log(error);
          this.spinner.hide();
        }
      );
    } else {
      purchaseModel.status = this.status;
      const purchaseUpdateModel = {
        purchaseForUpdateDto: purchaseModel,
        purchaseOrderItems: this.products,
      };
      this.shopService
        .updatePurchase(this.orderId, purchaseUpdateModel)
        .subscribe(
          (next) => {
            this.alertify.success('purchase entry updated.');
            this.router.navigate(['/order/purchase/list']);
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error.message);
            this.spinner.hide();
          }
        );
      console.log(purchaseUpdateModel);
    }
  }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.id;
    console.log(this.orderId);
    if (this.orderId) {
      this.getOrderFromRepo();
    }
  }
}
