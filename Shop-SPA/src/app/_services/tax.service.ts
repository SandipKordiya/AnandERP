import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTaxes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'tax');
  }

  addTax(tax: any) {
    return this.http.post(this.baseUrl + 'tax', tax);
  }
}
