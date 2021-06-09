import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalComponent } from './vertical/vertical.component';
import { SharedModule } from '../layouts/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [VerticalComponent, LayoutComponent],
  exports: [VerticalComponent]

})
export class LayoutsModule { }
