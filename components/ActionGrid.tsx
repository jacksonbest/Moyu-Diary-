import React from 'react';
import { LOG_TYPES } from '../constants';
import { LogType } from '../types';

interface ActionGridProps {
  onLog: (type: LogType, label: string) => void;
  isLoading: boolean;
}

const ActionGrid: React.FC<ActionGridProps> = ({ onLog, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-moyu-400 rounded-full"></span>
        摸鱼打卡
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {LOG_TYPES.map((item) => (
          <button
            key={item.id}
            disabled={isLoading}
            onClick={() => onLog(item.id as LogType, item.label)}
            className={`flex flex-col items-center justify-center gap-2 group transition-transform active:scale-95 ${isLoading ? 'opacity-50' : ''}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${item.color} group-hover:brightness-95 transition-all`}>
              {item.icon}
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionGrid;
