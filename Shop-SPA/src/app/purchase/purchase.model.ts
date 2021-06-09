// Table data

export interface Order {
    id: number;
    invoiceNo: string;
    partyName: string;
    purchaseDate: Date;
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
    orders: Order[];
    total: number;
}
