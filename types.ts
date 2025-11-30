import { LiveServerMessage, Modality } from "@google/genai";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: string;
  imageUrl: string;
  website: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  content: string;
  source: string;
  date: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export enum AppView {
  HOME = 'HOME',
  LIVE_CHAT = 'LIVE_CHAT',
  VEO_STUDIO = 'VEO_STUDIO',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  SMART_CHAT = 'SMART_CHAT',
  AUDIO_LAB = 'AUDIO_LAB',
  LATEST_NEWS = 'LATEST_NEWS',
  ADMIN = 'ADMIN',
  PAGES = 'PAGES',
  PRICING = 'PRICING',
  PAYMENT = 'PAYMENT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  groundingUrls?: Array<{ uri: string; title: string }>;
}

export interface Slide {
  title: string;
  content: string[];
}

// Global window extension for AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    webkitAudioContext: typeof AudioContext;
    aistudio?: AIStudio;
  }
}