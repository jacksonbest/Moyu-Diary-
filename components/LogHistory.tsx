import React from 'react';
import { MoyuLog } from '../types';
import { LOG_TYPES } from '../constants';
import { Trash2 } from 'lucide-react';

interface LogHistoryProps {
  logs: MoyuLog[];
  onClear: () => void;
}

const LogHistory: React.FC<LogHistoryProps> = ({ logs, onClear }) => {
  
  const getIcon = (type: string) => LOG_TYPES.find(t => t.id === type)?.icon || '📝';
  const getLabel = (type: string) => LOG_TYPES.find(t => t.id === type)?.label || '记录';
  const getColor = (type: string) => LOG_TYPES.find(t => t.id === type)?.color || 'bg-gray-100 text-gray-600';

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: number) => {
      return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short'});
  }

  // Group logs by date
  const groupedLogs = logs.reduce((acc, log) => {
    const dateKey = formatDate(log.timestamp);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(log);
    return acc;
  }, {} as Record<string, MoyuLog[]>);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <div className="text-6xl mb-4 grayscale opacity-30">🐟</div>
        <p>还没有摸鱼记录哦</p>
        <p className="text-xs mt-2">快去首页打卡吧</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-6 px-2">
         <h2 className="text-xl font-bold text-gray-800">摸鱼日记</h2>
         <button onClick={onClear} className="text-xs text-red-400 flex items-center gap-1 hover:text-red-500">
            <Trash2 size={12} /> 清空记录
         </button>
      </div>

      {Object.entries(groupedLogs).map(([date, dayLogs]: [string, MoyuLog[]]) => (
        <div key={date} className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{date}</h3>
          <div className="space-y-3">
            {dayLogs.map((log) => (
              <div key={log.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${getColor(log.type)}`}>
                  {getIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-800">{getLabel(log.type)}</h4>
                    <span className="text-xs text-gray-400 font-mono">{formatTime(log.timestamp)}</span>
                  </div>
                  {log.aiComment && (
                    <div className="mt-2 text-sm text-gray-600 bg-moyu-50 p-2 rounded-lg italic">
                      "{log.aiComment}"
                    </div>
                  )}
                  {log.moneyEarnedAtTime && log.moneyEarnedAtTime > 0 && (
                      <div className="mt-1 text-[10px] text-green-600">
                          当时的摸鱼工资: ¥{log.moneyEarnedAtTime.toFixed(4)}
                      </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogHistory;