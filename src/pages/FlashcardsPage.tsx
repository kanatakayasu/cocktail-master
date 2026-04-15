import { useState, useMemo, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import {
  RotateCcw,
  Check,
  X,
  Shuffle,
  ArrowLeft,
  Trophy,
  Layers,
} from 'lucide-react';
import { flashCards } from '../data';
import type { FlashCard } from '../types';

// ---------- 定数 ----------

type CategoryKey =
  | 'spirits'
  | 'liqueurs'
  | 'cocktails'
  | 'techniques'
  | 'tools'
  | 'glasses'
  | 'terms'
  | 'service'
  | 'garnish'
  | 'wine_beer_sake'
  | 'history'
  | 'all';

interface CategoryMeta {
  key: CategoryKey;
  emoji: string;
  label: string;
  colorBar: string;   // カード上部カラーバー
  accent: string;     // アクセント色 (text-*)
}

const CATEGORIES: CategoryMeta[] = [
  { key: 'spirits', emoji: '🥃', label: 'スピリッツ', colorBar: 'bg-amber-800', accent: 'text-accent-gold' },
  { key: 'liqueurs', emoji: '🍸', label: 'リキュール', colorBar: 'bg-bar-green-light', accent: 'text-accent-cream' },
  { key: 'cocktails', emoji: '🍹', label: 'カクテル', colorBar: 'bg-accent-red', accent: 'text-accent-red' },
  { key: 'techniques', emoji: '🎯', label: '技法', colorBar: 'bg-accent-gold', accent: 'text-accent-gold' },
  { key: 'tools', emoji: '🔧', label: 'ツール', colorBar: 'bg-accent-gold', accent: 'text-accent-gold' },
  { key: 'glasses', emoji: '🥂', label: 'グラス', colorBar: 'bg-accent-cream', accent: 'text-accent-cream' },
  { key: 'terms', emoji: '📝', label: '用語', colorBar: 'bg-accent-cream', accent: 'text-accent-cream' },
  { key: 'service', emoji: '🤵', label: 'サービス・接客', colorBar: 'bg-bar-green-light', accent: 'text-bar-green-light' },
  { key: 'garnish', emoji: '🍋', label: 'ガーニッシュ', colorBar: 'bg-accent-gold', accent: 'text-accent-gold' },
  { key: 'wine_beer_sake', emoji: '🍷', label: 'ワイン・ビール・日本酒', colorBar: 'bg-accent-red', accent: 'text-accent-red' },
  { key: 'history', emoji: '📜', label: '歴史', colorBar: 'bg-accent-gold', accent: 'text-accent-gold' },
  { key: 'all', emoji: '🎲', label: '全カテゴリ', colorBar: 'bg-gradient-to-r from-accent-red to-accent-gold', accent: 'gradient-text' },
];

const SWIPE_THRESHOLD = 100;

// ---------- ユーティリティ ----------

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getCategoryMeta(key: string): CategoryMeta {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}

// ---------- 画面の状態 ----------

type Screen = 'select' | 'study' | 'result';

// ---------- コンポーネント ----------

export default function FlashcardsPage() {
  const [screen, setScreen] = useState<Screen>('select');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [deck, setDeck] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [unknownIds, setUnknownIds] = useState<Set<string>>(new Set());

  // カテゴリごとのカード枚数
  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of flashCards) {
      map[c.category] = (map[c.category] ?? 0) + 1;
    }
    map['all'] = flashCards.length;
    return map;
  }, []);

  // カテゴリ選択 → 学習画面へ
  const startStudy = useCallback((cat: CategoryKey) => {
    const filtered =
      cat === 'all' ? flashCards : flashCards.filter((c) => c.category === cat);
    setSelectedCategory(cat);
    setDeck(shuffleArray(filtered));
    setCurrentIndex(0);
    setKnownIds(new Set());
    setUnknownIds(new Set());
    setScreen('study');
  }, []);

  // カードの判定
  const handleAnswer = useCallback(
    (known: boolean) => {
      const card = deck[currentIndex];
      if (!card) return;
      if (known) {
        setKnownIds((prev) => new Set(prev).add(card.id));
      } else {
        setUnknownIds((prev) => new Set(prev).add(card.id));
      }
      if (currentIndex + 1 >= deck.length) {
        // 最後の判定を反映してから結果画面に遷移
        setTimeout(() => setScreen('result'), 350);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [deck, currentIndex],
  );

  // 覚えていないカードだけ再学習
  const retryUnknown = useCallback(() => {
    const retry = deck.filter((c) => unknownIds.has(c.id));
    setDeck(shuffleArray(retry));
    setCurrentIndex(0);
    setKnownIds(new Set());
    setUnknownIds(new Set());
    setScreen('study');
  }, [deck, unknownIds]);

  // 全リセット
  const resetAll = useCallback(() => {
    startStudy(selectedCategory);
  }, [startStudy, selectedCategory]);

  // カテゴリに戻る
  const backToSelect = useCallback(() => {
    setScreen('select');
  }, []);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {screen === 'select' && (
          <CategorySelectScreen
            key="select"
            countByCategory={countByCategory}
            onSelect={startStudy}
          />
        )}
        {screen === 'study' && (
          <StudyScreen
            key="study"
            deck={deck}
            currentIndex={currentIndex}
            knownCount={knownIds.size}
            unknownCount={unknownIds.size}
            categoryKey={selectedCategory}
            onAnswer={handleAnswer}
            onBack={backToSelect}
          />
        )}
        {screen === 'result' && (
          <ResultScreen
            key="result"
            total={deck.length}
            knownCount={knownIds.size}
            unknownCount={unknownIds.size}
            onRetryUnknown={retryUnknown}
            onReset={resetAll}
            onBack={backToSelect}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ==================== カテゴリ選択画面 ====================

function CategorySelectScreen({
  countByCategory,
  onSelect,
}: {
  countByCategory: Record<string, number>;
  onSelect: (cat: CategoryKey) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="text-center mb-8">
        <Layers size={40} className="mx-auto mb-3 text-accent-gold" />
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
          暗記カード
        </h1>
        <p className="text-gray-400">カテゴリを選んで学習を始めよう</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.key}
            className="glass-card p-4 sm:p-5 text-left cursor-pointer transition-colors"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(201,169,110,0.1)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(cat.key)}
          >
            <span className="text-3xl block mb-2">{cat.emoji}</span>
            <span className="text-sm sm:text-base font-semibold text-gray-200 block">
              {cat.label}
            </span>
            <span className="text-xs text-gray-500 mt-1 block">
              {countByCategory[cat.key] ?? 0} 枚
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== 学習画面 ====================

function StudyScreen({
  deck,
  currentIndex,
  knownCount,
  unknownCount,
  categoryKey,
  onAnswer,
  onBack,
}: {
  deck: FlashCard[];
  currentIndex: number;
  knownCount: number;
  unknownCount: number;
  categoryKey: CategoryKey;
  onAnswer: (known: boolean) => void;
  onBack: () => void;
}) {
  const total = deck.length;
  const current = deck[currentIndex];
  const catMeta = getCategoryMeta(current?.category ?? categoryKey);
  const progress = ((currentIndex) / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center"
    >
      {/* ヘッダー */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">戻る</span>
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-400">
            <X size={14} className="inline -mt-0.5" /> {unknownCount}
          </span>
          <span className="text-green-400">
            <Check size={14} className="inline -mt-0.5" /> {knownCount}
          </span>
        </div>
      </div>

      {/* 進捗バー */}
      <div className="w-full max-w-md mb-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{currentIndex + 1} / {total}</span>
          <span>残り {total - currentIndex} 枚</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-red to-accent-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* カードスタック */}
      <div
        className="relative w-full max-w-md mt-4"
        style={{ aspectRatio: '3/4', maxHeight: '65vh' }}
      >
        {/* 背景カード（次のカード / スタック感） */}
        {currentIndex + 2 < total && (
          <div className="absolute inset-0 glass-card rounded scale-[0.92] opacity-20 translate-y-3" />
        )}
        {currentIndex + 1 < total && (
          <div className="absolute inset-0 glass-card rounded scale-[0.96] opacity-35 translate-y-1.5" />
        )}

        {/* メインカード */}
        <AnimatePresence mode="popLayout">
          {current && (
            <SwipeableFlashCard
              key={current.id}
              card={current}
              catMeta={catMeta}
              onAnswer={onAnswer}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ボタン */}
      <div className="flex gap-6 mt-6">
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-semibold cursor-pointer hover:bg-red-500/25 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAnswer(false)}
        >
          <X size={18} />
          覚えていない
        </motion.button>
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 font-semibold cursor-pointer hover:bg-green-500/25 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAnswer(true)}
        >
          <Check size={18} />
          覚えた
        </motion.button>
      </div>
    </motion.div>
  );
}

// ==================== スワイプ可能カード ====================

function SwipeableFlashCard({
  card,
  catMeta,
  onAnswer,
}: {
  card: FlashCard;
  catMeta: CategoryMeta;
  onAnswer: (known: boolean) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const overlayOpacityLeft = useTransform(x, [-200, 0], [0.6, 0]);
  const overlayOpacityRight = useTransform(x, [0, 200], [0, 0.6]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      setExitX(400);
      onAnswer(true);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      setExitX(-400);
      onAnswer(false);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, perspective: 1200 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: exitX, opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsFlipped((f) => !f)}
    >
      {/* ドラッグ中のオーバーレイ: 左(赤) */}
      <motion.div
        className="absolute inset-0 rounded bg-red-500/30 z-20 pointer-events-none"
        style={{ opacity: overlayOpacityLeft }}
      />
      {/* ドラッグ中のオーバーレイ: 右(緑) */}
      <motion.div
        className="absolute inset-0 rounded bg-green-500/30 z-20 pointer-events-none"
        style={{ opacity: overlayOpacityRight }}
      />

      {/* 3D フリップコンテナ */}
      <div className="w-full h-full" style={{ perspective: 1200 }}>
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 表面 */}
          <div
            className="absolute inset-0 rounded overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="glass-card w-full h-full flex flex-col rounded border border-white/10">
              {/* カラーバー */}
              <div className={`h-2 ${catMeta.colorBar} rounded-t-2xl shrink-0`} />
              {/* カテゴリラベル */}
              <div className="px-4 pt-3 flex items-center justify-between shrink-0">
                <span className="text-xs text-gray-500 tracking-wider uppercase">
                  {catMeta.emoji} {catMeta.label}
                </span>
                <span className="text-[10px] text-gray-600">タップで裏返す</span>
              </div>
              {/* 問題 */}
              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <p className="text-lg sm:text-xl font-semibold text-gray-100 text-center leading-relaxed">
                  {card.front}
                </p>
              </div>
            </div>
          </div>

          {/* 裏面 */}
          <div
            className="absolute inset-0 rounded overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-full h-full flex flex-col rounded border border-white/15 bg-white/[0.08] backdrop-blur-md">
              {/* カラーバー */}
              <div className={`h-2 ${catMeta.colorBar} rounded-t-2xl shrink-0`} />
              {/* カテゴリラベル */}
              <div className="px-4 pt-3 flex items-center justify-between shrink-0">
                <span className="text-xs text-gray-500 tracking-wider uppercase">
                  {catMeta.emoji} {catMeta.label}
                </span>
                <span className="text-[10px] text-gray-500">答え</span>
              </div>
              {/* 答え */}
              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <p className="text-base sm:text-lg text-gray-200 text-center leading-relaxed">
                  {card.back}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ==================== 結果画面 ====================

function ResultScreen({
  total,
  knownCount,
  unknownCount,
  onRetryUnknown,
  onReset,
  onBack,
}: {
  total: number;
  knownCount: number;
  unknownCount: number;
  onRetryUnknown: () => void;
  onReset: () => void;
  onBack: () => void;
}) {
  const rate = total > 0 ? Math.round((knownCount / total) * 100) : 0;

  const rateColor =
    rate >= 80
      ? 'text-green-400'
      : rate >= 50
        ? 'text-yellow-400'
        : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="glass-card max-w-md w-full p-8 sm:p-10"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Trophy size={48} className="mx-auto mb-4 text-accent-gold" />
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-6">
          学習完了！
        </h2>

        {/* スコア */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-white">{knownCount}</span>
          <span className="text-2xl text-gray-500">/</span>
          <span className="text-2xl text-gray-400">{total}</span>
        </div>

        <div className={`text-4xl font-extrabold mb-6 ${rateColor}`}>
          {rate}%
        </div>

        {/* 内訳 */}
        <div className="flex justify-center gap-8 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            <span className="text-gray-300">覚えた: {knownCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <X size={16} className="text-red-400" />
            <span className="text-gray-300">未記憶: {unknownCount}</span>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex flex-col gap-3">
          {unknownCount > 0 && (
            <motion.button
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent-red text-text-primary font-semibold cursor-pointer shadow-lg shadow-accent-red/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRetryUnknown}
            >
              <RotateCcw size={18} />
              覚えていないカードだけ再学習（{unknownCount} 枚）
            </motion.button>
          )}

          <motion.button
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 cursor-pointer transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
          >
            <Shuffle size={18} />
            全カードをシャッフルしてやり直す
          </motion.button>

          <motion.button
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 cursor-pointer transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            カテゴリに戻る
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
