// スピリッツ・リキュール
export interface Spirit {
  id: string;
  name: string;
  nameEn: string;
  category: 'gin' | 'vodka' | 'rum' | 'tequila' | 'whisky' | 'brandy';
  origin: string;
  ingredients: string;
  method: string;
  alcoholRange: string;
  brands: string[];
  cocktails: string[];
  color: string; // テーマカラー（hex）
  emoji: string;
  description: string;
  imageUrl?: string;
}

export interface Liqueur {
  id: string;
  name: string;
  nameEn: string;
  category: 'herbal' | 'fruit' | 'nut' | 'cream';
  flavor: string;
  alcoholPercent: number;
  color: string;
  description: string;
  imageUrl?: string;
}

// カクテルレシピ
export interface CocktailRecipe {
  id: string;
  name: string;
  nameEn: string;
  base: string; // ベーススピリッツ
  baseCategory: 'gin' | 'vodka' | 'rum' | 'tequila' | 'whisky' | 'brandy' | 'liqueur' | 'wine' | 'other';
  ingredients: { name: string; amount: string }[];
  technique: 'build' | 'stir' | 'shake' | 'blend';
  glass: string;
  garnish: string;
  taste: 'sweet' | 'dry' | 'sour' | 'bitter' | 'balanced';
  strength: 'light' | 'medium' | 'strong';
  timing: 'aperitif' | 'digestif' | 'allday';
  color: string; // カクテルの見た目の色（hex）
  description: string;
  imageUrl?: string;
  ibaCategory?: 'unforgettable' | 'contemporary' | 'newera';
  history?: string;      // カクテルの歴史・誕生エピソード
  flavorProfile?: string; // 詳しい味わいの説明
  servingTip?: string;   // 提供時に添えると面白い豆知識
}

// バーツール
export interface BarTool {
  id: string;
  name: string;
  nameEn: string;
  usage: string;
  emoji: string;
  imageUrl?: string;
}

// グラス
export interface GlassType {
  id: string;
  name: string;
  nameEn: string;
  capacity: string;
  usage: string;
  emoji: string;
  imageUrl?: string;
}

// 技法
export interface Technique {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  steps: string[];
  bestFor: string;
  examples: string[];
  emoji: string;
}

// クイズ
export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// フラッシュカード
export interface FlashCard {
  id: string;
  category: string;
  front: string;
  back: string;
}

// 飲料分類
export interface BeverageNode {
  name: string;
  nameEn?: string;
  children?: BeverageNode[];
  color?: string;
}

// 学習進捗
export interface StudyProgress {
  quizScores: Record<string, { correct: number; total: number; lastDate: string }>;
  flashcardsReviewed: string[];
  encyclopediaViewed: string[];
}
