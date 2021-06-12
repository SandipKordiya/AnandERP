import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRouteRoutes } from './order-route.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    OrderRouteRoutes,
  ],
  declarations: [],
})
export class OrderModuleModule {}
