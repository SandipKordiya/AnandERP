import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRouteRoutes } from './order-route.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [CommonModule, OrderRouteRoutes, sharedModule],
  declarations: [],
})
export class OrderModuleModule {}
