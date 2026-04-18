import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Shuffle, ArrowLeft, Search, X } from 'lucide-react';
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

const BASE_FILTERS = [
  { key: 'all', label: '全て' },
  { key: 'gin', label: 'ジン' },
  { key: 'vodka', label: 'ウォッカ' },
  { key: 'rum', label: 'ラム' },
  { key: 'tequila', label: 'テキーラ' },
  { key: 'whisky', label: 'ウイスキー' },
  { key: 'brandy', label: 'ブランデー' },
  { key: 'other', label: 'その他' },
] as const;

const TECHNIQUE_FILTERS = [
  { key: 'all', label: '全て' },
  { key: 'build', label: 'ビルド' },
  { key: 'stir', label: 'ステア' },
  { key: 'shake', label: 'シェイク' },
  { key: 'blend', label: 'ブレンド' },
] as const;

const TASTE_FILTERS = [
  { key: 'all', label: '全て' },
  { key: 'sweet', label: '甘口' },
  { key: 'dry', label: '辛口' },
  { key: 'sour', label: '酸味' },
  { key: 'bitter', label: '苦味' },
  { key: 'balanced', label: 'バランス' },
] as const;

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
        active
          ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/40'
          : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10 hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  );
}

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

export default function GameTopPage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [searchQuery, setSearchQuery] = useState('');
  const [baseFilter, setBaseFilter] = useState('all');
  const [techniqueFilter, setTechniqueFilter] = useState('all');
  const [tasteFilter, setTasteFilter] = useState('all');

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

  const filteredCocktails = useMemo(() => {
    return availableCocktails.filter((c) => {
      if (searchQuery && !c.name.includes(searchQuery) && !c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (baseFilter !== 'all') {
        if (baseFilter === 'other') {
          if (['gin', 'vodka', 'rum', 'tequila', 'whisky', 'brandy'].includes(c.baseCategory)) return false;
        } else if (c.baseCategory !== baseFilter) return false;
      }
      if (techniqueFilter !== 'all' && c.technique !== techniqueFilter) return false;
      if (tasteFilter !== 'all' && c.taste !== tasteFilter) return false;
      return true;
    });
  }, [availableCocktails, searchQuery, baseFilter, techniqueFilter, tasteFilter]);

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

              {/* 検索バー */}
              <div className="relative max-w-md mb-4">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="カクテル名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded bg-white/5 border border-white/10 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* フィルター群 */}
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-500 mb-1.5 block">ベース</span>
                  <div className="flex flex-wrap gap-1.5">
                    {BASE_FILTERS.map((f) => (
                      <FilterPill key={f.key} label={f.label} active={baseFilter === f.key} onClick={() => setBaseFilter(f.key)} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 mb-1.5 block">技法</span>
                  <div className="flex flex-wrap gap-1.5">
                    {TECHNIQUE_FILTERS.map((f) => (
                      <FilterPill key={f.key} label={f.label} active={techniqueFilter === f.key} onClick={() => setTechniqueFilter(f.key)} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 mb-1.5 block">味わい</span>
                  <div className="flex flex-wrap gap-1.5">
                    {TASTE_FILTERS.map((f) => (
                      <FilterPill key={f.key} label={f.label} active={tasteFilter === f.key} onClick={() => setTasteFilter(f.key)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 件数表示 */}
              <p className="text-xs text-gray-500 mb-4">
                {filteredCocktails.length} 件のカクテル
              </p>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${baseFilter}-${techniqueFilter}-${tasteFilter}-${searchQuery}`}
              >
                {filteredCocktails.map((cocktail) => {
                  const recipe = recipeMap.get(cocktail.id)!;
                  const key = `${cocktail.id}-select`;
                  const bestScore = progress.bestScores[key] || progress.bestScores[cocktail.id];

                  return (
                    <motion.div key={cocktail.id} variants={itemVariants}>
                      <motion.button
                        onClick={() => navigate(`/game/play?mode=select&cocktail=${cocktail.id}`)}
                        className="w-full text-left glass-card p-4 sm:p-5 transition-all duration-300 relative overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(201,169,110,0.1)' }}
                        whileTap={{ scale: 0.97 }}
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
                          </div>

                          {bestScore && (
                            <div className="mt-2 text-[10px] text-text-muted">
                              Best: {bestScore.score}pt
                            </div>
                          )}
                        </div>

                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>

              {filteredCocktails.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Search size={40} className="mx-auto mb-3 opacity-40" />
                  <p>条件に一致するカクテルが見つかりません</p>
                </div>
              )}
            </motion.section>
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
