import React from 'react';
import { UserSettings } from '../types';
import { CalendarClock, Palmtree } from 'lucide-react';

interface CountdownCardsProps {
  settings: UserSettings;
}

const CountdownCards: React.FC<CountdownCardsProps> = ({ settings }) => {
  const getDaysUntilPayday = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const payday = settings.payday;
    
    if (currentDay === payday) return 0;
    
    if (currentDay < payday) {
      return payday - currentDay;
    } else {
      // Next month
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, payday);
      const diffTime = Math.abs(nextMonth.getTime() - today.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }
  };

  const getDaysUntilHoliday = () => {
    const today = new Date();
    // Reset time to avoid off-by-one errors due to current time
    today.setHours(0,0,0,0);
    
    const target = new Date(settings.nextHolidayDate);
    target.setHours(0,0,0,0);

    if (target.getTime() <= today.getTime()) return 0;

    const diffTime = Math.abs(target.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const paydayCount = getDaysUntilPayday();
  const holidayCount = getDaysUntilHoliday();

  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {/* Payday Card */}
      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl shadow-sm border border-blue-100 flex flex-col justify-between h-32 relative overflow-hidden">
        <div className="absolute right-2 top-2 opacity-10">
            <CalendarClock size={64} className="text-blue-500" />
        </div>
        <div className="text-blue-800 font-medium text-sm flex items-center gap-1">
            <span className="bg-blue-100 p-1 rounded-md"><CalendarClock size={14} /></span>
            距离发工资
        </div>
        <div>
            <span className="text-3xl font-bold text-blue-600">{paydayCount}</span>
            <span className="text-sm text-blue-400 ml-1">天</span>
        </div>
        <div className="text-xs text-blue-400">坚持就是胜利！</div>
      </div>

      {/* Holiday Card */}
      <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-2xl shadow-sm border border-orange-100 flex flex-col justify-between h-32 relative overflow-hidden">
        <div className="absolute right-2 top-2 opacity-10">
            <Palmtree size={64} className="text-orange-500" />
        </div>
        <div className="text-orange-800 font-medium text-sm flex items-center gap-1">
             <span className="bg-orange-100 p-1 rounded-md"><Palmtree size={14} /></span>
             距离{settings.nextHolidayName}
        </div>
        <div>
            <span className="text-3xl font-bold text-orange-500">{holidayCount}</span>
            <span className="text-sm text-orange-400 ml-1">天</span>
        </div>
        <div className="text-xs text-orange-400">诗和远方在等你</div>
      </div>
    </div>
  );
};

export default CountdownCards;
