import React, { useEffect, useState } from 'react';
import { TrendingUp, ArrowRight, Bookmark, LineChart, CandlestickChart } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { NewsItem } from '@/src/types';
import { fetchChartData, fetchNews } from '../lib/api';

export const StockDetailView: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([{ time: '09:00', value: 185.00 }]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const c = await fetchChartData('AAPL');
      if (c.length > 0) setChartData(c);
      
      const n = await fetchNews();
      if (n.length > 0) setNews(n);
    }
    loadData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-7xl mx-auto px-6 pt-8 space-y-10 pb-48"
    >
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-surface-container-high px-3 py-1 rounded-lg text-primary font-bold tracking-wider text-sm">AAPL</span>
            <span className="text-on-surface-variant text-sm font-medium">+$4.32 今日</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface">Apple Inc.</h1>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="text-4xl md:text-6xl font-headline font-bold text-on-surface tabular-nums">
            $189.45
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full text-sm font-semibold border border-tertiary/20">
              <TrendingUp size={14} className="mr-1" />
              +2.34%
            </span>
            <span className="text-on-surface-variant text-sm">+$4.32 今日</span>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8 space-y-8 border border-outline-variant/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-surface-container p-1 rounded-full">
            {['1日', '1週', '1月', '1年', '全部'].map((label, i) => (
              <button 
                key={label}
                className={cn(
                  "px-6 py-2 rounded-full text-sm transition-all",
                  i === 0 ? "font-bold bg-primary text-on-primary shadow-lg" : "font-medium text-on-surface-variant hover:text-on-surface"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <LineChart size={20} className="hover:text-primary cursor-pointer transition-colors" />
            <CandlestickChart size={20} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="relative h-[300px] md:h-[450px] w-full bg-surface-container/30 rounded-2xl overflow-hidden flex items-end">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-[12rem] font-headline font-black uppercase tracking-tighter">Growth</span>
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b6c4ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b6c4ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-surface-container-high px-3 py-2 rounded-lg text-xs font-label shadow-xl border border-outline-variant/20">
                        <p className="opacity-60">{payload[0].payload.time}</p>
                        <p className="font-bold text-primary">${payload[0].value}</p>
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
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#stockGrad)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            <span>上午 09:00</span>
            <span>中午 12:00</span>
            <span>下午 03:00</span>
            <span>收盤</span>
          </div>
        </div>
      </section>

      {/* Bento Grid: Key Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '市值', value: '2.98T', progress: 85 },
          { label: '本益比', value: '29.41', sub: '產業平均: 24.5', subColor: 'text-tertiary' },
          { label: '12月14日達成', value: '$198.23', sub: '12月14日達成' },
          { label: '每股 $0.24', value: '0.51%', sub: '每股 $0.24' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container p-6 rounded-2xl hover:bg-surface-bright transition-all duration-300 border border-outline-variant/10">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-2">{stat.label}</span>
            <div className="text-2xl font-headline font-bold text-on-surface">{stat.value}</div>
            {stat.progress ? (
              <div className="mt-2 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${stat.progress}%` }}></div>
              </div>
            ) : (
              <div className={cn("text-xs mt-2", stat.subColor || "text-on-surface-variant")}>{stat.sub}</div>
            )}
          </div>
        ))}
      </section>

      {/* News Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-outline-variant/10 pb-4">
          <h2 className="text-3xl font-headline font-extrabold tracking-tight">市場情報</h2>
          <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
            查看存檔 <ArrowRight size={16} />
          </button>
        </div>
        
        {news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main News Card */}
            <div className="md:col-span-8 group cursor-pointer relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/10">
              {news[0].imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={news[0].imageUrl} 
                    alt="News Cover" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-8 space-y-3">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                  <span>{news[0].category}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span>{news[0].time}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface leading-tight">{news[0].title}</h3>
                <p className="text-on-surface-variant line-clamp-2 max-w-2xl">{news[0].summary}</p>
              </div>
            </div>
            
            {/* Side News List */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {news.slice(1).map((item) => (
                <div key={item.id} className="p-6 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors cursor-pointer group border border-outline-variant/10">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">{item.category}</div>
                  <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                  <div className="mt-4 text-xs text-outline font-medium">{item.time} • {item.source}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full z-[60] bg-background/80 backdrop-blur-xl border-t border-outline-variant/10 px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">交易餘額</span>
            <span className="text-xl font-headline font-bold">$42,150.80</span>
          </div>
          <div className="flex-1 md:flex-none flex items-center gap-4">
            <button className="flex-1 md:w-48 py-4 px-8 rounded-full bg-surface-container-highest text-on-surface font-bold text-center active:scale-95 transition-all hover:bg-surface-bright">賣出</button>
            <button className="flex-1 md:w-64 py-4 px-8 rounded-full editorial-gradient text-on-primary font-bold text-center shadow-[0_0_30px_rgba(182,196,255,0.2)] active:scale-95 transition-all hover:brightness-110">買入 AAPL</button>
          </div>
          <button className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all text-on-surface-variant border border-outline-variant/10">
            <Bookmark size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
