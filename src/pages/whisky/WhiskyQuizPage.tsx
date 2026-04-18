import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Filter,
} from 'lucide-react';
import { whiskyQuizQuestions } from '../../data/whisky';
import type { QuizQuestion } from '../../types';

// ---------- 型定義 ----------

type Difficulty = 'easy' | 'medium' | 'hard';
type DifficultyFilter = Difficulty | 'all';
type Phase = 'select' | 'quiz' | 'result';

interface CategoryMeta {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

interface QuizScore {
  category: string;
  correct: number;
  total: number;
  date: string;
  percentage: number;
}

// ---------- 定数 ----------

const CATEGORIES: CategoryMeta[] = [
  { id: 'w_basics', emoji: '🥃', label: '基礎知識', description: '定義・分類・5大ウイスキー' },
  { id: 'w_production', emoji: '⚗️', label: '製造工程', description: '製麦・糖化・蒸留・熟成' },
  { id: 'w_scotch', emoji: '🏴', label: 'スコッチ', description: '産地・蒸留所・ブレンド' },
  { id: 'w_irish', emoji: '☘️', label: 'アイリッシュ', description: '3回蒸留・ポットスチル' },
  { id: 'w_american', emoji: '🦅', label: 'アメリカン', description: 'バーボン・テネシー・ライ' },
  { id: 'w_canadian', emoji: '🍁', label: 'カナディアン', description: 'ベース＋フレーバリング' },
  { id: 'w_japanese', emoji: '🗾', label: 'ジャパニーズ', description: '竹鶴・鳥井・クラフト' },
  { id: 'w_history', emoji: '📜', label: '歴史', description: '世界のウイスキー史' },
  { id: 'w_tasting', emoji: '👃', label: 'テイスティング', description: 'フレーバー・飲み方' },
  { id: 'w_law', emoji: '⚖️', label: '法律・規制', description: '各国の定義と基準' },
  { id: 'all', emoji: '🎲', label: 'ランダム全問', description: '全カテゴリからランダム' },
];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-accent-cream/15 text-accent-cream',
  medium: 'bg-accent-gold/15 text-accent-gold',
  hard: 'bg-accent-red/15 text-accent-red',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '上級',
};

const STORAGE_KEY = 'whisky-quiz-scores';

// ---------- ユーティリティ ----------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getQuestionsForCategory(catId: string, diffFilter: DifficultyFilter): QuizQuestion[] {
  let pool: QuizQuestion[] =
    catId === 'all'
      ? whiskyQuizQuestions
      : whiskyQuizQuestions.filter((q: QuizQuestion) => q.category === catId);

  if (diffFilter !== 'all') {
    pool = pool.filter((q: QuizQuestion) => q.difficulty === diffFilter);
  }

  const shuffled = shuffle(pool);
  return catId === 'all' ? shuffled.slice(0, 20) : shuffled;
}

function countByDifficulty(catId: string): Record<Difficulty, number> {
  const pool: QuizQuestion[] = catId === 'all' ? whiskyQuizQuestions : whiskyQuizQuestions.filter((q: QuizQuestion) => q.category === catId);
  const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
  pool.forEach((q: QuizQuestion) => {
    counts[q.difficulty]++;
  });
  return counts;
}

function loadScores(): QuizScore[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveScore(score: QuizScore) {
  const scores = loadScores();
  scores.push(score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

// ---------- パーティクルエフェクト ----------

function ConfettiParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -200 - 40,
        size: Math.random() * 8 + 4,
        color: ['#c9a96e', '#e8dcc8', '#bb2121', '#2a4a35', '#c9a96e'][
          Math.floor(Math.random() * 5)
        ],
        delay: Math.random() * 0.2,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: p.x,
            y: p.y,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ---------- 円形プログレス ----------

function CircularProgress({
  percentage,
  size = 160,
  strokeWidth = 12,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#whiskyProgressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="whiskyProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bb2121" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#e8dcc8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {Math.round(percentage)}%
        </motion.span>
      </div>
    </div>
  );
}

// ---------- メインコンポーネント ----------

export default function WhiskyQuizPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<
    { question: QuizQuestion; selected: number }[]
  >([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;

  // カテゴリ選択 → クイズ開始
  const startQuiz = useCallback(
    (catId: string) => {
      const qs = getQuestionsForCategory(catId, difficultyFilter);
      if (qs.length === 0) return;
      setSelectedCategory(catId);
      setQuestions(qs);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setCorrectCount(0);
      setWrongAnswers([]);
      setShowConfetti(false);
      setPhase('quiz');
    },
    [difficultyFilter],
  );

  // 回答選択
  const handleAnswer = useCallback(
    (index: number) => {
      if (isAnswered || !currentQuestion) return;
      setSelectedAnswer(index);
      if (index === currentQuestion.correctIndex) {
        setCorrectCount((c) => c + 1);
        setShowConfetti(true);
      } else {
        setWrongAnswers((prev) => [
          ...prev,
          { question: currentQuestion, selected: index },
        ]);
      }
    },
    [isAnswered, currentQuestion],
  );

  // 次の問題 or 結果表示
  const handleNext = useCallback(() => {
    setShowConfetti(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      const total = questions.length;
      const correct = correctCount;
      const percentage = Math.round((correct / total) * 100);
      saveScore({
        category: selectedCategory,
        correct,
        total,
        date: new Date().toISOString(),
        percentage,
      });
      setPhase('result');
    }
  }, [currentIndex, questions.length, correctCount, selectedCategory]);

  // もう一度
  const retryQuiz = useCallback(() => {
    startQuiz(selectedCategory);
  }, [selectedCategory, startQuiz]);

  // カテゴリ選択に戻る
  const backToSelect = useCallback(() => {
    setPhase('select');
    setQuestions([]);
    setSelectedCategory('');
  }, []);

  // confetti タイマー
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // ===== カテゴリ選択画面 =====
  if (phase === 'select') {
    return (
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">ウイスキークイズ</h1>
          <p className="text-gray-400">カテゴリを選んでスタート</p>
        </div>

        {/* 難易度フィルター */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <Filter size={16} className="text-gray-400" />
          {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-all cursor-pointer ${
                difficultyFilter === d
                  ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/50'
                  : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10'
              }`}
            >
              {d === 'all' ? '全て' : DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>

        {/* カテゴリカード一覧 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {CATEGORIES.map((cat) => {
            const diffCounts = countByDifficulty(cat.id);
            const totalForFilter =
              difficultyFilter === 'all'
                ? diffCounts.easy + diffCounts.medium + diffCounts.hard
                : diffCounts[difficultyFilter];
            const displayCount =
              cat.id === 'all' && difficultyFilter === 'all'
                ? 20
                : cat.id === 'all'
                  ? Math.min(20, totalForFilter)
                  : totalForFilter;
            const totalAll = diffCounts.easy + diffCounts.medium + diffCounts.hard;

            return (
              <motion.button
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(201,169,110,0.1)',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startQuiz(cat.id)}
                disabled={displayCount === 0}
                className="glass-card p-5 text-left transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">{cat.label}</h3>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {displayCount}問{cat.id === 'all' && difficultyFilter === 'all' ? `（全${totalAll}問から）` : ''}
                  </span>
                  <div className="flex gap-1.5">
                    {diffCounts.easy > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${DIFFICULTY_COLORS.easy}`}>
                        初級{diffCounts.easy}
                      </span>
                    )}
                    {diffCounts.medium > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${DIFFICULTY_COLORS.medium}`}>
                        中級{diffCounts.medium}
                      </span>
                    )}
                    {diffCounts.hard > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${DIFFICULTY_COLORS.hard}`}>
                        上級{diffCounts.hard}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    );
  }

  // ===== クイズ実施画面 =====
  if (phase === 'quiz' && currentQuestion) {
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const catMeta = CATEGORIES.find((c) => c.id === selectedCategory);

    return (
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* ヘッダー: 戻るボタン + プログレス */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={backToSelect}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              カテゴリに戻る
            </button>
            <span className="text-sm text-gray-400 font-mono">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          {/* プログレスバー */}
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #bb2121, #c9a96e, #e8dcc8)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* 問題カード */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }}
          >
            {/* カテゴリ & 難易度バッジ */}
            <div className="flex items-center gap-2 mb-4">
              {catMeta && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                  {catMeta.emoji} {catMeta.label}
                </span>
              )}
              <span
                className={`text-xs px-2.5 py-1 rounded-full ${DIFFICULTY_COLORS[currentQuestion.difficulty]}`}
              >
                {DIFFICULTY_LABELS[currentQuestion.difficulty]}
              </span>
            </div>

            {/* 問題文 */}
            <div className="glass-card p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-100 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4択 (2x2グリッド) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              {showConfetti && <ConfettiParticles />}
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'border-white/10 hover:border-white/25 hover:shadow-[0_0_12px_rgba(201,169,110,0.08)]';
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = 'border-[#c9a96e] bg-[#c9a96e]/15 shadow-[0_0_16px_rgba(201,169,110,0.15)]';
                  } else if (idx === selectedAnswer && !isCorrect) {
                    btnStyle = 'border-[#bb2121] bg-[#bb2121]/15 shadow-[0_0_16px_rgba(187,33,33,0.15)]';
                  } else {
                    btnStyle = 'border-white/5 opacity-50';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    className={`glass-card p-4 text-left transition-all border cursor-pointer disabled:cursor-default ${btnStyle}`}
                    whileHover={!isAnswered ? { scale: 1.02 } : undefined}
                    whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    animate={
                      isAnswered && idx === currentQuestion.correctIndex
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-gray-300 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base text-gray-200 leading-relaxed">
                        {option}
                      </span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <CheckCircle size={20} className="shrink-0 text-[#c9a96e] ml-auto mt-0.5" />
                      )}
                      {isAnswered && idx === selectedAnswer && !isCorrect && idx !== currentQuestion.correctIndex && (
                        <XCircle size={20} className="shrink-0 text-[#bb2121] ml-auto mt-0.5" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* 解説 + 次へ */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6"
                >
                  <div className="glass-card p-5 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle size={20} className="text-[#c9a96e]" />
                      ) : (
                        <XCircle size={20} className="text-[#bb2121]" />
                      )}
                      <span
                        className={`font-semibold ${isCorrect ? 'text-[#c9a96e]' : 'text-[#bb2121]'}`}
                      >
                        {isCorrect ? '正解！' : '不正解'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <motion.button
                    onClick={handleNext}
                    className="w-full py-3 rounded bg-accent-red text-text-primary font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {currentIndex + 1 < questions.length ? (
                      <>
                        次の問題へ
                        <ArrowRight size={18} />
                      </>
                    ) : (
                      <>
                        結果を見る
                        <Trophy size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  // ===== 結果画面 =====
  if (phase === 'result') {
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let message = '';
    let messageColor = '';
    if (percentage >= 90) {
      message = '素晴らしい！ウイスキーマスター！';
      messageColor = 'text-accent-cream';
    } else if (percentage >= 70) {
      message = 'よくできました！もう少しで完璧です';
      messageColor = 'text-accent-gold';
    } else if (percentage >= 50) {
      message = 'まずまずの結果です。復習しましょう';
      messageColor = 'text-accent-gold';
    } else {
      message = 'もっと勉強しましょう！';
      messageColor = 'text-accent-red';
    }

    const catMeta = CATEGORIES.find((c) => c.id === selectedCategory);

    return (
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* スコア表示 */}
        <div className="glass-card p-8 text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <Trophy size={40} className="mx-auto mb-4 text-accent-gold" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-100 mb-1">クイズ結果</h2>
          {catMeta && (
            <p className="text-sm text-gray-400 mb-6">
              {catMeta.emoji} {catMeta.label}
            </p>
          )}

          <div className="flex justify-center mb-6">
            <CircularProgress percentage={percentage} />
          </div>

          <p className="text-xl font-semibold text-gray-200 mb-2">
            {correctCount} / {total} 問正解
          </p>
          <motion.p
            className={`text-lg font-bold ${messageColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {message}
          </motion.p>
        </div>

        {/* 間違えた問題一覧 */}
        {wrongAnswers.length > 0 && (
          <motion.div
            className="glass-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <XCircle size={20} className="text-[#bb2121]" />
              間違えた問題（{wrongAnswers.length}問）
            </h3>
            <div className="space-y-4">
              {wrongAnswers.map(({ question, selected }, idx) => (
                <div
                  key={question.id}
                  className="border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="text-gray-500 mr-1">Q{idx + 1}.</span>
                    {question.question}
                  </p>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-[#bb2121]">
                      あなたの回答: {question.options[selected]}
                    </span>
                    <span className="text-[#c9a96e]">
                      正解: {question.options[question.correctIndex]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{question.explanation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-3">
          <motion.button
            onClick={retryQuiz}
            className="flex-1 py-3 rounded bg-accent-red text-text-primary font-semibold flex items-center justify-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={18} />
            もう一度
          </motion.button>
          <motion.button
            onClick={backToSelect}
            className="flex-1 py-3 rounded border border-white/20 text-gray-300 font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Shuffle size={18} />
            カテゴリに戻る
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // フォールバック
  return null;
}
