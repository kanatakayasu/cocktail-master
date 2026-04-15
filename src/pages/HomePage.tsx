import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  Layers,
  GitBranch,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import { cocktails } from '../data';
import type { CocktailRecipe } from '../types';
import {
  CocktailGlassIcon,
  getGlassIcon,
} from '../components/BarIcons';
import CocktailDetailModal from '../components/CocktailDetailModal';

const techniqueLabels: Record<string, string> = {
  build: 'ビルド',
  stir: 'ステア',
  shake: 'シェイク',
  blend: 'ブレンド',
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getTodaysCocktail() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = Math.floor(seededRandom(seed) * cocktails.length);
  return cocktails[index];
}

const categories = [
  {
    renderIcon: () => <BookOpen size={28} className="text-accent-gold" />,
    title: '図鑑',
    description: 'スピリッツ・カクテル・リキュール・バーツール・グラスの百科事典',
    path: '/encyclopedia?tab=cocktails',
    color: 'from-red-900/20 to-amber-900/20',
    borderColor: 'hover:border-accent-red',
  },
  {
    renderIcon: () => <HelpCircle size={28} className="text-accent-gold" />,
    title: 'クイズに挑戦',
    description: '4択クイズで知識を確認しよう',
    path: '/quiz',
    color: 'from-amber-900/20 to-yellow-900/20',
    borderColor: 'hover:border-accent-gold',
  },
  {
    renderIcon: () => <Layers size={28} className="text-accent-cream" />,
    title: '暗記カード',
    description: 'フラッシュカードで効率的に暗記',
    path: '/flashcards',
    color: 'from-emerald-900/20 to-green-900/20',
    borderColor: 'hover:border-accent-cream',
  },
  {
    renderIcon: () => <GitBranch size={28} className="text-bar-green-light" />,
    title: '飲料分類',
    description: '飲料の分類体系をツリーで理解',
    path: '/classification',
    color: 'from-green-900/20 to-emerald-900/20',
    borderColor: 'hover:border-bar-green-light',
  },
  {
    renderIcon: () => <Gamepad2 size={28} className="text-accent-red" />,
    title: 'レシピ再現ゲーム',
    description: 'カクテルを手順通りに作って腕試し',
    path: '/game',
    color: 'from-red-900/20 to-rose-900/20',
    borderColor: 'hover:border-accent-red',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

// カクテルグラスのSVGイラスト — ゴールド系
function CocktailGlassDecoration() {
  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block"
      animate={{ y: ['-52%', '-48%', '-52%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none">
        <path
          d="M80 60 L150 200 L150 320 L110 340 L190 340 L150 340 L150 200 L220 60 Z"
          stroke="url(#glassGradient)"
          strokeWidth="2"
          fill="rgba(201,169,110,0.05)"
        />
        <path
          d="M95 100 L150 200 L205 100 Z"
          fill="url(#liquidGradient)"
          opacity="0.3"
        />
        <ellipse cx="150" cy="345" rx="50" ry="8" stroke="url(#glassGradient)" strokeWidth="2" fill="none" />
        <circle cx="120" cy="130" r="4" fill="rgba(201,169,110,0.2)" />
        <circle cx="170" cy="110" r="3" fill="rgba(201,169,110,0.15)" />
        <circle cx="140" cy="150" r="5" fill="rgba(201,169,110,0.1)" />
        <defs>
          <linearGradient id="glassGradient" x1="0" y1="0" x2="300" y2="400">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#e8dcc8" />
          </linearGradient>
          <linearGradient id="liquidGradient" x1="100" y1="100" x2="200" y2="200">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="50%" stopColor="#e8dcc8" />
            <stop offset="100%" stopColor="#bb2121" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function HomePage() {
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailRecipe | null>(null);

  const todaysCocktail = useMemo(() => getTodaysCocktail(), []);
  const TodaysGlassIcon = useMemo(() => getGlassIcon(todaysCocktail.glass), [todaysCocktail.glass]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="relative py-16 sm:py-24 lg:py-32 text-center overflow-hidden">
        <CocktailGlassDecoration />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            className="mb-6 flex justify-center"
            animate={{ rotate: [0, -3, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 4 }}
          >
            <CocktailGlassIcon size={64} color="#c9a96e" />
          </motion.div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 gradient-text leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Cocktail Book
          </h1>
        </motion.div>
      </section>

      {/* 学習カテゴリカード */}
      <section className="py-16">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10 text-text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          学習カテゴリ
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={itemVariants}>
              <Link to={cat.path} className="block no-underline">
                <motion.div
                  className={`glass-card corner-hover p-7 h-full transition-all duration-300 ${cat.borderColor}`}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 20px rgba(201,169,110,0.1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`bg-gradient-to-br ${cat.color} w-14 h-14 rounded flex items-center justify-center mb-4`}>
                    {cat.renderIcon()}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{cat.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 今日のカクテル */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-text-primary flex items-center justify-center gap-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <Sparkles size={24} className="text-accent-gold" />
            今日のカクテル
            <Sparkles size={24} className="text-accent-gold" />
          </h2>

          <div className="max-w-lg mx-auto">
            <motion.div
              className="glass-card corner-hover p-7 sm:p-9 relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCocktail(todaysCocktail)}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: todaysCocktail.color }}
              />

              <div className="relative z-10">
                {todaysCocktail.imageUrl && (
                  <div className="mb-5 rounded overflow-hidden">
                    <img
                      src={todaysCocktail.imageUrl}
                      alt={todaysCocktail.name}
                      className="w-full aspect-[3/2] object-cover object-center"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded bg-accent-red/10 flex items-center justify-center shrink-0"
                  >
                    <TodaysGlassIcon size={28} color="#bb2121" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {todaysCocktail.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {todaysCocktail.nameEn}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                        ベース
                      </span>
                      <p className="text-text-primary mt-1">{todaysCocktail.base}</p>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                        技法
                      </span>
                      <p className="text-text-primary mt-1">
                        {techniqueLabels[todaysCocktail.technique] ?? todaysCocktail.technique}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-accent-red uppercase tracking-wider">
                      材料
                    </span>
                    <ul className="mt-1 space-y-1">
                      {todaysCocktail.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-text-primary text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cream shrink-0" />
                          {ingredient.name} {ingredient.amount}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                        グラス
                      </span>
                      <p className="text-text-primary mt-1">{todaysCocktail.glass}</p>
                    </div>
                    {todaysCocktail.garnish && (
                      <div className="flex-1">
                        <span className="text-xs font-medium text-accent-cream uppercase tracking-wider">
                          ガーニッシュ
                        </span>
                        <p className="text-text-primary mt-1">{todaysCocktail.garnish}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* カクテル詳細モーダル */}
      <AnimatePresence>
        {selectedCocktail && (
          <CocktailDetailModal
            cocktail={selectedCocktail}
            onClose={() => setSelectedCocktail(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
