export interface Bank {
    id: number,
    bankName: string,
    address: string,
    accountNo: string,
    created: Date,
    updated: Date,
    phoneNo: string,
    ifsc: string,
    micrCode: string,
    openingBalance: number,
    currentBalance: number,
    isCurrentAccount: boolean,
    posDetails: string,
    branchId: number
}

export interface SearchResult {
    orders: Bank[];
    total: number;
}
