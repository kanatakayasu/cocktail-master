import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Droplets, ArrowRight, Flower2, X } from 'lucide-react';
import type { CounterItem, TechniqueType, ContainerId, ContainerState } from '../../types/game';
import { getIngredient } from '../../data/ingredientsCatalog';
import { getToolIcon } from '../BarIcons';
import { getBottleForIngredient } from './SpiritBottles';
import { getGarnishComponent } from './GarnishIllustration';

interface CounterSurfaceProps {
  counterItems: CounterItem[];
  selectedGlassId: string | null;
  cocktailColor: string;
  containers: Record<ContainerId, ContainerState>;
  animatingTechnique: string | null;
  onPour: (itemId: string, containerId: ContainerId) => void;
  onTopUp: (itemId: string) => void;
  onAddIce: (containerId: ContainerId) => void;
  onPerformTechnique: (technique: TechniqueType, containerId?: ContainerId) => void;
  onPourToGlass: (fromContainerId: ContainerId) => void;
  onGarnish: (garnishId: string) => void;
  onRemove: (itemId: string) => void;
}

const TECHNIQUE_LABELS: Record<TechniqueType, string> = {
  build: 'ビルド',
  stir: 'ステア',
  shake: 'シェイク',
  blend: 'ブレンド',
};

const CONTAINER_LABELS: Record<ContainerId, string> = {
  glass: 'グラス',
  mixingGlass: 'ミキシンググラス',
  shaker: 'シェーカー',
  blender: 'ブレンダー',
};

// ツールIDからコンテナIDへ
function toolToContainer(toolId: string): ContainerId | null {
  switch (toolId) {
    case 'mixing-glass': return 'mixingGlass';
    case 'three-piece-shaker': return 'shaker';
    case 'blender': return 'blender';
    default: return null;
  }
}

export default function CounterSurface({
  counterItems,
  selectedGlassId,
  cocktailColor,
  containers,
  animatingTechnique,
  onPour,
  onTopUp,
  onAddIce,
  onPerformTechnique,
  onPourToGlass,
  onGarnish,
  onRemove,
}: CounterSurfaceProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeContainerId, setActiveContainerId] = useState<ContainerId | null>(null);

  const allIngredientItems = counterItems.filter(ci => ci.itemType === 'ingredient');
  const ingredientItems = allIngredientItems.filter(ci => getIngredient(ci.itemId)?.categoryId !== 'garnish');
  const garnishItems = allIngredientItems.filter(ci => getIngredient(ci.itemId)?.categoryId === 'garnish');
  const toolItems = counterItems.filter(ci => ci.itemType === 'tool');

  // アクティブなコンテナ（ツール）を取得
  const activeToolContainer = toolItems.find(ci => ci.status === 'inUse');
  const activeToolContainerId = activeToolContainer ? toolToContainer(activeToolContainer.itemId) : null;

  // 注ぎ先の候補を決定
  const pourTargets: ContainerId[] = [];
  if (selectedGlassId) pourTargets.push('glass');
  if (activeToolContainerId) pourTargets.push(activeToolContainerId);

  return (
    <div className="relative space-y-4">
      {/* Technique animation */}
      <AnimatePresence>
        {animatingTechnique && (
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <TechniqueAnimation technique={animatingTechnique} />
            <p className="text-accent-gold text-sm mt-2">
              {animatingTechnique === 'shake' ? 'シェイク中...' :
               animatingTechnique === 'stir' ? 'ステア中...' :
               animatingTechnique === 'blend' ? 'ブレンド中...' : 'ビルド中...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== 材料エリア（上段・メイン） ===== */}
      <div className="space-y-2">
        <p className="text-[10px] text-text-muted uppercase tracking-wider text-center">材料</p>
        <div className="flex flex-wrap justify-center gap-2">
          {ingredientItems.length > 0 ? ingredientItems.map(ci => {
            const ing = getIngredient(ci.itemId);
            if (!ing) return null;
            const Bottle = getBottleForIngredient(ci.itemId, ing.categoryId);
            const isUsed = ci.status === 'used';

            return (
              <motion.button
                key={ci.itemId}
                onClick={() => {
                  if (!isUsed) {
                    setActiveItemId(activeItemId === ci.itemId ? null : ci.itemId);
                  }
                }}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeItemId === ci.itemId
                    ? 'bg-accent-gold/20 ring-1 ring-accent-gold/40'
                    : isUsed
                      ? 'opacity-40'
                      : 'hover:bg-white/5'
                }`}
                whileTap={{ scale: 0.95 }}
                layout
              >
                <Bottle size={48} liquidColor={ing.color} isUsed={isUsed} />
                <span className="text-[10px] text-text-secondary leading-tight max-w-[56px] text-center truncate">
                  {ing.label}
                </span>
              </motion.button>
            );
          }) : (
            <div className="w-full h-20 border-2 border-dashed border-glass-border/50 rounded-lg flex items-center justify-center">
              <span className="text-text-muted text-xs text-center">
                棚から材料を選択
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ===== ガーニッシュ ===== */}
      {garnishItems.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] text-text-muted uppercase tracking-wider text-center">ガーニッシュ</p>
          <div className="flex flex-wrap justify-center gap-2">
            {garnishItems.map(ci => {
              const ing = getIngredient(ci.itemId);
              if (!ing) return null;
              const isUsed = ci.status === 'used';
              const GarnishIcon = getGarnishComponent(ci.itemId);

              return (
                <motion.button
                  key={ci.itemId}
                  onClick={() => {
                    if (!isUsed) {
                      setActiveItemId(activeItemId === ci.itemId ? null : ci.itemId);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeItemId === ci.itemId
                      ? 'bg-accent-gold/20 ring-1 ring-accent-gold/40'
                      : isUsed
                        ? 'opacity-40'
                        : 'bg-white/[0.03] hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  {GarnishIcon ? <GarnishIcon size={28} /> : <Flower2 size={20} className="text-green-400" />}
                  <span className="text-[10px] text-text-secondary leading-tight">
                    {ing.label}
                  </span>
                  {isUsed && <span className="text-[10px] text-accent-gold">✓</span>}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== グラス＆ツール（下段・コンパクト） ===== */}
      <div className="grid grid-cols-2 gap-3">
        {/* グラスコーナー */}
        <div className="space-y-2">
          <p className="text-[10px] text-text-muted uppercase tracking-wider text-center">グラス</p>
          <div className="flex justify-center">
            {selectedGlassId ? (
              <motion.button
                onClick={() => setActiveContainerId(activeContainerId === 'glass' ? null : 'glass')}
                className={`relative p-2 rounded-lg transition-all ${
                  activeContainerId === 'glass'
                    ? 'bg-accent-gold/20 ring-1 ring-accent-gold/40'
                    : 'hover:bg-white/5'
                }`}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                whileTap={{ scale: 0.95 }}
              >
                <CocktailGlassDisplay
                  glassId={selectedGlassId}
                  color={containers.glass.ingredients.length > 0 ? cocktailColor : 'transparent'}
                  hasIce={containers.glass.hasIce}
                />
                {containers.glass.ingredients.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-gold/80 text-bar-dark text-[9px] font-bold flex items-center justify-center">
                    {containers.glass.ingredients.length}
                  </div>
                )}
              </motion.button>
            ) : (
              <div className="w-16 h-16 border-2 border-dashed border-glass-border/50 rounded-lg flex items-center justify-center">
                <span className="text-text-muted text-[9px] text-center leading-tight">
                  グラス棚<br />から選択
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ツールコーナー */}
        <div className="space-y-2">
          <p className="text-[10px] text-text-muted uppercase tracking-wider text-center">ツール</p>
          <div className="flex flex-wrap justify-center gap-1">
            {toolItems.length > 0 ? toolItems.map(ci => {
              const ToolIcon = getToolIcon(ci.itemId);
              const containerId = toolToContainer(ci.itemId);
              const container = containerId ? containers[containerId] : null;
              const isActive = containerId && activeContainerId === containerId;

              return (
                <motion.button
                  key={ci.itemId}
                  onClick={() => {
                    if (containerId) {
                      setActiveContainerId(isActive ? null : containerId);
                    }
                  }}
                  className={`relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-accent-gold/20 ring-1 ring-accent-gold/40'
                      : 'hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  {ToolIcon ? <ToolIcon size={32} color="#c9a96e" /> : <span className="text-xl">🔧</span>}
                  <span className="text-[9px] text-text-secondary leading-tight max-w-[56px] text-center truncate">
                    {containerId ? CONTAINER_LABELS[containerId] : ci.itemId}
                  </span>
                  {container && container.ingredients.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-gold/80 text-bar-dark text-[9px] font-bold flex items-center justify-center">
                      {container.ingredients.length}
                    </div>
                  )}
                </motion.button>
              );
            }) : (
              <div className="w-16 h-16 border-2 border-dashed border-glass-border/50 rounded-lg flex items-center justify-center">
                <span className="text-text-muted text-[9px] text-center leading-tight">
                  ツール棚<br />から選択
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== 材料タップ → アクション選択 ===== */}
      <AnimatePresence>
        {activeItemId && (() => {
          const activeIng = getIngredient(activeItemId);
          const isGarnish = activeIng?.categoryId === 'garnish';
          return (
          <motion.div
            className="bg-bar-green/95 backdrop-blur-xl border border-glass-border rounded-lg shadow-xl p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-text-primary font-medium">
                {activeIng?.label}{isGarnish ? ' を飾る' : ' を注ぐ先を選択'}
              </p>
              <button onClick={() => setActiveItemId(null)} className="text-text-muted hover:text-text-primary">
                <X size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {isGarnish ? (
                /* ガーニッシュ → 飾るアクション */
                <motion.button
                  onClick={() => {
                    onGarnish(activeItemId);
                    setActiveItemId(null);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-text-primary text-xs transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  <Flower2 size={14} className="text-green-400" />
                  グラスに飾る
                </motion.button>
              ) : (
                /* 通常材料 → 注ぎ先候補 */
                pourTargets.map(cId => {
                  const canTopUp = activeIng?.categoryId === 'mixer' || activeIng?.categoryId === 'juice';
                  return (
                    <motion.button
                      key={cId}
                      onClick={() => {
                        if (canTopUp && cId === 'glass') {
                          onTopUp(activeItemId);
                        } else {
                          onPour(activeItemId, cId);
                        }
                        setActiveItemId(null);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-text-primary text-xs transition-colors"
                      whileTap={{ scale: 0.97 }}
                    >
                      <Droplets size={14} className="text-accent-gold" />
                      {CONTAINER_LABELS[cId]}に{canTopUp && cId === 'glass' ? '満たす' : '注ぐ'}
                    </motion.button>
                  );
                })
              )}
              {/* カウンターから戻す */}
              <motion.button
                onClick={() => { onRemove(activeItemId); setActiveItemId(null); }}
                className="flex items-center gap-2 px-3 py-2 rounded text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                カウンターから戻す
              </motion.button>
            </div>
          </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ===== コンテナステータス表示 ===== */}
      <AnimatePresence>
        {activeContainerId && (
          <ContainerStatusPanel
            containerId={activeContainerId}
            container={containers[activeContainerId]}
            isGlass={activeContainerId === 'glass'}
            onAddIce={() => onAddIce(activeContainerId)}
            onPerformTechnique={(tech) => onPerformTechnique(tech, activeContainerId)}
            onPourToGlass={() => {
              onPourToGlass(activeContainerId);
              setActiveContainerId(null);
            }}
            onRemoveTool={activeContainerId !== 'glass' ? () => {
              const toolItem = toolItems.find(ci => toolToContainer(ci.itemId) === activeContainerId);
              if (toolItem) onRemove(toolItem.itemId);
              setActiveContainerId(null);
            } : undefined}
            onClose={() => setActiveContainerId(null)}
          />
        )}
      </AnimatePresence>

      {counterItems.length === 0 && !selectedGlassId && (
        <p className="text-center text-text-muted text-sm py-6">
          棚からアイテムを選んで<br />カウンターに持ち込みましょう
        </p>
      )}
    </div>
  );
}

/* ===== コンテナステータスパネル ===== */
function ContainerStatusPanel({
  containerId,
  container,
  isGlass,
  onAddIce,
  onPerformTechnique,
  onPourToGlass,
  onRemoveTool,
  onClose,
}: {
  containerId: ContainerId;
  container: ContainerState;
  isGlass: boolean;
  onAddIce: () => void;
  onPerformTechnique: (tech: TechniqueType) => void;
  onPourToGlass: () => void;
  onRemoveTool?: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="bg-bar-green/95 backdrop-blur-xl border border-glass-border rounded-lg shadow-xl p-3 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-accent-gold">
          {CONTAINER_LABELS[containerId]}
        </h4>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary">
          <X size={14} />
        </button>
      </div>

      {/* 中身表示 */}
      <div className="space-y-1">
        {container.ingredients.length === 0 && !container.hasIce && !container.technique ? (
          <p className="text-xs text-text-muted">空</p>
        ) : (
          <>
            {container.hasIce && (
              <div className="flex items-center gap-2 text-xs text-blue-300">
                <Snowflake size={12} />
                <span>氷</span>
              </div>
            )}
            {container.ingredients.map((ingId, idx) => {
              const ing = getIngredient(ingId);
              return (
                <div key={`${ingId}-${idx}`} className="flex items-center gap-2 text-xs text-text-secondary">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ing?.color || '#888' }} />
                  <span>{ing?.label || ingId}</span>
                </div>
              );
            })}
            {container.technique && (
              <div className="flex items-center gap-2 text-xs text-accent-gold mt-1">
                <span>→</span>
                <span>{TECHNIQUE_LABELS[container.technique]}済み</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* アクション */}
      <div className="flex flex-wrap gap-2">
        {/* 氷を入れる */}
        {!container.hasIce && (
          <motion.button
            onClick={onAddIce}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/10 text-blue-300 text-xs hover:bg-blue-500/20 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <Snowflake size={12} />
            氷を入れる
          </motion.button>
        )}

        {/* 技法実行（コンテナに材料があり、まだ技法が適用されていない） */}
        {container.ingredients.length > 0 && !container.technique && (
          <>
            {isGlass ? (
              <motion.button
                onClick={() => onPerformTechnique('build')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-gold/10 text-accent-gold text-xs hover:bg-accent-gold/20 transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                ビルド（軽く混ぜる）
              </motion.button>
            ) : (
              <>
                {containerId === 'mixingGlass' && (
                  <motion.button
                    onClick={() => onPerformTechnique('stir')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-gold/10 text-accent-gold text-xs hover:bg-accent-gold/20 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    ステア
                  </motion.button>
                )}
                {containerId === 'shaker' && (
                  <motion.button
                    onClick={() => onPerformTechnique('shake')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-gold/10 text-accent-gold text-xs hover:bg-accent-gold/20 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    シェイク
                  </motion.button>
                )}
                {containerId === 'blender' && (
                  <motion.button
                    onClick={() => onPerformTechnique('blend')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-gold/10 text-accent-gold text-xs hover:bg-accent-gold/20 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    ブレンド
                  </motion.button>
                )}
              </>
            )}
          </>
        )}

        {/* グラスに注ぐ（ツールコンテナのみ、中身がある場合） */}
        {!isGlass && container.ingredients.length > 0 && (
          <motion.button
            onClick={onPourToGlass}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-cream/10 text-accent-cream text-xs hover:bg-accent-cream/20 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <ArrowRight size={12} />
            グラスに注ぐ
          </motion.button>
        )}

        {/* カウンターから戻す（ツールのみ） */}
        {onRemoveTool && (
          <motion.button
            onClick={onRemoveTool}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-red-400 hover:bg-red-500/10 text-xs transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            戻す
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ===== Glass with liquid display ===== */
function CocktailGlassDisplay({ glassId, color, hasIce }: { glassId: string; color: string; hasIce: boolean }) {
  if (glassId === 'cocktail-glass' || glassId === 'coupe-glass' || glassId === 'sour-glass') {
    return (
      <div className="relative">
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M14 14 L50 14 L32 36 Z" fill={color} fillOpacity={0.6} />
          <path d="M14 14 L50 14" stroke="rgba(255,255,255,0.3)" strokeWidth={0.5} />
          <path d="M10 10 L54 10 L32 38 Z" fill="none" stroke="#c9a96e" strokeWidth={1.5} strokeLinejoin="round" />
          <line x1="32" y1="38" x2="32" y2="52" stroke="#c9a96e" strokeWidth={1.5} />
          <line x1="22" y1="52" x2="42" y2="52" stroke="#c9a96e" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
        {hasIce && (
          <motion.div className="absolute top-1 right-1" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Snowflake size={10} className="text-blue-200/60" />
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width="48" height="60" viewBox="0 0 64 80" fill="none">
        <path d="M18 8 L19 72 L45 72 L46 8 Z" fill="rgba(255,255,255,0.08)" stroke="#c9a96e" strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M19 28 L19.6 72 L44.4 72 L45 28 Z" fill={color} fillOpacity={0.5} />
        {hasIce && (
          <>
            <rect x="23" y="30" width="8" height="7" rx="1.5" fill="#d0ecf8" fillOpacity={0.4} stroke="#a0d4ef" strokeWidth={0.5} />
            <rect x="33" y="32" width="7" height="6" rx="1.5" fill="#d0ecf8" fillOpacity={0.35} stroke="#a0d4ef" strokeWidth={0.5} />
          </>
        )}
        <line x1="18" y1="8" x2="46" y2="8" stroke="#c9a96e" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ===== Technique animations ===== */
function TechniqueAnimation({ technique }: { technique: string }) {
  if (technique === 'shake') {
    return (
      <motion.div
        animate={{ x: [-8, 8, -8, 8, 0], y: [-4, 4, -4, 4, 0] }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="text-4xl"
      >
        🍸
      </motion.div>
    );
  }
  if (technique === 'stir') {
    return (
      <motion.div
        animate={{ rotate: [0, 360, 720] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="text-4xl"
      >
        🥄
      </motion.div>
    );
  }
  if (technique === 'blend') {
    return (
      <motion.div
        animate={{ y: [-2, 2, -2], scale: [1, 1.05, 1] }}
        transition={{ duration: 0.3, repeat: 6 }}
        className="text-4xl"
      >
        ⚡
      </motion.div>
    );
  }
  // build
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl"
    >
      💧
    </motion.div>
  );
}
