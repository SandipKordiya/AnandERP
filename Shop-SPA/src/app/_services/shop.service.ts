import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  currentBranchId = parseInt(localStorage.getItem('branchId'));
  currentBranch = localStorage.getItem('branchName');

  constructor(private http: HttpClient) {}

  getProductsByProductId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'product/find/batchlist/' + id);
  }
  getProductsByProductIdByParty(
    id: number,
    partyId: number,
    branchId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        'product/find/batchlistByParty/' +
        id +
        '/' +
        partyId +
        '/' +
        branchId
    );
  }

  getProductsByProductIdByBatch(id: number, branchId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'product/find/batchlistByBatch/' + id + '/' + branchId
    );
  }

  getProductsByProductIdAndPartyId(
    id: number,
    partyId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'product/find/purchase/batchlist/' + id + '/' + partyId
    );
  }
  getProductsSaleByProductIdAndPartyId(
    id: number,
    partyId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'product/find/sale/batchlist/' + id + '/' + partyId
    );
  }
  getProductsByProductIdAndBranchId(
    id: number,
    branchId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'product/find/stock/batchlist/' + id + '/' + branchId
    );
  }

  getOrder(id: number, type: string): Observable<any> {
    if (type == 'sale')
      return this.http.get<any>(this.baseUrl + 'sale/GetPurchaseOrder/' + id);

    if (type == 'purchase')
      return this.http.get<any>(this.baseUrl + 'purchase/' + id);
  }

  getPurchaseOrder(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'purchase/GetPurchaseOrder/' + id);
  }
  getPurchaseOrderItems(purchaseId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'purchase/GetPurchaseItemsFromSP/' + purchaseId
    );
  }

  addPurchase(id: number, model: any) {
    return this.http.post(this.baseUrl + 'Purchase/' + id, model);
  }
  updatePurchase(id: number, model: any) {
    return this.http.put('http://13.233.198.45/api/Purchase/' + id, model);
  }
  addPurchaseReturn(id: number, model: any) {
    return this.http.post(this.baseUrl + 'purchase/return/' + id, model);
  }

  getPurchaseList(): Observable<any[]> {
    if (this.currentBranch === 'Anand')
      return this.http.get<any[]>(this.baseUrl + 'purchase/AllPurchase/0');
    if (this.currentBranch != 'Anand')
      return this.http.get<any[]>(
        this.baseUrl + 'purchase/AllPurchase/' + this.currentBranchId
      );
  }
  getPurchaseReturnList(): Observable<any[]> {
    // return this.http.get<any[]>(this.baseUrl + 'purchase/purchaseReturn');

    if (this.currentBranch === 'Anand')
      return this.http.get<any[]>(this.baseUrl + 'purchase/purchaseReturn/0');
    if (this.currentBranch != 'Anand')
      return this.http.get<any[]>(
        this.baseUrl + 'purchase/purchaseReturn/' + this.currentBranchId
      );
  }

  addStock(id: number, model: any) {
    return this.http.post(this.baseUrl + 'stock/' + id, model);
  }
  getStockList(branchid: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + 'stock/GetAllStocks/' + branchid
    );
  }
  addStockReturn(id: number, model: any) {
    return this.http.post(this.baseUrl + 'stock/return/' + id, model);
  }
  getStockReturnList(branchid: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + 'stock/GetAllStockReturns/' + branchid
    );
  }
  addStockTransfer(id: number, model: any) {
    return this.http.post(this.baseUrl + 'stock/transfer/' + id, model);
  }
  getStockTransferList(branchid: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + 'stock/GetAllStockTransfer/' + branchid
    );
  }

  addSale(id: number, model: any) {
    return this.http.post(this.baseUrl + 'sale/' + id, model);
  }
  updateSale(id: number, model: any) {
    return this.http.put(this.baseUrl + 'Sale/' + id, model);
  }

  getSaleOrder(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'sale/GetSaleOrder/' + id);
  }
  getSaleOrderItems(saleId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'sale/GetSaleItemsFromSP/' + saleId
    );
  }

  addSaleReturn(id: number, model: any) {
    return this.http.post(this.baseUrl + 'sale/salereturn/' + id, model);
  }

  getSellList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'sale');
  }
  getSellReturnList(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseUrl + 'sale/GetAllSalesReturnList/' + id
    );
  }

  getOrderListbyParty(id: number, isReceived: boolean): Observable<any[]> {
    if (!isReceived)
      return this.http.get<any[]>(this.baseUrl + 'order/PurchaseOrders/' + id);

    if (isReceived)
      return this.http.get<any[]>(this.baseUrl + 'order/SalesOrders/' + id);
  }

  getOrderListbyPartyForPayment(
    id: number,
    isReceived: boolean
  ): Observable<any[]> {
    if (!isReceived)
      return this.http.get<any[]>(this.baseUrl + 'order/PurchaseOrders/' + id);

    if (isReceived)
      return this.http.get<any[]>(
        this.baseUrl + 'order/SalesOrders/payment/' + id
      );
  }

  addPayment(id: number, model: any, isReceived: boolean) {
    if (!isReceived)
      return this.http.post(this.baseUrl + 'payment/Purchase/' + id, model);

    if (isReceived)
      return this.http.post(this.baseUrl + 'payment/Sales/' + id, model);
  }

  addCompany(model: any) {
    return this.http.post(this.baseUrl + 'company', model);
  }

  getCompany(branchId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'company/' + branchId);
  }

  updateCompany(id: number, model: any) {
    return this.http.put(this.baseUrl + 'company/update/' + id, model);
  }
}
