import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddedProductListComponent } from './added-product-list/added-product-list.component';
import { DateInputComponent } from './date-input/date-input.component';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { PartyInputComponent } from './party-input/party-input.component';
import { TaxDetailsDialogComponent } from './tax-details-dialog/tax-details-dialog.component';
import { ProductInputComponent } from './product-input/product-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatDialogModule,
    TypeaheadModule.forRoot(),
    MatInputModule,
    MatSelectModule,
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
export class FormSharedModule {}
