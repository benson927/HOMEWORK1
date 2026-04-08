import React from 'react';
import { Home, Search, Wallet, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { View } from '@/src/types';

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'search', label: '搜尋', icon: Search },
    { id: 'portfolio', label: '投資組合', icon: Wallet },
    { id: 'profile', label: '個人檔案', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 glass-nav shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id || (currentView === 'stock-detail' && item.id === 'home');
        
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "flex flex-col items-center justify-center transition-all active:scale-90 duration-150 px-4 py-1 rounded-xl",
              isActive ? "text-primary bg-primary/10" : "text-outline opacity-60 hover:text-primary"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
