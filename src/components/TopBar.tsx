import React from 'react';
import { Bell } from 'lucide-react';
import { View } from '../types';
import { cn } from '../lib/utils';

interface TopBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        <div 
          onClick={() => onViewChange('profile')}
          className="w-10 h-10 rounded-full bg-surface-container overflow-hidden active:scale-95 transition-transform cursor-pointer hover:ring-2 hover:ring-primary md:hidden"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfaAEGb7kgZfg79a4qLL9DuLIHucxOQD_6Xu22rq8OxeRQtDt9G1pNTJQi_tj-Pz0vFyae8Fo8wGz_QV35q0bxYePfo984CiylhNzn7U1y1eQuRuRA3rnSpNgq36nEzQ7OCKXfwWkikuaKtuJd6LT14rJsQwBzeY-Ue7O7fvrMHdv1BSe4rw16iKYzys1S-lPtriL5DlIW6jPizzvkUUILgSMY3NaVRhhiKHAi8I4zYDd6XLfB-Io_CVz_T11rpQrNWa_QaqOMA_8"
            alt="User profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 
          className="text-xl font-bold tracking-tight text-primary font-headline cursor-pointer"
          onClick={() => onViewChange('home')}
        >
          The Ledger
        </h1>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        <button 
          onClick={() => onViewChange('home')}
          className={cn(
            "font-bold text-sm transition-colors duration-200 px-3 py-1 rounded-lg",
            currentView === 'home' || currentView === 'stock-detail' ? "text-primary bg-primary/10" : "text-outline hover:bg-surface-container-high hover:text-on-surface"
          )}
        >
          首頁
        </button>
        <button 
          onClick={() => onViewChange('search')}
          className={cn(
            "font-bold text-sm transition-colors duration-200 px-3 py-1 rounded-lg",
            currentView === 'search' ? "text-primary bg-primary/10" : "text-outline hover:bg-surface-container-high hover:text-on-surface"
          )}
        >
          搜尋
        </button>
        <button 
          onClick={() => onViewChange('portfolio')}
          className={cn(
            "font-bold text-sm transition-colors duration-200 px-3 py-1 rounded-lg",
            currentView === 'portfolio' ? "text-primary bg-primary/10" : "text-outline hover:bg-surface-container-high hover:text-on-surface"
          )}
        >
          投資組合
        </button>
        <div className="h-4 w-px bg-outline-variant/30 mx-2"></div>
        <div 
          onClick={() => onViewChange('profile')}
          className="w-8 h-8 rounded-full bg-surface-container overflow-hidden active:scale-95 transition-transform cursor-pointer hover:ring-2 hover:ring-primary"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfaAEGb7kgZfg79a4qLL9DuLIHucxOQD_6Xu22rq8OxeRQtDt9G1pNTJQi_tj-Pz0vFyae8Fo8wGz_QV35q0bxYePfo984CiylhNzn7U1y1eQuRuRA3rnSpNgq36nEzQ7OCKXfwWkikuaKtuJd6LT14rJsQwBzeY-Ue7O7fvrMHdv1BSe4rw16iKYzys1S-lPtriL5DlIW6jPizzvkUUILgSMY3NaVRhhiKHAi8I4zYDd6XLfB-Io_CVz_T11rpQrNWa_QaqOMA_8"
            alt="User profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </nav>
      
      <button className="md:hidden text-primary p-2 hover:bg-surface-container-high transition-colors duration-200 rounded-full active:scale-95">
        <Bell size={20} />
      </button>
    </header>
  );
};
