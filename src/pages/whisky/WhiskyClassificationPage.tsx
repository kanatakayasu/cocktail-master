import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  TreePine,
  List,
  Expand,
  Shrink,
  GitBranch,
} from 'lucide-react';
import { whiskyTree } from '../../data/whisky';
import type { WhiskyTreeNode } from '../../types/whisky';

/* ──────────────────────────────────────
   ヘルパー: ツリー全パスの収集
   ────────────────────────────────────── */

function collectAllPaths(node: WhiskyTreeNode, prefix = ''): string[] {
  const path = prefix ? `${prefix}/${node.name}` : node.name;
  if (!node.children) return [];
  let paths = [path];
  for (const child of node.children) {
    paths = paths.concat(collectAllPaths(child, path));
  }
  return paths;
}

/* ──────────────────────────────────────
   レベル別カラー
   ────────────────────────────────────── */

function getLevelColor(level: number, node: WhiskyTreeNode): string {
  // 末端ノードはデータの color を優先
  if (!node.children || node.children.length === 0) {
    return node.color ?? '#e2e8f0';
  }
  switch (level) {
    case 0:
      return '#e2e8f0'; // 白
    case 1:
      return node.color ?? '#c9a96e';
    case 2:
      return node.color ?? '#bb2121';
    default:
      return node.color ?? '#e2e8f0';
  }
}

/* ──────────────────────────────────────
   ツリーマップ: 再帰ノードコンポーネント
   ────────────────────────────────────── */

interface TreeNodeProps {
  node: WhiskyTreeNode;
  level: number;
  path: string;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  staggerIndex: number;
}

function TreeNode({ node, level, path, expanded, onToggle, staggerIndex }: TreeNodeProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expanded.has(path);
  const color = getLevelColor(level, node);
  const isLeaf = !hasChildren;

  return (
    <div className="flex flex-col items-center">
      {/* ノード本体 */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, delay: staggerIndex * 0.04, ease: 'easeOut' }}
        onClick={() => hasChildren && onToggle(path)}
        className={`
          glass-card px-4 py-2.5 flex items-center gap-2 select-none
          transition-all duration-200 relative
          ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
          ${isExpanded ? 'ring-1' : ''}
        `}
        style={{
          borderColor: isExpanded ? color : undefined,
          boxShadow: isExpanded ? `0 0 12px ${color}40` : undefined,
          ...(isExpanded ? { ringColor: color } : {}),
        }}
        whileHover={
          hasChildren
            ? { scale: 1.04, boxShadow: `0 0 18px ${color}50` }
            : { boxShadow: `0 0 10px ${color}30` }
        }
      >
        {/* 色インジケーター */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        {/* テキスト */}
        <span className="text-sm font-medium whitespace-nowrap" style={{ color }}>
          {node.name}
        </span>
        {isLeaf && node.nameEn && (
          <span className="text-xs text-gray-500 whitespace-nowrap ml-1">
            {node.nameEn}
          </span>
        )}

        {/* 展開アイコン */}
        {hasChildren && (
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronRight size={14} style={{ color }} />
          </motion.span>
        )}
      </motion.div>

      {/* 子ノード */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* 接続線（上から子エリアへ） */}
            <div className="flex justify-center">
              <div className="w-px h-5" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
            </div>

            <div className="flex gap-3 sm:gap-5 relative">
              {/* 横接続線 */}
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 h-px"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    left: `calc(50% / ${node.children!.length})`,
                    right: `calc(50% / ${node.children!.length})`,
                  }}
                />
              )}

              {node.children!.map((child, i) => {
                const childPath = `${path}/${child.name}`;
                return (
                  <div key={child.name} className="flex flex-col items-center">
                    {/* 個別の縦接続線 */}
                    <div className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <TreeNode
                      node={child}
                      level={level + 1}
                      path={childPath}
                      expanded={expanded}
                      onToggle={onToggle}
                      staggerIndex={i}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────
   リスト表示: 再帰ノードコンポーネント
   ────────────────────────────────────── */

interface ListNodeProps {
  node: WhiskyTreeNode;
  level: number;
  path: string;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  staggerIndex: number;
}

function ListNode({ node, level, path, expanded, onToggle, staggerIndex }: ListNodeProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expanded.has(path);
  const color = getLevelColor(level, node);
  const isLeaf = !hasChildren;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: staggerIndex * 0.03 }}
    >
      {/* 行 */}
      <div
        className={`
          flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors duration-150
          ${hasChildren ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'}
        `}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => hasChildren && onToggle(path)}
      >
        {/* 展開/折りたたみアイコン or スペーサー */}
        {hasChildren ? (
          <motion.span
            animate={{ rotate: isExpanded ? 0 : 0 }}
            className="w-4 h-4 flex items-center justify-center shrink-0"
          >
            {isExpanded ? (
              <ChevronDown size={14} style={{ color }} />
            ) : (
              <ChevronRight size={14} style={{ color }} />
            )}
          </motion.span>
        ) : (
          <span className="w-4 h-4 shrink-0" />
        )}

        {/* 色付きドット */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        {/* テキスト */}
        <span className="text-sm font-medium" style={{ color }}>
          {node.name}
        </span>
        {isLeaf && node.nameEn && (
          <span className="text-xs text-gray-500 ml-1.5">
            ({node.nameEn})
          </span>
        )}

        {/* 子ノード数 */}
        {hasChildren && (
          <span className="text-xs text-gray-600 ml-1">
            ({node.children!.length})
          </span>
        )}
      </div>

      {/* 子ノードリスト */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden relative"
          >
            {/* 接続線 (左ボーダー) */}
            <div
              className="absolute top-0 bottom-2"
              style={{
                left: `${level * 20 + 18}px`,
                width: '1px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
            {node.children!.map((child, i) => {
              const childPath = `${path}/${child.name}`;
              return (
                <ListNode
                  key={child.name}
                  node={child}
                  level={level + 1}
                  path={childPath}
                  expanded={expanded}
                  onToggle={onToggle}
                  staggerIndex={i}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   メインページコンポーネント
   ────────────────────────────────────── */

type ViewMode = 'tree' | 'list';

export default function WhiskyClassificationPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    return new Set([whiskyTree.name]);
  });

  const allPaths = useMemo(() => collectAllPaths(whiskyTree), []);

  const handleToggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpanded(new Set(allPaths));
  }, [allPaths]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([whiskyTree.name]));
  }, []);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <GitBranch size={40} className="mx-auto mb-3 text-accent-gold" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">ウイスキー分類</h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ウイスキーは原料と製法により
          <span className="text-accent-gold font-semibold">【モルトウイスキー】</span>と
          <span className="text-accent-cream font-semibold">【グレーンウイスキー】</span>
          に大別され、これらを組み合わせた
          <span className="text-accent-red font-semibold">【ブレンデッドウイスキー】</span>
          も存在します。さらに各国の法律・伝統により多様な分類が生まれています。
        </p>
      </div>

      {/* コントロールバー */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {/* ビューモード切替 */}
        <div className="glass-card flex p-1 gap-1">
          <button
            onClick={() => setViewMode('tree')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 cursor-pointer
              ${viewMode === 'tree'
                ? 'bg-white/10 text-accent-cream shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
              }
            `}
          >
            <TreePine size={15} />
            ツリー
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 cursor-pointer
              ${viewMode === 'list'
                ? 'bg-white/10 text-accent-cream shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
              }
            `}
          >
            <List size={15} />
            リスト
          </button>
        </div>

        {/* 全展開 / 全折りたたみ */}
        <motion.button
          onClick={expandAll}
          className="glass-card flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-accent-gold transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Expand size={15} />
          全展開
        </motion.button>

        <motion.button
          onClick={collapseAll}
          className="glass-card flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-accent-gold transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shrink size={15} />
          全折りたたみ
        </motion.button>
      </div>

      {/* ツリー表示エリア */}
      <AnimatePresence mode="wait">
        {viewMode === 'tree' ? (
          <motion.div
            key="tree-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="overflow-x-auto pb-8"
          >
            <div className="min-w-max flex justify-center py-4">
              <TreeNode
                node={whiskyTree}
                level={0}
                path={whiskyTree.name}
                expanded={expanded}
                onToggle={handleToggle}
                staggerIndex={0}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-4 sm:p-6">
              <ListNode
                node={whiskyTree}
                level={0}
                path={whiskyTree.name}
                expanded={expanded}
                onToggle={handleToggle}
                staggerIndex={0}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 凡例 */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e2e8f0' }} />
          ルート
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c9a96e' }} />
          モルト
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e8dcc8' }} />
          グレーン
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#bb2121' }} />
          ブレンデッド
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1565C0' }} />
          スコッチ
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
          アイリッシュ
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D84315' }} />
          アメリカン
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF8F00' }} />
          ジャパニーズ
        </span>
      </motion.div>
    </motion.div>
  );
}
