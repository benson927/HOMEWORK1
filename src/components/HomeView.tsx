import React, { useEffect, useState } from 'react';
import { TrendingUp, PlusCircle, ArrowRightLeft, BarChart3 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Stock } from '@/src/types';
import { fetchWatchlist, fetchChartData } from '../lib/api';

interface HomeViewProps {
  onStockClick: (symbol: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStockClick }) => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [chartData, setChartData] = useState<{name: string, value: number}[]>([]);

  useEffect(() => {
    async function loadData() {
      const w = await fetchWatchlist();
      setWatchlist(w.length > 0 ? w : []);
      // Using AAPL as a default chart demo for HomeView
      const c = await fetchChartData('AAPL');
      setChartData(c.length > 0 ? c.map(item => ({ name: item.time, value: item.value })) : []);
    }
    loadData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 pt-8 pb-32 space-y-12"
    >
      {/* Hero Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-label tracking-[0.2em] text-on-surface-variant uppercase mb-2">總資產</p>
            <h2 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface">
              $152,430.<span className="opacity-40">50</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary mb-1 border border-tertiary/20">
              <TrendingUp size={14} />
              <span className="font-bold font-label text-sm">+1.25%</span>
            </div>
            <p className="text-sm font-label text-on-surface-variant opacity-60">+$1,892.40 今日</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Chart Card */}
          <div className="bg-surface-container-low rounded-2xl p-6 relative overflow-hidden h-[400px] flex flex-col border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-lg font-bold font-headline">績效表現</h3>
              <div className="flex gap-2">
                {['1日', '1週', '1月', '全部'].map((label, i) => (
                  <button 
                    key={label}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-label transition-colors",
                      i === 0 ? "bg-surface-container-highest text-on-surface" : "text-on-surface-variant hover:bg-surface-container-highest"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-grow relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.length > 0 ? chartData : [{name: '09:00', value: 0}]}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b6c4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#b6c4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-surface-container-high px-3 py-2 rounded-lg text-xs font-label shadow-xl border border-outline-variant/20">
                            <p className="opacity-60">{payload[0].payload.name}</p>
                            <p className="font-bold text-primary">${payload[0].value?.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#b6c4ff" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-low rounded-2xl hover:bg-surface-container-highest transition-all group border border-outline-variant/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <PlusCircle size={24} />
              </div>
              <span className="text-sm font-label font-semibold">存款</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-low rounded-2xl hover:bg-surface-container-highest transition-all group border border-outline-variant/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ArrowRightLeft size={24} />
              </div>
              <span className="text-sm font-label font-semibold">轉帳</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-primary rounded-2xl hover:brightness-110 transition-all group shadow-lg shadow-primary/20">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-on-primary group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <span className="text-sm font-label font-semibold text-on-primary">交易</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-headline">自選清單</h3>
              <button className="text-primary text-xs font-label hover:underline">查看全部</button>
            </div>
            <div className="space-y-2">
              {watchlist.map((stock) => (
                <div 
                  key={stock.symbol}
                  onClick={() => onStockClick(stock.symbol)}
                  className="flex items-center justify-between p-3 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="font-bold text-xs">{stock.symbol}</span>
                    </div>
                    <div>
                      <p className="font-bold font-headline">{stock.name}</p>
                      <p className="text-xs text-on-surface-variant opacity-60">{stock.shares} 股</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-headline">${stock.price.toLocaleString()}</p>
                    <p className={cn(
                      "text-xs font-bold",
                      stock.change >= 0 ? "text-tertiary" : "text-error"
                    )}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-gradient-to-br from-primary-container to-[#001550] rounded-2xl p-6 text-on-primary-container relative overflow-hidden group border border-white/5">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <BarChart3 size={120} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">市場洞察</p>
            <h4 className="text-xl font-bold font-headline mb-4 leading-tight">科技板塊在通膨數據壓力下展現強勁韌性。</h4>
            <button className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-full hover:brightness-110 transition-all">閱讀報告</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { cn } from '@/src/lib/utils';
