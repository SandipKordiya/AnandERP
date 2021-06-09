import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-purchase-tax-details',
  templateUrl: './purchase-tax-details.component.html',
  styleUrls: ['./purchase-tax-details.component.scss']
})
export class PurchaseTaxDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PurchaseTaxDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log('dialog data', data)
    }
  ngOnInit() { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
