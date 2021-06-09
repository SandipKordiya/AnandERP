import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'payment');
  }
  getAllPaymentList(branchId: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'payment/PaymentList/' + branchId);
  }

  getPartyStatus(ledgerParams: any) {
    let params = new HttpParams();
    
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);
    params = params.append('partyId', ledgerParams.partyId);

    return this.http.get<any>(this.baseUrl + 'payment/GetPaymentFilter', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }
}
