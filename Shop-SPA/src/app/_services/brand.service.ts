import { Category } from './../_models/category';
import { Brand } from './../_models/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'brand');
  }

  addBrand(brand: Brand) {
    return this.http.post(this.baseUrl + 'brand', brand);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + 'category', category);
  }
}
