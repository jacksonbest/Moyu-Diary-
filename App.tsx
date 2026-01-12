import React, { useState, useEffect } from 'react';
import { UserSettings, MoyuLog, LogType } from './types';
import { DEFAULT_SETTINGS, WORKING_DAYS_PER_MONTH } from './constants';
import * as storage from './services/storageService';
import { generateWittyComment } from './services/geminiService';

import NavBar from './components/NavBar';
import MoneyTicker from './components/MoneyTicker';
import CountdownCards from './components/CountdownCards';
import ActionGrid from './components/ActionGrid';
import LogHistory from './components/LogHistory';
import SettingsView from './components/Settings';
import AuthScreen from './components/AuthScreen';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => storage.getCurrentUser());
  const [currentTab, setCurrentTab] = useState<'home' | 'history' | 'settings'>('home');
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [logs, setLogs] = useState<MoyuLog[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Load user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setSettings(storage.getSettings(currentUser));
      setLogs(storage.getLogs(currentUser));
    }
  }, [currentUser]);

  const handleLogin = (username: string) => {
    storage.setCurrentUser(username);
    setCurrentUser(username);
    setCurrentTab('home');
  };

  const handleLogout = () => {
    storage.logoutUser();
    setCurrentUser(null);
    setLogs([]);
    setSettings(DEFAULT_SETTINGS);
  };

  // Helper to calculate instant money earned
  const calculateInstantMoney = (userSettings: UserSettings) => {
      const now = new Date();
      const [startHour, startMinute] = userSettings.workStartTime.split(':').map(Number);
      const [endHour, endMinute] = userSettings.workEndTime.split(':').map(Number);

      const startTime = new Date(now);
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(now);
      endTime.setHours(endHour, endMinute, 0, 0);

      const totalWorkSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
      if (totalWorkSeconds <= 0) return 0;

      const salaryPerSecond = userSettings.salary / WORKING_DAYS_PER_MONTH / totalWorkSeconds;

      if (now < startTime) return 0;
      if (now > endTime) return userSettings.salary / WORKING_DAYS_PER_MONTH;

      const secondsWorked = (now.getTime() - startTime.getTime()) / 1000;
      return secondsWorked * salaryPerSecond;
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    if (!currentUser) return;
    setSettings(newSettings);
    storage.saveSettings(currentUser, newSettings);
  };

  const handleLogAction = async (type: LogType, label: string) => {
    if (!currentUser) return;
    setIsLoadingAi(true);
    
    const moneyEarned = calculateInstantMoney(settings);
    
    let comment = "";
    try {
        comment = await generateWittyComment(label, settings);
    } catch (e) {
        comment = "享受这一刻！";
    }

    const newLog: MoyuLog = {
      id: Date.now().toString(),
      type,
      timestamp: Date.now(),
      note: label,
      aiComment: comment,
      moneyEarnedAtTime: moneyEarned
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    storage.saveLog(currentUser, newLog);
    setIsLoadingAi(false);
  };

  const handleClearLogs = () => {
      if (!currentUser) return;
      if(confirm('确定要清空所有摸鱼记录吗？')) {
          setLogs([]);
          storage.clearLogs(currentUser);
      }
  }

  // If not logged in, show Auth Screen
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-rose-50/30 text-slate-800 font-sans pb-20 max-w-md mx-auto relative shadow-2xl shadow-gray-200/50">
      
      {/* Header */}
      <header className="pt-12 pb-4 px-6 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">🐟</span> 
            <span>摸鱼日记</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">今天也要努力(摸鱼)鸭~</p>
      </header>

      {/* Main Content Area */}
      <main className="px-5 py-4 min-h-[80vh]">
        {currentTab === 'home' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <MoneyTicker settings={settings} />
            <CountdownCards settings={settings} />
            <ActionGrid onLog={handleLogAction} isLoading={isLoadingAi} />
            
            {/* Recent Log Teaser */}
            {logs.length > 0 && (
                <div className="mt-6">
                    <div className="flex justify-between items-end mb-2 px-1">
                        <h4 className="text-sm font-bold text-gray-600">最近动态</h4>
                        <button onClick={() => setCurrentTab('history')} className="text-xs text-moyu-400">查看全部 &rarr;</button>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 opacity-80">
                         <span className="text-xl">{logs[0].type === 'water' ? '🥤' : logs[0].type === 'toilet' ? '🚽' : '🐟'}</span>
                         <div className="flex-1 overflow-hidden">
                             <div className="text-xs font-bold text-gray-700 truncate">{logs[0].note}</div>
                             <div className="text-[10px] text-gray-400 truncate">{logs[0].aiComment}</div>
                         </div>
                         <span className="text-[10px] text-gray-300">{new Date(logs[0].timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                </div>
            )}
          </div>
        )}

        {currentTab === 'history' && (
          <LogHistory logs={logs} onClear={handleClearLogs} />
        )}

        {currentTab === 'settings' && (
          <SettingsView 
            settings={settings} 
            username={currentUser}
            onSave={handleSaveSettings} 
            onLogout={handleLogout}
          />
        )}
      </main>

      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;
