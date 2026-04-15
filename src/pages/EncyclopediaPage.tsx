import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Droplets,
  FlaskConical,
} from 'lucide-react';
import { spirits, cocktails, liqueurs, barTools, glasses, techniques } from '../data';
import type { Spirit, CocktailRecipe, Liqueur, BarTool, GlassType } from '../types';
import { getGlassIcon, getToolIcon } from '../components/BarIcons';
import CocktailDetailModal from '../components/CocktailDetailModal';

// ─── 定数 ───────────────────────────────────────

type TabKey = 'spirits' | 'cocktails' | 'liqueurs' | 'tools' | 'glasses';

interface TabDef {
  key: TabKey;
  label: string;
  emoji: string;
}

const TABS: TabDef[] = [
  { key: 'cocktails', label: 'カクテルレシピ', emoji: '🍹' },
  { key: 'spirits', label: 'スピリッツ', emoji: '🥃' },
  { key: 'liqueurs', label: 'リキュール', emoji: '🍷' },
  { key: 'tools', label: 'バーツール', emoji: '🔧' },
  { key: 'glasses', label: 'グラス', emoji: '🥂' },
];

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

const LIQUEUR_CATEGORIES: Record<string, string> = {
  herbal: '香草・薬草系',
  fruit: '果実系',
  nut: 'ナッツ・種子・豆系',
  cream: 'クリーム系',
};

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

// ─── アニメーション定義 ───────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const tabContentVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
};

// ─── ユーティリティ ──────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

function ColorDot({ color, size = 10 }: { color: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 4px ${color}50`,
      }}
    />
  );
}

// ─── タブ1: スピリッツ ──────────────────────────

function SpiritImage({ spirit }: { spirit: Spirit }) {
  const [hasError, setHasError] = useState(false);

  if (spirit.imageUrl && !hasError) {
    return (
      <div className="w-full aspect-[4/3] rounded overflow-hidden mb-3">
        <img
          src={spirit.imageUrl}
          alt={spirit.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // フォールバック: カラーグラデーション + emoji
  return (
    <div
      className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${spirit.color}20, ${spirit.color}08)`,
      }}
    >
      <span className="text-5xl opacity-70">{spirit.emoji}</span>
    </div>
  );
}

function SpiritsTab() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {spirits.map((s: Spirit) => (
        <motion.div key={s.id} variants={cardVariants}>
          <div
            className="glass-card p-5 transition-all duration-300 h-full"
          >
            <SpiritImage spirit={s} />

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-gray-400">{s.nameEn}</p>
                </div>
              </div>
              <ColorDot color={s.color} size={14} />
            </div>

            <div className="space-y-1.5 text-sm text-gray-300">
              <p>
                <span className="text-gray-500 mr-1">産地:</span>
                {s.origin}
              </p>
              <p>
                <span className="text-gray-500 mr-1">原料:</span>
                {s.ingredients}
              </p>
              <p>
                <span className="text-gray-500 mr-1">度数:</span>
                {s.alcoholRange}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <p className="text-sm text-gray-300 leading-relaxed">
                {s.description}
              </p>

              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  代表銘柄
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {s.brands.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  代表カクテル
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {s.cocktails.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-full text-xs text-gray-300 border"
                      style={{ borderColor: `${s.color}40` }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── タブ2: カクテルレシピ ────────────────────────

function CocktailImage({ cocktail }: { cocktail: CocktailRecipe }) {
  const [hasError, setHasError] = useState(false);
  const GlassIcon = getGlassIcon(cocktail.glass);

  if (cocktail.imageUrl && !hasError) {
    return (
      <div className="w-full aspect-[3/2] rounded-lg overflow-hidden mb-3">
        <img
          src={cocktail.imageUrl}
          alt={cocktail.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full aspect-[3/2] rounded-lg overflow-hidden mb-3 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${cocktail.color}30, ${cocktail.color}08)`,
      }}
    >
      <GlassIcon size={56} color={cocktail.color} className="opacity-60" />
    </div>
  );
}

function CocktailsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [baseFilter, setBaseFilter] = useState('all');
  const [techniqueFilter, setTechniqueFilter] = useState('all');
  const [tasteFilter, setTasteFilter] = useState('all');
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailRecipe | null>(null);

  const filtered = useMemo(() => {
    return cocktails.filter((c: CocktailRecipe) => {
      if (searchQuery && !c.name.includes(searchQuery) && !c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (baseFilter !== 'all') {
        if (baseFilter === 'other') {
          if (['gin', 'vodka', 'rum', 'tequila', 'whisky', 'brandy'].includes(c.baseCategory)) {
            return false;
          }
        } else if (c.baseCategory !== baseFilter) {
          return false;
        }
      }
      if (techniqueFilter !== 'all' && c.technique !== techniqueFilter) return false;
      if (tasteFilter !== 'all' && c.taste !== tasteFilter) return false;
      return true;
    });
  }, [searchQuery, baseFilter, techniqueFilter, tasteFilter]);

  return (
    <div className="space-y-5">
      {/* 検索バー */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
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
      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">
            ベース
          </span>
          <div className="flex flex-wrap gap-1.5">
            {BASE_FILTERS.map((f) => (
              <FilterPill
                key={f.key}
                label={f.label}
                active={baseFilter === f.key}
                onClick={() => setBaseFilter(f.key)}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">
            技法
          </span>
          <div className="flex flex-wrap gap-1.5">
            {TECHNIQUE_FILTERS.map((f) => (
              <FilterPill
                key={f.key}
                label={f.label}
                active={techniqueFilter === f.key}
                onClick={() => setTechniqueFilter(f.key)}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 mb-1.5 block">
            味わい
          </span>
          <div className="flex flex-wrap gap-1.5">
            {TASTE_FILTERS.map((f) => (
              <FilterPill
                key={f.key}
                label={f.label}
                active={tasteFilter === f.key}
                onClick={() => setTasteFilter(f.key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 件数表示 */}
      <p className="text-xs text-gray-500">
        {filtered.length} 件のカクテル
      </p>

      {/* カクテルグリッド */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${baseFilter}-${techniqueFilter}-${tasteFilter}-${searchQuery}`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((c: CocktailRecipe) => (
            <motion.div
              key={c.id}
              variants={cardVariants}
              exit="exit"
              layout
              className="glass-card p-4 transition-all duration-300 flex flex-col cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: `0 0 12px ${c.color}15` }}
              onClick={() => setSelectedCocktail(c)}
            >
              {/* カクテル画像 */}
              <CocktailImage cocktail={c} />

              {/* カード名前 */}
              <div className="flex items-center gap-2 mb-1">
                <ColorDot color={c.color} size={12} />
                <h3 className="text-sm font-bold text-white flex-1 truncate">
                  {c.name}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">{c.nameEn}</p>

              {/* ベース・技法 */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span>ベース: {c.base}</span>
                <span className="text-gray-600">|</span>
                <span>
                  {TECHNIQUE_EMOJI[c.technique]}{' '}
                  {techniques.find((t) => t.id === c.technique)?.name || c.technique}
                </span>
              </div>

              {/* グラス */}
              <p className="text-xs text-gray-400 mb-3">
                <span className="text-gray-500">グラス:</span> {c.glass}
              </p>

              {/* 材料 */}
              <div className="border-t border-white/10 pt-2 mb-2">
                <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
                  材料
                </span>
                <ul className="mt-1 space-y-0.5">
                  {c.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-gray-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-cream shrink-0" />
                      <span className="flex-1 truncate">{ing.name}</span>
                      <span className="text-gray-500">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ガーニッシュ */}
              <div className="border-t border-white/10 pt-2 mb-2 text-xs">
                <span className="text-gray-500">ガーニッシュ:</span>{' '}
                <span className="text-gray-300">{c.garnish}</span>
              </div>

              {/* IBAカテゴリ */}
              {c.ibaCategory && (
                <div>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs border"
                    style={{
                      borderColor: `${c.color}50`,
                      color: c.color,
                    }}
                  >
                    {IBA_LABELS[c.ibaCategory] || c.ibaCategory}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FlaskConical size={40} className="mx-auto mb-3 opacity-40" />
          <p>条件に一致するカクテルが見つかりません</p>
        </div>
      )}

      {/* 詳細モーダル */}
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

// ─── タブ3: リキュール ──────────────────────────

function LiqueurImage({ liqueur }: { liqueur: Liqueur }) {
  const [hasError, setHasError] = useState(false);

  if (liqueur.imageUrl && !hasError) {
    return (
      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
        <img
          src={liqueur.imageUrl}
          alt={liqueur.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return null;
}

function LiqueursTab() {
  const grouped = useMemo(() => {
    const map: Record<string, Liqueur[]> = {};
    for (const l of liqueurs) {
      if (!map[l.category]) map[l.category] = [];
      map[l.category].push(l);
    }
    return map;
  }, []);

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(['herbal', 'fruit', 'nut', 'cream'] as const).map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        return (
          <motion.div key={cat} variants={cardVariants}>
            <h3 className="text-lg font-bold text-gray-200 mb-3 flex items-center gap-2">
              <Droplets size={18} className="text-accent-gold" />
              {LIQUEUR_CATEGORIES[cat]}
              <span className="text-xs text-gray-500 font-normal">
                ({items.length})
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {items.map((l: Liqueur) => (
                <motion.div
                  key={l.id}
                  className="glass-card p-4 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 14px ${l.color}20`,
                  }}
                  variants={cardVariants}
                >
                  <LiqueurImage liqueur={l} />
                  <div className="flex items-center gap-2 mb-2">
                    <ColorDot color={l.color} size={12} />
                    <h4 className="text-sm font-semibold text-white truncate">
                      {l.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{l.nameEn}</p>
                  <p className="text-xs text-gray-400 mb-1">{l.flavor}</p>
                  <p className="text-xs text-gray-500">
                    {l.alcoholPercent > 0
                      ? `${l.alcoholPercent}%`
                      : 'ノンアルコール'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── タブ4: バーツール ──────────────────────────

function ToolImage({ tool }: { tool: BarTool }) {
  const [hasError, setHasError] = useState(false);

  if (tool.imageUrl && !hasError) {
    return (
      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-white/5 flex items-center justify-center">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-contain p-2"
        />
      </div>
    );
  }

  return null;
}

function ToolsTab() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {barTools.map((t: BarTool) => {
        const ToolIcon = getToolIcon(t.id);
        return (
          <motion.div
            key={t.id}
            className="glass-card p-5 transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(201,169,110,0.1)' }}
            variants={cardVariants}
          >
            <ToolImage tool={t} />
            <div className="flex items-center gap-3 mb-3">
              {ToolIcon && (
                <ToolIcon size={28} color="#c9a96e" className="opacity-70" />
              )}
              <div>
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.nameEn}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{t.usage}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── タブ5: グラス ──────────────────────────────

function GlassImage({ glass }: { glass: GlassType }) {
  const [hasError, setHasError] = useState(false);
  const GlassIcon = getGlassIcon(glass.id);

  if (glass.imageUrl && !hasError) {
    return (
      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-white/5 flex items-center justify-center">
        <img
          src={glass.imageUrl}
          alt={glass.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full object-contain p-4"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
        <GlassIcon size={52} color="#c9a96e" className="opacity-80" />
      </div>
    </div>
  );
}

function GlassesTab() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {glasses.map((g: GlassType) => {
        return (
          <motion.div
            key={g.id}
            className="glass-card p-5 transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(201,169,110,0.1)' }}
            variants={cardVariants}
          >
            <GlassImage glass={g} />

            {/* テキスト情報 */}
            <div className="text-center mb-3">
              <h4 className="text-sm font-bold text-white">{g.name}</h4>
              <p className="text-xs text-gray-500">{g.nameEn}</p>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                <span className="text-gray-500">容量: </span>
                {g.capacity}
              </p>
              <p className="leading-relaxed">{g.usage}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── メインページ ────────────────────────────────

export default function EncyclopediaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'cocktails';

  const setTab = useCallback(
    (tab: TabKey) => {
      setSearchParams({ tab }, { replace: true });
    },
    [setSearchParams],
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'spirits':
        return <SpiritsTab />;
      case 'cocktails':
        return <CocktailsTab />;
      case 'liqueurs':
        return <LiqueursTab />;
      case 'tools':
        return <ToolsTab />;
      case 'glasses':
        return <GlassesTab />;
      default:
        return <SpiritsTab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
          図鑑
        </h1>
        <p className="text-sm text-gray-500">
          スピリッツ・カクテル・リキュール・バーツール・グラスの百科事典
        </p>
      </motion.div>

      {/* タブバー */}
      <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-1 min-w-max mx-auto w-fit bg-white/5 rounded p-1 border border-white/10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setTab(tab.key)}
                className={`relative px-4 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded bg-white/10 border border-white/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {/* ゴールド下線 */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent-gold"
                    style={{ boxShadow: '0 0 6px rgba(201,169,110,0.3)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.emoji}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* タブコンテンツ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
