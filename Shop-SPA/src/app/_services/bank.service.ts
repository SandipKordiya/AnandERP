import { Product } from './../_models/product';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank } from '../bank/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.baseUrl + 'bank');
  }

  //scheme
  getBank(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bank/' + id);
  }

  addBank(userId: number, model: any) {
    return this.http.post(this.baseUrl + 'bank', model);
  }

  updateBank(id: number, model: any) {
    return this.http.put(this.baseUrl + 'bank/' + id, model);
  }
}
