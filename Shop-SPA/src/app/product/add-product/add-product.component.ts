import { PartyService } from './../../_services/party.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BrandService } from 'src/app/_services/brand.service';
import * as moment from 'moment';
import { TaxService } from 'src/app/_services/tax.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  validationform: FormGroup; // bootstrap validation form
  submit: boolean;
  model: any = {};
  partyTypes: any[];
  states: any[];
  cities: any[];
  brands: any[];
  categories: any[];
  taxes: any[];
  parties: any[];
  id: number;
  constructor(private router: Router, private brandService: BrandService, private partyService: PartyService,
    private alertify: AlertifyService, private productService: ProductService,
    private texservice: TaxService, public formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Products' }, { label: 'Add New', active: true }];

    // this.getPartyTypeList();
    this.id = this.route.snapshot.params.id;
    // if (this.id != undefined) { }
    this.getBrandList();
    this.getCategoryList();
    this.getTaxList();
    this.createForm();
    if (this.id != undefined) {
      this.productService.viewProduct(this.id)
      .pipe(first())
      .subscribe(x => this.validationform.patchValue(x));
    }
 
    
  }
  createForm():void {
    this.validationform = this.formBuilder.group({
      brandId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productCode: ['', [Validators.required]],
      productSKU: [''],
      description: [''],
      code: [''],
      taxId: ['', [Validators.required]],
      taxEffectDate: [],
      hSNCode: [''],
      purchageRate: [''],
      saleMargin: ['',[Validators.required]],
      mRP: ['',[Validators.required]],
      saleRate: [0],
      openingStock: [0],
      openingDate: [''],
      currentStock: [0, [Validators.pattern('[0-9]+')]],
      isReturnable: [false],
      isAllowMinStockSale: [false],
      remarks: [''],
      warrantyMonth: [0, [Validators.pattern('[0-9]+')]],
      referance: [''],
      note: ['']
    });
  }
  get form() {
    return this.validationform.controls;
  }

  validSubmit() {
    console.log(this.validationform.value)
    this.submit = true;
  }
  getPartyList() {
    this.partyService.getParties()
      .subscribe((res: any) => {
        console.log(res);
        this.parties = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getTaxList() {
    this.texservice.getTaxes()
      .subscribe((res: any) => {
        console.log(res);
        this.taxes = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getBrandList() {
    this.brandService.getBrands()
      .subscribe((res: any) => {
        console.log(res);
        this.brands = res;
      }, error => {
        this.alertify.error(error.error);
      });
  }

  getCategoryList() {
    this.brandService.getCategories()
      .subscribe((res: any) => {
        console.log(res);
        this.categories = res;
      }, error => {
        this.alertify.error(error.error);
      });
  }

  AddProduct() {
    console.log(this.validationform.value)
    this.submit = true;
    if (this.validationform.valid) {
    this.productService.addproduct(this.validationform.value).subscribe(next => {
      this.alertify.success('New product Added.');
      this.router.navigate(['/product/list']);
    }, error => {
      this.alertify.error(error.error);
    });
  } 
}

}
