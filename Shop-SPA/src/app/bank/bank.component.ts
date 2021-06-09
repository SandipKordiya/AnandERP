import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { OrderSortableDirective, SortEvent } from '../_directives/orders-sortable.directive';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { BankService } from '../_services/bank.service';
import { BranchService } from '../_services/branch.service';
import { Bank } from './bank';
import { BankFilterService } from './bankFilter.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  breadCrumbItems: Array<{}>;
  branches: any[];
  // Table data
  ordersData: Bank[];

  tables$: Observable<Bank[]>;
  total$: Observable<number>;
  registerForm: FormGroup;
  submit: boolean;

  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private modalService: BsModalService, private bankService: BankService,
    private alertify: AlertifyService, public service: BankFilterService, private branchService: BranchService,
    private spinner: NgxSpinnerService, private authService: AuthService, private fb: FormBuilder) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Bank', active: true }];
    this.getList();
    this.intitializeForm();
    this.getBranchList();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      id: [],
      bankName: ['', Validators.required],
      address: [''],
      accountNo: ['', Validators.required],
      phoneNo: [''],
      ifsc: [''],
      micrCode: [''],
      openingBalance: [0],
      currentBalance: [0],
      isCurrentAccount: [false],
      posDetails: [''],
      branchId: ['', [Validators.required]],
    })
  }

  get form() {
    return this.registerForm.controls;
  }

  validSubmit() {
    console.log(this.registerForm.value)
    this.submit = true;
  }

  getBranchList() {
    this.spinner.show();
    this.branchService.getBranches()
      .subscribe((res: any) => {
        console.log(res);
        this.branches = res;
        this.spinner.hide();
      }, error => {
        this.alertify.error(error.error);
      });
  }

  getList() {
    this.spinner.show();
    this.bankService.getBanks()
      .subscribe((res: any) => {
        console.log(res);
        this.ordersData = res;
        this.spinner.hide();
      }, error => {
        this.alertify.error(error);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  openm(branch: any, template: TemplateRef<any>) {
    console.log('branch', branch)
    this.model = branch;
    this.registerForm.patchValue(branch)
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });

  }

  updateModal(branch: any, template: TemplateRef<any>) {
    // this.model = branch;
    console.log('branch', branch)
    this.modalRef = this.modalService.show(template);
  }

  addBank() {
    this.submit = true;
    if (this.registerForm.valid) {
      const userId = parseInt(localStorage.getItem('userId'));
      this.bankService.addBank(userId, this.registerForm.value).subscribe(next => {
        this.alertify.success('Bank added successfully');
        this.modalService.hide();
        this.getList();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  updateBoard() {
    const updateBranch = {
      name: this.model.name
    };
    const userId = parseInt(localStorage.getItem('userId'));
    this.bankService.updateBank(this.model.id, updateBranch).subscribe(next => {
      this.alertify.success('Bank updated successfully');
      this.modalService.hide();
      this.model = {};
      this.getList();
    }, error => {
      this.alertify.error(error);
    });
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
