import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getSalesDue(branchId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'sale/GetSalesDue/' + branchId);
  }
  getSalesDetails(branchId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'sale/GetSalesDetails/' + branchId);
  }
}
