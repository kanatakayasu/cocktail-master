import type { FC } from 'react';

// ─── 共通 Props ─────────────────────────────────
export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const defaults = { size: 64, color: 'currentColor' };

/**
 * 共通の <defs> ブロック。
 * 各 SVG 内にインラインで埋め込む。
 * id の衝突を防ぐため prefix を受け取る。
 */
const SharedDefs: FC<{ prefix: string }> = ({ prefix }) => (
  <defs>
    {/* ガラス反射: 白→透明 */}
    <linearGradient id={`${prefix}-glass`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.45} />
      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
    </linearGradient>
    {/* 金属: 灰→白→灰 */}
    <linearGradient id={`${prefix}-metal`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#a8a8a8" />
      <stop offset="40%" stopColor="#f0f0f0" />
      <stop offset="100%" stopColor="#888888" />
    </linearGradient>
    {/* 銅 */}
    <linearGradient id={`${prefix}-copper`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#da8a47" />
      <stop offset="40%" stopColor="#f5c882" />
      <stop offset="100%" stopColor="#b8652a" />
    </linearGradient>
    {/* ドロップシャドウ */}
    <filter id={`${prefix}-shadow`}>
      <feDropShadow dx="0.5" dy="1" stdDeviation="1.2" floodOpacity={0.18} />
    </filter>
  </defs>
);

// ─── グラス (1–14) ─────────────────────────────

/** 1. カクテルグラス（マティーニグラス） — 逆三角形 + 細い脚 + 台座 */
export const CocktailGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="cg" />
    {/* グラスの輪郭 */}
    <path
      d="M10 10 L54 10 L32 38 Z"
      fill="url(#cg-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#cg-shadow)"
    />
    {/* 薄い黄緑色の液体 */}
    <path
      d="M16 16 L48 16 L32 34 Z"
      fill="#c8e6a0"
      fillOpacity={0.55}
    />
    {/* ガラスのハイライト */}
    <path
      d="M14 12 L22 12 L18 20 Z"
      fill="#ffffff"
      fillOpacity={0.3}
    />
    {/* オリーブのピック */}
    <line x1="26" y1="12" x2="40" y2="22" stroke="#bbb" strokeWidth={1.2} />
    <circle cx="37" cy="20" r="3" fill="#7ea335" stroke="#5c7a20" strokeWidth={0.8} />
    <circle cx="37" cy="20" r="1" fill="#3d1a00" fillOpacity={0.7} />
    {/* 脚 */}
    <line x1="32" y1="38" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="22" y1="52" x2="42" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 2. オールドファッションドグラス — 幅広で背の低い円筒形 */
export const OldFashionedGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="of" />
    {/* グラスの輪郭 */}
    <path
      d="M12 16 L15 54 L49 54 L52 16 Z"
      fill="url(#of-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#of-shadow)"
    />
    {/* ウイスキー色の液体 */}
    <path
      d="M14 30 L15.8 54 L48.2 54 L50 30 Z"
      fill="#d4881e"
      fillOpacity={0.5}
    />
    {/* 氷キューブ 1 */}
    <rect x="20" y="28" width="10" height="9" rx="2" fill="#d0ecf8" fillOpacity={0.55} stroke="#a0d4ef" strokeWidth={0.8} />
    <path d="M22 29 L26 29 L23 33 Z" fill="#ffffff" fillOpacity={0.35} />
    {/* 氷キューブ 2 */}
    <rect x="33" y="30" width="9" height="8" rx="2" fill="#d0ecf8" fillOpacity={0.5} stroke="#a0d4ef" strokeWidth={0.8} />
    <path d="M35 31 L38 31 L35 35 Z" fill="#ffffff" fillOpacity={0.3} />
    {/* オレンジピール */}
    <path
      d="M42 22 C46 18 50 20 48 24 C46 28 42 26 42 22Z"
      fill="#f4922a"
      fillOpacity={0.85}
      stroke="#cc6a10"
      strokeWidth={0.7}
    />
    {/* ガラスのハイライト */}
    <path d="M14 18 L16 18 L16.8 40 L14.8 40 Z" fill="#ffffff" fillOpacity={0.2} />
    {/* リム */}
    <line x1="12" y1="16" x2="52" y2="16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 3. タンブラー（ハイボールグラス） — 縦長の円筒形 */
export const TumblerIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="tb" />
    {/* グラスの輪郭 */}
    <path
      d="M18 6 L19 58 L45 58 L46 6 Z"
      fill="url(#tb-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#tb-shadow)"
    />
    {/* 薄い黄色の液体 */}
    <path
      d="M19 20 L19.6 58 L44.4 58 L45 20 Z"
      fill="#f5e17a"
      fillOpacity={0.35}
    />
    {/* 炭酸の泡ドット */}
    <circle cx="28" cy="40" r="1" fill="#ffffff" fillOpacity={0.5} />
    <circle cx="34" cy="35" r="0.8" fill="#ffffff" fillOpacity={0.45} />
    <circle cx="30" cy="30" r="0.7" fill="#ffffff" fillOpacity={0.4} />
    <circle cx="36" cy="44" r="0.9" fill="#ffffff" fillOpacity={0.5} />
    <circle cx="26" cy="48" r="0.6" fill="#ffffff" fillOpacity={0.35} />
    <circle cx="38" cy="26" r="0.7" fill="#ffffff" fillOpacity={0.4} />
    <circle cx="32" cy="50" r="0.8" fill="#ffffff" fillOpacity={0.45} />
    {/* 氷キューブ */}
    <rect x="23" y="22" width="8" height="7" rx="1.5" fill="#d0ecf8" fillOpacity={0.5} stroke="#a0d4ef" strokeWidth={0.7} />
    <rect x="33" y="24" width="7" height="6" rx="1.5" fill="#d0ecf8" fillOpacity={0.45} stroke="#a0d4ef" strokeWidth={0.7} />
    {/* ストロー */}
    <line x1="38" y1="2" x2="36" y2="42" stroke="#e04040" strokeWidth={1.8} strokeLinecap="round" />
    <line x1="38" y1="2" x2="36" y2="42" stroke="#ff6666" strokeWidth={0.8} strokeLinecap="round" />
    {/* ガラスのハイライト */}
    <path d="M20 8 L21.5 8 L22 48 L20.5 48 Z" fill="#ffffff" fillOpacity={0.2} />
    {/* リム */}
    <line x1="18" y1="6" x2="46" y2="6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 4. コリンズグラス — タンブラーよりさらに細長い */
export const CollinsGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="cl" />
    {/* グラスの輪郭 */}
    <path
      d="M22 4 L23 60 L41 60 L42 4 Z"
      fill="url(#cl-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#cl-shadow)"
    />
    {/* 透明な液体（わずかに色づく） */}
    <path
      d="M22.6 18 L23.3 60 L40.7 60 L41.4 18 Z"
      fill="#e8f4fc"
      fillOpacity={0.3}
    />
    {/* レモンスライス（グラスの縁に引っ掛ける） */}
    <circle cx="42" cy="14" r="6" fill="#f7e84d" fillOpacity={0.8} stroke="#d4c030" strokeWidth={0.8} />
    <circle cx="42" cy="14" r="4" fill="#fff9a8" fillOpacity={0.6} />
    <line x1="42" y1="10" x2="42" y2="18" stroke="#d4c030" strokeWidth={0.5} />
    <line x1="38" y1="14" x2="46" y2="14" stroke="#d4c030" strokeWidth={0.5} />
    <line x1="39" y1="11" x2="45" y2="17" stroke="#d4c030" strokeWidth={0.4} />
    <line x1="39" y1="17" x2="45" y2="11" stroke="#d4c030" strokeWidth={0.4} />
    {/* ガラスのハイライト */}
    <path d="M24 6 L25.2 6 L25.6 50 L24.4 50 Z" fill="#ffffff" fillOpacity={0.22} />
    {/* リム */}
    <line x1="22" y1="4" x2="42" y2="4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 5. フルートグラス（シャンパンフルート） — 細長い + 脚 */
export const FluteGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="fl" />
    {/* グラスの輪郭 */}
    <path
      d="M23 6 C23 6 21 36 32 36 C43 36 41 6 41 6"
      fill="url(#fl-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#fl-shadow)"
    />
    {/* 黄金色のシャンパン */}
    <path
      d="M24 16 C24 16 22.5 36 32 36 C41.5 36 40 16 40 16"
      fill="#e8c840"
      fillOpacity={0.4}
    />
    {/* 泡（小さなドット） */}
    <circle cx="30" cy="20" r="0.8" fill="#ffffff" fillOpacity={0.55} />
    <circle cx="34" cy="22" r="0.6" fill="#ffffff" fillOpacity={0.5} />
    <circle cx="32" cy="18" r="0.7" fill="#ffffff" fillOpacity={0.5} />
    <circle cx="29" cy="26" r="0.5" fill="#ffffff" fillOpacity={0.4} />
    <circle cx="35" cy="28" r="0.6" fill="#ffffff" fillOpacity={0.4} />
    <circle cx="31" cy="14" r="0.9" fill="#ffffff" fillOpacity={0.6} />
    <circle cx="33" cy="30" r="0.5" fill="#ffffff" fillOpacity={0.35} />
    {/* ガラスのハイライト */}
    <path d="M25 8 L26.5 8 L26 28 L24.5 28 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* リム */}
    <line x1="23" y1="6" x2="41" y2="6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="36" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="22" y1="52" x2="42" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 6. ソーサー型シャンパングラス（クープ） — 浅い椀型 + 脚 */
export const CoupeGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="cp" />
    {/* グラスの輪郭 */}
    <path
      d="M8 16 C8 16 14 32 32 32 C50 32 56 16 56 16"
      fill="url(#cp-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#cp-shadow)"
    />
    {/* ピンク色のカクテル */}
    <path
      d="M12 20 C12 20 16 32 32 32 C48 32 52 20 52 20"
      fill="#f5a0b8"
      fillOpacity={0.5}
    />
    {/* ガラスのハイライト */}
    <path d="M12 18 L18 18 C16 24 14 22 12 18 Z" fill="#ffffff" fillOpacity={0.3} />
    {/* リム */}
    <line x1="8" y1="16" x2="56" y2="16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="32" x2="32" y2="50" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="21" y1="50" x2="43" y2="50" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 7. ワイングラス — 曲線ボウル + 脚 */
export const WineGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="wg" />
    {/* グラスのボウル輪郭 */}
    <path
      d="M18 6 L18 12 C18 24 22 32 32 32 C42 32 46 24 46 12 L46 6"
      fill="url(#wg-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#wg-shadow)"
    />
    {/* 赤ワインの液体 */}
    <path
      d="M20 18 C20 18 20 24 22 28 C24 31 28 32 32 32 C36 32 40 31 42 28 C44 24 44 18 44 18 Z"
      fill="#8b1a32"
      fillOpacity={0.55}
    />
    {/* ワインのハイライト */}
    <path d="M24 20 C26 20 28 22 26 26 C24 24 22 22 24 20 Z" fill="#c44060" fillOpacity={0.35} />
    {/* ガラスのハイライト */}
    <path d="M20 8 L21.5 8 L21.5 20 L20 20 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* リム */}
    <line x1="18" y1="6" x2="46" y2="6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="32" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="21" y1="52" x2="43" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 8. ゴブレット — 大きめのステム付きグラス */
export const GobletIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="gb" />
    <defs>
      <linearGradient id="gb-tropical" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff9040" stopOpacity={0.6} />
        <stop offset="100%" stopColor="#ff4080" stopOpacity={0.5} />
      </linearGradient>
    </defs>
    {/* グラスのボウル輪郭 */}
    <path
      d="M14 6 L14 12 C14 26 20 34 32 34 C44 34 50 26 50 12 L50 6"
      fill="url(#gb-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#gb-shadow)"
    />
    {/* トロピカルカラーの液体 */}
    <path
      d="M16 16 C16 16 16 26 22 31 C25 33 29 34 32 34 C35 34 39 33 42 31 C48 26 48 16 48 16 Z"
      fill="url(#gb-tropical)"
    />
    {/* パイナップルウェッジ */}
    <path
      d="M44 10 L50 4 L52 10 Z"
      fill="#e8c840"
      fillOpacity={0.85}
      stroke="#c0a020"
      strokeWidth={0.7}
    />
    {/* パイナップルの葉 */}
    <path d="M50 4 C52 2 54 3 52 5" fill="#4ca030" fillOpacity={0.8} />
    <path d="M50 4 C50 1 52 1 51 4" fill="#5cb838" fillOpacity={0.7} />
    {/* パイナップルの網目模様 */}
    <line x1="46" y1="7" x2="50" y2="9" stroke="#c0a020" strokeWidth={0.3} />
    <line x1="48" y1="6" x2="48" y2="10" stroke="#c0a020" strokeWidth={0.3} />
    {/* ガラスのハイライト */}
    <path d="M16 8 L18 8 L18 22 L16 22 Z" fill="#ffffff" fillOpacity={0.22} />
    {/* リム */}
    <line x1="14" y1="6" x2="50" y2="6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="34" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="20" y1="52" x2="44" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 9. サワーグラス — 小ぶりのチューリップ型 + 脚 */
export const SourGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="sg" />
    {/* グラスの輪郭 */}
    <path
      d="M19 10 C19 10 17 16 17 22 C17 30 22 36 32 36 C42 36 47 30 47 22 C47 16 45 10 45 10"
      fill="url(#sg-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#sg-shadow)"
    />
    {/* レモン色の液体 */}
    <path
      d="M20 18 C20 18 18.5 24 19 28 C20 32 24 36 32 36 C40 36 44 32 45 28 C45.5 24 44 18 44 18 Z"
      fill="#f5e060"
      fillOpacity={0.45}
    />
    {/* ガラスのハイライト */}
    <path d="M21 12 L23 12 L22 24 L20 24 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* リム */}
    <line x1="19" y1="10" x2="45" y2="10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="36" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="22" y1="52" x2="42" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 10. リキュールグラス（コーディアルグラス） — 小型 + 脚 */
export const CordialGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="cd" />
    {/* グラスの輪郭 */}
    <path
      d="M23 12 C23 12 21 18 21 24 C21 30 25 34 32 34 C39 34 43 30 43 24 C43 18 41 12 41 12"
      fill="url(#cd-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#cd-shadow)"
    />
    {/* 緑色のリキュール */}
    <path
      d="M24 18 C24 18 22 24 23 28 C24 31 27 34 32 34 C37 34 40 31 41 28 C42 24 40 18 40 18 Z"
      fill="#40b840"
      fillOpacity={0.45}
    />
    {/* ガラスのハイライト */}
    <path d="M25 14 L27 14 L26 24 L24 24 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* リム */}
    <line x1="23" y1="12" x2="41" y2="12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="32" y1="34" x2="32" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="23" y1="52" x2="41" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 11. ショットグラス — 小型ストレート（脚なし） */
export const ShotGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="sh" />
    {/* グラスの輪郭 */}
    <path
      d="M22 18 L24 54 L40 54 L42 18 Z"
      fill="url(#sh-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#sh-shadow)"
    />
    {/* クリア液体（わずかに見える） */}
    <path
      d="M23.5 30 L24.4 54 L39.6 54 L40.5 30 Z"
      fill="#e0f0ff"
      fillOpacity={0.25}
    />
    {/* ガラスの反射 */}
    <path d="M24 20 L25.5 20 L26 46 L24.5 46 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* 底の厚みを表現 */}
    <path
      d="M24 50 L24 54 L40 54 L40 50 Z"
      fill="#ffffff"
      fillOpacity={0.12}
    />
    {/* リム */}
    <line x1="22" y1="18" x2="42" y2="18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 12. ピルスナーグラス — 背が高い逆円錐形 */
export const PilsnerGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="pl" />
    {/* グラスの輪郭 */}
    <path
      d="M16 4 L25 56 L39 56 L48 4 Z"
      fill="url(#pl-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#pl-shadow)"
    />
    {/* ビール色（黄金色）の液体 */}
    <path
      d="M20 16 L25.5 56 L38.5 56 L44 16 Z"
      fill="#e8a820"
      fillOpacity={0.45}
    />
    {/* 泡ヘッド */}
    <path
      d="M20 16 L44 16 L43 12 C43 12 40 8 38 10 C36 12 34 8 32 10 C30 8 28 12 26 10 C24 8 21 12 21 12 Z"
      fill="#fffde8"
      fillOpacity={0.85}
      stroke="#e8d890"
      strokeWidth={0.5}
    />
    {/* 泡のディテール */}
    <circle cx="28" cy="12" r="2" fill="#ffffff" fillOpacity={0.3} />
    <circle cx="34" cy="11" r="1.5" fill="#ffffff" fillOpacity={0.25} />
    <circle cx="38" cy="13" r="1.2" fill="#ffffff" fillOpacity={0.2} />
    {/* 炭酸の泡 */}
    <circle cx="30" cy="30" r="0.6" fill="#ffffff" fillOpacity={0.35} />
    <circle cx="34" cy="38" r="0.5" fill="#ffffff" fillOpacity={0.3} />
    <circle cx="32" cy="46" r="0.7" fill="#ffffff" fillOpacity={0.3} />
    {/* ガラスのハイライト */}
    <path d="M18 6 L20 6 L24 44 L22 44 Z" fill="#ffffff" fillOpacity={0.2} />
    {/* リム */}
    <line x1="16" y1="4" x2="48" y2="4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 13. 銅製マグ（モスコーミュールマグ） — マグカップ（取っ手付き） */
export const CopperMugIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="cm" />
    {/* マグ本体 */}
    <path
      d="M10 10 L12 52 L44 52 L46 10 Z"
      fill="url(#cm-copper)"
      stroke="#8a5020"
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#cm-shadow)"
    />
    {/* 銅の金属反射 */}
    <path d="M12 12 L15 12 L16 46 L13 46 Z" fill="#f5d89a" fillOpacity={0.35} />
    <path d="M36 12 L38 12 L38.5 46 L36.5 46 Z" fill="#f5d89a" fillOpacity={0.2} />
    {/* マグ内側（暗い） */}
    <path
      d="M14 12 L15 14 L41 14 L42 12 Z"
      fill="#6a3810"
      fillOpacity={0.3}
    />
    {/* ライムウェッジ */}
    <path
      d="M36 8 L42 4 L44 10 Z"
      fill="#7ec850"
      fillOpacity={0.85}
      stroke="#4a8830"
      strokeWidth={0.7}
    />
    <path d="M38 7 L40 8 M39 8 L41 9" stroke="#4a8830" strokeWidth={0.3} />
    {/* リム（アクセントカラー） */}
    <line x1="10" y1="10" x2="46" y2="10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 取っ手 */}
    <path
      d="M46 18 C54 18 56 24 56 30 C56 36 54 42 46 42"
      fill="none"
      stroke="#8a5020"
      strokeWidth={2.5}
    />
    <path
      d="M46 18 C54 18 56 24 56 30 C56 36 54 42 46 42"
      fill="none"
      stroke="url(#cm-copper)"
      strokeWidth={1.5}
    />
  </svg>
);

/** 14. 耐熱グラス（アイリッシュコーヒーグラス） — 取っ手付き */
export const IrishCoffeeGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="ic" />
    {/* グラスの輪郭 */}
    <path
      d="M14 8 L16 44 L42 44 L44 8"
      fill="url(#ic-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#ic-shadow)"
    />
    {/* コーヒー色の液体 */}
    <path
      d="M15.5 20 L16.4 44 L41.6 44 L42.5 20 Z"
      fill="#5c2e10"
      fillOpacity={0.5}
    />
    {/* 白いクリーム層 */}
    <path
      d="M15.2 18 L15.5 24 L42.5 24 L42.8 18 Z"
      fill="#fff8e8"
      fillOpacity={0.8}
    />
    <path
      d="M15.2 18 L42.8 18"
      stroke="#f0e8d0"
      strokeWidth={0.5}
    />
    {/* クリームの表面テクスチャ */}
    <path d="M20 20 C22 19 26 21 30 20 C34 19 38 21 40 20" stroke="#f0e0c0" strokeWidth={0.4} fill="none" />
    {/* ガラスのハイライト */}
    <path d="M16 10 L18 10 L18.5 36 L16.5 36 Z" fill="#ffffff" fillOpacity={0.22} />
    {/* リム */}
    <line x1="14" y1="8" x2="44" y2="8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 脚 */}
    <line x1="29" y1="44" x2="29" y2="52" stroke={color} strokeWidth={1.5} />
    {/* 台座 */}
    <line x1="19" y1="52" x2="39" y2="52" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    {/* 取っ手 */}
    <path
      d="M44 16 C50 16 52 22 52 28 C52 34 50 40 44 40"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
    />
  </svg>
);

// ─── バーツール (15–20) ─────────────────────────

/** 15. シェーカー（3ピース） — トップ+ストレーナー+ボディ */
export const ShakerIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="sk" />
    {/* ボディ */}
    <path
      d="M20 18 L17 56 L47 56 L44 18"
      fill="url(#sk-metal)"
      stroke="#777"
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#sk-shadow)"
    />
    {/* ストレーナー部 */}
    <path
      d="M22 10 L20 18 L44 18 L42 10"
      fill="url(#sk-metal)"
      stroke="#777"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    {/* トップ（キャップ） */}
    <path
      d="M26 2 L26 10 L38 10 L38 2 Z"
      fill="url(#sk-metal)"
      stroke="#777"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    {/* 金属ハイライト（ボディ） */}
    <path d="M22 20 L24.5 20 L22 50 L19.5 50 Z" fill="#ffffff" fillOpacity={0.3} />
    {/* 金属ハイライト（ストレーナー） */}
    <path d="M24 12 L26 12 L25 16 L23 16 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* 金属ハイライト（キャップ） */}
    <path d="M28 3 L30 3 L30 9 L28 9 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* 接合線 */}
    <line x1="20" y1="18" x2="44" y2="18" stroke="#999" strokeWidth={0.8} />
    <line x1="22" y1="10" x2="42" y2="10" stroke="#999" strokeWidth={0.8} />
    {/* アクセントリング */}
    <line x1="17" y1="56" x2="47" y2="56" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 16. ミキシンググラス — 厚手ガラスの攪拌用容器、注ぎ口付き */
export const MixingGlassIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="mg" />
    {/* グラス本体（上が広く下が狭いテーパー） */}
    <path
      d="M14 8 L18 56 L46 56 L50 8"
      fill="url(#mg-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#mg-shadow)"
    />
    {/* 厚いガラスの底 */}
    <path
      d="M18 52 L18 56 L46 56 L46 52 Z"
      fill="#ffffff"
      fillOpacity={0.1}
    />
    {/* 注ぎ口（左上にV字の切り込み） */}
    <path
      d="M14 8 L8 12 L14 14"
      fill="url(#mg-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* 薄い琥珀色の液体 */}
    <path
      d="M17 24 L18.4 56 L45.6 56 L47 24 Z"
      fill="#d4a84e"
      fillOpacity={0.25}
    />
    {/* 氷キューブ 1 */}
    <rect x="24" y="26" width="9" height="8" rx="1.5" fill="#d0ecf8" fillOpacity={0.5} stroke="#a0d4ef" strokeWidth={0.7} />
    <path d="M26 27 L29 27 L27 31 Z" fill="#ffffff" fillOpacity={0.3} />
    {/* 氷キューブ 2 */}
    <rect x="35" y="30" width="7" height="7" rx="1.5" fill="#d0ecf8" fillOpacity={0.45} stroke="#a0d4ef" strokeWidth={0.7} />
    <path d="M37 31 L39 31 L37 34 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* 目盛り線 */}
    <line x1="47.5" y1="20" x2="49.5" y2="20" stroke={color} strokeWidth={0.6} strokeOpacity={0.35} />
    <line x1="47" y1="28" x2="49" y2="28" stroke={color} strokeWidth={0.6} strokeOpacity={0.35} />
    <line x1="46.5" y1="36" x2="48.5" y2="36" stroke={color} strokeWidth={0.6} strokeOpacity={0.35} />
    <line x1="46" y1="44" x2="48" y2="44" stroke={color} strokeWidth={0.6} strokeOpacity={0.35} />
    {/* ガラスのハイライト（左側縦長の反射） */}
    <path d="M16 10 L18 10 L19 48 L17 48 Z" fill="#ffffff" fillOpacity={0.22} />
    {/* リム */}
    <line x1="14" y1="8" x2="50" y2="8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/** 21. ブレンダー */
export const BlenderIcon: FC<IconProps> = ({
  size = defaults.size,
  color = defaults.color,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <SharedDefs prefix="bl" />
    <defs>
      <linearGradient id="bl-fruit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff8844" stopOpacity={0.6} />
        <stop offset="100%" stopColor="#ff4466" stopOpacity={0.5} />
      </linearGradient>
    </defs>
    {/* フタ */}
    <path
      d="M27 2 L27 8 L37 8 L37 2 Z"
      fill="url(#bl-metal)"
      stroke="#888"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    {/* ジャー */}
    <path
      d="M18 8 L22 42 L42 42 L46 8 Z"
      fill="url(#bl-glass)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
      filter="url(#bl-shadow)"
    />
    {/* フルーツ色の液体 */}
    <path
      d="M21 20 L22.4 42 L41.6 42 L43 20 Z"
      fill="url(#bl-fruit)"
    />
    {/* ガラスのハイライト */}
    <path d="M20 10 L22 10 L23.5 36 L21.5 36 Z" fill="#ffffff" fillOpacity={0.25} />
    {/* 目盛り線 */}
    <line x1="43" y1="18" x2="45" y2="18" stroke={color} strokeWidth={0.6} strokeOpacity={0.4} />
    <line x1="42.5" y1="24" x2="44.5" y2="24" stroke={color} strokeWidth={0.6} strokeOpacity={0.4} />
    <line x1="42" y1="30" x2="44" y2="30" stroke={color} strokeWidth={0.6} strokeOpacity={0.4} />
    <line x1="41.5" y1="36" x2="43.5" y2="36" stroke={color} strokeWidth={0.6} strokeOpacity={0.4} />
    {/* ベース */}
    <path
      d="M16 42 L16 56 L48 56 L48 42"
      fill="url(#bl-metal)"
      stroke="#888"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    {/* ベースのハイライト */}
    <path d="M18 44 L21 44 L21 54 L18 54 Z" fill="#ffffff" fillOpacity={0.2} />
    {/* ボタン */}
    <circle cx="32" cy="49" r="3" fill="#444" stroke="#666" strokeWidth={0.8} />
    <circle cx="31" cy="48" r="1" fill="#ffffff" fillOpacity={0.3} />
    {/* 取っ手 */}
    <path
      d="M46 14 L52 17 L52 30 L46 33"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── マッピングヘルパー ─────────────────────────

/** グラスIDに対応するアイコンコンポーネントを返す */
const glassIconMap: Record<string, FC<IconProps>> = {
  'cocktail-glass': CocktailGlassIcon,
  'old-fashioned-glass': OldFashionedGlassIcon,
  tumbler: TumblerIcon,
  'collins-glass': CollinsGlassIcon,
  'champagne-flute': FluteGlassIcon,
  'champagne-coupe': CoupeGlassIcon,
  'wine-glass': WineGlassIcon,
  goblet: GobletIcon,
  'sour-glass': SourGlassIcon,
  'cordial-glass': CordialGlassIcon,
  'shot-glass': ShotGlassIcon,
  'pilsner-glass': PilsnerGlassIcon,
  'copper-mug': CopperMugIcon,
  'irish-coffee-glass': IrishCoffeeGlassIcon,
};

/** グラス日本語名 → グラスID の逆引き（カクテルの glass フィールド用） */
const glassNameToId: Record<string, string> = {
  カクテルグラス: 'cocktail-glass',
  'オールドファッションドグラス（ロックグラス）': 'old-fashioned-glass',
  オールドファッションドグラス: 'old-fashioned-glass',
  ロックグラス: 'old-fashioned-glass',
  'タンブラー（ハイボールグラス）': 'tumbler',
  タンブラー: 'tumbler',
  ハイボールグラス: 'tumbler',
  コリンズグラス: 'collins-glass',
  フルートグラス: 'champagne-flute',
  シャンパンフルート: 'champagne-flute',
  ソーサー型シャンパングラス: 'champagne-coupe',
  クープグラス: 'champagne-coupe',
  ワイングラス: 'wine-glass',
  ゴブレット: 'goblet',
  サワーグラス: 'sour-glass',
  'リキュールグラス（コーディアルグラス）': 'cordial-glass',
  リキュールグラス: 'cordial-glass',
  コーディアルグラス: 'cordial-glass',
  'シューターグラス（ショットグラス）': 'shot-glass',
  ショットグラス: 'shot-glass',
  ピルスナーグラス: 'pilsner-glass',
  '銅製マグ（モスコーミュールマグ）': 'copper-mug',
  銅製マグ: 'copper-mug',
  モスコーミュールマグ: 'copper-mug',
  耐熱グラス: 'irish-coffee-glass',
  アイリッシュコーヒーグラス: 'irish-coffee-glass',
};

export function getGlassIcon(glassId: string): FC<IconProps> {
  // まず id で直接引く
  if (glassIconMap[glassId]) return glassIconMap[glassId];
  // 日本語名で引く
  const mapped = glassNameToId[glassId];
  if (mapped && glassIconMap[mapped]) return glassIconMap[mapped];
  // デフォルト
  return CocktailGlassIcon;
}

/** ツールIDに対応するアイコンコンポーネントを返す（ないものは null） */
const toolIconMap: Record<string, FC<IconProps>> = {
  'three-piece-shaker': ShakerIcon,
  'boston-shaker': ShakerIcon,
  'mixing-glass': MixingGlassIcon,
  blender: BlenderIcon,
};

export function getToolIcon(toolId: string): FC<IconProps> | null {
  return toolIconMap[toolId] ?? null;
}
