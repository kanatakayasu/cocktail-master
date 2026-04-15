import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Lightbulb,
  Send,
  ScrollText,
} from 'lucide-react';
import { cocktails } from '../../data';
import { getGameRecipe } from '../../data/gameRecipes';
import { getIngredient } from '../../data/ingredientsCatalog';
import { useGameState } from '../../game/useGameState';
import BarCounterView from '../../components/game/BarCounterView';
import ShelfDetailView from '../../components/game/ShelfDetailView';
import type { ShelfArea, GameMode, TechniqueType, ContainerId } from '../../types/game';
import GameResultPage from './GameResultPage';

export default function GamePlayPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modeParam = (searchParams.get('mode') || 'select') as GameMode;
  const cocktailId = searchParams.get('cocktail') || '';

  const game = useGameState();
  const { state } = game;

  const recipe = useMemo(() => getGameRecipe(cocktailId), [cocktailId]);
  const cocktail = useMemo(() => cocktails.find(c => c.id === cocktailId), [cocktailId]);

  const [activeView, setActiveView] = useState<'counter' | ShelfArea>('counter');
  const [showHint, setShowHint] = useState(false);
  const [showLog, setShowLog] = useState(false);

  // ゲーム開始
  useEffect(() => {
    if (recipe && state.status === 'idle') {
      game.startGame(recipe, modeParam);
    }
  }, [recipe, modeParam]); // eslint-disable-line

  // ヒント
  const currentHint = useMemo(() => {
    return game.getNextHint();
  }, [state.actionLog.length]); // eslint-disable-line

  // 棚を開く
  const handleOpenShelf = useCallback((shelf: ShelfArea) => {
    game.openShelf(shelf);
    setActiveView(shelf);
  }, [game]);

  // 棚から戻る
  const handleBackToCounter = useCallback(() => {
    game.closeShelf();
    setActiveView('counter');
  }, [game]);

  // カウンターに持ち込み
  const handleMoveToCounter = useCallback((itemId: string, itemType: 'ingredient' | 'glass' | 'tool') => {
    const shelfArea = activeView as ShelfArea;
    if (itemType === 'glass') {
      game.moveToCounter(itemId, 'glass', shelfArea);
      game.selectGlass(itemId);
    } else if (itemType === 'tool') {
      game.moveToCounter(itemId, 'tool', shelfArea);
      game.selectTool(itemId);
    } else {
      game.moveToCounter(itemId, 'ingredient', shelfArea);
    }
  }, [game, activeView]);

  // 材料を注ぐ（コンテナ指定）
  const handlePour = useCallback((itemId: string, containerId: ContainerId) => {
    game.addIngredient(itemId, containerId);
  }, [game]);

  // TopUp（常にグラスへ）
  const handleTopUp = useCallback((itemId: string) => {
    game.topUp(itemId);
  }, [game]);

  // 氷を入れる（コンテナ指定）
  const handleAddIce = useCallback((containerId: ContainerId) => {
    game.addIce(containerId);
  }, [game]);

  // 技法実行（コンテナ指定）
  const handlePerformTechnique = useCallback((technique: TechniqueType, containerId?: ContainerId) => {
    game.performTechnique(technique, containerId);
  }, [game]);

  // コンテナからグラスへ注ぐ
  const handlePourToGlass = useCallback((fromContainerId: ContainerId) => {
    game.pourToGlass(fromContainerId);
  }, [game]);

  // ガーニッシュ
  const handleAddGarnish = useCallback((garnishId: string) => {
    game.addGarnish(garnishId);
  }, [game]);

  // 提供
  const handleServe = useCallback(() => {
    game.serve();
    setTimeout(() => {
      game.calculateScore();
    }, 500);
  }, [game]);

  // 結果表示
  if (state.status === 'scored' && state.result) {
    return (
      <GameResultPage
        result={state.result}
        cocktailId={cocktailId}
        mode={modeParam}
        onRetry={() => {
          game.resetGame();
          if (recipe) game.startGame(recipe, modeParam);
        }}
        onNewCocktail={() => navigate('/game')}
      />
    );
  }

  if (!recipe || !cocktail) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-text-secondary">レシピが見つかりません</p>
        <button onClick={() => navigate('/game')} className="mt-4 text-accent-gold underline">
          ゲームトップへ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* ヘッダー: 注文票 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/game')}
          className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm"
        >
          <ChevronLeft size={16} />
          戻る
        </button>

        <motion.div
          className="glass-card px-4 py-2 flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cocktail.color }} />
          <div>
            <p className="text-text-primary font-semibold text-sm sm:text-base">{cocktail.name}</p>
            <p className="text-text-muted text-xs">{cocktail.nameEn}</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-accent-gold/20 text-accent-gold">
            {recipe.primaryTechnique === 'build' ? 'ビルド' :
             recipe.primaryTechnique === 'stir' ? 'ステア' :
             recipe.primaryTechnique === 'shake' ? 'シェイク' : 'ブレンド'}
          </span>
        </motion.div>

        <div className="flex items-center gap-1">
          {state.modeConfig.showHints && (
            <button
              onClick={() => setShowHint(!showHint)}
              className={`p-2 rounded transition-colors ${showHint ? 'text-accent-gold bg-accent-gold/10' : 'text-text-secondary hover:text-text-primary'}`}
              title="ヒント"
            >
              <Lightbulb size={18} />
            </button>
          )}
          <button
            onClick={() => setShowLog(!showLog)}
            className={`p-2 rounded transition-colors ${showLog ? 'text-accent-gold bg-accent-gold/10' : 'text-text-secondary hover:text-text-primary'}`}
            title="操作ログ"
          >
            <ScrollText size={18} />
          </button>
        </div>
      </div>

      {/* ヒント */}
      <AnimatePresence>
        {showHint && currentHint && (
          <motion.div
            className="glass-card px-4 py-3 mb-4 border-l-2 border-accent-gold"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p className="text-accent-gold text-sm flex items-center gap-2">
              <Lightbulb size={14} />
              {currentHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 操作ログ (collapsible) */}
      <AnimatePresence>
        {showLog && (
          <motion.div
            className="glass-card p-3 mb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <h4 className="text-xs text-accent-gold font-medium mb-2">操作ログ</h4>
            <div className="space-y-1 max-h-[30vh] overflow-y-auto">
              {state.actionLog.length === 0 ? (
                <p className="text-text-muted text-xs py-2 text-center">まだ操作がありません</p>
              ) : (
                state.actionLog
                  .filter(a => !['openShelf', 'pickItem', 'moveToCounter'].includes(a.actionType))
                  .map((action, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs py-1 border-b border-glass-border/30 last:border-0"
                    >
                      <span className="text-accent-gold shrink-0 w-4 text-right">{i + 1}</span>
                      <span className="text-text-secondary">{formatAction(action)}</span>
                    </div>
                  ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* メインエリア: カウンタービュー */}
      <BarCounterView
        counterItems={state.counterItems}
        selectedGlassId={state.selectedGlassId}
        cocktailColor={cocktail.color}
        containers={state.containers}
        animatingTechnique={state.animatingTechnique}
        onShelfTap={handleOpenShelf}
        onPour={handlePour}
        onTopUp={handleTopUp}
        onAddIce={handleAddIce}
        onPerformTechnique={handlePerformTechnique}
        onPourToGlass={handlePourToGlass}
        onGarnish={handleAddGarnish}
        onRemove={(id) => game.removeFromCounter(id)}
      />

      {/* 提供ボタン */}
      <div className="mt-4">
        <motion.button
          onClick={handleServe}
          disabled={state.status !== 'playing' || state.animatingTechnique !== null}
          className="w-full py-3.5 rounded bg-gradient-to-r from-accent-red to-accent-red/80 text-white font-semibold flex items-center justify-center gap-2 hover:from-accent-red/90 hover:to-accent-red/70 transition-all disabled:opacity-40"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={16} />
          提供する
        </motion.button>
      </div>

      {/* 棚詳細オーバーレイ */}
      <AnimatePresence>
        {activeView !== 'counter' && (
          <ShelfDetailView
            shelfArea={activeView}
            counterItems={state.counterItems}
            hasIce={state.containers.glass.hasIce}
            onMoveToCounter={handleMoveToCounter}
            onAddIce={() => game.addIce('glass')}
            onBack={handleBackToCounter}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// アクションログのフォーマット
function formatAction(action: { actionType: string; targetId?: string; amount?: string; toArea?: string }): string {
  const target = action.targetId ? (getIngredient(action.targetId)?.label || action.targetId) : '';

  const containerLabels: Record<string, string> = {
    glass: 'グラス',
    mixingGlass: 'ミキシンググラス',
    shaker: 'シェーカー',
    blender: 'ブレンダー',
  };
  const toLabel = action.toArea ? containerLabels[action.toArea] || action.toArea : '';

  switch (action.actionType) {
    case 'selectGlass': return `グラス選択: ${target}`;
    case 'addIce': return `氷を入れる → ${toLabel}`;
    case 'addIngredient': return `注ぐ: ${target} → ${toLabel}`;
    case 'selectTool': return `ツール選択: ${target}`;
    case 'performTechnique':
      return action.targetId === 'build' ? 'ビルド' :
             action.targetId === 'stir' ? 'ステア' :
             action.targetId === 'shake' ? 'シェイク' : 'ブレンド';
    case 'pourToGlass': return `グラスに注ぐ ← ${containerLabels[action.targetId || ''] || action.targetId}`;
    case 'topUp': return `満たす: ${target}`;
    case 'garnish': return `ガーニッシュ: ${target}`;
    case 'serve': return '提供！';
    default: return action.actionType;
  }
}
