// ゲーム専用型定義

export type GameActionType =
  | 'openShelf'
  | 'pickItem'
  | 'moveToCounter'
  | 'selectGlass'
  | 'addIce'
  | 'addIngredient'
  | 'selectTool'
  | 'performTechnique'
  | 'pourToGlass'
  | 'topUp'
  | 'garnish'
  | 'serve';

export type ShelfArea = 'liquorShelf' | 'fridge' | 'glassShelf' | 'toolShelf';
export type GameArea = ShelfArea | 'counter';
export type GameMode = 'select' | 'random';
export type TechniqueType = 'build' | 'stir' | 'shake' | 'blend';
export type ContainerId = 'glass' | 'mixingGlass' | 'shaker' | 'blender';

// コンテナ（グラス・シェーカー等）の中身状態
export interface ContainerState {
  ingredients: string[];
  hasIce: boolean;
  technique: TechniqueType | null;
}

export type GameRank = 'perfect' | 'excellent' | 'good' | 'retry';

export interface IngredientMaster {
  id: string;
  label: string;
  labelEn?: string;
  categoryId: 'spirit' | 'liqueur' | 'juice' | 'mixer' | 'syrup' | 'other' | 'garnish' | 'ice';
  shelfArea: ShelfArea;
  color: string;       // ボトル/アイテムの色
  isAlcohol: boolean;
  aliases: string[];    // 表記ゆれ吸収
  description?: string; // 棚で表示する説明文
}

// 調理チェックポイント（条件ベース採点）
export interface RecipeCheckpoint {
  id: string;
  type: 'glass' | 'ingredient' | 'topUp' | 'ice' | 'technique' | 'pourToGlass' | 'garnish';
  label: string;        // 表示/ヒント用
  points: number;       // ポイント
  ingredientId?: string;
  containerId?: ContainerId;
  technique?: TechniqueType;
  glassId?: string;
  garnishId?: string;
}

export interface CheckpointResult {
  checkpoint: RecipeCheckpoint;
  passed: boolean;
}

export interface GameRecipe {
  id: string;
  cocktailId: string;
  allowedModes: GameMode[];
  primaryTechnique: TechniqueType;
  requiredGlassId: string;
  checkpoints: RecipeCheckpoint[];
}

export interface GameActionLog {
  actionType: GameActionType;
  targetId?: string;
  toolId?: string;
  amount?: string;
  fromArea?: GameArea;
  toArea?: ContainerId | 'counter';
  timestamp: number;
}

// カウンター上のアイテム状態
export type CounterItemStatus = 'unused' | 'inUse' | 'used';

export interface CounterItem {
  itemId: string;
  itemType: 'ingredient' | 'glass' | 'tool';
  status: CounterItemStatus;
}

// 採点結果
export interface ScoreResult {
  totalScore: number;
  maxScore: number;
  rank: GameRank;
  checkpointResults: CheckpointResult[];
  playerActions: GameActionLog[];
}

// LocalStorage 用
export interface GameProgress {
  playHistory: {
    cocktailId: string;
    mode: GameMode;
    score: number;
    rank: GameRank;
    date: string;
  }[];
  bestScores: Record<string, { score: number; rank: GameRank }>;
  totalPlays: number;
  consecutiveCorrect: number;
}

// ゲームモード設定
export interface GameModeConfig {
  id: GameMode;
  label: string;
  labelEn: string;
  description: string;
  showHints: boolean;
}
