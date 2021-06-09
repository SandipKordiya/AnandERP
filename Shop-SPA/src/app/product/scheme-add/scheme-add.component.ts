import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from '../../_services/alertify.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-scheme-add',
  templateUrl: './scheme-add.component.html',
  styleUrls: ['./scheme-add.component.scss']
})
export class SchemeAddComponent implements OnInit {
  validationform: FormGroup; // bootstrap validation form
  submit: boolean;

  constructor(
    private fb: FormBuilder, private productService: ProductService, private alertify: AlertifyService,
    private dialogRef: MatDialogRef<SchemeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  ngOnInit() {
    console.log('product', this.data);
    this.getScheme();
    this.createForm();
  }

  createForm(): void {
    this.validationform = this.fb.group({
      id: [0],
      branchId: [parseInt(localStorage.getItem("branchId"))],
      productId: [this.data.product.id, [Validators.required]],
      productName: [this.data.product.productName],
      quantity: ['', [Validators.required]],
      schQuantity: ['', [Validators.required]],
      schRate: ['']
    });
  }
  get form() {
    return this.validationform.controls;
  }

  getScheme() {
    this.productService.getScheme(this.data.product.id)
      .subscribe((res: any) => {
        console.log(res);
        this.validationform.patchValue(res)
      }, error => {
        console.log(error);
        this.alertify.error(error.error);
      });

  }

  calculateRate(): void {
    console.log('received')
    let quantity = this.validationform.get('quantity').value;
    let schQuantity = this.validationform.get('schQuantity').value;

    let mrp = this.data.product.mrp;
    let tax = '1.' + ("00" + this.data.product.taxRate).slice(-2);
    console.log('tax', tax)
    let margin = this.data.product.saleMargin;

    mrp = mrp / parseFloat(tax);
    const rateValue = (mrp * margin) / 100;
    let qtyRatio = (mrp - rateValue) * quantity / (quantity + schQuantity);

    this.validationform.controls.schRate.setValue(parseFloat(qtyRatio.toFixed(2)));
    console.log('rate', qtyRatio)

    // this.validationform.controls.schRate.setValue();
  }

  save() {
    this.dialogRef.close(this.validationform.value);
  }

  close() {
    this.dialogRef.close();
  }


  AddScheme() {
    let branchid = parseInt(localStorage.getItem("branchId"));

    if (this.validationform.get('id').value == 0) {
      console.log(this.validationform.value)
      if (this.validationform.valid) {
        this.productService.addScheme(branchid, 0, this.validationform.value).subscribe(next => {
          this.alertify.success('scheme added successfully');
        }, error => {
          this.alertify.error(error.error);
        });
      }

    } else {
      if (this.validationform.valid) {
        this.productService.updateScheme(this.validationform.get('id').value, this.validationform.value).subscribe(next => {
          this.alertify.success('scheme updated successfully');
        }, error => {
          this.alertify.error(error.error);
        });
      }

    }

  }
}
