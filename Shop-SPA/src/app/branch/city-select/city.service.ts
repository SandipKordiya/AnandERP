import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCity(id: number) {
    return this.http.get<any[]>(this.baseUrl + 'Location/Cities/' + id);
  }
}
