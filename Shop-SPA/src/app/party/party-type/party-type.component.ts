import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PartyService } from 'src/app/_services/party.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-party-type',
  templateUrl: './party-type.component.html',
  styleUrls: ['./party-type.component.scss']
})
export class PartyTypeComponent implements OnInit {
  branches: any[];
  breadCrumbItems: Array<{}>;
  submitted: boolean;

  model: any = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private partyService: PartyService,
    private alertify: AlertifyService) {

  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Party Type', active: true }];
    this.getList();
  }

  getList() {
    this.partyService.getPartyTypes()
      .subscribe((res: any) => {
        console.log(res);
        this.branches = res;
      }, error => {
        // this.alertify.error(error);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateModal(item: any, template: TemplateRef<any>) {
    this.model = item;
    this.modalRef = this.modalService.show(template);
  }

  addBoard() {
    console.log(this.model);
    this.partyService.addPartyType(this.model).subscribe(next => {
      this.alertify.success('Party Type added successfully');
      this.modalService.hide();
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }

  updatePartyType() {
    console.log(this.model);
    const updatePartyType = {
      type: this.model.type,
      prefixCode: this.model.prefixCode,
      isAccountledger: this.model.isAccountledger
    };
    this.partyService.updatePartyType(this.model.id, updatePartyType).subscribe(next => {
      this.alertify.success('Party Type updated successfully');
      this.modalService.hide();
      this.model = {};
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePartyType(id: number) {
    this.partyService.deletePartyType(id).subscribe(next => {
      this.alertify.success('Party Type Deleted successfully');
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }


}
