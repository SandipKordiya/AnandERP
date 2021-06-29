import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCountry() {
    return this.http.get<any[]>(this.baseUrl + 'Location/Countries');
  }
}
