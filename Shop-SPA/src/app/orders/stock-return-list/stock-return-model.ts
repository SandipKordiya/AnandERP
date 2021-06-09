export interface StockReturnModel {
    id: number;
    invoiceNo: string;
    partyName: string;
    purchaseDate: Date;
    amount: number;
    paid: number;
    remaining: number;
    branchName: string;
    fromBranchName: string;
    branchId: number;
    status: string;
    userName: string;
    isReceivedConfirm: boolean;
}


export interface StockReturnSearchResult {
    orders: StockReturnModel[];
    total: number;
}
