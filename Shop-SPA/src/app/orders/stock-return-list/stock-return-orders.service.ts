import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
// import { SortDirection } from './purchasereturn-sortable.directive';
import { ShopService } from '../../_services/shop.service';
import { SortDirection } from '../../_directives/orders-sortable.directive';
import { StockReturnModel, StockReturnSearchResult } from './stock-return-model';


interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Sort the table data
 * @param orders Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(orders: StockReturnModel[], column: string, direction: string): StockReturnModel[] {
    if (direction === '') {
        return orders;
    } else {
        return [...orders].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
function matches(orders: StockReturnModel, term: string, pipe: PipeTransform) {
    return orders.id.toString().includes(term)
        || orders.invoiceNo.toLowerCase().includes(term)
        || orders.purchaseDate.toString().toLowerCase().includes(term)
        || orders.partyName.toLowerCase().includes(term)
        || orders.amount.toString().toLowerCase().includes(term)
        || orders.paid.toString().toLowerCase().includes(term)
        || orders.remaining.toString().toLowerCase().includes(term)
        || orders.branchName.toLowerCase().includes(term)
        || orders.fromBranchName.toLowerCase().includes(term)
        || orders.branchId.toString().toLowerCase().includes(term)
        || orders.status.toLowerCase().includes(term)
        || orders.isReceivedConfirm.toString().toLowerCase().includes(term)
        || orders.userName.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class StockReturnOrderService {
    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _orders$ = new BehaviorSubject<StockReturnModel[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);

    public ordersData = [];

    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 1,
        endIndex: 10,
        totalRecords: 0
    };

    constructor(private pipe: DecimalPipe, private shopService: ShopService) {
        const branchId = parseInt(localStorage.getItem('branchId'));
        this.shopService.getStockReturnList(branchId)
            .subscribe((res: any) => {
                console.log('stock return service', res);
                this.ordersData = res;
            }, error => {
                console.log(error.error);
            });

        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._orders$.next(result.orders);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    /**
     * Returns the value
     */
    get tables$() { return this._orders$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    /**
     * Search Method
     */
    private _search(): Observable<StockReturnSearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let orders = sort(this.ordersData, sortColumn, sortDirection);

        // 2. filter
        orders = orders.filter(table => matches(table, searchTerm, this.pipe));
        const total = orders.length;

        // 3. paginate
        this.totalRecords = orders.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        orders = orders.slice(this._state.startIndex - 1, this._state.endIndex);

        return of(
            { orders, total }
        );
    }
}
