import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss'],
})
export class DialogTemplateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('dialog data', data);
  }
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
