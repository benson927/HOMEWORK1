import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Search, Filter, ListFilter, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { fetchPortfolio } from '../lib/api';

const COLORS = ['#b6c4ff', '#78dc77', '#b4cad6', '#00267e', '#ffb4ab', '#ffc107', '#9c27b0'];

export const PortfolioView: React.FC = () => {
  const [holdings, setHoldings] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPortfolio();
      setHoldings(data);
    }
    loadData();
  }, []);

  const totalValue = holdings.reduce((sum, item) => sum + item.value, 0);
  const invested = holdings.reduce((sum, item) => sum + (item.shares * (item.average_price || item.price)), 0) || 130130.42; // Fallback to mock invested if average_price not fully populated
  const totalReturn = totalValue - invested;
  const returnPercent = totalValue > 0 ? (totalReturn / invested) * 100 : 0;

  // Generate allocation data dynamically based on holdings
  const allocationData = holdings.map((h, i) => ({
    name: h.name || h.symbol,
    value: Number(((h.value / totalValue) * 100).toFixed(1)),
    color: COLORS[i % COLORS.length]
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto px-6 py-8 pb-32 space-y-12"
    >
      {/* Portfolio Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-surface-container-low flex flex-col justify-between relative overflow-hidden group border border-outline-variant/10">
          <div className="relative z-10">
            <span className="text-xs font-inter uppercase tracking-widest text-on-surface-variant opacity-70">投資組合總值</span>
            <h2 className="text-5xl md:text-7xl font-extrabold font-headline mt-2 tracking-tight text-on-surface">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center mt-6 gap-4">
              <div className="bg-tertiary/10 px-4 py-2 rounded-full border border-tertiary/10 flex items-center gap-2">
                <TrendingUp size={16} className="text-tertiary" />
                <span className="text-tertiary font-bold font-inter text-sm">
                  {totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({returnPercent.toFixed(1)}%)
                </span>
              </div>
              <span className="text-on-surface-variant text-sm font-inter">累計總報酬</span>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 editorial-gradient opacity-10 blur-3xl rounded-full"></div>
        </div>
        
        <div className="p-8 rounded-2xl bg-surface-container flex flex-col justify-center border border-outline-variant/10">
          <span className="text-xs font-inter uppercase tracking-widest text-on-surface-variant opacity-70">已投資金額</span>
          <div className="text-3xl font-bold font-headline mt-2 text-on-surface">${invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <span className="text-xs font-inter uppercase tracking-widest text-on-surface-variant opacity-70">可用購買力</span>
            <div className="text-xl font-bold font-headline mt-1 text-primary">$4,205.15</div>
          </div>
        </div>
      </section>

      {/* Insights Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Asset Allocation */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-surface-container-low flex flex-col border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-lg">資產配置</h3>
            <PieChartIcon size={20} className="text-on-surface-variant" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-label text-on-surface-variant uppercase">股票</span>
                <span className="text-xl font-bold font-headline">85%</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-inter text-on-surface-variant">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between border border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg mb-4">風險分析</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            您的投資組合 Beta 值為 1.12，波動性略高於標普 500 指數。
          </p>
          <div className="mt-4 h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[65%]"></div>
          </div>
        </div>

        {/* Performance Heatmap */}
        <div className="p-6 rounded-2xl bg-surface-container flex flex-col border border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg mb-4">本月表現</h3>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-4xl font-extrabold font-headline text-tertiary">+42.8%</div>
          </div>
          <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-widest mt-4">超越 94% 的投資者</p>
        </div>
      </section>

      {/* Holdings List Section */}
      <section className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 gap-4">
          <h3 className="font-headline font-bold text-2xl">您的持股</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <input 
                className="bg-surface-container-highest border-none text-sm rounded-xl px-10 py-2 focus:ring-1 focus:ring-primary w-full md:w-64 transition-all" 
                placeholder="搜尋持股..." 
                type="text"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-on-surface-variant" />
            </div>
            <button className="flex items-center gap-2 bg-surface-container-highest hover:bg-surface-bright px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <Filter size={16} />
              <span>篩選</span>
            </button>
            <button className="flex items-center gap-2 bg-surface-container-highest hover:bg-surface-bright px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <ListFilter size={16} />
              <span>排序</span>
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">
                <th className="py-4 font-semibold">資產</th>
                <th className="py-4 font-semibold">價格</th>
                <th className="py-4 font-semibold">漲跌</th>
                <th className="py-4 font-semibold">持倉</th>
                <th className="py-4 font-semibold text-right">總值</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {holdings.map((stock) => (
                <tr key={stock.symbol} className="group hover:bg-surface-container/50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-xs">
                        {stock.symbol}
                      </div>
                      <div>
                        <div className="font-bold font-headline">{stock.name}</div>
                        <div className="text-xs text-on-surface-variant">{stock.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 font-medium">${stock.price.toLocaleString()}</td>
                  <td className={cn("py-5 font-bold", stock.change >= 0 ? "text-tertiary" : "text-error")}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </td>
                  <td className="py-5 font-medium">{stock.shares} 股</td>
                  <td className="py-5 font-bold text-right">${stock.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 flex justify-center border-t border-outline-variant/10">
          <button className="text-sm font-bold text-primary hover:text-on-primary-container transition-colors">查看所有 18 項持股</button>
        </div>
      </section>
    </motion.div>
  );
};
