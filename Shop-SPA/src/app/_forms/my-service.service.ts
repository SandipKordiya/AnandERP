import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private http: HttpClient) {}
  getPartyList(query: string) {
    if (query === '') {
      console.log('Empty');

      return of([]);
    }
    return this.http
      .get<[any, string[]]>(
        'http://ayurveda-api.ambicionestechnology.com/api/party/findFromSP/' +
          query
      )
      .pipe(
        map((response) => {
          console.log(response, query);
          return response;
        })
      );
  }
  getPoductList(query: string) {
    if (query === '') {
      console.log('Empty');

      return of([]);
    }
    return this.http
      .get<[any, string[]]>(
        'http://ayurveda-api.ambicionestechnology.com/api/product/find/purchase/' +
          query
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
