import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Snowflake, ArrowDownToLine } from 'lucide-react';
import type { ShelfArea, CounterItem } from '../../types/game';
import { ingredientsCatalog, getIngredient } from '../../data/ingredientsCatalog';
import { glasses } from '../../data/glasses';
import { barTools } from '../../data/tools';
import { getGlassIcon, getToolIcon } from '../BarIcons';
import { getBottleForIngredient } from './SpiritBottles';
import { getGarnishComponent } from './GarnishIllustration';
import ItemDetailCard from './ItemDetailCard';

interface ShelfDetailViewProps {
  shelfArea: ShelfArea;
  counterItems: CounterItem[];
  hasIce: boolean;
  onMoveToCounter: (itemId: string, itemType: CounterItem['itemType']) => void;
  onAddIce: () => void;
  onBack: () => void;
}

const SHELF_LABELS: Record<ShelfArea, { label: string; labelEn: string; color: string }> = {
  liquorShelf: { label: '酒棚', labelEn: 'Liquor Shelf', color: '#c9a96e' },
  fridge: { label: '冷蔵庫', labelEn: 'Fridge', color: '#88c8e8' },
  toolShelf: { label: 'ツール棚', labelEn: 'Tool Shelf', color: '#e8dcc8' },
  glassShelf: { label: 'グラス棚', labelEn: 'Glass Shelf', color: '#c9a96e' },
};

const GAME_TOOL_IDS = ['three-piece-shaker', 'mixing-glass', 'blender'];

interface ShelfItem {
  id: string;
  label: string;
  labelEn?: string;
  type: CounterItem['itemType'];
  categoryId?: string;
  color?: string;
  description?: string;
}

export default function ShelfDetailView({
  shelfArea,
  counterItems,
  hasIce,
  onMoveToCounter,
  onAddIce,
  onBack,
}: ShelfDetailViewProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const shelfInfo = SHELF_LABELS[shelfArea];

  const items = useMemo((): ShelfItem[] => {
    if (shelfArea === 'glassShelf') {
      return glasses.map(g => ({
        id: g.id,
        label: g.name,
        labelEn: g.nameEn,
        type: 'glass' as const,
        categoryId: 'glass',
        description: g.usage,
      }));
    }
    if (shelfArea === 'toolShelf') {
      return barTools
        .filter(t => GAME_TOOL_IDS.includes(t.id))
        .map(t => ({
          id: t.id,
          label: t.name,
          labelEn: t.nameEn,
          type: 'tool' as const,
          categoryId: 'tool',
          description: t.usage,
        }));
    }
    // liquorShelf / fridge - ingredients
    return ingredientsCatalog
      .filter(i => i.shelfArea === shelfArea)
      .map(i => ({
        id: i.id,
        label: i.label,
        labelEn: i.labelEn,
        type: 'ingredient' as const,
        categoryId: i.categoryId,
        color: i.color,
        description: i.description,
      }));
  }, [shelfArea]);

  const selectedItem = selectedItemId ? items.find(i => i.id === selectedItemId) : null;
  const isOnCounter = (itemId: string) => counterItems.some(ci => ci.itemId === itemId);

  function renderItemIcon(item: ShelfItem, size: number) {
    if (item.type === 'ingredient') {
      const ingredient = getIngredient(item.id);
      if (!ingredient) return null;

      // ガーニッシュ
      if (ingredient.categoryId === 'garnish') {
        const GarnishComp = getGarnishComponent(item.id);
        if (GarnishComp) return <GarnishComp size={size} />;
      }

      // 氷
      if (ingredient.categoryId === 'ice') {
        return <Snowflake size={size * 0.6} className="text-blue-300" />;
      }

      const Bottle = getBottleForIngredient(item.id, ingredient.categoryId);
      return <Bottle size={size} liquidColor={ingredient.color} isSelected={isOnCounter(item.id)} />;
    }
    if (item.type === 'glass') {
      const GlassIcon = getGlassIcon(item.id);
      return <GlassIcon size={size} color={isOnCounter(item.id) ? '#c9a96e' : '#888'} />;
    }
    if (item.type === 'tool') {
      const ToolIcon = getToolIcon(item.id);
      if (ToolIcon) return <ToolIcon size={size} color={isOnCounter(item.id) ? '#c9a96e' : '#888'} />;
    }
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-30 bg-bar-dark"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-glass-border bg-bar-dark/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">カウンター</span>
          </button>
          <div className="flex-1 text-center">
            <h2
              className="text-lg font-bold"
              style={{ color: shelfInfo.color, fontFamily: "'Noto Serif JP', serif" }}
            >
              {shelfInfo.label}
            </h2>
            <p className="text-xs text-text-muted">{shelfInfo.labelEn}</p>
          </div>
          <div className="w-16" /> {/* spacer for centering */}
        </div>
      </div>

      {/* Shelf background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {shelfArea === 'liquorShelf' && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-bar-dark to-bar-dark" />
        )}
        {shelfArea === 'fridge' && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/15 via-bar-dark to-bar-dark" />
        )}
        {shelfArea === 'toolShelf' && (
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-bar-dark to-bar-dark" />
        )}
        {shelfArea === 'glassShelf' && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-bar-dark to-bar-dark" />
        )}
      </div>

      {/* Items grid */}
      <div className="relative max-w-3xl mx-auto px-4 pt-6 pb-24 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
        {/* 氷ボタン (fridge only) */}
        {shelfArea === 'fridge' && (
          <motion.button
            onClick={() => {
              if (!hasIce) onAddIce();
            }}
            disabled={hasIce}
            className={`w-full mb-4 glass-card p-4 flex items-center gap-4 transition-all ${
              hasIce ? 'opacity-40' : 'hover:border-blue-400/30'
            }`}
            whileTap={hasIce ? {} : { scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Snowflake size={28} className="text-blue-300" />
            </div>
            <div className="text-left">
              <p className="text-text-primary font-semibold">氷</p>
              <p className="text-xs text-text-muted">Ice</p>
            </div>
            {hasIce && (
              <span className="ml-auto text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">追加済み</span>
            )}
          </motion.button>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {items.map((item, idx) => {
            const onCounter = isOnCounter(item.id);

            return (
              <motion.button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all relative ${
                  onCounter
                    ? 'bg-accent-gold/10 border border-accent-gold/30'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border border-transparent'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02, duration: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {onCounter && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-gold" />
                )}
                <div className="w-12 h-12 flex items-center justify-center">
                  {renderItemIcon(item, 48)}
                </div>
                <span className="text-xs text-text-secondary text-center leading-tight line-clamp-2">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* フローティング「カウンターへ戻る」ボタン */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-bar-dark via-bar-dark/95 to-transparent pt-10">
        <motion.button
          onClick={onBack}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#6b4226] to-[#8b5e3c] text-white font-semibold shadow-lg shadow-black/30 border border-accent-gold/20"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ArrowDownToLine size={18} className="text-accent-gold" />
          カウンターへ戻る
        </motion.button>
      </div>

      {/* Item detail card */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailCard
            name={selectedItem.label}
            nameEn={selectedItem.labelEn}
            category={selectedItem.categoryId || selectedItem.type}
            description={selectedItem.description}
            color={selectedItem.color}
            icon={renderItemIcon(selectedItem, 36)}
            isOnCounter={isOnCounter(selectedItem.id)}
            onMoveToCounter={() => {
              onMoveToCounter(selectedItem.id, selectedItem.type);
              setSelectedItemId(null);
            }}
            onClose={() => setSelectedItemId(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
