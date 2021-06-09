export interface PartyLedger {
    branchId: number,
    closing: number,
    created: Date,
    credit: number,
    debit: number,
    description: string,
    id: number,
    orderId: number,
    orderType: string,
    partyId: number,
    remark: string,
    type: string,
    userId: number,
    invoiceNo: string
}
