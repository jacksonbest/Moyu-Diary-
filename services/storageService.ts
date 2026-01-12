import { MoyuLog, UserSettings } from "../types";
import { DEFAULT_SETTINGS } from "../constants";

const SETTINGS_KEY_SUFFIX = '_settings';
const LOGS_KEY_SUFFIX = '_logs';
const CURRENT_USER_KEY = 'moyu_current_user_id';

// Helper to generate keys based on current user
const getKey = (userId: string, suffix: string) => `moyu_${userId}${suffix}`;

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

export const setCurrentUser = (userId: string) => {
  localStorage.setItem(CURRENT_USER_KEY, userId);
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const saveSettings = (userId: string, settings: UserSettings) => {
  localStorage.setItem(getKey(userId, SETTINGS_KEY_SUFFIX), JSON.stringify(settings));
};

export const getSettings = (userId: string): UserSettings => {
  const saved = localStorage.getItem(getKey(userId, SETTINGS_KEY_SUFFIX));
  return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
};

export const saveLog = (userId: string, log: MoyuLog) => {
  const logs = getLogs(userId);
  logs.unshift(log); // Add to top
  localStorage.setItem(getKey(userId, LOGS_KEY_SUFFIX), JSON.stringify(logs));
};

export const getLogs = (userId: string): MoyuLog[] => {
  const saved = localStorage.getItem(getKey(userId, LOGS_KEY_SUFFIX));
  return saved ? JSON.parse(saved) : [];
};

export const clearLogs = (userId: string) => {
  localStorage.removeItem(getKey(userId, LOGS_KEY_SUFFIX));
};
