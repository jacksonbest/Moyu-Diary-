import { GoogleGenAI } from "@google/genai";
import { UserSettings } from "../types";

// Helper to determine the Base URL.
const getClient = (settings: UserSettings) => {
    // Standard config with API Key
    const options: any = { apiKey: process.env.API_KEY };
    
    // If the user has configured a custom API URL (e.g. Cloudflare Worker proxy), use it.
    // This allows usage in China without VPN if the user has a proxy.
    if (settings.customApiUrl && settings.customApiUrl.trim() !== '') {
        options.baseUrl = settings.customApiUrl;
    }
    
    return new GoogleGenAI(options);
};

export const generateWittyComment = async (action: string, settings: UserSettings): Promise<string> => {
  // If we have a custom URL, we might not strictly need the env API_KEY if the proxy handles auth, 
  // but for compatibility we check existence or allow flow if customUrl is set.
  if (!process.env.API_KEY && !settings.customApiUrl) {
    return "记得休息一下哦！(API Key missing)";
  }

  try {
    const ai = getClient(settings);
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a witty, supportive, and slightly sarcastic workplace companion for a young woman. 
      The user just logged this action: "${action}". 
      Write a very short (max 20 words), funny, or encouraging comment in Chinese. 
      Examples: 
      - If "drinking water": "多喝水皮肤好，让老板羡慕去吧！"
      - If "toilet": "带薪拉屎是职场最高礼遇。"
      - If "spacing out": "发呆是给大脑充电，不是偷懒。"
      Keep it lighthearted.`,
    });

    return response.text?.trim() || "摸鱼快乐！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback messages if offline or blocked
    const fallbacks = [
        "休息是为了走更远的路！",
        "今天也很棒！",
        "工资正在入账中...",
        "老板看不见的时候就是在赚钱。",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};