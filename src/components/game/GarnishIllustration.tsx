import type { FC } from 'react';

// ─── 共通 Props ─────────────────────────────
interface GarnishProps {
  size?: number;
  className?: string;
}

// ─── 1. OliveGarnish ─────────────────────────
// マティーニ用: カクテルピックに刺さったグリーンオリーブ
export const OliveGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="og-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* ピック（銀色のカクテルピン） */}
    <line x1="6" y1="28" x2="26" y2="4" stroke="#c0c0c0" strokeWidth={1.2} strokeLinecap="round" />
    {/* ピックの先端 */}
    <circle cx="26" cy="4" r="1.2" fill="#d8d8d8" stroke="#a0a0a0" strokeWidth={0.4} />
    {/* オリーブ本体 (楕円) */}
    <ellipse cx="16" cy="16" rx="5.5" ry="6.5" fill="#7ea335" stroke="#5c7a20" strokeWidth={0.8} filter="url(#og-sh)" />
    {/* オリーブのハイライト */}
    <ellipse cx="14" cy="14" rx="2" ry="2.5" fill="#a0c850" fillOpacity={0.45} />
    {/* ピメント（赤い詰め物） */}
    <ellipse cx="16" cy="16" rx="2" ry="1.5" fill="#cc3030" stroke="#992020" strokeWidth={0.4} />
    {/* ピメントのハイライト */}
    <ellipse cx="15.5" cy="15.5" rx="0.8" ry="0.6" fill="#ff6060" fillOpacity={0.4} />
  </svg>
);

// ─── 2. LimeWedgeGarnish ─────────────────────
// ライムウェッジ（くし切り）
export const LimeWedgeGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="lw-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 外皮 (緑) */}
    <path
      d="M6 24 L16 4 L26 24 C26 24 22 28 16 28 C10 28 6 24 6 24 Z"
      fill="#5cb838"
      stroke="#3a8820"
      strokeWidth={0.8}
      strokeLinejoin="round"
      filter="url(#lw-sh)"
    />
    {/* 果肉エリア (明るい黄緑) */}
    <path
      d="M9 23 L16 7 L23 23 C23 23 20 26 16 26 C12 26 9 23 9 23 Z"
      fill="#b8e878"
      fillOpacity={0.8}
    />
    {/* 果肉のセグメントライン */}
    <line x1="16" y1="8" x2="12" y2="24" stroke="#5cb838" strokeWidth={0.5} strokeOpacity={0.5} />
    <line x1="16" y1="8" x2="16" y2="25" stroke="#5cb838" strokeWidth={0.5} strokeOpacity={0.5} />
    <line x1="16" y1="8" x2="20" y2="24" stroke="#5cb838" strokeWidth={0.5} strokeOpacity={0.5} />
    {/* ハイライト */}
    <path d="M13 12 L15 8 L15 14 Z" fill="#d8f8b0" fillOpacity={0.4} />
  </svg>
);

// ─── 3. LimeSliceGarnish ─────────────────────
// ライムスライス（輪切り断面）
export const LimeSliceGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="ls-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 外皮の円 */}
    <circle cx="16" cy="16" r="12" fill="#5cb838" stroke="#3a8820" strokeWidth={0.8} filter="url(#ls-sh)" />
    {/* 白い内皮 */}
    <circle cx="16" cy="16" r="10" fill="#e8f0d8" />
    {/* 果肉 */}
    <circle cx="16" cy="16" r="8.5" fill="#b8e878" fillOpacity={0.7} />
    {/* セグメント（放射状のライン） */}
    <line x1="16" y1="7.5" x2="16" y2="24.5" stroke="#e8f0d8" strokeWidth={0.8} />
    <line x1="7.5" y1="16" x2="24.5" y2="16" stroke="#e8f0d8" strokeWidth={0.8} />
    <line x1="10" y1="10" x2="22" y2="22" stroke="#e8f0d8" strokeWidth={0.8} />
    <line x1="22" y1="10" x2="10" y2="22" stroke="#e8f0d8" strokeWidth={0.8} />
    {/* セグメントの半透明ライン */}
    <line x1="12" y1="8" x2="20" y2="24" stroke="#e8f0d8" strokeWidth={0.5} />
    <line x1="20" y1="8" x2="12" y2="24" stroke="#e8f0d8" strokeWidth={0.5} />
    {/* 中心の白い点 */}
    <circle cx="16" cy="16" r="1.5" fill="#e8f0d8" />
    {/* ハイライト */}
    <path d="M12 10 C14 9 13 12 12 10 Z" fill="#ffffff" fillOpacity={0.3} />
  </svg>
);

// ─── 4. LimePeelGarnish ─────────────────────
// ライムピールツイスト（渦巻き状）
export const LimePeelGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="lp-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* ツイストした皮のカール */}
    <path
      d="M10 6 C6 10 8 16 14 14 C20 12 16 20 12 22 C8 24 10 30 18 28 C26 26 28 18 24 12 C20 6 14 4 10 6 Z"
      fill="#5cb838"
      stroke="#3a8820"
      strokeWidth={0.8}
      strokeLinejoin="round"
      filter="url(#lp-sh)"
    />
    {/* 内側（白い部分） */}
    <path
      d="M12 8 C9 11 10 15 15 14 C19 13 17 19 13 21 C10 23 12 28 18 26 C24 24 26 18 22 13 C18 8 14 6 12 8 Z"
      fill="#d8f0c0"
      fillOpacity={0.5}
    />
    {/* 反りのハイライト */}
    <path
      d="M11 8 C10 10 11 12 13 11"
      fill="none"
      stroke="#88d858"
      strokeWidth={0.8}
      strokeOpacity={0.6}
    />
    {/* エッセンスの飛沫（点線風） */}
    <circle cx="7" cy="14" r="0.6" fill="#b8e878" fillOpacity={0.4} />
    <circle cx="9" cy="26" r="0.5" fill="#b8e878" fillOpacity={0.3} />
    <circle cx="24" cy="8" r="0.5" fill="#b8e878" fillOpacity={0.3} />
  </svg>
);

// ─── 5. LemonSliceGarnish ─────────────────────
// レモンスライス（輪切り断面、黄色）
export const LemonSliceGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="lem-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 外皮の円 */}
    <circle cx="16" cy="16" r="12" fill="#f7e84d" stroke="#d4c030" strokeWidth={0.8} filter="url(#lem-sh)" />
    {/* 白い内皮 */}
    <circle cx="16" cy="16" r="10" fill="#fff9e0" />
    {/* 果肉 */}
    <circle cx="16" cy="16" r="8.5" fill="#f7e84d" fillOpacity={0.55} />
    {/* セグメント（放射状） */}
    <line x1="16" y1="7.5" x2="16" y2="24.5" stroke="#fff9e0" strokeWidth={0.8} />
    <line x1="7.5" y1="16" x2="24.5" y2="16" stroke="#fff9e0" strokeWidth={0.8} />
    <line x1="10" y1="10" x2="22" y2="22" stroke="#fff9e0" strokeWidth={0.8} />
    <line x1="22" y1="10" x2="10" y2="22" stroke="#fff9e0" strokeWidth={0.8} />
    <line x1="12" y1="8" x2="20" y2="24" stroke="#fff9e0" strokeWidth={0.5} />
    <line x1="20" y1="8" x2="12" y2="24" stroke="#fff9e0" strokeWidth={0.5} />
    {/* 中心 */}
    <circle cx="16" cy="16" r="1.5" fill="#fff9e0" />
    {/* ハイライト */}
    <ellipse cx="12" cy="11" rx="2" ry="1.5" fill="#ffffff" fillOpacity={0.3} />
  </svg>
);

// ─── 6. OrangeSliceGarnish ─────────────────────
// オレンジスライス（グラスの縁に掛ける）
export const OrangeSliceGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="os-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 半月型（グラスの縁に掛けるスタイル） */}
    {/* 外皮 */}
    <path
      d="M4 20 A12 12 0 0 1 28 20 Z"
      fill="#f4922a"
      stroke="#cc6a10"
      strokeWidth={0.8}
      strokeLinejoin="round"
      filter="url(#os-sh)"
    />
    {/* 白い内皮 */}
    <path
      d="M6 20 A10 10 0 0 1 26 20 Z"
      fill="#ffe8c0"
    />
    {/* 果肉 */}
    <path
      d="M7.5 20 A8.5 8.5 0 0 1 24.5 20 Z"
      fill="#f4922a"
      fillOpacity={0.5}
    />
    {/* セグメント */}
    <line x1="16" y1="20" x2="16" y2="8" stroke="#ffe8c0" strokeWidth={0.8} />
    <line x1="16" y1="20" x2="8" y2="10" stroke="#ffe8c0" strokeWidth={0.7} />
    <line x1="16" y1="20" x2="24" y2="10" stroke="#ffe8c0" strokeWidth={0.7} />
    <line x1="16" y1="20" x2="6" y2="16" stroke="#ffe8c0" strokeWidth={0.5} />
    <line x1="16" y1="20" x2="26" y2="16" stroke="#ffe8c0" strokeWidth={0.5} />
    {/* グラスの縁を示す横線 */}
    <line x1="2" y1="20" x2="30" y2="20" stroke="#8a8a7a" strokeWidth={0.8} strokeOpacity={0.4} />
    {/* 切込み（グラスに掛けるスリット） */}
    <line x1="16" y1="20" x2="16" y2="24" stroke="#cc6a10" strokeWidth={0.6} strokeOpacity={0.5} />
    {/* ハイライト */}
    <path d="M10 12 C12 10 11 14 10 12 Z" fill="#ffffff" fillOpacity={0.3} />
  </svg>
);

// ─── 7. CherryGarnish ─────────────────────────
// マラスキーノチェリー（茎付き、赤く艶やか）
export const CherryGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <radialGradient id="ch-body" cx="0.4" cy="0.35" r="0.6">
        <stop offset="0%" stopColor="#ee4444" />
        <stop offset="70%" stopColor="#bb2121" />
        <stop offset="100%" stopColor="#881818" />
      </radialGradient>
      <filter id="ch-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 茎 */}
    <path
      d="M16 10 C16 6 18 3 22 2"
      fill="none"
      stroke="#5a3020"
      strokeWidth={1}
      strokeLinecap="round"
    />
    {/* チェリー本体 */}
    <circle cx="16" cy="18" r="8" fill="url(#ch-body)" stroke="#881818" strokeWidth={0.6} filter="url(#ch-sh)" />
    {/* グロッシーなハイライト（大） */}
    <ellipse cx="13" cy="15" rx="3" ry="2.5" fill="#ffffff" fillOpacity={0.3} />
    {/* グロッシーなハイライト（小） */}
    <ellipse cx="12" cy="14" rx="1.2" ry="1" fill="#ffffff" fillOpacity={0.45} />
    {/* 底部の暗いアクセント */}
    <ellipse cx="17" cy="22" rx="4" ry="2" fill="#661010" fillOpacity={0.2} />
  </svg>
);

// ─── 8. PineappleWedgeGarnish ──────────────────
// パイナップルウェッジ（葉付き）
export const PineappleWedgeGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="pw-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* パイナップルの果肉（三角ウェッジ） */}
    <path
      d="M8 28 L16 10 L24 28 Z"
      fill="#e8c840"
      stroke="#c0a020"
      strokeWidth={0.8}
      strokeLinejoin="round"
      filter="url(#pw-sh)"
    />
    {/* 果肉のテクスチャ（菱形模様） */}
    <line x1="13" y1="18" x2="15" y2="22" stroke="#c0a020" strokeWidth={0.4} strokeOpacity={0.5} />
    <line x1="17" y1="18" x2="19" y2="22" stroke="#c0a020" strokeWidth={0.4} strokeOpacity={0.5} />
    <line x1="11" y1="23" x2="21" y2="23" stroke="#c0a020" strokeWidth={0.3} strokeOpacity={0.4} />
    <line x1="12" y1="20" x2="20" y2="20" stroke="#c0a020" strokeWidth={0.3} strokeOpacity={0.4} />
    {/* 皮の縁（茶色い帯） */}
    <path d="M8 28 L24 28" stroke="#a08020" strokeWidth={2} strokeLinecap="round" />
    {/* 葉1（大） */}
    <path
      d="M16 10 C14 6 12 2 10 1 C12 2 14 4 16 8"
      fill="#4ca030"
      stroke="#3a8020"
      strokeWidth={0.5}
    />
    {/* 葉2 */}
    <path
      d="M16 10 C18 6 20 3 22 2 C20 3 18 5 16 8"
      fill="#5cb838"
      stroke="#3a8020"
      strokeWidth={0.5}
    />
    {/* 葉3（中央） */}
    <path
      d="M16 10 C16 6 16 3 16 1 C16 3 16 6 16 8"
      fill="#68c848"
      stroke="#3a8020"
      strokeWidth={0.4}
    />
    {/* ハイライト */}
    <path d="M14 16 L16 12 L16 18 Z" fill="#f8e880" fillOpacity={0.35} />
  </svg>
);

// ─── 9. MintGarnish ─────────────────────────
// ミントの葉（2〜3枚）
export const MintGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <filter id="mt-sh">
        <feDropShadow dx="0.3" dy="0.5" stdDeviation="0.6" floodOpacity={0.15} />
      </filter>
    </defs>
    {/* 茎 */}
    <path d="M16 28 L16 14" stroke="#3a8020" strokeWidth={1} strokeLinecap="round" />
    {/* 葉1（左、大きめ） */}
    <path
      d="M16 16 C12 14 6 10 5 8 C7 10 10 12 14 13 C10 10 6 6 6 4 C8 6 12 10 16 14"
      fill="#5cb838"
      stroke="#3a8020"
      strokeWidth={0.6}
      strokeLinejoin="round"
      filter="url(#mt-sh)"
    />
    {/* 葉1の葉脈 */}
    <path d="M16 15 C12 12 8 8 6 6" fill="none" stroke="#4ca030" strokeWidth={0.4} strokeOpacity={0.6} />
    {/* 葉2（右、大きめ） */}
    <path
      d="M16 14 C20 12 26 8 27 6 C25 8 22 10 18 11 C22 8 26 4 26 2 C24 4 20 8 16 12"
      fill="#68c848"
      stroke="#3a8020"
      strokeWidth={0.6}
      strokeLinejoin="round"
    />
    {/* 葉2の葉脈 */}
    <path d="M16 13 C20 10 24 6 26 4" fill="none" stroke="#4ca030" strokeWidth={0.4} strokeOpacity={0.6} />
    {/* 葉3（小、中央上） */}
    <path
      d="M16 14 C14 10 13 6 14 4 C14 6 14 9 16 12"
      fill="#7ed858"
      stroke="#3a8020"
      strokeWidth={0.5}
      strokeLinejoin="round"
    />
    {/* ハイライト */}
    <ellipse cx="10" cy="10" rx="1.5" ry="1" fill="#a0e878" fillOpacity={0.4} transform="rotate(-30 10 10)" />
    <ellipse cx="22" cy="8" rx="1.5" ry="1" fill="#a0e878" fillOpacity={0.3} transform="rotate(30 22 8)" />
  </svg>
);

// ─── 10. SaltRimGarnish ─────────────────────
// 塩リム（マルガリータ用、結晶パターン）
export const SaltRimGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    {/* グラスの縁を示す弧 */}
    <path
      d="M4 20 C4 10 10 4 16 4 C22 4 28 10 28 20"
      fill="none"
      stroke="#8a8a7a"
      strokeWidth={1}
      strokeOpacity={0.3}
    />
    {/* 塩の結晶粒（白〜クリーム色の小さな四角/点） */}
    <rect x="4" y="18" width="2" height="1.5" rx="0.3" fill="#f0ece0" fillOpacity={0.9} transform="rotate(-5 4 18)" />
    <rect x="6" y="16" width="1.5" height="1.2" rx="0.3" fill="#ffffff" fillOpacity={0.8} transform="rotate(10 6 16)" />
    <rect x="8" y="13" width="2" height="1.5" rx="0.3" fill="#e8e4d8" fillOpacity={0.85} transform="rotate(-8 8 13)" />
    <rect x="9" y="11" width="1.5" height="1" rx="0.2" fill="#ffffff" fillOpacity={0.7} transform="rotate(15 9 11)" />
    <rect x="11" y="9" width="2" height="1.5" rx="0.3" fill="#f0ece0" fillOpacity={0.9} transform="rotate(-3 11 9)" />
    <rect x="13" y="6" width="1.5" height="1.2" rx="0.3" fill="#ffffff" fillOpacity={0.8} transform="rotate(8 13 6)" />
    <rect x="15" y="4.5" width="2" height="1.5" rx="0.3" fill="#e8e4d8" fillOpacity={0.85} />
    <rect x="17.5" y="5" width="1.5" height="1" rx="0.2" fill="#ffffff" fillOpacity={0.75} transform="rotate(-10 17.5 5)" />
    <rect x="19" y="6.5" width="2" height="1.5" rx="0.3" fill="#f0ece0" fillOpacity={0.9} transform="rotate(5 19 6.5)" />
    <rect x="21" y="9" width="1.5" height="1.2" rx="0.3" fill="#ffffff" fillOpacity={0.8} transform="rotate(-12 21 9)" />
    <rect x="23" y="11" width="2" height="1.5" rx="0.3" fill="#e8e4d8" fillOpacity={0.85} transform="rotate(7 23 11)" />
    <rect x="24" y="14" width="1.5" height="1" rx="0.2" fill="#ffffff" fillOpacity={0.7} transform="rotate(-5 24 14)" />
    <rect x="25" y="16" width="2" height="1.5" rx="0.3" fill="#f0ece0" fillOpacity={0.9} transform="rotate(10 25 16)" />
    <rect x="26" y="18" width="1.5" height="1.2" rx="0.3" fill="#ffffff" fillOpacity={0.8} />
    {/* 散らばった小さな粒 */}
    <circle cx="7" cy="15" r="0.5" fill="#ffffff" fillOpacity={0.6} />
    <circle cx="10" cy="10" r="0.4" fill="#f0ece0" fillOpacity={0.5} />
    <circle cx="14" cy="5.5" r="0.5" fill="#ffffff" fillOpacity={0.5} />
    <circle cx="20" cy="7" r="0.4" fill="#f0ece0" fillOpacity={0.5} />
    <circle cx="24" cy="12" r="0.5" fill="#ffffff" fillOpacity={0.5} />
  </svg>
);

// ─── 11. SugarRimGarnish ─────────────────────
// 砂糖リム（サイドカー用、きらきらした結晶パターン）
export const SugarRimGarnish: FC<GarnishProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      {/* 砂糖のきらめき */}
      <radialGradient id="sr-sparkle" cx="0.3" cy="0.3" r="0.5">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#f8f0e0" stopOpacity={0.3} />
      </radialGradient>
    </defs>
    {/* グラスの縁を示す弧 */}
    <path
      d="M4 20 C4 10 10 4 16 4 C22 4 28 10 28 20"
      fill="none"
      stroke="#8a8a7a"
      strokeWidth={1}
      strokeOpacity={0.3}
    />
    {/* 砂糖の結晶（小さいキラキラした四角、塩より少し小さく密集） */}
    <rect x="4" y="18" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(-8 4 18)" />
    <rect x="5.5" y="17" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.85} transform="rotate(5 5.5 17)" />
    <rect x="6.5" y="15" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(-3 6.5 15)" />
    <rect x="7.5" y="13" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.8} transform="rotate(12 7.5 13)" />
    <rect x="8.5" y="12" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(-6 8.5 12)" />
    <rect x="10" y="10" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.85} transform="rotate(8 10 10)" />
    <rect x="11" y="8" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(-10 11 8)" />
    <rect x="12.5" y="6.5" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.8} transform="rotate(3 12.5 6.5)" />
    <rect x="14" y="5" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" />
    <rect x="16" y="4.5" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.85} transform="rotate(-5 16 4.5)" />
    <rect x="17.5" y="5" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(7 17.5 5)" />
    <rect x="19" y="6" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.8} transform="rotate(-8 19 6)" />
    <rect x="20" y="7.5" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(5 20 7.5)" />
    <rect x="21.5" y="9.5" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.85} transform="rotate(-3 21.5 9.5)" />
    <rect x="22.5" y="11" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(10 22.5 11)" />
    <rect x="23.5" y="13" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.8} transform="rotate(-6 23.5 13)" />
    <rect x="24.5" y="15" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" transform="rotate(8 24.5 15)" />
    <rect x="25.5" y="17" width="1" height="0.8" rx="0.2" fill="#ffffff" fillOpacity={0.85} transform="rotate(-4 25.5 17)" />
    <rect x="26.5" y="18.5" width="1.5" height="1" rx="0.2" fill="url(#sr-sparkle)" />
    {/* きらめきの点 */}
    <circle cx="6" cy="16" r="0.3" fill="#ffffff" fillOpacity={0.7} />
    <circle cx="9" cy="11" r="0.3" fill="#ffffff" fillOpacity={0.6} />
    <circle cx="13" cy="6" r="0.3" fill="#ffffff" fillOpacity={0.7} />
    <circle cx="18" cy="5" r="0.3" fill="#ffffff" fillOpacity={0.6} />
    <circle cx="22" cy="10" r="0.3" fill="#ffffff" fillOpacity={0.7} />
    <circle cx="25" cy="14" r="0.3" fill="#ffffff" fillOpacity={0.6} />
  </svg>
);

// ─── マッピングヘルパー ─────────────────────────

/** ガーニッシュIDに対応するコンポーネントを返す */
const garnishMap: Record<string, FC<GarnishProps>> = {
  olive: OliveGarnish,
  'lime-wedge': LimeWedgeGarnish,
  'lime-slice': LimeSliceGarnish,
  'lime-peel': LimePeelGarnish,
  'lemon-slice': LemonSliceGarnish,
  'orange-slice': OrangeSliceGarnish,
  cherry: CherryGarnish,
  'maraschino-cherry': CherryGarnish,
  'pineapple-wedge': PineappleWedgeGarnish,
  pineapple: PineappleWedgeGarnish,
  mint: MintGarnish,
  'mint-sprig': MintGarnish,
  'salt-rim': SaltRimGarnish,
  salt: SaltRimGarnish,
  'sugar-rim': SugarRimGarnish,
  sugar: SugarRimGarnish,
  // 日本語名マッピング
  オリーブ: OliveGarnish,
  ライムウェッジ: LimeWedgeGarnish,
  ライムスライス: LimeSliceGarnish,
  ライムピール: LimePeelGarnish,
  レモンスライス: LemonSliceGarnish,
  オレンジスライス: OrangeSliceGarnish,
  チェリー: CherryGarnish,
  マラスキーノチェリー: CherryGarnish,
  パイナップル: PineappleWedgeGarnish,
  パイナップルウェッジ: PineappleWedgeGarnish,
  ミント: MintGarnish,
  ミントの葉: MintGarnish,
  ソルトリム: SaltRimGarnish,
  塩: SaltRimGarnish,
  シュガーリム: SugarRimGarnish,
  砂糖: SugarRimGarnish,
};

export function getGarnishComponent(garnishId: string): FC<GarnishProps> | null {
  return garnishMap[garnishId] ?? null;
}
