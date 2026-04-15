import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface ItemDetailCardProps {
  name: string;
  nameEn?: string;
  category: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
  isOnCounter: boolean;
  onMoveToCounter: () => void;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  spirit: 'スピリッツ',
  liqueur: 'リキュール',
  juice: 'ジュース',
  mixer: 'ミキサー',
  syrup: 'シロップ',
  other: 'その他',
  garnish: 'ガーニッシュ',
  ice: '氷',
  glass: 'グラス',
  tool: 'ツール',
};

const ItemDetailCard: FC<ItemDetailCardProps> = ({
  name,
  nameEn,
  category,
  description,
  color,
  icon,
  isOnCounter,
  onMoveToCounter,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="bg-bar-green/95 backdrop-blur-xl border-t border-l border-r border-glass-border rounded-t-2xl p-5 pb-8">
          {/* Handle */}
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

          <div className="flex items-start gap-4">
            {/* Icon area */}
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: color ? `${color}20` : 'rgba(201,169,110,0.1)' }}
            >
              {icon || <Package size={28} className="text-accent-gold" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-text-primary" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {name}
              </h3>
              {nameEn && (
                <p className="text-xs text-text-muted mt-0.5">{nameEn}</p>
              )}
              <span
                className="inline-block mt-1.5 px-2 py-0.5 text-xs rounded-full bg-accent-gold/15 text-accent-gold"
              >
                {CATEGORY_LABELS[category] || category}
              </span>
            </div>
          </div>

          {description && (
            <p className="mt-3 text-sm text-text-secondary leading-relaxed" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              {description}
            </p>
          )}

          {/* Action button */}
          <motion.button
            onClick={isOnCounter ? undefined : onMoveToCounter}
            disabled={isOnCounter}
            className={`mt-4 w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              isOnCounter
                ? 'bg-white/5 text-text-muted cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-gold/80 to-accent-gold/60 text-bar-dark hover:from-accent-gold hover:to-accent-gold/80'
            }`}
            whileHover={isOnCounter ? {} : { scale: 1.02 }}
            whileTap={isOnCounter ? {} : { scale: 0.98 }}
          >
            {isOnCounter ? 'カウンター上にあります' : 'カウンターに置く'}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ItemDetailCard;
