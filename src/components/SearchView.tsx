import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, TrendingDown, Wallet, ChevronDown, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Stock } from '@/src/types';
import { fetchStocks } from '../lib/api';

export const SearchView: React.FC = () => {
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [trending, setTrending] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      let data = await fetchStocks();
      if (!data || data.length === 0) {
        // Fallback mock data if Supabase isn't configured
        data = [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 1.2, changePercent: 0.7, shares: 0 },
          { symbol: 'MSFT', name: 'Microsoft Corporation', price: 420.21, change: -2.3, changePercent: -0.5, shares: 0 },
          { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 924.12, change: 15.4, changePercent: 1.7, shares: 0 },
          { symbol: 'TSLA', name: 'Tesla, Inc.', price: 170.83, change: 3.2, changePercent: 1.9, shares: 0 },
          { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 180.38, change: 0.8, changePercent: 0.4, shares: 0 },
          { symbol: 'META', name: 'Meta Platforms', price: 490.50, change: 5.1, changePercent: 1.1, shares: 0 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 155.40, change: -1.2, changePercent: -0.8, shares: 0 },
          { symbol: 'AMD', name: 'Advanced Micro Devices', price: 165.20, change: 4.5, changePercent: 2.8, shares: 0 }
        ];
      }
      setAllStocks(data);
      setTrending(data.slice(0, 4));
    }
    loadData();
  }, []);

  const displayStocks = searchQuery.trim() !== '' 
    ? allStocks.filter(s => 
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trending;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32"
    >
      {/* Left Column */}
      <div className="lg:col-span-7 space-y-10">
        <section className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline">
              <Search size={20} />
            </div>
            <input 
              className="w-full bg-surface-container-highest border-none rounded-2xl py-5 pl-14 pr-12 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all font-body text-lg shadow-sm" 
              placeholder="搜尋股票、指數、ETF" 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-5 flex items-center text-outline hover:text-on-surface transition-colors"
                aria-label="清除搜尋"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold font-headline text-on-surface">
              {searchQuery.trim() !== '' ? '搜尋結果' : '熱門市場'}
            </h2>
            {!searchQuery && <span className="text-sm font-label text-primary font-semibold tracking-wider uppercase">即時動態</span>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayStocks.length > 0 ? (
              displayStocks.map((stock) => (
                <div 
                  key={stock.symbol}
                  className="bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors duration-300 group cursor-pointer border border-outline-variant/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary font-bold">
                        {stock.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold font-headline">{stock.symbol}</p>
                        <p className="text-xs text-outline font-label uppercase tracking-widest">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold font-headline text-lg">${stock.price.toLocaleString()}</p>
                      <p className={cn(
                        "text-xs font-semibold flex items-center justify-end gap-1",
                        stock.change >= 0 ? "text-tertiary" : "text-error"
                      )}>
                        {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "h-12 w-full mt-4 rounded relative overflow-hidden",
                    stock.change >= 0 ? "bg-tertiary/5" : "bg-error/5"
                  )}>
                    <div className="absolute inset-0 flex items-end">
                      <svg className={cn("w-full h-8", stock.change >= 0 ? "text-tertiary/40" : "text-error/40")} preserveAspectRatio="none" viewBox="0 0 100 20">
                        <path 
                          d={stock.change >= 0 
                            ? "M0 20 L10 15 L20 18 L30 10 L40 12 L50 5 L60 8 L70 2 L80 6 L90 4 L100 0 V20 H0 Z"
                            : "M0 0 L10 5 L20 3 L30 12 L40 10 L50 15 L60 12 L70 18 L80 14 L90 16 L100 20 V20 H0 Z"
                          } 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 py-12 text-center text-on-surface-variant">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>找不到符合 "{searchQuery}" 的結果</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-surface-container-low rounded-2xl overflow-hidden relative border border-outline-variant/10">
          <div className="absolute inset-0 opacity-20">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8nOR2QlNCrl1NYDsUr1GrlO2LbTRb_BNHdrie6Qd4X9uehBmiDssNCEHAJnIlAqoS0H510tzS6zMfQDc1KVmAHXsWepDw2u_qhcGKikPRESLdwf7JwVc8IrcVgng9kKtpQp5it2S_YiyJxAzMwCSNcfpNwG3a28sGHVOc-vHvkEk617PRbZtK8zqRF44vMhlagrLchFT68dyhevoveQnbQAc24puFAqijM9ZhTtNqdcq4UEyoxYeQfj1U3t7OfUbA2mxxqJWZ7M" 
              alt="Market Sentiment"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold font-headline mb-2">市場情緒</h3>
              <p className="text-sm text-on-surface-variant max-w-sm">Institutional capital is flowing heavily into AI infrastructure and Renewable Energy this quarter.</p>
            </div>
            <button className="bg-surface-container-high text-primary font-semibold px-6 py-3 rounded-full hover:bg-surface-bright transition-all active:scale-95">查看分析</button>
          </div>
        </section>
      </div>

      {/* Right Column - Trading Widget */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-6">
          <div className="bg-surface-container p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-extrabold font-headline tracking-tight">交易 NVIDIA</h3>
                <div className="bg-surface-container-high px-3 py-1 rounded-lg text-xs font-label text-outline">NVDA</div>
              </div>
              
              <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
                <button className="flex-1 py-3 rounded-full text-sm font-bold bg-primary text-on-primary transition-all">買入</button>
                <button className="flex-1 py-3 rounded-full text-sm font-bold text-outline hover:text-on-surface transition-all">賣出</button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-outline">訂單類型</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-5 text-on-surface appearance-none focus:ring-1 focus:ring-primary/50">
                      <option>市價單</option>
                      <option>限價單</option>
                      <option>止損單</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-label uppercase tracking-widest text-outline">購買數量</label>
                    <button className="text-[10px] font-label text-primary font-bold uppercase">以金額買入</button>
                  </div>
                  <input 
                    className="w-full bg-surface-container-highest border-none rounded-xl py-6 text-center text-4xl font-headline font-extrabold text-on-surface focus:ring-0 placeholder:text-surface-variant" 
                    placeholder="0.00" 
                    type="number"
                  />
                </div>

                <div className="pt-4 space-y-3 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-outline">預估價格</span>
                    <span className="font-bold">$924.12</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-outline">總成本</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl flex items-center gap-3">
                  <Wallet className="text-primary" size={20} />
                  <div>
                    <p className="text-[10px] font-label text-outline uppercase tracking-wider">購買力</p>
                    <p className="text-sm font-bold text-on-surface">$12,450.88</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-headline text-lg shadow-lg active:scale-95 transition-all hover:brightness-110">
              預覽訂單
            </button>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl flex items-center justify-between border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
              <span className="text-sm font-medium">市場交易中</span>
            </div>
            <span className="text-xs text-outline font-label">距收盤 4小時 12分</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
