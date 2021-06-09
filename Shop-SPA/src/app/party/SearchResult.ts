import { Party } from "../_models/party";

export interface SearchResult {
    orders: Party[];
    total: number;
}
