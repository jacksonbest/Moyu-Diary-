export interface UserSettings {
  salary: number; // Monthly salary
  payday: number; // Day of month (1-31)
  workStartTime: string; // HH:mm, e.g., "09:00"
  workEndTime: string; // HH:mm, e.g., "18:00"
  nextHolidayDate: string; // YYYY-MM-DD
  nextHolidayName: string; // e.g., "National Day"
  currencySymbol: string;
  customApiUrl?: string; // For proxying Gemini in China
}

export type LogType = 'water' | 'toilet' | 'walk' | 'chat' | 'other';

export interface MoyuLog {
  id: string;
  type: LogType;
  timestamp: number;
  note?: string;
  aiComment?: string;
  moneyEarnedAtTime?: number; // How much money you had "earned" when you did this
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  logs: MoyuLog[];
}
