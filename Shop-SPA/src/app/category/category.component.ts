import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';
import { BrandService } from '../_services/brand.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[];
  model: any = {};
  brands: any[];
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private brandService: BrandService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getList();
    // this.getBrandList();
  }

  getBrandList() {
    this.brandService.getBrands().subscribe(
      (res: any) => {
        console.log(res);
        this.brands = res;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  getList() {
    this.brandService.getCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.categories = res;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addCategory() {
    this.model.isActive = true;

    console.log(this.model);
    this.brandService.addCategory(this.model).subscribe(
      (next) => {
        this.alertify.success('category added successfully');
        this.modalService.hide();
        this.getList();
      },
      (error) => {
        console.log(error);
        this.alertify.error(error.error);
      }
    );
  }
}
