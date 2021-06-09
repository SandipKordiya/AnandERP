import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeletonLoaderComponent } from './seleton-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SeletonLoaderComponent],
  exports: [SeletonLoaderComponent]
})
export class SeletonLoaderModule { }
