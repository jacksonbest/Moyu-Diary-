import React, { useState, useEffect } from 'react';
import { UserSettings } from '../types';
import { WORKING_DAYS_PER_MONTH } from '../constants';

interface MoneyTickerProps {
  settings: UserSettings;
}

const MoneyTicker: React.FC<MoneyTickerProps> = ({ settings }) => {
  const [currentEarned, setCurrentEarned] = useState<number>(0);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const calculateEarnings = () => {
      const now = new Date();
      const [startHour, startMinute] = settings.workStartTime.split(':').map(Number);
      const [endHour, endMinute] = settings.workEndTime.split(':').map(Number);

      const startTime = new Date(now);
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(now);
      endTime.setHours(endHour, endMinute, 0, 0);

      // Salary per second calculation
      // Monthly Salary / 21.75 days / (Work Hours * 3600)
      const totalWorkSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
      if (totalWorkSeconds <= 0) return;

      const salaryPerSecond = settings.salary / WORKING_DAYS_PER_MONTH / totalWorkSeconds;

      if (now < startTime) {
        setCurrentEarned(0);
        setIsWorking(false);
      } else if (now > endTime) {
        setCurrentEarned(settings.salary / WORKING_DAYS_PER_MONTH); // Full day earned
        setIsWorking(false);
      } else {
        const secondsWorked = (now.getTime() - startTime.getTime()) / 1000;
        setCurrentEarned(secondsWorked * salaryPerSecond);
        setIsWorking(true);
      }
    };

    calculateEarnings();
    const interval = setInterval(calculateEarnings, 100); // Update frequently for smooth visual

    return () => clearInterval(interval);
  }, [settings]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-moyu-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-moyu-100 to-transparent rounded-full opacity-50 blur-xl"></div>
        
        <h3 className="text-gray-500 text-sm mb-2 font-medium z-10">今日已到手工资</h3>
        <div className="text-4xl font-bold text-moyu-600 z-10 font-mono tracking-tight">
          {settings.currencySymbol}{currentEarned.toFixed(4)}
        </div>
        <div className="mt-2 text-xs text-moyu-400 bg-moyu-50 px-3 py-1 rounded-full z-10">
          {isWorking ? "💰 正在入账中..." : "💤 非工作时间"}
        </div>
    </div>
  );
};

export default MoneyTicker;
