import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedProductListComponent } from '../_forms/added-product-list/added-product-list.component';
import { DateInputComponent } from '../_forms/date-input/date-input.component';
import { DialogTemplateComponent } from '../_forms/dialog-template/dialog-template.component';
import { PartyInputComponent } from '../_forms/party-input/party-input.component';
import { ProductInputComponent } from '../_forms/product-input/product-input.component';
import { TaxDetailsDialogComponent } from '../_forms/tax-details-dialog/tax-details-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    TypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddedProductListComponent,
    DateInputComponent,
    DialogTemplateComponent,
    PartyInputComponent,
    ProductInputComponent,
    TaxDetailsDialogComponent,
  ],
  exports: [
    AddedProductListComponent,
    DateInputComponent,
    DialogTemplateComponent,
    PartyInputComponent,
    ProductInputComponent,
    TaxDetailsDialogComponent,
  ],
})
export class sharedModule {}
