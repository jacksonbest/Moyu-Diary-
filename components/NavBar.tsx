import React from 'react';
import { Home, Calendar, Settings } from 'lucide-react';

interface NavBarProps {
  currentTab: 'home' | 'history' | 'settings';
  onTabChange: (tab: 'home' | 'history' | 'settings') => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentTab, onTabChange }) => {
  const getButtonClass = (tab: string) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      currentTab === tab ? 'text-moyu-500' : 'text-gray-400 hover:text-moyu-300'
    }`;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-safe">
      <div className="grid grid-cols-3 h-full max-w-md mx-auto">
        <button onClick={() => onTabChange('home')} className={getButtonClass('home')}>
          <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">首页</span>
        </button>
        <button onClick={() => onTabChange('history')} className={getButtonClass('history')}>
          <Calendar size={24} strokeWidth={currentTab === 'history' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">记录</span>
        </button>
        <button onClick={() => onTabChange('settings')} className={getButtonClass('settings')}>
          <Settings size={24} strokeWidth={currentTab === 'settings' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">设置</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
