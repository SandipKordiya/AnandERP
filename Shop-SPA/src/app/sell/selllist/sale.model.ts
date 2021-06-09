// Table data

export interface SaleOrder {
    id: number;
    invoiceNo: string;
    partyName: string;
    saleDate: Date;
    amount: number;
    paid: number;
    remaining: number;
    branchName: string;
    branchId: number;
    status: string;
    userName: string;
}

// Search Data
export interface SearchResult {
    saleOrders: SaleOrder[];
    total: number;
}
