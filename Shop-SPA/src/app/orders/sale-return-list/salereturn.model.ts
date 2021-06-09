export interface Salereturn {
    id: number;
    invoiceNo: string;
    partyName: string;
    saleReturnDate: Date;
    amount: number;
    paid: number;
    remaining: number;
    branchName: string;
    branchId: number;
    status: string;
    userName: string;
}

// Search Data
export interface SaleReturnSearchResult {
    orders: Salereturn[];
    total: number;
}
