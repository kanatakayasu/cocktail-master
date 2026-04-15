import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Shuffle, Star, Play, ArrowLeft } from 'lucide-react';
import { cocktails } from '../../data';
import { gameRecipes } from '../../data/gameRecipes';
import type { GameMode, GameProgress } from '../../types/game';

const techniqueLabels: Record<string, string> = {
  build: 'ビルド',
  stir: 'ステア',
  shake: 'シェイク',
  blend: 'ブレンド',
};

const techniqueBadgeColors: Record<string, string> = {
  build: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/40',
  stir: 'bg-sky-900/40 text-sky-300 border-sky-700/40',
  shake: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
  blend: 'bg-purple-900/40 text-purple-300 border-purple-700/40',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const STORAGE_KEY = 'cocktail-game-progress';

function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GameProgress;
  } catch { /* ignore */ }
  return { playHistory: [], bestScores: {}, totalPlays: 0, consecutiveCorrect: 0 };
}

function ShakerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M24 8 L40 8 L38 16 L26 16 Z" fill="rgba(201,169,110,0.3)" stroke="#c9a96e" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M22 16 L42 16 L40 52 L24 52 Z" fill="rgba(201,169,110,0.15)" stroke="#c9a96e" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="22" y1="16" x2="42" y2="16" stroke="#c9a96e" strokeWidth="2" />
      <path d="M28 20 L29 44" stroke="rgba(232,220,200,0.25)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Star key={i} size={14} className={i <= level ? 'text-accent-gold fill-accent-gold' : 'text-text-muted'} />
      ))}
    </span>
  );
}

export default function GameTopPage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(null);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);

  useEffect(() => {
    const onFocus = () => setProgress(loadProgress());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const recipeMap = useMemo(
    () => new Map(gameRecipes.map((r) => [r.cocktailId, r])),
    [],
  );

  const availableCocktails = useMemo(() => {
    return cocktails.filter((c) => recipeMap.has(c.id));
  }, [recipeMap]);

  const handleModeSelect = (mode: GameMode) => {
    if (mode === 'random') {
      // ランダムモード: 即座にランダムなカクテルで開始
      if (availableCocktails.length === 0) return;
      const randomIndex = Math.floor(Math.random() * availableCocktails.length);
      const cocktailId = availableCocktails[randomIndex].id;
      navigate(`/game/play?mode=random&cocktail=${cocktailId}`);
      return;
    }
    // カクテル指定モード
    setSelectedMode(mode);
    setSelectedCocktailId(null);
  };

  const handleStart = () => {
    if (!selectedCocktailId) return;
    navigate(`/game/play?mode=select&cocktail=${selectedCocktailId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back nav */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">ホームに戻る</span>
        </motion.button>

        {/* Hero */}
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="mb-5 inline-block"
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          >
            <ShakerIcon size={56} />
          </motion.div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Cocktail Game
          </h1>
          <p className="text-text-secondary text-base sm:text-lg" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            レシピ再現ゲーム
          </p>
        </motion.section>

        {/* Mode selection: 2 cards */}
        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* カクテル指定モード */}
            <motion.button
              onClick={() => handleModeSelect('select')}
              className={`text-left glass-card p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
                selectedMode === 'select'
                  ? 'ring-1 ring-accent-gold/50'
                  : 'hover:border-glass-border'
              }`}
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(201,169,110,0.12)' }}
              whileTap={{ scale: 0.98 }}
              style={selectedMode === 'select' ? { boxShadow: '0 0 20px rgba(201,169,110,0.15)' } : undefined}
            >
              <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/10 w-11 h-11 rounded flex items-center justify-center mb-3">
                <Crosshair size={22} className="text-accent-gold" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">カクテル指定</h3>
              <p className="text-xs text-text-muted" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                好きなカクテルを選んで挑戦
              </p>
              {selectedMode === 'select' && (
                <motion.div
                  layoutId="mode-indicator"
                  className="mt-3 h-0.5 rounded-full bg-accent-gold/60"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>

            {/* ランダムモード */}
            <motion.button
              onClick={() => handleModeSelect('random')}
              className="text-left glass-card p-5 sm:p-6 transition-all duration-300 cursor-pointer hover:border-glass-border"
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(187,33,33,0.12)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-br from-red-900/30 to-rose-900/10 w-11 h-11 rounded flex items-center justify-center mb-3">
                <Shuffle size={22} className="text-accent-red" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">ランダム</h3>
              <p className="text-xs text-text-muted" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                ランダムなカクテルに挑戦
              </p>
            </motion.button>
          </div>
        </motion.section>

        {/* Cocktail selection (only for 'select' mode) */}
        <AnimatePresence mode="wait">
          {selectedMode === 'select' && (
            <motion.section
              key="cocktail-select"
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-lg sm:text-xl font-semibold text-text-primary mb-5"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                カクテルを選択
              </h2>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {availableCocktails.map((cocktail) => {
                  const recipe = recipeMap.get(cocktail.id)!;
                  const isSelected = selectedCocktailId === cocktail.id;
                  const key = `${cocktail.id}-select`;
                  const bestScore = progress.bestScores[key] || progress.bestScores[cocktail.id];

                  return (
                    <motion.div key={cocktail.id} variants={itemVariants}>
                      <motion.button
                        onClick={() => setSelectedCocktailId(isSelected ? null : cocktail.id)}
                        className={`w-full text-left glass-card p-4 sm:p-5 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                          isSelected ? 'ring-1 ring-accent-gold/50' : ''
                        }`}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(201,169,110,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                        style={isSelected ? { boxShadow: '0 0 20px rgba(201,169,110,0.15)' } : undefined}
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-20" style={{ background: cocktail.color }} />

                        <div className="relative z-10">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="w-3 h-3 rounded-full shrink-0 mt-1 border border-white/20" style={{ background: cocktail.color }} />
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-base font-semibold text-text-primary truncate" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                                {cocktail.name}
                              </h3>
                              <p className="text-xs text-text-muted truncate">{cocktail.nameEn}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded border ${techniqueBadgeColors[recipe.primaryTechnique] || 'bg-white/10 text-text-secondary border-white/20'}`}>
                              {techniqueLabels[recipe.primaryTechnique]}
                            </span>
                            <DifficultyStars level={recipe.difficulty} />
                          </div>

                          {bestScore && (
                            <div className="mt-2 text-[10px] text-text-muted">
                              Best: {bestScore.score}pt
                            </div>
                          )}
                        </div>

                        {isSelected && (
                          <motion.div
                            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent-gold/80 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0d1a12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Start button (select mode only) */}
        <AnimatePresence>
          {selectedMode === 'select' && selectedCocktailId && (
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.button
                onClick={handleStart}
                className="flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded bg-gradient-to-r from-accent-gold/90 to-accent-gold text-bar-dark font-bold text-base sm:text-lg tracking-wide cursor-pointer"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,169,110,0.35)' }}
                whileTap={{ scale: 0.96 }}
              >
                <Play size={20} fill="#0d1a12" />
                ゲーム開始
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.section
          className="glass-card p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            プレイ記録
          </h2>

          {progress.totalPlays === 0 ? (
            <p className="text-sm text-text-muted" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              まだプレイ記録がありません。ゲームを始めましょう!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent-gold">{progress.totalPlays}</p>
                <p className="text-xs text-text-muted mt-1">総プレイ数</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent-cream">{Object.keys(progress.bestScores).length}</p>
                <p className="text-xs text-text-muted mt-1">挑戦カクテル数</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  {Object.values(progress.bestScores).length > 0
                    ? Math.max(...Object.values(progress.bestScores).map((s) => s.score))
                    : '-'}
                </p>
                <p className="text-xs text-text-muted mt-1">最高スコア</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent-red">
                  {Object.values(progress.bestScores).filter((s) => s.rank === 'perfect').length}
                </p>
                <p className="text-xs text-text-muted mt-1">パーフェクト数</p>
              </div>
            </div>
          )}

          {progress.totalPlays > 0 && Object.keys(progress.bestScores).length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <h3 className="text-sm font-semibold text-text-secondary mb-3">ベストスコア</h3>
              <div className="space-y-2">
                {Object.entries(progress.bestScores)
                  .sort(([, a], [, b]) => b.score - a.score)
                  .slice(0, 5)
                  .map(([id, score]) => {
                    const cId = id.replace(/-select$|-random$/, '');
                    const cocktail = cocktails.find((c) => c.id === cId);
                    if (!cocktail) return null;

                    const rankColors: Record<string, string> = {
                      perfect: 'text-accent-gold',
                      excellent: 'text-emerald-400',
                      good: 'text-accent-cream',
                      retry: 'text-text-muted',
                    };

                    return (
                      <div key={id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cocktail.color }} />
                          <span className="text-text-primary truncate">{cocktail.name}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span className={`text-xs font-medium uppercase ${rankColors[score.rank] || 'text-text-muted'}`}>
                            {score.rank}
                          </span>
                          <span className="text-text-secondary">{score.score}pt</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
