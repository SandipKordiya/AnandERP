import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRouteRoutes } from './order-route.routing';
import { FormSharedModule } from '../_forms/form-shared.module';

@NgModule({
  imports: [CommonModule, OrderRouteRoutes, FormSharedModule],
  declarations: [],
})
export class OrderModuleModule {}
