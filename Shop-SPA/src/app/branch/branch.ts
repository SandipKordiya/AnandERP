export interface Branch {
    id: number,
    name: string,
    created: Date
}


export interface SearchResult {
    orders: Branch[];
    total: number;
}
