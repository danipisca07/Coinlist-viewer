export interface CoinHistoryItem {
    coin: string;
    displayName?: string;
    rank: number;
    watchlist: number;
    watchlistImprove?: number;
    watchlistImprovePercentage?: number;
    partitionDate: number;
    date: Date;
    marketCap: number;
    btcPrice?: number;
    ethPrice?: number;
}