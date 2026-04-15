import { useState, useCallback, useRef } from 'react';
import type {
  GameRecipe,
  GameActionLog,
  GameMode,
  CounterItem,
  ScoreResult,
  GameModeConfig,
  GameProgress,
  ShelfArea,
  ContainerId,
  ContainerState,
  TechniqueType,
} from '../types/game';
import { scoreGame } from './scoring';
import { getGameMode } from '../data/gameModes';

const STORAGE_KEY = 'cocktail-game-progress';

function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { playHistory: [], bestScores: {}, totalPlays: 0, consecutiveCorrect: 0 };
}

function saveProgress(progress: GameProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export type GameStatus = 'idle' | 'playing' | 'served' | 'scored';

const emptyContainer = (): ContainerState => ({
  ingredients: [],
  hasIce: false,
  technique: null,
});

export interface GameState {
  status: GameStatus;
  mode: GameMode;
  modeConfig: GameModeConfig;
  recipe: GameRecipe | null;
  counterItems: CounterItem[];
  actionLog: GameActionLog[];
  currentShelf: ShelfArea | null;
  selectedGlassId: string | null;
  containers: Record<ContainerId, ContainerState>;
  result: ScoreResult | null;
  animatingTechnique: string | null;
}

const initialState: GameState = {
  status: 'idle',
  mode: 'select',
  modeConfig: getGameMode('select')!,
  recipe: null,
  counterItems: [],
  actionLog: [],
  currentShelf: null,
  selectedGlassId: null,
  containers: {
    glass: emptyContainer(),
    mixingGlass: emptyContainer(),
    shaker: emptyContainer(),
    blender: emptyContainer(),
  },
  result: null,
  animatingTechnique: null,
};

// ツールIDからコンテナIDへのマッピング
function toolToContainer(toolId: string): ContainerId | null {
  switch (toolId) {
    case 'mixing-glass': return 'mixingGlass';
    case 'three-piece-shaker': return 'shaker';
    case 'blender': return 'blender';
    default: return null;
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  const logRef = useRef<GameActionLog[]>([]);

  // アクションログに追加
  const addLog = useCallback((log: Omit<GameActionLog, 'timestamp'>) => {
    const entry: GameActionLog = { ...log, timestamp: Date.now() };
    logRef.current = [...logRef.current, entry];
    setState(s => ({ ...s, actionLog: logRef.current }));
    return entry;
  }, []);

  // ゲーム開始
  const startGame = useCallback((recipe: GameRecipe, mode: GameMode) => {
    const modeConfig = getGameMode(mode)!;
    logRef.current = [];
    setState({
      ...initialState,
      status: 'playing',
      mode,
      modeConfig,
      recipe,
    });
  }, []);

  // 棚を開く
  const openShelf = useCallback((shelf: ShelfArea) => {
    addLog({ actionType: 'openShelf', fromArea: shelf });
    setState(s => ({ ...s, currentShelf: shelf }));
  }, [addLog]);

  // 棚を閉じる
  const closeShelf = useCallback(() => {
    setState(s => ({ ...s, currentShelf: null }));
  }, []);

  // アイテムをカウンターに持ち込む
  const moveToCounter = useCallback((itemId: string, itemType: CounterItem['itemType'], fromArea: ShelfArea) => {
    addLog({ actionType: 'pickItem', targetId: itemId, fromArea });
    addLog({ actionType: 'moveToCounter', targetId: itemId, fromArea, toArea: 'counter' });
    setState(s => {
      if (s.counterItems.some(ci => ci.itemId === itemId && ci.itemType === itemType)) {
        return s;
      }
      return {
        ...s,
        counterItems: [...s.counterItems, { itemId, itemType, status: 'unused' }],
      };
    });
  }, [addLog]);

  // グラス選択
  const selectGlass = useCallback((glassId: string) => {
    addLog({ actionType: 'selectGlass', targetId: glassId });
    setState(s => ({
      ...s,
      selectedGlassId: glassId,
      counterItems: s.counterItems.map(ci =>
        ci.itemId === glassId ? { ...ci, status: 'inUse' as const } : ci
      ),
    }));
  }, [addLog]);

  // 氷を入れる (コンテナ指定)
  const addIce = useCallback((containerId: ContainerId = 'glass') => {
    addLog({ actionType: 'addIce', targetId: containerId, toArea: containerId });
    setState(s => ({
      ...s,
      containers: {
        ...s.containers,
        [containerId]: { ...s.containers[containerId], hasIce: true },
      },
    }));
  }, [addLog]);

  // 材料を注ぐ (コンテナ指定)
  const addIngredient = useCallback((ingredientId: string, containerId: ContainerId = 'glass', amount?: string) => {
    addLog({
      actionType: 'addIngredient',
      targetId: ingredientId,
      amount,
      toArea: containerId,
    });
    setState(s => ({
      ...s,
      containers: {
        ...s.containers,
        [containerId]: {
          ...s.containers[containerId],
          ingredients: [...s.containers[containerId].ingredients, ingredientId],
        },
      },
      counterItems: s.counterItems.map(ci =>
        ci.itemId === ingredientId ? { ...ci, status: 'used' as const } : ci
      ),
    }));
  }, [addLog]);

  // ツール選択 (コンテナとして使用)
  const selectTool = useCallback((toolId: string) => {
    addLog({ actionType: 'selectTool', targetId: toolId });
    setState(s => ({
      ...s,
      counterItems: s.counterItems.map(ci =>
        ci.itemId === toolId ? { ...ci, status: 'inUse' as const } : ci
      ),
    }));
  }, [addLog]);

  // 技法実行 (対象コンテナに適用)
  const performTechnique = useCallback((technique: TechniqueType, containerId?: ContainerId) => {
    addLog({ actionType: 'performTechnique', targetId: technique, toArea: containerId });
    setState(s => {
      const targetContainer = containerId || 'glass';
      return {
        ...s,
        animatingTechnique: technique,
        containers: {
          ...s.containers,
          [targetContainer]: {
            ...s.containers[targetContainer],
            technique,
          },
        },
      };
    });
    setTimeout(() => {
      setState(s => ({ ...s, animatingTechnique: null }));
    }, 2000);
  }, [addLog]);

  // コンテナからグラスに注ぐ
  const pourToGlass = useCallback((fromContainerId: ContainerId) => {
    addLog({ actionType: 'pourToGlass', targetId: fromContainerId, toArea: 'glass' });
    setState(s => {
      const source = s.containers[fromContainerId];
      return {
        ...s,
        containers: {
          ...s.containers,
          glass: {
            ...s.containers.glass,
            ingredients: [...s.containers.glass.ingredients, ...source.ingredients],
            technique: source.technique || s.containers.glass.technique,
          },
          [fromContainerId]: emptyContainer(),
        },
      };
    });
  }, [addLog]);

  // 炭酸等で満たす (常にグラスへ)
  const topUp = useCallback((ingredientId: string) => {
    addLog({ actionType: 'topUp', targetId: ingredientId, toArea: 'glass' });
    setState(s => ({
      ...s,
      containers: {
        ...s.containers,
        glass: {
          ...s.containers.glass,
          ingredients: [...s.containers.glass.ingredients, ingredientId],
        },
      },
    }));
  }, [addLog]);

  // ガーニッシュ
  const addGarnish = useCallback((garnishId: string) => {
    addLog({ actionType: 'garnish', targetId: garnishId });
    setState(s => ({
      ...s,
      counterItems: s.counterItems.map(ci =>
        ci.itemId === garnishId ? { ...ci, status: 'used' as const } : ci,
      ),
    }));
  }, [addLog]);

  // 提供（ゲーム終了）
  const serve = useCallback(() => {
    addLog({ actionType: 'serve' });
    setState(s => ({ ...s, status: 'served' }));
  }, [addLog]);

  // 採点実行
  const calculateScore = useCallback((): ScoreResult | null => {
    if (!state.recipe) return null;

    const result = scoreGame(state.recipe, logRef.current, state.modeConfig);

    const progress = loadProgress();
    progress.totalPlays++;
    progress.playHistory.push({
      cocktailId: state.recipe.cocktailId,
      mode: state.mode,
      score: result.totalScore,
      rank: result.rank,
      date: new Date().toISOString(),
    });

    const key = `${state.recipe.cocktailId}-${state.mode}`;
    const prev = progress.bestScores[key];
    if (!prev || result.totalScore > prev.score) {
      progress.bestScores[key] = { score: result.totalScore, rank: result.rank };
    }

    if (result.rank === 'perfect' || result.rank === 'excellent') {
      progress.consecutiveCorrect++;
    } else {
      progress.consecutiveCorrect = 0;
    }

    saveProgress(progress);

    setState(s => ({ ...s, status: 'scored', result }));
    return result;
  }, [state.recipe, state.mode, state.modeConfig]);

  // リセット
  const resetGame = useCallback(() => {
    logRef.current = [];
    setState(initialState);
  }, []);

  // カウンターからアイテムを削除
  const removeFromCounter = useCallback((itemId: string) => {
    setState(s => ({
      ...s,
      counterItems: s.counterItems.filter(ci => ci.itemId !== itemId),
    }));
  }, []);

  // 次のヒント（未達成チェックポイントのラベルを表示）
  const getNextHint = useCallback((): string | null => {
    if (!state.recipe || !state.modeConfig.showHints) return null;

    const actions = logRef.current;

    for (const cp of state.recipe.checkpoints) {
      let passed = false;
      switch (cp.type) {
        case 'glass':
          passed = actions.some(a => a.actionType === 'selectGlass' && a.targetId === cp.glassId);
          break;
        case 'ingredient':
          passed = actions.some(a => a.actionType === 'addIngredient' && a.targetId === cp.ingredientId && a.toArea === cp.containerId);
          break;
        case 'topUp':
          passed = actions.some(a => a.actionType === 'topUp' && a.targetId === cp.ingredientId);
          break;
        case 'ice':
          passed = actions.some(a => a.actionType === 'addIce' && a.toArea === cp.containerId);
          break;
        case 'technique':
          passed = actions.some(a => a.actionType === 'performTechnique' && a.targetId === cp.technique);
          break;
        case 'pourToGlass':
          passed = actions.some(a => a.actionType === 'pourToGlass' && a.targetId === cp.containerId);
          break;
        case 'garnish':
          passed = actions.some(a => a.actionType === 'garnish' && a.targetId === cp.garnishId);
          break;
      }
      if (!passed) return cp.label;
    }
    return '提供ボタンを押して完成させましょう！';
  }, [state.recipe, state.modeConfig]);

  // 進捗取得
  const getProgress = useCallback((): GameProgress => {
    return loadProgress();
  }, []);

  // アクティブなコンテナを取得（ツールに対応するコンテナ）
  const getActiveContainer = useCallback((): ContainerId | null => {
    const toolItem = state.counterItems.find(ci => ci.itemType === 'tool' && ci.status === 'inUse');
    if (toolItem) {
      return toolToContainer(toolItem.itemId);
    }
    return null;
  }, [state.counterItems]);

  return {
    state,
    startGame,
    openShelf,
    closeShelf,
    moveToCounter,
    removeFromCounter,
    selectGlass,
    addIce,
    addIngredient,
    selectTool,
    performTechnique,
    pourToGlass,
    topUp,
    addGarnish,
    serve,
    calculateScore,
    getNextHint,
    resetGame,
    getProgress,
    getActiveContainer,
  };
}
