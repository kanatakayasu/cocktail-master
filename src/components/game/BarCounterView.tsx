import { motion } from 'framer-motion';
import { Wine, Refrigerator, Wrench, GlassWater } from 'lucide-react';
import type { ShelfArea, CounterItem, TechniqueType, ContainerId, ContainerState } from '../../types/game';
import { getIngredient } from '../../data/ingredientsCatalog';
import CounterSurface from './CounterSurface';

interface BarCounterViewProps {
  counterItems: CounterItem[];
  selectedGlassId: string | null;
  cocktailColor: string;
  containers: Record<ContainerId, ContainerState>;
  animatingTechnique: string | null;
  onShelfTap: (shelf: ShelfArea) => void;
  onPour: (itemId: string, containerId: ContainerId) => void;
  onTopUp: (itemId: string) => void;
  onAddIce: (containerId: ContainerId) => void;
  onPerformTechnique: (technique: TechniqueType, containerId?: ContainerId) => void;
  onPourToGlass: (fromContainerId: ContainerId) => void;
  onGarnish: (garnishId: string) => void;
  onRemove: (itemId: string) => void;
}

export default function BarCounterView({
  counterItems,
  selectedGlassId,
  cocktailColor,
  containers,
  animatingTechnique,
  onShelfTap,
  onPour,
  onTopUp,
  onAddIce,
  onPerformTechnique,
  onPourToGlass,
  onGarnish,
  onRemove,
}: BarCounterViewProps) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* ===== バックバーエリア (キッチン側) ===== */}
      <div className="relative">
        {/* 壁面背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050c07] via-[#0d1a12] to-[#162219]" />

        {/* 天井照明 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.15),transparent_70%)]" />
          <div className="absolute top-0 left-[15%] w-40 h-24 bg-[radial-gradient(ellipse_at_top,rgba(232,184,74,0.08),transparent_70%)]" />
          <div className="absolute top-0 right-[15%] w-40 h-24 bg-[radial-gradient(ellipse_at_top,rgba(232,184,74,0.06),transparent_70%)]" />
        </div>
        {/* 天井ライン */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

        {/* ===== 棚レイアウト: 左=冷蔵庫 / 中央=酒棚(大) / 右上=グラス棚 / 右下=ツール棚 ===== */}
        <div className="relative grid grid-cols-12 gap-1.5 sm:gap-2 p-2 sm:p-3" style={{ minHeight: 260 }}>
          {/* 左: 冷蔵庫 (縦長) */}
          <div className="col-span-3 row-span-2">
            <ShelfButton
              shelfId="fridge"
              label="冷蔵庫"
              Icon={Refrigerator}
              count={countItemsFromShelf(counterItems, 'fridge')}
              onTap={onShelfTap}
              className="h-full"
              delay={0}
            >
              <FridgeDecoration />
            </ShelfButton>
          </div>

          {/* 中央: 酒棚 (大きく占有) */}
          <div className="col-span-6 row-span-2">
            <ShelfButton
              shelfId="liquorShelf"
              label="酒棚"
              Icon={Wine}
              count={countItemsFromShelf(counterItems, 'liquorShelf')}
              onTap={onShelfTap}
              className="h-full"
              delay={0.05}
            >
              <LiquorShelfDecoration />
            </ShelfButton>
          </div>

          {/* 右上: グラス棚 */}
          <div className="col-span-3">
            <ShelfButton
              shelfId="glassShelf"
              label="グラス棚"
              Icon={GlassWater}
              count={countItemsFromShelf(counterItems, 'glassShelf')}
              onTap={onShelfTap}
              className="h-full"
              delay={0.1}
            >
              <GlassShelfDecoration />
            </ShelfButton>
          </div>

          {/* 右下: ツール棚 */}
          <div className="col-span-3">
            <ShelfButton
              shelfId="toolShelf"
              label="ツール棚"
              Icon={Wrench}
              count={countItemsFromShelf(counterItems, 'toolShelf')}
              onTap={onShelfTap}
              className="h-full"
              delay={0.15}
            >
              <ToolShelfDecoration />
            </ShelfButton>
          </div>
        </div>
      </div>

      {/* ===== カウンターエッジ (ゴールドライン) ===== */}
      <div className="relative h-[6px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b5e3c] to-[#6b4226]" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
        <div className="absolute inset-x-0 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ===== カウンター天板 ===== */}
      <div className="relative">
        {/* 木のカウンターグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7a4a2e] via-[#6b4226] to-[#3e2214]" />
        {/* 木目テクスチャ */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 7px),
            repeating-linear-gradient(2deg, transparent, transparent 14px, rgba(0,0,0,0.08) 14px, rgba(0,0,0,0.08) 15px)
          `,
        }} />
        {/* 表面反射 */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.07] to-transparent" />
        {/* 反射のハイライトライン */}
        <div className="absolute top-3 left-[5%] w-[40%] h-[1px] bg-white/[0.04]" />
        <div className="absolute top-4 right-[8%] w-[30%] h-[1px] bg-white/[0.03]" />

        {/* カウンター前面 (下部の暗い部分) */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#3e2214] to-[#2a1610]" />
        {/* 前面の装飾パネル */}
        <div className="absolute bottom-1 left-[5%] w-[25%] h-10 rounded border border-white/[0.02] bg-white/[0.01]" />
        <div className="absolute bottom-1 left-[35%] w-[30%] h-10 rounded border border-white/[0.02] bg-white/[0.01]" />
        <div className="absolute bottom-1 right-[5%] w-[25%] h-10 rounded border border-white/[0.02] bg-white/[0.01]" />

        {/* カウンターコンテンツ */}
        <div className="relative z-10 px-3 sm:px-5 pt-4 pb-16">
          <h3
            className="text-[10px] text-accent-gold/60 font-medium mb-3 text-center uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            カウンター
          </h3>
          <CounterSurface
            counterItems={counterItems}
            selectedGlassId={selectedGlassId}
            cocktailColor={cocktailColor}
            containers={containers}
            animatingTechnique={animatingTechnique}
            onPour={onPour}
            onTopUp={onTopUp}
            onAddIce={onAddIce}
            onPerformTechnique={onPerformTechnique}
            onPourToGlass={onPourToGlass}
            onGarnish={onGarnish}
            onRemove={onRemove}
          />
        </div>
      </div>
    </div>
  );
}

/* ===== 棚ボタン共通コンポーネント ===== */
function ShelfButton({
  shelfId,
  label,
  Icon,
  count,
  onTap,
  className = '',
  delay = 0,
  children,
}: {
  shelfId: ShelfArea;
  label: string;
  Icon: typeof Wine;
  count: number;
  onTap: (shelf: ShelfArea) => void;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  const gradients: Record<ShelfArea, string> = {
    liquorShelf: 'from-amber-950/50 to-amber-950/70',
    fridge: 'from-slate-800/50 to-blue-950/50',
    toolShelf: 'from-stone-900/50 to-stone-950/60',
    glassShelf: 'from-amber-950/30 to-amber-950/50',
  };

  return (
    <motion.button
      onClick={() => onTap(shelfId)}
      className={`relative bg-gradient-to-br ${gradients[shelfId]} rounded-lg border border-white/[0.06] overflow-hidden group w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ borderColor: 'rgba(201,169,110,0.3)' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 棚装飾SVG */}
      {children}

      {/* ホバー */}
      <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/[0.06] transition-colors duration-300 z-[1]" />

      {/* ラベル */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 z-[2]">
        <Icon size={20} className="text-white/30 group-hover:text-accent-gold/60 transition-colors" />
        <span
          className="text-xs sm:text-sm text-white/40 group-hover:text-accent-gold/70 font-medium transition-colors"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {label}
        </span>
      </div>

      {/* 持ち込み数バッジ */}
      {count > 0 && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent-gold/80 text-bar-dark text-[10px] font-bold flex items-center justify-center z-[3]">
          {count}
        </div>
      )}
    </motion.button>
  );
}

/* ===== 各棚のSVG装飾 ===== */

function LiquorShelfDecoration() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 300 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* 棚板3段 */}
      <rect x="10" y="55" width="280" height="4" rx="1" fill="#8b5e3c" opacity={0.5} />
      <rect x="10" y="115" width="280" height="4" rx="1" fill="#8b5e3c" opacity={0.5} />
      <rect x="10" y="175" width="280" height="4" rx="1" fill="#8b5e3c" opacity={0.4} />

      {/* 1段目: 背の高いボトル */}
      <path d="M30 55 L30 22 C30 18 33 14 36 14 L38 14 C41 14 44 18 44 22 L44 55" fill="#1b3022" opacity={0.5} />
      <path d="M60 55 L60 15 C60 12 62 10 65 10 L67 10 C70 10 72 12 72 15 L72 55" fill="#1b3022" opacity={0.55} />
      <path d="M95 55 L95 20 C95 17 97 15 99 15 L103 15 C105 15 107 17 107 20 L107 55" fill="#1b3022" opacity={0.5} />
      <path d="M130 55 L130 12 C130 9 132 7 135 7 L137 7 C140 7 142 9 142 12 L142 55" fill="#1b3022" opacity={0.6} />
      <path d="M165 55 L165 18 C165 15 167 13 170 13 L172 13 C175 13 177 15 177 18 L177 55" fill="#1b3022" opacity={0.5} />
      <path d="M200 55 L200 22 C200 19 203 17 205 17 L209 17 C211 17 214 19 214 22 L214 55" fill="#1b3022" opacity={0.55} />
      <path d="M240 55 L240 14 C240 11 242 9 245 9 L247 9 C250 9 252 11 252 14 L252 55" fill="#1b3022" opacity={0.5} />

      {/* 2段目: 短めの丸ボトル */}
      <path d="M25 115 L25 78 C25 74 28 70 32 70 L36 70 C40 70 43 74 43 78 L43 115" fill="#1b3022" opacity={0.45} />
      <path d="M60 115 L60 82 C60 78 62 76 65 76 L69 76 C72 76 74 78 74 82 L74 115" fill="#1b3022" opacity={0.5} />
      <path d="M95 115 L95 75 C95 72 97 70 100 70 L104 70 C107 70 109 72 109 75 L109 115" fill="#1b3022" opacity={0.55} />
      <path d="M130 115 L130 80 C130 76 132 74 135 74 L139 74 C142 74 144 76 144 80 L144 115" fill="#1b3022" opacity={0.45} />
      <path d="M165 115 L165 72 C165 69 167 67 170 67 L172 67 C175 67 177 69 177 72 L177 115" fill="#1b3022" opacity={0.5} />
      <path d="M200 115 L200 84 C200 80 203 78 206 78 L210 78 C213 78 216 80 216 84 L216 115" fill="#1b3022" opacity={0.5} />
      <path d="M240 115 L240 76 C240 73 242 71 245 71 L249 71 C252 71 254 73 254 76 L254 115" fill="#1b3022" opacity={0.45} />

      {/* ラベルのヒント */}
      <rect x="33" y="90" width="7" height="10" rx="1" fill="#c9a96e" opacity={0.06} />
      <rect x="133" y="86" width="8" height="12" rx="1" fill="#e8dcc8" opacity={0.05} />
      <rect x="243" y="88" width="7" height="10" rx="1" fill="#c9a96e" opacity={0.05} />

      {/* アンバーグロー */}
      <defs>
        <radialGradient id="lq-glow" cx="0.5" cy="0.15" r="0.8">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="300" height="200" fill="url(#lq-glow)" />
    </svg>
  );
}

function FridgeDecoration() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 120 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* 冷蔵庫本体 */}
      <rect x="8" y="8" width="104" height="184" rx="3" fill="#2a3040" opacity={0.5} stroke="#444" strokeWidth={0.8} />
      {/* ドアの縁（ゴムパッキン） */}
      <rect x="12" y="12" width="96" height="176" rx="2" fill="none" stroke="#333" strokeWidth={1.2} />
      {/* ハンドル */}
      <rect x="96" y="60" width="5" height="80" rx="2.5" fill="#556" opacity={0.7} />
      <rect x="97" y="65" width="2" height="30" rx="1" fill="#889" opacity={0.3} />
      {/* 棚 */}
      <line x1="18" y1="70" x2="90" y2="70" stroke="#445" strokeWidth={1} opacity={0.5} />
      <line x1="18" y1="120" x2="90" y2="120" stroke="#445" strokeWidth={1} opacity={0.5} />
      {/* ボトル/パック */}
      <rect x="24" y="30" width="14" height="35" rx="2" fill="#3a4a5a" opacity={0.35} />
      <rect x="44" y="35" width="12" height="30" rx="1" fill="#3a4a5a" opacity={0.3} />
      <rect x="64" y="32" width="14" height="33" rx="2" fill="#3a4a5a" opacity={0.3} />
      <rect x="24" y="78" width="12" height="35" rx="1" fill="#3a4a5a" opacity={0.3} />
      <path d="M50 120 L50 85 L60 78 L70 85 L70 120" fill="#3a4a5a" opacity={0.25} />
      {/* クールグロー */}
      <defs>
        <radialGradient id="fr-glow" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#88c8e8" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#88c8e8" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="104" height="184" rx="3" fill="url(#fr-glow)" />
      {/* LED インジケータ */}
      <circle cx="85" cy="18" r="2" fill="#4488cc" opacity={0.4} />
    </svg>
  );
}

function GlassShelfDecoration() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 120 100" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* 棚板 (光る縁) */}
      <line x1="8" y1="40" x2="112" y2="40" stroke="#c9a96e" strokeWidth={0.8} opacity={0.35} />
      <line x1="8" y1="75" x2="112" y2="75" stroke="#c9a96e" strokeWidth={0.8} opacity={0.3} />
      {/* バックライト */}
      <defs>
        <radialGradient id="gl-glow" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.07} />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="120" height="100" fill="url(#gl-glow)" />
      {/* カクテルグラス */}
      <path d="M25 40 L35 40 L30 30 Z" fill="none" stroke="#888" strokeWidth={0.8} opacity={0.35} />
      <line x1="30" y1="30" x2="30" y2="24" stroke="#888" strokeWidth={0.6} opacity={0.3} />
      <line x1="27" y1="24" x2="33" y2="24" stroke="#888" strokeWidth={0.6} opacity={0.3} />
      {/* タンブラー */}
      <path d="M55 40 L56 22 L68 22 L69 40" fill="none" stroke="#888" strokeWidth={0.8} opacity={0.3} />
      {/* ロックグラス */}
      <path d="M88 40 L89 28 L103 28 L104 40" fill="none" stroke="#888" strokeWidth={0.8} opacity={0.3} />
      {/* クープ */}
      <path d="M25 75 L25 66 C25 62 30 59 35 59 C40 59 45 62 45 66 L45 75" fill="none" stroke="#888" strokeWidth={0.7} opacity={0.25} />
      <line x1="35" y1="59" x2="35" y2="53" stroke="#888" strokeWidth={0.5} opacity={0.25} />
      {/* ワイングラス */}
      <path d="M70 75 L70 65 C70 62 75 59 80 59 C85 59 90 62 90 65 L90 75" fill="none" stroke="#888" strokeWidth={0.7} opacity={0.25} />
      <line x1="80" y1="59" x2="80" y2="52" stroke="#888" strokeWidth={0.5} opacity={0.25} />
    </svg>
  );
}

function ToolShelfDecoration() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 120 100" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* ペグボード穴 */}
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={15 + col * 18} cy={12 + row * 18} r="1" fill="#555" opacity={0.2} />
        ))
      )}
      {/* シェイカー */}
      <path d="M22 80 L22 40 C22 36 24 34 27 34 L31 34 C34 34 36 36 36 40 L36 80" fill="#3a3a3a" opacity={0.35} />
      <rect x="25" y="28" width="8" height="8" rx="1.5" fill="#3a3a3a" opacity={0.35} />
      {/* ミキシンググラス */}
      <path d="M56 80 L58 30 L76 30 L78 80" fill="#3a3a3a" opacity={0.25} />
      <path d="M58 30 L76 30" stroke="#555" strokeWidth={0.8} opacity={0.3} />
      {/* ブレンダー */}
      <path d="M94 80 L96 50 L110 50 L112 80" fill="#3a3a3a" opacity={0.3} />
      <rect x="98" y="38" width="10" height="14" rx="2" fill="#3a3a3a" opacity={0.3} />
      <rect x="101" y="32" width="4" height="8" rx="1" fill="#3a3a3a" opacity={0.25} />
    </svg>
  );
}

function countItemsFromShelf(counterItems: CounterItem[], shelfId: ShelfArea): number {
  const toolIds = ['three-piece-shaker', 'mixing-glass', 'blender'];
  if (shelfId === 'toolShelf') {
    return counterItems.filter(ci => ci.itemType === 'tool' && toolIds.includes(ci.itemId)).length;
  }
  if (shelfId === 'glassShelf') {
    return counterItems.filter(ci => ci.itemType === 'glass').length;
  }
  return counterItems.filter(ci => {
    if (ci.itemType !== 'ingredient') return false;
    const ing = getIngredient(ci.itemId);
    return ing?.shelfArea === shelfId;
  }).length;
}
