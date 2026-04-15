import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, RotateCcw, ArrowRight, BookOpen, Home, Check, X } from 'lucide-react';
import type { ScoreResult, GameRank, CheckpointResult } from '../../types/game';
import { RANK_LABELS } from '../../game/scoring';
import { cocktails } from '../../data';

interface GameResultPageProps {
  result: ScoreResult;
  cocktailId: string;
  mode: string;
  onRetry: () => void;
  onNewCocktail: () => void;
}

const RANK_CONFIG: Record<GameRank, {
  gradient: string;
  glow: string;
  textClass: string;
  borderClass: string;
  encouragement?: string;
}> = {
  perfect: {
    gradient: 'from-yellow-400 via-amber-300 to-yellow-500',
    glow: '0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 215, 0, 0.2)',
    textClass: 'text-accent-gold',
    borderClass: 'border-yellow-500/40',
  },
  excellent: {
    gradient: 'from-amber-400 via-yellow-600 to-amber-500',
    glow: '0 0 30px rgba(201, 169, 110, 0.4)',
    textClass: 'text-accent-gold',
    borderClass: 'border-amber-500/30',
  },
  good: {
    gradient: 'from-green-400 via-emerald-400 to-green-500',
    glow: '0 0 25px rgba(34, 197, 94, 0.3)',
    textClass: 'text-green-400',
    borderClass: 'border-green-500/30',
  },
  retry: {
    gradient: 'from-red-400 via-rose-400 to-red-500',
    glow: '0 0 25px rgba(239, 68, 68, 0.3)',
    textClass: 'text-accent-red',
    borderClass: 'border-red-500/30',
    encouragement: 'もう少し！次はきっとうまくいく！',
  },
};

const CHECKPOINT_TYPE_ICONS: Record<string, string> = {
  glass: '🥃',
  ingredient: '🧴',
  topUp: '🥤',
  ice: '🧊',
  technique: '🔄',
  pourToGlass: '↗️',
  garnish: '🍋',
};

/* ===== Sub-components ===== */

function RankBadge({ rank }: { rank: GameRank }) {
  const config = RANK_CONFIG[rank];
  const info = RANK_LABELS[rank];

  return (
    <motion.div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} blur-xl`}
          animate={rank === 'perfect' ? { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] } : {}}
          transition={rank === 'perfect' ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
          style={{ opacity: 0.4 }}
        />
        <motion.div
          className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center border-2 ${config.borderClass}`}
          style={{ boxShadow: config.glow }}
        >
          <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
            <span className="text-4xl sm:text-5xl">{info.emoji}</span>
          </div>
        </motion.div>

        {rank === 'perfect' && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + Math.sin((i * Math.PI * 2) / 5) * 50}%`,
                  left: `${50 + Math.cos((i * Math.PI * 2) / 5) * 70}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut',
                }}
              >
                <Star size={16} className="text-yellow-300 fill-yellow-300" />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      <motion.h1
        className={`text-3xl sm:text-4xl font-bold ${config.textClass}`}
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {info.label}
      </motion.h1>

      {config.encouragement && (
        <motion.p
          className="text-text-secondary text-sm"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {config.encouragement}
        </motion.p>
      )}
    </motion.div>
  );
}

function AnimatedScore({ score, max, delay = 0 }: { score: number; max: number; delay?: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.span
        className="text-5xl sm:text-6xl font-bold text-accent-gold tabular-nums"
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12, delay: delay + 0.2 }}
      >
        {score}
      </motion.span>
      <span className="text-2xl sm:text-3xl text-text-secondary ml-1" style={{ fontFamily: "'Cinzel', serif" }}>
        / {max}
      </span>
    </motion.div>
  );
}

function CheckpointItem({ cr, index }: { cr: CheckpointResult; index: number }) {
  const icon = CHECKPOINT_TYPE_ICONS[cr.checkpoint.type] || '📋';

  return (
    <motion.div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        cr.passed
          ? 'border-green-500/20 bg-green-500/5'
          : 'border-red-500/20 bg-red-500/5'
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.06, duration: 0.3 }}
    >
      <span className="text-lg shrink-0">{icon}</span>
      <span
        className={`flex-1 text-sm ${cr.passed ? 'text-text-primary' : 'text-text-secondary'}`}
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {cr.checkpoint.label}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-xs font-semibold tabular-nums ${cr.passed ? 'text-green-400' : 'text-red-400'}`}>
          {cr.passed ? cr.checkpoint.points : 0}/{cr.checkpoint.points}
        </span>
        {cr.passed ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <X size={16} className="text-red-400" />
        )}
      </div>
    </motion.div>
  );
}

/* ===== Main ===== */

export default function GameResultPage({
  result,
  cocktailId,
  mode,
  onRetry,
  onNewCocktail,
}: GameResultPageProps) {
  const navigate = useNavigate();

  const cocktail = useMemo(
    () => cocktails.find((c) => c.id === cocktailId),
    [cocktailId],
  );

  const passedCount = result.checkpointResults.filter(cr => cr.passed).length;
  const totalCount = result.checkpointResults.length;

  return (
    <div className="min-h-screen bg-bar-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Cocktail name */}
        {cocktail && (
          <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm text-text-secondary tracking-widest uppercase">
              {mode === 'select' ? 'Select Cocktail' : mode === 'random' ? 'Random' : 'Game'}
            </p>
            <h2
              className="text-xl sm:text-2xl font-bold text-text-primary mt-1"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {cocktail.name}
              <span className="text-text-secondary text-sm ml-2 font-normal">{cocktail.nameEn}</span>
            </h2>
          </motion.div>
        )}

        {/* Rank badge */}
        <section className="py-8 sm:py-10">
          <RankBadge rank={result.rank} />
        </section>

        {/* Total score */}
        <section className="py-4">
          <AnimatedScore score={result.totalScore} max={result.maxScore} delay={0.5} />
        </section>

        {/* Checkpoint results */}
        <motion.section
          className="glass-card p-5 sm:p-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-bold text-text-primary"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              調理チェックポイント
            </h3>
            <span className="text-sm text-text-secondary">
              <span className="text-accent-gold font-semibold">{passedCount}</span> / {totalCount}
            </span>
          </div>

          <div className="space-y-2">
            {result.checkpointResults.map((cr, i) => (
              <CheckpointItem key={cr.checkpoint.id} cr={cr} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Action buttons */}
        <motion.section
          className="mt-8 sm:mt-10 pb-8 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <motion.button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded font-semibold text-bar-dark transition-all duration-200
              bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400
              active:scale-[0.98] shadow-lg shadow-amber-500/20"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={18} />
            もう一度挑戦
          </motion.button>

          <motion.button
            onClick={onNewCocktail}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded font-semibold text-text-primary
              border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10
              transition-all duration-200 active:scale-[0.98]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowRight size={18} />
            別のカクテル
          </motion.button>

          <div className="flex gap-3 pt-2">
            <motion.button
              onClick={() => navigate('/encyclopedia?tab=cocktails')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded text-sm text-text-secondary
                hover:text-accent-gold border border-white/10 hover:border-accent-gold/30 bg-white/[0.03]
                transition-all duration-200"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <BookOpen size={15} />
              図鑑で確認
            </motion.button>

            <motion.button
              onClick={() => navigate('/game')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded text-sm text-text-secondary
                hover:text-accent-cream border border-white/10 hover:border-accent-cream/30 bg-white/[0.03]
                transition-all duration-200"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home size={15} />
              ゲームトップ
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
