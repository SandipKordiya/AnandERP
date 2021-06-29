import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './product-model';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  // search party
  getPartyList(query: string) {
    if (query === '') {
      console.log('Empty');

      return of([]);
    }
    return this.http
      .get<[any, string[]]>(this.baseUrl + 'party/find/' + query)
      .pipe(
        map((response) => {
          console.log(response, query);
          return response;
        })
      );
  }

  // get party data by id
  getParty(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'party/GetParty/' + id);
  }
  // search product
  getPoductList(query: string) {
    if (query === '') {
      console.log('Empty');

      return of([]);
    }
    return this.http
      .get<[any, string[]]>(this.baseUrl + 'product/find/purchase/' + query)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  // get product data by id

  viewProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      this.baseUrl + 'product/GetProductInfo/' + id
    );
  }
}
