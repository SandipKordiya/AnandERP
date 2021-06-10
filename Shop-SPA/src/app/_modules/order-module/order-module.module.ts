import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModuleComponent } from './order-module.component';
import { OrderRouteRoutes } from './order-route.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddedProductListComponent } from 'src/app/_forms/added-product-list/added-product-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    OrderRouteRoutes,
  ],
  declarations: [OrderModuleComponent],
})
export class OrderModuleModule {}
