import React, { useState } from 'react';
import { UserSettings } from '../types';
import { Save, LogOut, User } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  username: string;
  onSave: (settings: UserSettings) => void;
  onLogout: () => void;
}

const SettingsView: React.FC<SettingsProps> = ({ settings, username, onSave, onLogout }) => {
  const [formData, setFormData] = useState<UserSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' || name === 'payday' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">设置</h2>
      
      {/* User Profile Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                 <User size={24} />
             </div>
             <div>
                 <div className="text-xs text-gray-400">当前账号</div>
                 <div className="font-bold text-gray-800 text-lg">{username}</div>
             </div>
         </div>
         <button 
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
            title="退出登录"
         >
             <LogOut size={20} />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Salary Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 text-sm">💰 薪资设定</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">月薪 (税前)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">发薪日 (每月几号)</label>
              <input
                type="number"
                name="payday"
                min="1"
                max="31"
                value={formData.payday}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Work Time Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 text-sm">⏰ 工作时间</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">上班时间</label>
              <input
                type="time"
                name="workStartTime"
                value={formData.workStartTime}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">下班时间</label>
              <input
                type="time"
                name="workEndTime"
                value={formData.workEndTime}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Holiday Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 text-sm">🏖️ 假期目标</h3>
          <div className="space-y-4">
             <div>
              <label className="block text-xs text-gray-500 mb-1">下一个假期名称</label>
              <input
                type="text"
                name="nextHolidayName"
                value={formData.nextHolidayName}
                onChange={handleChange}
                placeholder="例如: 国庆节"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">假期日期</label>
              <input
                type="date"
                name="nextHolidayDate"
                value={formData.nextHolidayDate}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Advanced Section */}
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4 text-sm">🛠️ 高级</h3>
          <div>
              <label className="block text-xs text-gray-500 mb-1">Gemini API 代理地址 (选填)</label>
              <input
                type="text"
                name="customApiUrl"
                value={formData.customApiUrl || ''}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-moyu-200 outline-none"
              />
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-moyu-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-moyu-200 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {isSaved ? '保存成功!' : '保存设置'}
        </button>
      </form>
    </div>
  );
};

export default SettingsView;
