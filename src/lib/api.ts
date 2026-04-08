import { supabase } from './supabase';
import { Stock, NewsItem } from '../types';

export async function fetchStocks(): Promise<Stock[]> {
  const { data, error } = await supabase.from('stocks').select('*');
  if (error) {
    console.error('Error fetching stocks:', error);
    return [];
  }
  return data.map(dbStock => ({
    symbol: dbStock.symbol,
    name: dbStock.name,
    price: Number(dbStock.price),
    change: Number(dbStock.change),
    changePercent: Number(dbStock.change_percent)
  }));
}

export async function fetchWatchlist(): Promise<Stock[]> {
  const { data, error } = await supabase
    .from('watchlist')
    .select('symbol, stocks(*)');
  
  if (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
  
  return data.map((item: any) => ({
    symbol: item.stocks.symbol,
    name: item.stocks.name,
    price: Number(item.stocks.price),
    change: Number(item.stocks.change),
    changePercent: Number(item.stocks.change_percent),
    shares: 15.0 // keeping some standard if we still display it
  }));
}

export async function fetchPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('symbol, shares, average_price, stocks(*)');
    
  if (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
  
  return data.map((item: any) => ({
    symbol: item.symbol,
    name: item.stocks.name,
    price: Number(item.stocks.price),
    change: Number(item.stocks.change),
    shares: Number(item.shares),
    value: Number(item.shares) * Number(item.stocks.price)
  }));
}

export async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*');
  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  return data.map(item => ({
    id: item.id,
    category: item.category,
    title: item.title,
    summary: item.summary,
    time: item.time,
    source: item.source,
    imageUrl: item.image_url
  }));
}

export async function fetchChartData(symbol: string) {
  const { data, error } = await supabase
    .from('chart_data')
    .select('time, value')
    .eq('symbol', symbol)
    .order('time', { ascending: true });
    
  if (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
  return data.map(item => ({
    time: item.time,
    value: Number(item.value)
  }));
}
