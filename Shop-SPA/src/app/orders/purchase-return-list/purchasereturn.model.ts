// Table data

export interface PurchaseReturnOrder {
    id: number;
    invoiceNo: string;
    partyName: string;
    purchaseReturnDate: Date;
    amount: number;
    paid: number;
    remaining: number;
    branchName: string;
    branchId: number;
    status: string;
    userName: string;
}

// Search Data
export interface PurchaseReturnSearchResult {
    orders: PurchaseReturnOrder[];
    total: number;
}
