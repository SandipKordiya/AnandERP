export interface Brand {
  id: number;
  name: string;
  created: Date;
}

export interface SearchResult {
  orders: Brand[];
  total: number;
}
