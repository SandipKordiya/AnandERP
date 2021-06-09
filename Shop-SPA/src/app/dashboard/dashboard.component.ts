import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { latLng, tileLayer } from 'leaflet';

import { ChartType, Stat, Chat, Transaction } from './dashboard.model';

import { statData, revenueChart, salesAnalytics, sparklineEarning, sparklineMonthly, chatData, transactions } from './data';


// const statData = [
//   {
//       icon: 'ri-stack-line',
//       title: 'Number of Sales',
//       value: '1452'
//   }, {
//       icon: 'ri-store-2-line',
//       title: 'Sales Revenue',
//       value: '$ 38452'
//   }, {
//       icon: 'ri-briefcase-4-line',
//       title: 'Average Price',
//       value: '$ 15.4'
//   }
// ];

// export interface Stat {
//   title: string;
//   icon: string;
//   value: string;
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  term: any;
  chatData: Chat[];
  transactions: Transaction[];
  statData: Stat[];

  constructor(public formBuilder: FormBuilder) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;
  salesAnalytics: ChartType;
  sparklineEarning: ChartType;
  sparklineMonthly: ChartType;

  // Form submit
  chatSubmit: boolean;

  formData: FormGroup;


  // options = {
  //   layers: [
  //     tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //   ],
  //   zoom: 6,
  //   center: latLng(46.879966, -121.726909)
  // };

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Nazox' }, { label: 'Dashboard', active: true }];
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this._fetchData();
  }

  private _fetchData() {
    this.revenueChart = revenueChart;
    this.salesAnalytics = salesAnalytics;
    this.sparklineEarning = sparklineEarning;
    this.sparklineMonthly = sparklineMonthly;
    this.chatData = chatData;
    this.transactions = transactions;
    this.statData = statData;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatData.push({
        align: 'right',
        name: 'Ricky Clark',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

}
