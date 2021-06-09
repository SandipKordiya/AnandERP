import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { TaxService } from '../_services/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  branches: any[];
  model: any = {};
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private taxService: TaxService,
              private spinner: NgxSpinnerService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.taxService.getTaxes()
      .subscribe((res: any) => {
        console.log(res);
        this.branches = res;
        this.spinner.hide();
      }, error => {
        this.alertify.error(error);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addTax() {
    console.log(this.model);
    this.taxService.addTax(this.model).subscribe(next => {
      this.alertify.success('tax added successfully');
      this.modalService.hide();
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }

}
