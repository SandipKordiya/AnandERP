import { Product } from './../_models/product';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  viewProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  addproduct(product: Product) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('formFile', file);

    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}product/ImportExcelFile`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  //scheme
  getScheme(productId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'productscheme/GetScheme/' + productId
    );
  }

  addScheme(branchId: number, userId: number, model: any) {
    return this.http.post(this.baseUrl + 'productscheme', model);
  }

  updateScheme(id: number, model: any) {
    return this.http.put(this.baseUrl + 'productscheme/update/' + id, model);
  }
}
