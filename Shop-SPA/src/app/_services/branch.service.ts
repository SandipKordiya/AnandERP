import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../_models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl + 'branch');
  }

  getBranchesbyPaging(page = 0, itemsPerPage = 0): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl + 'branch/GetBranchPaging/' + page + '/' + itemsPerPage);
  }

  addBranch(id: number, branch: Branch) {
    return this.http.post(this.baseUrl + 'branch/' + id, branch);
  }

  updateBranch(id: number, branch: any) {
    return this.http.put(this.baseUrl + 'branch/' + id, branch);
  }
  
  getCompany(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'branch/' + id);
  }

  addCompany(id: number, company: any) {
    return this.http.post(this.baseUrl + 'company/' + id, company);
  }

}
