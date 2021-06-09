import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-sales-pie-chart',
  templateUrl: './sales-pie-chart.component.html',
  styleUrls: ['./sales-pie-chart.component.scss']
})
export class SalesPieChartComponent implements OnInit {
// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
};
public pieChartLabels: Label[] = [['Month 1'], ['Month 2'], 'Month 3'];
public pieChartData: SingleDataSet = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];
  constructor() { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }

}
