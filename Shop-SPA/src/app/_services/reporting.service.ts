import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getInvoiceDueList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'product');
  }

  getItemWisePurchase(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);
    params = params.append('brandId', ledgerParams.brandId);
    params = params.append('productId', ledgerParams.productId);
    params = params.append('partyId', ledgerParams.partyId);

    return this.http.get<any>(this.baseUrl + 'purchase/ItemwisePurchase', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }


  getItemWiseSale(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);
    params = params.append('brandId', ledgerParams.brandId);
    params = params.append('productId', ledgerParams.productId);
    params = params.append('partyId', ledgerParams.partyId);

    return this.http.get<any>(this.baseUrl + 'sale/ItemwiseSales', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }

  getStockLedger(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('brandId', ledgerParams.brandId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);

    return this.http.get<any>(this.baseUrl + 'stock/GetStockLedger', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }


  getStockByWarehouse(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('productId', ledgerParams.productId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);

    return this.http.get<any>(this.baseUrl + 'stock/GetStockByWareHouse', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }

  
  getSaleDetails(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('fromDate', ledgerParams.fromDate);
    params = params.append('toDate', ledgerParams.toDate);
    params = params.append('brandId', ledgerParams.brandId);
    params = params.append('productId', ledgerParams.productId);
    params = params.append('partyId', ledgerParams.partyId);
    params = params.append('partyTypeId', ledgerParams.partyTypeId);

    return this.http.get<any>(this.baseUrl + 'sale/SalesDetails', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }


  getBranchProductDetails(ledgerParams: any) {
    let params = new HttpParams();

    params = params.append('branchId', ledgerParams.branchId);
    params = params.append('brandId', ledgerParams.brandId);
    params = params.append('productId', ledgerParams.productId);

    return this.http.get<any>(this.baseUrl + 'branch/GetBranchInventory', { observe: 'response', params })
      .pipe(
        map(response => {
          return response;
        }));
  }

}
