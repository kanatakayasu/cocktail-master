import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Wine, BookOpen, FlaskConical, Lightbulb } from 'lucide-react';
import { techniques } from '../data';
import type { CocktailRecipe } from '../types';
import { getGlassIcon } from './BarIcons';

const TECHNIQUE_EMOJI: Record<string, string> = {
  build: '🥛',
  stir: '🥄',
  shake: '🍸',
  blend: '🫗',
};

const IBA_LABELS: Record<string, string> = {
  unforgettable: 'IBA 不朽の名作',
  contemporary: 'IBA コンテンポラリー',
  newera: 'IBA ニューエラ',
};

const TASTE_BADGE_COLORS: Record<string, string> = {
  sweet: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  dry: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  sour: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  bitter: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  balanced: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

const TASTE_LABELS: Record<string, string> = {
  sweet: '甘口',
  dry: '辛口',
  sour: '酸味',
  bitter: '苦味',
  balanced: 'バランス',
};

const STRENGTH_BADGE_COLORS: Record<string, string> = {
  light: 'bg-green-500/20 text-green-300 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  strong: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const STRENGTH_LABELS: Record<string, string> = {
  light: '軽め',
  medium: '中程度',
  strong: '強め',
};

export default function CocktailDetailModal({
  cocktail,
  onClose,
}: {
  cocktail: CocktailRecipe;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const GlassIcon = getGlassIcon(cocktail.glass);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* オーバーレイ */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* モーダル本体 */}
      <motion.div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card mx-2 sm:mx-4 rounded-t-sm sm:rounded"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* 画像 */}
        {cocktail.imageUrl && !imgError ? (
          <div className="w-full aspect-[16/9] overflow-hidden rounded-t-sm sm:rounded-t">
            <img
              src={cocktail.imageUrl}
              alt={cocktail.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-[16/9] rounded-t-sm sm:rounded-t flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${cocktail.color}30, ${cocktail.color}08)`,
            }}
          >
            <GlassIcon size={80} color={cocktail.color} className="opacity-60" />
          </div>
        )}

        <div className="p-5 space-y-5">
          {/* タイトル */}
          <div>
            <h2 className="text-xl font-bold text-white">{cocktail.name}</h2>
            <p className="text-sm text-gray-400 italic">{cocktail.nameEn}</p>
          </div>

          {/* 味わいセクション */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
              <Wine size={16} className="text-accent-red" />
              <span>味わい</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${TASTE_BADGE_COLORS[cocktail.taste] || ''}`}
              >
                {TASTE_LABELS[cocktail.taste] || cocktail.taste}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STRENGTH_BADGE_COLORS[cocktail.strength] || ''}`}
              >
                {STRENGTH_LABELS[cocktail.strength] || cocktail.strength}
              </span>
            </div>
            {cocktail.flavorProfile && (
              <p className="text-sm text-gray-300 leading-relaxed">
                {cocktail.flavorProfile}
              </p>
            )}
          </div>

          {/* 歴史 */}
          {cocktail.history && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                <BookOpen size={16} className="text-accent-gold" />
                <span>歴史</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {cocktail.history}
              </p>
            </div>
          )}

          {/* 豆知識 */}
          {cocktail.servingTip && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                <Lightbulb size={16} className="text-accent-cream" />
                <span>豆知識</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {cocktail.servingTip}
              </p>
            </div>
          )}

          {/* レシピ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
              <FlaskConical size={16} className="text-accent-red" />
              <span>レシピ</span>
            </div>

            {/* 材料 */}
            <ul className="space-y-1">
              {cocktail.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cream shrink-0" />
                  <span className="flex-1">{ing.name}</span>
                  <span className="text-gray-500 text-xs">{ing.amount}</span>
                </li>
              ))}
            </ul>

            {/* 技法・グラス・ガーニッシュ */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
              <div>
                <span className="text-gray-500">技法</span>
                <p className="text-gray-300 mt-0.5">
                  {TECHNIQUE_EMOJI[cocktail.technique]}{' '}
                  {techniques.find((t) => t.id === cocktail.technique)?.name ||
                    cocktail.technique}
                </p>
              </div>
              <div>
                <span className="text-gray-500">グラス</span>
                <p className="text-gray-300 mt-0.5">{cocktail.glass}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">ガーニッシュ</span>
                <p className="text-gray-300 mt-0.5">{cocktail.garnish}</p>
              </div>
            </div>
          </div>

          {/* IBAカテゴリ */}
          {cocktail.ibaCategory && (
            <div className="pt-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  borderColor: `${cocktail.color}50`,
                  color: cocktail.color,
                }}
              >
                {IBA_LABELS[cocktail.ibaCategory] || cocktail.ibaCategory}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
