import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCountry(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'city/AllCountries');
  }

  getStates(countryId : number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'city/AllStates/' + countryId);
  }

  getCities(stateId : number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'city/AllCities/' + stateId);
  }

}
