import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { PortfolioView } from './components/PortfolioView';
import { StockDetailView } from './components/StockDetailView';
import { View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onStockClick={() => setCurrentView('stock-detail')} />;
      case 'search':
        return <SearchView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'stock-detail':
        return <StockDetailView />;
      case 'profile':
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-on-surface-variant">個人檔案頁面建設中...</p>
          </div>
        );
      default:
        return <HomeView onStockClick={() => setCurrentView('stock-detail')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30">
      <TopBar currentView={currentView} onViewChange={setCurrentView} />
      <main className="pb-24 pt-4 md:pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}
