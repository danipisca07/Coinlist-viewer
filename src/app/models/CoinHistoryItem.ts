export interface CoinHistoryItem {
    coin: string;
    rank: number;
    watchlist: number;
    partitionDate: number;
    date: Date;
    marketCap: number;
    btcPrice?: number;
    ethPrice?: number;
}