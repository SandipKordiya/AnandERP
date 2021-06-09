export interface SaleDueList {
    id: number,
    invoiceNo: string,
    saleDate: Date,
    dueDate: Date,
    partyName: string,
    partyMobile: string,
    partyCreditDays: number,
    netAmount: number,
    paid: number,
    remaining: number,
    status: string,
    totalDays: number
}

export interface SearchResult {
    orders: SaleDueList[];
    total: number;
}
