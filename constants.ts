import { UserSettings } from './types';

export const DEFAULT_SETTINGS: UserSettings = {
  salary: 10000,
  payday: 15,
  workStartTime: "09:00",
  workEndTime: "18:00",
  nextHolidayDate: new Date(new Date().getFullYear(), 11, 25).toISOString().split('T')[0], // Default placeholder
  nextHolidayName: "假期",
  currencySymbol: "¥",
  customApiUrl: ""
};

export const LOG_TYPES: { id: string; label: string; icon: string; color: string }[] = [
  { id: 'water', label: '喝水', icon: '🥤', color: 'bg-blue-100 text-blue-600' },
  { id: 'toilet', label: '带薪拉屎', icon: '🚽', color: 'bg-orange-100 text-orange-600' },
  { id: 'walk', label: '起来走走', icon: '🚶‍♀️', color: 'bg-green-100 text-green-600' },
  { id: 'chat', label: '八卦一下', icon: '💬', color: 'bg-purple-100 text-purple-600' },
  { id: 'other', label: '发呆', icon: '🐟', color: 'bg-gray-100 text-gray-600' },
];

// Average working days per month in China
export const WORKING_DAYS_PER_MONTH = 21.75;
