import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Party } from '../_models/party';
import { Partytype } from '../_models/partytype';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPartyTypes(): Observable<Partytype[]> {
    return this.http.get<Partytype[]>(this.baseUrl + 'party/GetPartyTypes');
  }

  addPartyType(partytype: Partytype) {
    return this.http.post(this.baseUrl + 'party/CreatePartyType', partytype);
  }

  getParties(): Observable<Party[]> {
    return this.http.get<Party[]>(this.baseUrl + 'party');
  }

  getParty(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'party/GetParty/' + id);
  }

  deleteParty(id: number) {
    return this.http.delete(this.baseUrl + 'party/DeleteParty/' + id);
  }

  getGST(number: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'party/gstinvalidate/' + number);
  }

  updatePartyType(id: number, partytype: any) {
    return this.http.put(this.baseUrl + 'party/UpdatePartyType/' + id, partytype);
  }

  addParty(party: Party) {
    return this.http.post(this.baseUrl + 'party', party);
  }
  updatePartyStatus(id: number, status: boolean) {
    var model = {
      isBillingEnabled: status
    };
    return this.http.put(this.baseUrl + 'party/updatestatus/' + id, model);
  }
  updateParty(id: number, party: Party) {
    return this.http.put(this.baseUrl + 'party/UpdateParty/' + id, party);
  }
  deletePartyType(id: number) {
    return this.http.delete(this.baseUrl + 'party/DeletePartyType/' + id);
  }

  getPartyLedger(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('partyId', ledgerParams.partyId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);
    params = params.append('isSale', ledgerParams.isSale);

    return this.http.get<any>(this.baseUrl + 'party/LedgerByPartyId', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }
}
