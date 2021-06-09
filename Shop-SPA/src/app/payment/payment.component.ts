import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { BranchService } from '../_services/branch.service';
import { environment } from '../../environments/environment';
import { ShopService } from '../_services/shop.service';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  model: any = {};
  branches: any;
  partyId: number;
  baseUrl = environment.apiUrl;
  paymentNumber: any;
  currentUser: number = parseInt(localStorage.getItem('userId'));

  invoicelist: any[];
  selectedOrderId: number;

  keywordParty = 'name';
  dataParty: any;
  errorMsgParty: string;
  isLoadingResultParty: boolean;
  selectedParty: any;

  remainAmount = 0;

  constructor(private router: Router, private alertify:
    AlertifyService, private shopService: ShopService,
    private http: HttpClient, private route: ActivatedRoute, private branchService: BranchService,
    private authService: AuthService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getList();
    this.generateInvoiceNo();
    this.model.branchId = parseInt(localStorage.getItem('branchId'));
    console.log('selectedParty', this.selectedParty)
  }



  getList() {
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

  getPartyServerResponse(event) {
    this.isLoadingResultParty = true;
    this.http.get(this.baseUrl + 'party/find/' + event)
      .subscribe(data => {

        if (data == undefined) {
          this.dataParty = [];
          // this.errorMsgParty = data.Error;
        } else {
          console.log('dataParty', data);
          this.dataParty = data;
        }

        this.isLoadingResultParty = false;
      });
  }

  searchPartyCleared() {
    console.log('searchCleared');
    this.dataParty = [];
  }

  selectPartyEvent(item) {
    console.log(item);
    this.selectedParty = item;
    this.model.partyId = item.id;
    this.getOrderList();
  }
  onPartyChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onPartyFocused(e) {
    // do something when input is focused
  }

  getOrderList() {
    if (this.model.partyId != undefined && this.model.partyId != null) {
      this.shopService.getOrderListbyPartyForPayment(this.model.partyId, this.model.isReceived)
        .subscribe((res: any) => {
          console.log('res', res);
          this.invoicelist = res;
          this.selectInvoice();
        }, error => {
          this.alertify.error(error);
        });
    }

  }
  // OrderId
  getProoduct(e, data) {
    if (e.target.checked) {
      console.log('selectedOrderId', data);
      this.selectedOrderId = data.id;
      this.model.amount = data.netAmount;
      // this.arr.push(data); // for push
    } else {
      // this.arr.pop(data); // for remove
      console.log(data);
    }
  }

  onSubmit() {
    this.model.orderId = this.selectedOrderId;
    const list = this.invoicelist.filter(
      item => item.mode === true
    );

    if (list.length == 0) {
      this.alertify.error('Select at list one order.');
      return;
    }
    this.model.paymentNo = this.paymentNumber;

    this.model.paymentDate = moment(this.model.paymentDate).format('YYYY-M-D');
    let modelData ={
      model: this.model,
      list: list
    }

    console.log(this.model);
    this.shopService.addPayment(this.currentUser, modelData, this.model.isReceived).subscribe(next => {
      this.alertify.success('Payment paid successfully');
      this.getOrderList();
    }, error => {
      this.alertify.error(error);
    });
  }

  generateInvoiceNo() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let branchName = localStorage.getItem('branchName');
    this.paymentNumber = branchName.slice(0, 4) + '/P' + result;
    return result;
  }

  onAmountChange() {
    this.remainAmount = this.model.amount;
    this.selectInvoice();
  }

  selectInvoice() {
    var remainingValue = 0;
    if (this.invoicelist != undefined) {
      var data = this.invoicelist.filter(s => {
        let index = this.invoicelist.indexOf(s);
        console.log(' this.remainAmount', this.remainAmount)
        if (this.remainAmount != 0) {
          if (this.remainAmount <= s.remaining) {
            this.invoicelist[index].mode = true;
            this.invoicelist[index].paid = this.remainAmount;
            this.remainAmount = 0;
            return false;
          } else {
            this.remainAmount = this.remainAmount - s.remaining;
            this.invoicelist[index].mode = true;
            this.invoicelist[index].paid = s.remaining;
            console.log(' this.remainAmount', this.remainAmount)
          }
        }
      });
    }

    console.log('list', this.invoicelist);
  }

}
