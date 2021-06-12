import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRouteRoutes } from './order-route.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    OrderRouteRoutes,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [],
})
export class OrderModuleModule {}
