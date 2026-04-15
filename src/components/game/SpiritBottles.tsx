import type { FC } from 'react';
import type { BottleProps } from './BottleIllustration';

// ─── 共通 defs ─────────────────────────────
const Defs: FC<{ p: string; liquid: string; sel?: boolean }> = ({ p, liquid, sel }) => (
  <defs>
    <linearGradient id={`${p}-gl`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#fff" stopOpacity={0.35} />
      <stop offset="100%" stopColor="#fff" stopOpacity={0.05} />
    </linearGradient>
    <linearGradient id={`${p}-lq`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={liquid} stopOpacity={0.7} />
      <stop offset="100%" stopColor={liquid} stopOpacity={0.95} />
    </linearGradient>
    <linearGradient id={`${p}-cap`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#c0c0c0" />
      <stop offset="40%" stopColor="#e8e8e8" />
      <stop offset="100%" stopColor="#909090" />
    </linearGradient>
    <filter id={`${p}-sh`}>
      <feDropShadow dx="0.4" dy="0.8" stdDeviation="1" floodOpacity={0.2} />
    </filter>
    {sel && (
      <filter id={`${p}-gw`}>
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feFlood floodColor="#c9a96e" floodOpacity="0.6" result="c" />
        <feComposite in="c" in2="b" operator="in" result="g" />
        <feMerge><feMergeNode in="g" /><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    )}
  </defs>
);

function wrap(p: string, sel: boolean) {
  return sel ? `url(#${p}-gw)` : `url(#${p}-sh)`;
}

// ─── 1. ジン — 角ばったボトル、緑がかったガラス ─────
export const GinBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'gin';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 角ばったボディ */}
        <path d="M20 22 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 22 C44 20 42 18 40 16 L40 12 L38 10 L26 10 L24 12 L24 16 C22 18 20 20 20 22Z"
          fill={`url(#${p}-gl)`} stroke="#6a8a6a" strokeWidth={1} strokeLinejoin="round" />
        {/* 緑がかったガラスの色味 */}
        <path d="M20 22 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 22 C44 20 42 18 40 16 L24 16 C22 18 20 20 20 22Z"
          fill="#a8d8a8" fillOpacity={0.12} />
        {/* 液体 */}
        <path d="M21 30 L21 56 C21 57.5 22.5 59 24 59 L40 59 C41.5 59 43 57.5 43 56 L43 30Z" fill={`url(#${p}-lq)`} />
        {/* キャップ */}
        <rect x="26" y="4" width="12" height="7" rx="1.5" fill={`url(#${p}-cap)`} stroke="#777" strokeWidth={0.8} />
        <rect x="28" y="5" width="3" height="5" rx="1" fill="#fff" fillOpacity={0.2} />
        {/* 肩のライン */}
        <line x1="24" y1="16" x2="40" y2="16" stroke="#6a8a6a" strokeWidth={0.5} strokeOpacity={0.4} />
        {/* 反射 */}
        <path d="M22 20 L23.5 20 L23.5 54 L22 54Z" fill="#fff" fillOpacity={0.2} />
        {/* ラベル（クラシカルな菱形風） */}
        <rect x="24" y="34" width="16" height="14" rx="1" fill="#f0ece0" fillOpacity={0.9} stroke="#3a6a3a" strokeWidth={0.5} />
        <line x1="24" y1="38" x2="40" y2="38" stroke="#3a6a3a" strokeWidth={0.3} strokeOpacity={0.5} />
        {label && <text x="32" y="46" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#2a4a2a" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M20 22 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 22 C44 20 42 18 40 16 L40 12 L38 10 L26 10 L24 12 L24 16 C22 18 20 20 20 22Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 2. ウォッカ — すっきりした円筒、フロスト調 ─────
export const VodkaBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'vdk';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* クリーンな円筒ボディ */}
        <path d="M24 20 L24 56 C24 58 26 60 28 60 L36 60 C38 60 40 58 40 56 L40 20 C40 18 38 16 36 14 L36 10 L28 10 L28 14 C26 16 24 18 24 20Z"
          fill={`url(#${p}-gl)`} stroke="#aab8cc" strokeWidth={1} strokeLinejoin="round" />
        {/* フロスト加工 */}
        <path d="M24 20 L24 56 C24 58 26 60 28 60 L36 60 C38 60 40 58 40 56 L40 20Z"
          fill="#e0e8f0" fillOpacity={0.15} />
        {/* 液体 */}
        <path d="M25 28 L25 56 C25 57.5 26.5 59 28 59 L36 59 C37.5 59 39 57.5 39 56 L39 28Z" fill={`url(#${p}-lq)`} />
        {/* シルバーキャップ */}
        <rect x="27" y="3" width="10" height="8" rx="2" fill={`url(#${p}-cap)`} stroke="#999" strokeWidth={0.8} />
        <rect x="29" y="4" width="2.5" height="6" rx="1" fill="#fff" fillOpacity={0.25} />
        {/* 首 */}
        <line x1="28" y1="14" x2="36" y2="14" stroke="#aab8cc" strokeWidth={0.4} strokeOpacity={0.4} />
        {/* 反射 */}
        <path d="M25.5 18 L27 18 L27 54 L25.5 54Z" fill="#fff" fillOpacity={0.22} />
        {/* ミニマルなラベル */}
        <rect x="27" y="32" width="10" height="16" rx="1" fill="#fff" fillOpacity={0.9} stroke="#6688aa" strokeWidth={0.4} />
        <rect x="28" y="34" width="8" height="2" rx="0.5" fill="#3366aa" fillOpacity={0.6} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="#2a3a5a" fontFamily="sans-serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M24 20 L24 56 C24 58 26 60 28 60 L36 60 C38 60 40 58 40 56 L40 20 C40 18 38 16 36 14 L36 10 L28 10 L28 14 C26 16 24 18 24 20Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 3. ホワイトラム — 曲線的なボトル ─────
export const WhiteRumBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'wrm';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 曲線的なボディ */}
        <path d="M22 24 C22 18 24 16 28 14 L28 10 L36 10 L36 14 C40 16 42 18 42 24 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z"
          fill={`url(#${p}-gl)`} stroke="#9a9a8a" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M23 32 L23 54 C23 57 24.5 59 26 59 L38 59 C39.5 59 41 57 41 54 L41 32Z" fill={`url(#${p}-lq)`} />
        {/* 赤いキャップ */}
        <rect x="27" y="4" width="10" height="7" rx="2" fill="#cc3333" stroke="#992222" strokeWidth={0.8} />
        <rect x="29" y="5" width="2.5" height="5" rx="1" fill="#ff6666" fillOpacity={0.3} />
        {/* 肩 */}
        <line x1="28" y1="14" x2="36" y2="14" stroke="#9a9a8a" strokeWidth={0.4} strokeOpacity={0.4} />
        {/* 反射 */}
        <path d="M24 22 L25.5 22 L25.5 52 L24 52Z" fill="#fff" fillOpacity={0.18} />
        {/* ラベル（赤アクセント） */}
        <rect x="25" y="34" width="14" height="15" rx="1.5" fill="#f8f4ec" fillOpacity={0.9} stroke="#cc3333" strokeWidth={0.5} />
        <rect x="25" y="34" width="14" height="4" rx="1.5" fill="#cc3333" fillOpacity={0.7} />
        {label && <text x="32" y="46" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#3a2a1a" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M22 24 C22 18 24 16 28 14 L28 10 L36 10 L36 14 C40 16 42 18 42 24 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 4. ダークラム — 太めで丸いダーク系ボトル ─────
export const DarkRumBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'drm';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 太めの丸ボディ */}
        <path d="M18 26 C18 20 22 16 28 14 L28 10 L36 10 L36 14 C42 16 46 20 46 26 L46 54 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 54Z"
          fill="#3a2a18" fillOpacity={0.3} stroke="#5a3a1a" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M19 30 L19 54 C19 57 21.5 59 24 59 L40 59 C42.5 59 45 57 45 54 L45 30Z" fill={`url(#${p}-lq)`} />
        {/* ゴールドキャップ */}
        <rect x="27" y="4" width="10" height="7" rx="2" fill="#c9a96e" stroke="#8a6a2e" strokeWidth={0.8} />
        <rect x="29" y="5" width="2.5" height="5" rx="1" fill="#f0d080" fillOpacity={0.3} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#5a3a1a" strokeWidth={0.5} strokeOpacity={0.4} />
        <path d="M20 24 L22 24 L22 52 L20 52Z" fill="#fff" fillOpacity={0.1} />
        {/* 金色のラベル */}
        <rect x="23" y="32" width="18" height="16" rx="2" fill="#2a1a0a" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.6} />
        <rect x="25" y="34" width="14" height="2" rx="0.5" fill="#c9a96e" fillOpacity={0.7} />
        <rect x="25" y="44" width="14" height="1" rx="0.5" fill="#c9a96e" fillOpacity={0.4} />
        {label && <text x="32" y="42" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#c9a96e" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M18 26 C18 20 22 16 28 14 L28 10 L36 10 L36 14 C42 16 46 20 46 26 L46 54 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 54Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 5. テキーラ — 幅広い肩、狭い胴 ─────
export const TequilaBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'tql';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 幅広い肩から細くなるボディ */}
        <path d="M16 20 C16 16 20 14 28 12 L28 10 L36 10 L36 12 C44 14 48 16 48 20 L46 56 C46 58 44 60 42 60 L22 60 C20 60 18 58 18 56Z"
          fill={`url(#${p}-gl)`} stroke="#9a8a5a" strokeWidth={1} strokeLinejoin="round" />
        {/* 琥珀色のガラス */}
        <path d="M16 20 C16 16 20 14 28 12 L36 12 C44 14 48 16 48 20 L46 56 C46 58 44 60 42 60 L22 60 C20 60 18 58 18 56Z"
          fill="#e8d080" fillOpacity={0.08} />
        {/* 液体 */}
        <path d="M19 30 L18.5 56 C18.5 57.5 20 59 22 59 L42 59 C44 59 45.5 57.5 45.5 56 L45 30Z" fill={`url(#${p}-lq)`} />
        {/* 木製風キャップ */}
        <rect x="27" y="3" width="10" height="8" rx="2" fill="#8B6914" stroke="#6a4a0a" strokeWidth={0.8} />
        <rect x="29" y="4" width="2" height="6" rx="0.5" fill="#c9a96e" fillOpacity={0.3} />
        <line x1="28" y1="12" x2="36" y2="12" stroke="#9a8a5a" strokeWidth={0.4} />
        <path d="M18 18 L20 18 L20.5 52 L18.5 52Z" fill="#fff" fillOpacity={0.15} />
        {/* メキシカン風ラベル */}
        <rect x="23" y="32" width="18" height="16" rx="2" fill="#f8f0d8" fillOpacity={0.9} stroke="#8B6914" strokeWidth={0.6} />
        <circle cx="32" cy="38" r="3" fill="none" stroke="#8B6914" strokeWidth={0.5} />
        {label && <text x="32" y="46" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="#5a3a0a" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M16 20 C16 16 20 14 28 12 L28 10 L36 10 L36 12 C44 14 48 16 48 20 L46 56 C46 58 44 60 42 60 L22 60 C20 60 18 58 18 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 6. ライウイスキー — 角瓶クラシック ─────
export const RyeWhiskeyBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'rye';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* スクエアボディ */}
        <path d="M20 20 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 20 L42 16 L40 12 L24 12 L22 16Z"
          fill={`url(#${p}-gl)`} stroke="#8a7a5a" strokeWidth={1} strokeLinejoin="round" />
        {/* 琥珀色ガラス */}
        <path d="M20 20 L44 20 L44 56 C44 58 42 60 40 60 L24 60 C22 60 20 58 20 56Z" fill="#c08030" fillOpacity={0.1} />
        {/* 液体 */}
        <path d="M21 30 L21 56 C21 57.5 22.5 59 24 59 L40 59 C41.5 59 43 57.5 43 56 L43 30Z" fill={`url(#${p}-lq)`} />
        {/* 黒キャップ */}
        <rect x="26" y="4" width="12" height="9" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth={0.8} />
        <rect x="28" y="5" width="2.5" height="7" rx="1" fill="#555" fillOpacity={0.3} />
        <line x1="24" y1="12" x2="40" y2="12" stroke="#8a7a5a" strokeWidth={0.5} />
        <path d="M22 18 L23.5 18 L23.5 54 L22 54Z" fill="#fff" fillOpacity={0.15} />
        {/* クラシックラベル */}
        <rect x="23" y="30" width="18" height="18" rx="1.5" fill="#1a1a1a" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.5} />
        <rect x="25" y="32" width="14" height="3" rx="0.5" fill="#c9a96e" fillOpacity={0.6} />
        <line x1="25" y1="44" x2="39" y2="44" stroke="#c9a96e" strokeWidth={0.3} strokeOpacity={0.5} />
        {label && <text x="32" y="41" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#c9a96e" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M20 20 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 20 L42 16 L40 12 L24 12 L22 16Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 7. バーボン — ワックスシール付き角瓶 ─────
export const BourbonBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'brb';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* やや幅広の角瓶 */}
        <path d="M18 22 L18 56 C18 58 20 60 22 60 L42 60 C44 60 46 58 46 56 L46 22 L44 16 L42 12 L22 12 L20 16Z"
          fill={`url(#${p}-gl)`} stroke="#8a6a3a" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M19 30 L19 56 C19 57.5 20.5 59 22 59 L42 59 C43.5 59 45 57.5 45 56 L45 30Z" fill={`url(#${p}-lq)`} />
        {/* 赤いワックスシールキャップ */}
        <path d="M26 4 L26 13 L38 13 L38 4 C38 2 36 1 34 1 L30 1 C28 1 26 2 26 4Z"
          fill="#aa2222" stroke="#881818" strokeWidth={0.8} />
        {/* ワックスの垂れ */}
        <path d="M26 12 C24 14 24 15 25 14 C26 13 26 16 28 14" fill="#aa2222" stroke="#881818" strokeWidth={0.4} />
        <path d="M38 12 C40 14 40 15 39 14 C38 13 38 16 36 14" fill="#aa2222" stroke="#881818" strokeWidth={0.4} />
        <rect x="28" y="5" width="2" height="6" rx="0.5" fill="#cc4444" fillOpacity={0.3} />
        <line x1="22" y1="12" x2="42" y2="12" stroke="#8a6a3a" strokeWidth={0.5} />
        <path d="M20 20 L22 20 L22 54 L20 54Z" fill="#fff" fillOpacity={0.12} />
        {/* ラベル */}
        <rect x="22" y="32" width="20" height="16" rx="1.5" fill="#f5ece0" fillOpacity={0.9} stroke="#8a4a1a" strokeWidth={0.5} />
        <rect x="24" y="34" width="16" height="3" rx="0.5" fill="#8a4a1a" fillOpacity={0.5} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#4a2a0a" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M18 22 L18 56 C18 58 20 60 22 60 L42 60 C44 60 46 58 46 56 L46 22 L44 16 L42 12 L22 12 L20 16Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 8. ブランデー — エレガントな曲線ボトル ─────
export const BrandyBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'brd';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 優雅な曲線ボディ */}
        <path d="M20 28 C20 20 24 16 28 14 L28 10 C28 8 29 6 31 6 L33 6 C35 6 36 8 36 10 L36 14 C40 16 44 20 44 28 L43 56 C43 58 41 60 38 60 L26 60 C23 60 21 58 21 56Z"
          fill={`url(#${p}-gl)`} stroke="#8a7a5a" strokeWidth={1} strokeLinejoin="round" />
        {/* 琥珀色ガラス */}
        <path d="M20 28 C20 20 24 16 28 14 L36 14 C40 16 44 20 44 28 L43 56 C43 58 41 60 38 60 L26 60 C23 60 21 58 21 56Z" fill="#c08030" fillOpacity={0.08} />
        {/* 液体 */}
        <path d="M22 34 L21.5 56 C21.5 57.5 23 59 26 59 L38 59 C41 59 42.5 57.5 42.5 56 L43 34Z" fill={`url(#${p}-lq)`} />
        {/* ゴールドキャップ */}
        <rect x="29" y="1" width="6" height="6" rx="1.5" fill="#c9a96e" stroke="#8a6a2e" strokeWidth={0.8} />
        <rect x="30.5" y="2" width="1.5" height="4" rx="0.5" fill="#f0d080" fillOpacity={0.3} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#8a7a5a" strokeWidth={0.5} strokeOpacity={0.4} />
        <path d="M22 26 L23.5 26 L23 52 L21.5 52Z" fill="#fff" fillOpacity={0.15} />
        {/* エレガントなラベル */}
        <rect x="24" y="36" width="16" height="14" rx="2" fill="#1a0a00" fillOpacity={0.8} stroke="#c9a96e" strokeWidth={0.6} />
        <path d="M28 38 L36 38" stroke="#c9a96e" strokeWidth={0.4} />
        <path d="M26 47 L38 47" stroke="#c9a96e" strokeWidth={0.3} strokeOpacity={0.5} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="#e0c080" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M20 28 C20 20 24 16 28 14 L28 10 C28 8 29 6 31 6 L33 6 C35 6 36 8 36 10 L36 14 C40 16 44 20 44 28 L43 56 C43 58 41 60 38 60 L26 60 C23 60 21 58 21 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 9. カンパリ — 細長い赤いボトル ─────
export const CampariBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'cmp';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* やや凹みのあるスリムボディ */}
        <path d="M24 18 C22 20 22 22 22 26 L22 56 C22 58 24 60 26 60 L38 60 C40 60 42 58 42 56 L42 26 C42 22 42 20 40 18 L38 14 L38 10 L26 10 L26 14Z"
          fill={liquidColor} fillOpacity={0.2} stroke="#cc2222" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M23 28 L23 56 C23 57.5 24.5 59 26 59 L38 59 C39.5 59 41 57.5 41 56 L41 28Z" fill={`url(#${p}-lq)`} />
        {/* 赤いキャップ */}
        <rect x="27" y="4" width="10" height="7" rx="2" fill="#cc2222" stroke="#991111" strokeWidth={0.8} />
        <rect x="29" y="5" width="2" height="5" rx="0.5" fill="#ff4444" fillOpacity={0.25} />
        <line x1="26" y1="14" x2="38" y2="14" stroke="#cc2222" strokeWidth={0.4} />
        <path d="M24 22 L25.5 22 L25.5 54 L24 54Z" fill="#fff" fillOpacity={0.15} />
        {/* 白いラベル on 赤 */}
        <rect x="25" y="30" width="14" height="18" rx="1.5" fill="#fff" fillOpacity={0.92} stroke="#cc2222" strokeWidth={0.4} />
        <rect x="27" y="32" width="10" height="2.5" rx="0.5" fill="#cc2222" fillOpacity={0.8} />
        {label && <text x="32" y="43" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#cc2222" fontFamily="sans-serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M24 18 C22 20 22 22 22 26 L22 56 C22 58 24 60 26 60 L38 60 C40 60 42 58 42 56 L42 26 C42 22 42 20 40 18 L38 14 L38 10 L26 10 L26 14Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 10. コアントロー — 角型、オレンジアクセント ─────
export const CointreauBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'cnt';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 角型ボディ */}
        <path d="M20 18 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 18 L40 12 L24 12Z"
          fill={`url(#${p}-gl)`} stroke="#cc6600" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M21 28 L21 56 C21 57.5 22.5 59 24 59 L40 59 C41.5 59 43 57.5 43 56 L43 28Z" fill={`url(#${p}-lq)`} />
        {/* オレンジキャップ */}
        <rect x="27" y="4" width="10" height="9" rx="2" fill="#e87020" stroke="#cc5500" strokeWidth={0.8} />
        <rect x="29" y="5" width="2.5" height="7" rx="1" fill="#ffaa44" fillOpacity={0.3} />
        <line x1="24" y1="12" x2="40" y2="12" stroke="#cc6600" strokeWidth={0.5} />
        <path d="M22 16 L23.5 16 L23.5 54 L22 54Z" fill="#fff" fillOpacity={0.18} />
        {/* オレンジ枠ラベル */}
        <rect x="23" y="28" width="18" height="20" rx="2" fill="#fff" fillOpacity={0.9} stroke="#e87020" strokeWidth={0.8} />
        <circle cx="32" cy="36" r="4" fill="none" stroke="#e87020" strokeWidth={0.6} />
        <circle cx="32" cy="36" r="2" fill="#e87020" fillOpacity={0.3} />
        {label && <text x="32" y="46" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#cc5500" fontFamily="sans-serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M20 18 L20 56 C20 58 22 60 24 60 L40 60 C42 60 44 58 44 56 L44 18 L40 12 L24 12Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 11. ドライベルモット — ワイン瓶風スリム ─────
export const DryVermouthBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'dvm';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* ワイン瓶風スリムボディ */}
        <path d="M24 24 C24 20 26 16 28 14 L28 8 C28 6 29 4 30 4 L34 4 C35 4 36 6 36 8 L36 14 C38 16 40 20 40 24 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z"
          fill="#7a9a5a" fillOpacity={0.15} stroke="#5a7a3a" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M25 32 L25 56 C25 57.5 26.5 59 28 59 L36 59 C37.5 59 39 57.5 39 56 L39 32Z" fill={`url(#${p}-lq)`} />
        {/* 小さなキャップ */}
        <rect x="29" y="1" width="6" height="4" rx="1.5" fill={`url(#${p}-cap)`} stroke="#777" strokeWidth={0.6} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#5a7a3a" strokeWidth={0.4} />
        <path d="M26 22 L27 22 L27 52 L26 52Z" fill="#fff" fillOpacity={0.15} />
        {/* シンプルラベル */}
        <rect x="27" y="34" width="10" height="14" rx="1" fill="#f0ece0" fillOpacity={0.9} stroke="#5a7a3a" strokeWidth={0.4} />
        <line x1="28" y1="37" x2="36" y2="37" stroke="#5a7a3a" strokeWidth={0.3} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3.2" fontWeight="bold" fill="#3a5a2a" fontFamily="serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M24 24 C24 20 26 16 28 14 L28 8 C28 6 29 4 30 4 L34 4 C35 4 36 6 36 8 L36 14 C38 16 40 20 40 24 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 12. スイートベルモット — 暗い赤のワイン瓶風 ─────
export const SweetVermouthBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'svm';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* ワイン瓶ボディ */}
        <path d="M24 24 C24 20 26 16 28 14 L28 8 C28 6 29 4 30 4 L34 4 C35 4 36 6 36 8 L36 14 C38 16 40 20 40 24 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z"
          fill="#4a0a0a" fillOpacity={0.2} stroke="#6a1a1a" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M25 30 L25 56 C25 57.5 26.5 59 28 59 L36 59 C37.5 59 39 57.5 39 56 L39 30Z" fill={`url(#${p}-lq)`} />
        {/* 赤いキャップ */}
        <rect x="29" y="1" width="6" height="4" rx="1.5" fill="#8a1a1a" stroke="#661111" strokeWidth={0.6} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#6a1a1a" strokeWidth={0.4} />
        <path d="M26 22 L27 22 L27 52 L26 52Z" fill="#fff" fillOpacity={0.1} />
        {/* ラベル */}
        <rect x="27" y="32" width="10" height="16" rx="1" fill="#f5ece0" fillOpacity={0.9} stroke="#8a1a1a" strokeWidth={0.4} />
        <rect x="28" y="34" width="8" height="2.5" rx="0.5" fill="#8a1a1a" fillOpacity={0.6} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#6a1a1a" fontFamily="serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M24 24 C24 20 26 16 28 14 L28 8 C28 6 29 4 30 4 L34 4 C35 4 36 6 36 8 L36 14 C38 16 40 20 40 24 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 13. カルーア — 幅広の茶色い瓶 ─────
export const KahluaBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'khl';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 幅広い丸ボディ */}
        <path d="M18 26 C18 20 22 16 28 14 L28 10 L36 10 L36 14 C42 16 46 20 46 26 L46 56 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 56Z"
          fill="#2a1800" fillOpacity={0.35} stroke="#4a2a10" strokeWidth={1} strokeLinejoin="round" />
        {/* 液体 */}
        <path d="M19 30 L19 56 C19 57.5 21 59 24 59 L40 59 C43 59 45 57.5 45 56 L45 30Z" fill={`url(#${p}-lq)`} />
        {/* 黒キャップ */}
        <rect x="27" y="4" width="10" height="7" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth={0.8} />
        <rect x="29" y="5" width="2" height="5" rx="0.5" fill="#444" fillOpacity={0.3} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#4a2a10" strokeWidth={0.5} />
        <path d="M20 24 L21.5 24 L21.5 54 L20 54Z" fill="#fff" fillOpacity={0.08} />
        {/* イエロー/ゴールドのラベル */}
        <rect x="22" y="30" width="20" height="18" rx="2" fill="#f0d860" fillOpacity={0.85} stroke="#8a6a00" strokeWidth={0.6} />
        <rect x="24" y="32" width="16" height="3" rx="0.5" fill="#8a4a10" fillOpacity={0.7} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#4a2a00" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M18 26 C18 20 22 16 28 14 L28 10 L36 10 L36 14 C42 16 46 20 46 26 L46 56 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 14. クレームドカカオ — クラシック丸型リキュール瓶 ─────
export const CremeDeCacaoBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'cdc';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        <path d="M22 26 C22 20 24 16 28 14 L28 10 L36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z"
          fill="#3a1a0a" fillOpacity={0.25} stroke="#5a3018" strokeWidth={1} strokeLinejoin="round" />
        <path d="M23 32 L23 54 C23 57 24.5 59 26 59 L38 59 C39.5 59 41 57 41 54 L41 32Z" fill={`url(#${p}-lq)`} />
        <rect x="27" y="4" width="10" height="7" rx="2" fill="#5a3018" stroke="#3a1a08" strokeWidth={0.8} />
        <rect x="29" y="5" width="2" height="5" rx="0.5" fill="#8a6040" fillOpacity={0.3} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#5a3018" strokeWidth={0.4} />
        <path d="M24 24 L25 24 L25 52 L24 52Z" fill="#fff" fillOpacity={0.1} />
        <rect x="25" y="34" width="14" height="14" rx="2" fill="#f5ece0" fillOpacity={0.9} stroke="#5a3018" strokeWidth={0.5} />
        <circle cx="32" cy="40" r="3" fill="#5a3018" fillOpacity={0.2} stroke="#5a3018" strokeWidth={0.4} />
        {label && <text x="32" y="46" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#3a1a08" fontFamily="serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M22 26 C22 20 24 16 28 14 L28 10 L36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 15. ブルーキュラソー — 鮮やかな青 ─────
export const BlueCuracaoBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'bcr';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 曲線的な青いボトル */}
        <path d="M22 26 C22 20 24 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z"
          fill="#0044aa" fillOpacity={0.15} stroke="#0055cc" strokeWidth={1} strokeLinejoin="round" />
        <path d="M23 32 L23 54 C23 57 24.5 59 26 59 L38 59 C39.5 59 41 57 41 54 L41 32Z" fill={`url(#${p}-lq)`} />
        <path d="M29 1 C29 -0.5 35 -0.5 35 1 L35 7 L29 7Z" fill={`url(#${p}-cap)`} stroke="#777" strokeWidth={0.6} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#0055cc" strokeWidth={0.4} />
        <path d="M24 24 L25 24 L25 52 L24 52Z" fill="#fff" fillOpacity={0.18} />
        <rect x="25" y="32" width="14" height="16" rx="2" fill="#fff" fillOpacity={0.9} stroke="#0055cc" strokeWidth={0.5} />
        <rect x="27" y="34" width="10" height="3" rx="0.5" fill="#0055cc" fillOpacity={0.6} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#003388" fontFamily="sans-serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M22 26 C22 20 24 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 16. チェリーヒーリング — 細長い暗赤色 ─────
export const CherryHeeringBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'chr';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        <path d="M24 22 C24 18 26 14 28 12 L28 8 L36 8 L36 12 C38 14 40 18 40 22 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z"
          fill="#5a0a0a" fillOpacity={0.2} stroke="#8a1a1a" strokeWidth={1} strokeLinejoin="round" />
        <path d="M25 28 L25 56 C25 57.5 26.5 59 28 59 L36 59 C37.5 59 39 57.5 39 56 L39 28Z" fill={`url(#${p}-lq)`} />
        <rect x="27" y="2" width="10" height="7" rx="2" fill="#5a0a0a" stroke="#3a0505" strokeWidth={0.8} />
        <rect x="29" y="3" width="2" height="5" rx="0.5" fill="#8a2222" fillOpacity={0.3} />
        <line x1="28" y1="12" x2="36" y2="12" stroke="#8a1a1a" strokeWidth={0.4} />
        <path d="M26 20 L27 20 L27 52 L26 52Z" fill="#fff" fillOpacity={0.1} />
        <rect x="27" y="30" width="10" height="16" rx="1.5" fill="#f5e8e0" fillOpacity={0.9} stroke="#8a1a1a" strokeWidth={0.4} />
        {/* チェリーアイコン */}
        <circle cx="32" cy="36" r="2.5" fill="#cc2244" fillOpacity={0.7} />
        <path d="M32 34 C33 32 34 31 35 30" stroke="#3a6a1a" strokeWidth={0.5} fill="none" />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3" fontWeight="bold" fill="#5a0a0a" fontFamily="serif">{label.substring(0, 6)}</text>}
        {isSelected && <path d="M24 22 C24 18 26 14 28 12 L28 8 L36 8 L36 12 C38 14 40 18 40 22 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 17. アマレット — 角型で特徴的 ─────
export const AmarettoBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'amt';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        {/* 角型のやや丸いボディ */}
        <path d="M20 22 C20 18 22 14 26 12 L26 8 L38 8 L38 12 C42 14 44 18 44 22 L44 56 C44 58 42 60 40 60 L24 60 C22 60 20 58 20 56Z"
          fill={`url(#${p}-gl)`} stroke="#8a6a20" strokeWidth={1} strokeLinejoin="round" />
        <path d="M21 30 L21 56 C21 57.5 22.5 59 24 59 L40 59 C41.5 59 43 57.5 43 56 L43 30Z" fill={`url(#${p}-lq)`} />
        {/* 金色の四角キャップ */}
        <rect x="27" y="2" width="10" height="7" rx="1" fill="#c9a96e" stroke="#8a6a2e" strokeWidth={0.8} />
        <rect x="29" y="3" width="2" height="5" rx="0.5" fill="#f0d080" fillOpacity={0.3} />
        <line x1="26" y1="12" x2="38" y2="12" stroke="#8a6a20" strokeWidth={0.5} />
        <path d="M22 20 L23.5 20 L23.5 54 L22 54Z" fill="#fff" fillOpacity={0.15} />
        {/* 特徴的なラベル */}
        <rect x="23" y="28" width="18" height="20" rx="2" fill="#f0e0c0" fillOpacity={0.9} stroke="#8a6a20" strokeWidth={0.6} />
        <rect x="25" y="30" width="14" height="4" rx="1" fill="#8a6a20" fillOpacity={0.3} />
        {label && <text x="32" y="44" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#5a3a0a" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M20 22 C20 18 22 14 26 12 L26 8 L38 8 L38 12 C42 14 44 18 44 22 L44 56 C44 58 42 60 40 60 L24 60 C22 60 20 58 20 56Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── 18. ドランブイ — クラシック丸瓶 ─────
export const DrambuieBottle: FC<BottleProps> = ({ size = 64, liquidColor, label, className, isSelected = false, isUsed = false }) => {
  const p = 'drm2';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ opacity: isUsed ? 0.5 : 1 }}>
      <Defs p={p} liquid={liquidColor} sel={isSelected} />
      <g filter={wrap(p, isSelected)}>
        <path d="M22 26 C22 20 24 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z"
          fill={`url(#${p}-gl)`} stroke="#8a7a3a" strokeWidth={1} strokeLinejoin="round" />
        <path d="M23 32 L23 54 C23 57 24.5 59 26 59 L38 59 C39.5 59 41 57 41 54 L41 32Z" fill={`url(#${p}-lq)`} />
        <path d="M29 1 C29 -0.5 35 -0.5 35 1 L35 7 L29 7Z" fill="#c9a96e" stroke="#8a6a2e" strokeWidth={0.6} />
        <line x1="28" y1="14" x2="36" y2="14" stroke="#8a7a3a" strokeWidth={0.4} />
        <path d="M24 24 L25 24 L25 52 L24 52Z" fill="#fff" fillOpacity={0.12} />
        <rect x="25" y="32" width="14" height="16" rx="2" fill="#2a1a08" fillOpacity={0.8} stroke="#c9a96e" strokeWidth={0.5} />
        <path d="M28 35 L36 35" stroke="#c9a96e" strokeWidth={0.4} />
        <path d="M27 45 L37 45" stroke="#c9a96e" strokeWidth={0.3} strokeOpacity={0.5} />
        {label && <text x="32" y="42" textAnchor="middle" fontSize="3.2" fontWeight="bold" fill="#c9a96e" fontFamily="serif">{label.substring(0, 5)}</text>}
        {isSelected && <path d="M22 26 C22 20 24 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C40 16 42 20 42 26 L42 54 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 54Z" fill="none" stroke="#c9a96e" strokeWidth={2} />}
      </g>
    </svg>
  );
};

// ─── マッピング ─────────────────────────────
import { SpiritBottle, LiqueurBottle, JuiceCarton, MixerBottle, SmallBottle } from './BottleIllustration';

const spiritBottleMap: Record<string, FC<BottleProps>> = {
  // スピリッツ
  'gin': GinBottle,
  'vodka': VodkaBottle,
  'white-rum': WhiteRumBottle,
  'dark-rum': DarkRumBottle,
  'tequila': TequilaBottle,
  'rye-whiskey': RyeWhiskeyBottle,
  'bourbon': BourbonBottle,
  'brandy': BrandyBottle,
  // リキュール
  'campari': CampariBottle,
  'cointreau': CointreauBottle,
  'dry-vermouth': DryVermouthBottle,
  'sweet-vermouth': SweetVermouthBottle,
  'kahlua': KahluaBottle,
  'creme-de-cacao': CremeDeCacaoBottle,
  'blue-curacao': BlueCuracaoBottle,
  'cherry-heering': CherryHeeringBottle,
  'amaretto': AmarettoBottle,
  'drambuie': DrambuieBottle,
};

/** IDに対応する固有ボトルがあればそれを、なければカテゴリ汎用ボトルを返す */
export function getBottleForIngredient(ingredientId: string, categoryId: string): FC<BottleProps> {
  if (spiritBottleMap[ingredientId]) return spiritBottleMap[ingredientId];
  switch (categoryId) {
    case 'spirit': return SpiritBottle;
    case 'liqueur': return LiqueurBottle;
    case 'juice': return JuiceCarton;
    case 'mixer': return MixerBottle;
    case 'syrup':
    case 'other': return SmallBottle;
    default: return SpiritBottle;
  }
}
