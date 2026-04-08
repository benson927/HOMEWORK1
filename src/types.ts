export type View = 'home' | 'search' | 'portfolio' | 'profile' | 'stock-detail';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares?: number;
  marketCap?: string;
  peRatio?: number;
  dividendYield?: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  time: string;
  source: string;
  imageUrl?: string;
}
