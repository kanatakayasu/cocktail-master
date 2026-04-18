import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  Layers,
  GitBranch,
  Sparkles,
  X,
} from 'lucide-react';
import { whiskyDistilleries } from '../../data/whisky';
import type { WhiskyDistillery } from '../../types/whisky';

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getTodaysDistillery(): WhiskyDistillery {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = Math.floor(seededRandom(seed) * whiskyDistilleries.length);
  return whiskyDistilleries[index];
}

const categories = [
  {
    renderIcon: () => <BookOpen size={28} className="text-accent-gold" />,
    title: '図鑑',
    description: '蒸留所・製造工程・テイスティングの百科事典',
    path: '/whisky/encyclopedia?tab=distilleries',
    color: 'from-amber-900/20 to-yellow-900/20',
    borderColor: 'hover:border-accent-gold',
  },
  {
    renderIcon: () => <HelpCircle size={28} className="text-accent-gold" />,
    title: 'クイズに挑戦',
    description: '4択クイズでウイスキー知識を確認',
    path: '/whisky/quiz',
    color: 'from-red-900/20 to-amber-900/20',
    borderColor: 'hover:border-accent-red',
  },
  {
    renderIcon: () => <Layers size={28} className="text-accent-cream" />,
    title: '暗記カード',
    description: 'フラッシュカードで効率的に暗記',
    path: '/whisky/flashcards',
    color: 'from-emerald-900/20 to-green-900/20',
    borderColor: 'hover:border-accent-cream',
  },
  {
    renderIcon: () => <GitBranch size={28} className="text-bar-green-light" />,
    title: 'ウイスキー分類',
    description: 'ウイスキーの分類体系をツリーで理解',
    path: '/whisky/classification',
    color: 'from-green-900/20 to-emerald-900/20',
    borderColor: 'hover:border-bar-green-light',
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

const COUNTRY_LABELS: Record<string, string> = {
  scotland: 'スコットランド',
  ireland: 'アイルランド',
  usa: 'アメリカ',
  canada: 'カナダ',
  japan: '日本',
  other: 'その他',
};

// タンブラー/グレンケアングラスのSVGイラスト — ゴールド系
function WhiskyGlassDecoration() {
  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block"
      animate={{ y: ['-52%', '-48%', '-52%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none">
        {/* タンブラーグラス */}
        <path
          d="M90 80 L85 280 L100 300 L200 300 L215 280 L210 80 Z"
          stroke="url(#whiskyGlassGrad)"
          strokeWidth="2"
          fill="rgba(201,169,110,0.05)"
        />
        {/* ウイスキー液体 */}
        <path
          d="M88 180 L92 280 L100 296 L200 296 L208 280 L212 180 Z"
          fill="url(#whiskyLiquidGrad)"
          opacity="0.25"
        />
        {/* グラスの底ベース */}
        <ellipse cx="150" cy="305" rx="55" ry="8" stroke="url(#whiskyGlassGrad)" strokeWidth="2" fill="none" />
        {/* 氷のキューブ */}
        <rect x="120" y="190" width="25" height="25" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(201,169,110,0.15)" strokeWidth="1" />
        <rect x="155" y="200" width="22" height="22" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(201,169,110,0.12)" strokeWidth="1" />
        {/* 気泡 */}
        <circle cx="130" cy="240" r="4" fill="rgba(201,169,110,0.2)" />
        <circle cx="170" cy="220" r="3" fill="rgba(201,169,110,0.15)" />
        <circle cx="145" cy="260" r="5" fill="rgba(201,169,110,0.1)" />
        <defs>
          <linearGradient id="whiskyGlassGrad" x1="0" y1="0" x2="300" y2="400">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#e8dcc8" />
          </linearGradient>
          <linearGradient id="whiskyLiquidGrad" x1="100" y1="180" x2="200" y2="300">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="50%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#D2691E" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// 蒸留所詳細モーダル
function DistilleryDetailModal({
  distillery,
  onClose,
}: {
  distillery: WhiskyDistillery;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* オーバーレイ */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {/* モーダル */}
      <motion.div
        className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto glass-card p-6 sm:p-8"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{distillery.emoji}</span>
          <div>
            <h3 className="text-xl font-bold text-text-primary">{distillery.name}</h3>
            <p className="text-sm text-text-secondary">{distillery.nameEn}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">国</span>
              <p className="text-text-primary mt-1">{COUNTRY_LABELS[distillery.country] ?? distillery.country}</p>
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">地域</span>
              <p className="text-text-primary mt-1">{distillery.region}</p>
            </div>
          </div>

          {distillery.founded && (
            <div>
              <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">設立</span>
              <p className="text-text-primary mt-1">{distillery.founded}</p>
            </div>
          )}

          <div>
            <span className="text-xs font-medium text-accent-red uppercase tracking-wider">代表銘柄</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {distillery.brands.map((brand) => (
                <span
                  key={brand}
                  className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-accent-cream uppercase tracking-wider">特徴</span>
            <ul className="mt-1 space-y-1">
              {distillery.features.map((feature, i) => (
                <li key={i} className="text-text-primary text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cream shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-sm text-gray-300 leading-relaxed">{distillery.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhiskyHomePage() {
  const [selectedDistillery, setSelectedDistillery] = useState<WhiskyDistillery | null>(null);

  const todaysDistillery = useMemo(() => getTodaysDistillery(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="relative py-16 sm:py-24 lg:py-32 text-center overflow-hidden">
        <WhiskyGlassDecoration />

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
            <span className="text-6xl">🥃</span>
          </motion.div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 gradient-text leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Whisky Book
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

      {/* 今日の蒸留所 */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-text-primary flex items-center justify-center gap-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <Sparkles size={24} className="text-accent-gold" />
            今日の蒸留所
            <Sparkles size={24} className="text-accent-gold" />
          </h2>

          <div className="max-w-lg mx-auto">
            <motion.div
              className="glass-card corner-hover p-7 sm:p-9 relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDistillery(todaysDistillery)}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: todaysDistillery.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded bg-accent-gold/10 flex items-center justify-center shrink-0"
                  >
                    <span className="text-2xl">{todaysDistillery.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {todaysDistillery.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {todaysDistillery.nameEn}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                        国
                      </span>
                      <p className="text-text-primary mt-1">
                        {COUNTRY_LABELS[todaysDistillery.country] ?? todaysDistillery.country}
                      </p>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                        地域
                      </span>
                      <p className="text-text-primary mt-1">{todaysDistillery.region}</p>
                    </div>
                  </div>

                  {todaysDistillery.founded && (
                    <div>
                      <span className="text-xs font-medium text-accent-cream uppercase tracking-wider">
                        設立
                      </span>
                      <p className="text-text-primary mt-1">{todaysDistillery.founded}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-medium text-accent-red uppercase tracking-wider">
                      代表銘柄
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {todaysDistillery.brands.map((brand) => (
                        <span
                          key={brand}
                          className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-accent-cream uppercase tracking-wider">
                      特徴
                    </span>
                    <ul className="mt-1 space-y-1">
                      {todaysDistillery.features.map((feature, i) => (
                        <li key={i} className="text-text-primary text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cream shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed pt-2 border-t border-white/10">
                    {todaysDistillery.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 蒸留所詳細モーダル */}
      <AnimatePresence>
        {selectedDistillery && (
          <DistilleryDetailModal
            distillery={selectedDistillery}
            onClose={() => setSelectedDistillery(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
