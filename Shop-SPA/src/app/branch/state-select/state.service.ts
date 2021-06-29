import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getState(id: number) {
    return this.http.get<any[]>(this.baseUrl + 'Location/States/' + id);
  }
}
