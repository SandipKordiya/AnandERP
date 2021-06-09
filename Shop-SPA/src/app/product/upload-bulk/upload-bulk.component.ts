import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertifyService } from '../../_services/alertify.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-upload-bulk',
  templateUrl: './upload-bulk.component.html',
  styleUrls: ['./upload-bulk.component.scss']
})
export class UploadBulkComponent implements OnInit {
  baseUrl = environment.url;

  breadCrumbItems: Array<{}>;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  isLoading = false;
  button = 'Submit';
  fileInfos: Observable<any>;
  constructor(private productService: ProductService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Products' }, { label: 'Upload', active: true }];
    bsCustomFileInput.init()

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress = 0;
    this.isLoading = true;
    this.button = 'Processing';
    this.currentFile = this.selectedFiles.item(0);
    this.productService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
          this.isLoading = false;
          this.button = 'Submit';
          this.alertify.success("Successfully Upload all products")
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        this.isLoading = false;
        this.button = 'Submit';
      });

    this.selectedFiles = undefined;
  }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.baseUrl + 'download/ProductExcel.xlsx');
    link.setAttribute('download', `ProductExcel.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
}
