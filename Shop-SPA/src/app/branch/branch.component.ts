import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {
  OrderSortableDirective,
  SortEvent,
} from '../_directives/orders-sortable.directive';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { BranchService } from '../_services/branch.service';
import { Branch } from './branch';
import { BranchFilterService } from './branchfilter.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  CurrentBranches: any;
  modalRef: BsModalRef;
  breadCrumbItems: Array<{}>;
  countryId = 101;
  StateId = 0;
  CityId = 0;

  branchFrom = new FormGroup({
    name: new FormControl(''),
    cityId: new FormControl(0),
    stateId: new FormControl(0),
    country: new FormControl(101),
    isActive: new FormControl(true),
  });
  // Table data
  ordersData: Branch[];

  tables$: Observable<Branch[]>;
  total$: Observable<number>;

  @ViewChildren(OrderSortableDirective)
  headers: QueryList<OrderSortableDirective>;

  constructor(
    private modalService: BsModalService,
    private branchService: BranchService,
    private alertify: AlertifyService,
    public service: BranchFilterService,
    private spinner: NgxSpinnerService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    console.log(this.tables$);
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Branch', active: true },
    ];
    this.getList();
  }
  onCountryChange(e) {
    console.log(e);
    this.countryId = e;
    this.branchFrom.patchValue({ stateId: 0, cityid: 0 });
  }
  onStateChange(e) {
    this.branchFrom.patchValue({ cityid: 0 });
    console.log(e);
    this.StateId = e;
  }
  onCityChange(e) {
    console.log(e);
    this.CityId = e;
  }
  getList() {
    this.spinner.show();
    this.branchService.getBranches().subscribe(
      (res: any) => {
        console.log(res);
        this.ordersData = res;

        this.spinner.hide();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openm(branch: any, template: TemplateRef<any>) {
    console.log('branch', branch.cityId);
    this.CurrentBranches = branch;
    this.branchFrom.patchValue({
      country: 101,
      stateId: branch.stateId,
      cityId: branch.cityId,
      isActive: branch.isActive,
      name: branch.name,
    });
    this.countryId = 101;
    this.StateId = branch.stateId;
    this.CityId = branch.cityId;
    // this.model = branch;
    this.modalRef = this.modalService.show(template);
  }

  updateModal(branch: any, template: TemplateRef<any>) {
    // this.model = branch;
    console.log('branch', branch);
    this.modalRef = this.modalService.show(template);
  }

  addBoard() {
    console.log(this.branchFrom.value);
    // const userId = parseInt(localStorage.getItem('userId'));
    this.branchService.addBranch(this.branchFrom.value).subscribe(
      (next) => {
        this.alertify.success('board added successfully');
        this.modalService.hide();
        this.getList();
      },
      (error) => {
        console.log(error);
        this.alertify.error(error);
        this.getList();
      }
    );
  }

  updateBoard() {
    // const updateBranch = {
    //   name: this.model.name,
    // };
    // const userId = parseInt(localStorage.getItem('userId'));
    console.log(this.branchFrom.value);
    this.branchService
      .updateBranch(this.CurrentBranches.id, this.branchFrom.value)
      .subscribe(
        (next) => {
          this.alertify.success('Branch updated successfully');
          this.modalService.hide();
          this.getList();
        },
        (error) => {
          console.log(error);
          this.alertify.error(error);
          this.getList();
        }
      );
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
