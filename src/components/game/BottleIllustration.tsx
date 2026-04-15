import type { FC } from 'react';

// ─── 共通 Props ─────────────────────────────
export interface BottleProps {
  size?: number;
  liquidColor: string;
  label?: string;
  className?: string;
  isSelected?: boolean;
  isUsed?: boolean;
}

// ─── 共通の defs (ガラス反射・影) ─────────────
const BottleDefs: FC<{ prefix: string; liquidColor: string; isSelected?: boolean }> = ({
  prefix,
  liquidColor,
  isSelected,
}) => (
  <defs>
    {/* ガラス反射 */}
    <linearGradient id={`${prefix}-glass`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
    </linearGradient>
    {/* 液体グラデーション */}
    <linearGradient id={`${prefix}-liquid`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={liquidColor} stopOpacity={0.7} />
      <stop offset="100%" stopColor={liquidColor} stopOpacity={0.9} />
    </linearGradient>
    {/* キャップメタル */}
    <linearGradient id={`${prefix}-cap`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#c0c0c0" />
      <stop offset="40%" stopColor="#e8e8e8" />
      <stop offset="100%" stopColor="#909090" />
    </linearGradient>
    {/* ドロップシャドウ */}
    <filter id={`${prefix}-shadow`}>
      <feDropShadow dx="0.4" dy="0.8" stdDeviation="1" floodOpacity={0.2} />
    </filter>
    {/* 選択時のゴールドグロー */}
    {isSelected && (
      <filter id={`${prefix}-glow`}>
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feFlood floodColor="#c9a96e" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    )}
  </defs>
);

// ─── SpiritBottle ─────────────────────────────
// 背の高いスリムなボトル (ジン、ウォッカ、ラム、テキーラ、ウイスキー、ブランデー)
export const SpiritBottle: FC<BottleProps> = ({
  size = 64,
  liquidColor,
  label,
  className,
  isSelected = false,
  isUsed = false,
}) => {
  const p = 'sp';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{ opacity: isUsed ? 0.5 : 1, transition: 'opacity 0.2s' }}
    >
      <BottleDefs prefix={p} liquidColor={liquidColor} isSelected={isSelected} />
      <g filter={isSelected ? `url(#${p}-glow)` : `url(#${p}-shadow)`}>
        {/* ボトル本体 (丸みのある長方形) */}
        <path
          d="M22 22 C22 20 22 18 24 18 L24 14 C24 12 26 10 28 10 L36 10 C38 10 40 12 40 14 L40 18 C42 18 42 20 42 22 L42 56 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 56 Z"
          fill="url(#sp-glass)"
          stroke="#8a8a7a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 液体 (ボトル下半分) */}
        <path
          d="M23 30 L23 56 C23 57.5 24.5 59 26 59 L38 59 C39.5 59 41 57.5 41 56 L41 30 Z"
          fill={`url(#${p}-liquid)`}
        />
        {/* キャップ */}
        <rect x="27" y="4" width="10" height="7" rx="2" fill={`url(#${p}-cap)`} stroke="#777" strokeWidth={0.8} />
        {/* キャップのハイライト */}
        <rect x="29" y="5" width="3" height="5" rx="1" fill="#ffffff" fillOpacity={0.25} />
        {/* 首のくびれライン */}
        <line x1="24" y1="18" x2="40" y2="18" stroke="#8a8a7a" strokeWidth={0.5} strokeOpacity={0.5} />
        {/* ガラスのハイライト */}
        <path d="M24 20 L26 20 L26 54 L24 54 Z" fill="#ffffff" fillOpacity={0.18} />
        {/* ラベルエリア */}
        <rect x="26" y="36" width="12" height="14" rx="1.5" fill="#e8dcc8" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.5} />
        {/* ラベルテキスト */}
        {label && (
          <text
            x="32"
            y="45"
            textAnchor="middle"
            fontSize="4.5"
            fontWeight="bold"
            fill="#3a2a1a"
            fontFamily="sans-serif"
          >
            {label.length > 5 ? label.substring(0, 5) : label}
          </text>
        )}
        {/* 選択枠 */}
        {isSelected && (
          <path
            d="M22 22 C22 20 22 18 24 18 L24 14 C24 12 26 10 28 10 L36 10 C38 10 40 12 40 14 L40 18 C42 18 42 20 42 22 L42 56 C42 58 40 60 38 60 L26 60 C24 60 22 58 22 56 Z"
            fill="none"
            stroke="#c9a96e"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
      </g>
    </svg>
  );
};

// ─── LiqueurBottle ─────────────────────────────
// 短く丸いボトル (カンパリ、コアントロー、ベルモットなど)
export const LiqueurBottle: FC<BottleProps> = ({
  size = 64,
  liquidColor,
  label,
  className,
  isSelected = false,
  isUsed = false,
}) => {
  const p = 'lq';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{ opacity: isUsed ? 0.5 : 1, transition: 'opacity 0.2s' }}
    >
      <BottleDefs prefix={p} liquidColor={liquidColor} isSelected={isSelected} />
      <g filter={isSelected ? `url(#${p}-glow)` : `url(#${p}-shadow)`}>
        {/* 丸みのある太めのボディ */}
        <path
          d="M18 28 C18 22 20 18 26 16 L26 12 C26 10 28 8 30 8 L34 8 C36 8 38 10 38 12 L38 16 C44 18 46 22 46 28 L46 54 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 54 Z"
          fill="url(#lq-glass)"
          stroke="#8a8a7a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 液体 */}
        <path
          d="M19 32 L19 54 C19 57 21.5 59 24 59 L40 59 C42.5 59 45 57 45 54 L45 32 Z"
          fill={`url(#${p}-liquid)`}
        />
        {/* キャップ (丸め) */}
        <path
          d="M28 3 C28 1 36 1 36 3 L36 9 L28 9 Z"
          fill={`url(#${p}-cap)`}
          stroke="#777"
          strokeWidth={0.8}
        />
        {/* キャップのハイライト */}
        <path d="M30 3 L32 3 L32 8 L30 8 Z" fill="#ffffff" fillOpacity={0.2} />
        {/* 首のくびれ */}
        <line x1="26" y1="16" x2="38" y2="16" stroke="#8a8a7a" strokeWidth={0.5} strokeOpacity={0.5} />
        {/* ガラスのハイライト */}
        <path d="M20 22 L22.5 22 L22.5 52 L20 52 Z" fill="#ffffff" fillOpacity={0.15} />
        {/* ラベルエリア (丸い) */}
        <rect x="24" y="34" width="16" height="16" rx="3" fill="#e8dcc8" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.5} />
        {/* ラベルテキスト */}
        {label && (
          <text
            x="32"
            y="44"
            textAnchor="middle"
            fontSize="4"
            fontWeight="bold"
            fill="#3a2a1a"
            fontFamily="sans-serif"
          >
            {label.length > 6 ? label.substring(0, 6) : label}
          </text>
        )}
        {/* 選択枠 */}
        {isSelected && (
          <path
            d="M18 28 C18 22 20 18 26 16 L26 12 C26 10 28 8 30 8 L34 8 C36 8 38 10 38 12 L38 16 C44 18 46 22 46 28 L46 54 C46 58 43 60 40 60 L24 60 C21 60 18 58 18 54 Z"
            fill="none"
            stroke="#c9a96e"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
      </g>
    </svg>
  );
};

// ─── JuiceCarton ─────────────────────────────
// カートン / ジャグ型 (ジュース類)
export const JuiceCarton: FC<BottleProps> = ({
  size = 64,
  liquidColor,
  label,
  className,
  isSelected = false,
  isUsed = false,
}) => {
  const p = 'jc';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{ opacity: isUsed ? 0.5 : 1, transition: 'opacity 0.2s' }}
    >
      <BottleDefs prefix={p} liquidColor={liquidColor} isSelected={isSelected} />
      <g filter={isSelected ? `url(#${p}-glow)` : `url(#${p}-shadow)`}>
        {/* カートン本体 */}
        <path
          d="M18 14 L18 56 C18 58 20 60 22 60 L42 60 C44 60 46 58 46 56 L46 14 Z"
          fill={liquidColor}
          fillOpacity={0.85}
          stroke="#6a6a5a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 三角屋根部分 */}
        <path
          d="M18 14 L32 4 L46 14 Z"
          fill={liquidColor}
          fillOpacity={0.7}
          stroke="#6a6a5a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 屋根の折り目ライン */}
        <line x1="32" y1="4" x2="32" y2="14" stroke="#6a6a5a" strokeWidth={0.5} strokeOpacity={0.4} />
        {/* 注ぎ口 */}
        <rect x="34" y="8" width="6" height="4" rx="1" fill="#e0e0d8" stroke="#999" strokeWidth={0.6} />
        {/* 表面のハイライト */}
        <path d="M20 16 L23 16 L23 54 L20 54 Z" fill="#ffffff" fillOpacity={0.12} />
        {/* ラベルエリア (白背景) */}
        <rect x="22" y="24" width="20" height="24" rx="2" fill="#ffffff" fillOpacity={0.9} stroke={liquidColor} strokeWidth={0.5} strokeOpacity={0.6} />
        {/* フルーツのシンプルなアイコン的丸 */}
        <circle cx="32" cy="32" r="4" fill={liquidColor} fillOpacity={0.6} />
        {/* ラベルテキスト */}
        {label && (
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontSize="4"
            fontWeight="bold"
            fill="#3a3a3a"
            fontFamily="sans-serif"
          >
            {label.length > 6 ? label.substring(0, 6) : label}
          </text>
        )}
        {/* 選択枠 */}
        {isSelected && (
          <>
            <path
              d="M18 14 L18 56 C18 58 20 60 22 60 L42 60 C44 60 46 58 46 56 L46 14 Z"
              fill="none"
              stroke="#c9a96e"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M18 14 L32 4 L46 14"
              fill="none"
              stroke="#c9a96e"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </>
        )}
      </g>
    </svg>
  );
};

// ─── MixerBottle ─────────────────────────────
// 細長いボトル (トニック、ソーダ、コーラ)
export const MixerBottle: FC<BottleProps> = ({
  size = 64,
  liquidColor,
  label,
  className,
  isSelected = false,
  isUsed = false,
}) => {
  const p = 'mx';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{ opacity: isUsed ? 0.5 : 1, transition: 'opacity 0.2s' }}
    >
      <BottleDefs prefix={p} liquidColor={liquidColor} isSelected={isSelected} />
      <g filter={isSelected ? `url(#${p}-glow)` : `url(#${p}-shadow)`}>
        {/* 細長い本体 */}
        <path
          d="M24 22 C24 18 26 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C38 16 40 18 40 22 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56 Z"
          fill="url(#mx-glass)"
          stroke="#8a8a7a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 液体 */}
        <path
          d="M25 28 L25 56 C25 57.5 26.5 59 28 59 L36 59 C37.5 59 39 57.5 39 56 L39 28 Z"
          fill={`url(#${p}-liquid)`}
        />
        {/* 炭酸の泡 */}
        <circle cx="30" cy="42" r="0.7" fill="#ffffff" fillOpacity={0.4} />
        <circle cx="34" cy="38" r="0.5" fill="#ffffff" fillOpacity={0.35} />
        <circle cx="32" cy="48" r="0.6" fill="#ffffff" fillOpacity={0.3} />
        <circle cx="28" cy="52" r="0.5" fill="#ffffff" fillOpacity={0.3} />
        {/* キャップ (王冠型) */}
        <path
          d="M29 2 L29 6 L35 6 L35 2 C35 1 34 0 33 0 L31 0 C30 0 29 1 29 2 Z"
          fill={`url(#${p}-cap)`}
          stroke="#777"
          strokeWidth={0.6}
        />
        {/* 首のくびれ */}
        <line x1="28" y1="14" x2="36" y2="14" stroke="#8a8a7a" strokeWidth={0.4} strokeOpacity={0.5} />
        {/* ガラスのハイライト */}
        <path d="M25.5 20 L27 20 L27 54 L25.5 54 Z" fill="#ffffff" fillOpacity={0.18} />
        {/* ラベルエリア */}
        <rect x="27" y="30" width="10" height="14" rx="1.5" fill="#e8dcc8" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.4} />
        {/* ラベルテキスト */}
        {label && (
          <text
            x="32"
            y="39"
            textAnchor="middle"
            fontSize="3.5"
            fontWeight="bold"
            fill="#3a2a1a"
            fontFamily="sans-serif"
          >
            {label.length > 5 ? label.substring(0, 5) : label}
          </text>
        )}
        {/* 選択枠 */}
        {isSelected && (
          <path
            d="M24 22 C24 18 26 16 28 14 L28 10 C28 8 29 6 30 6 L34 6 C35 6 36 8 36 10 L36 14 C38 16 40 18 40 22 L40 56 C40 58 38 60 36 60 L28 60 C26 60 24 58 24 56 Z"
            fill="none"
            stroke="#c9a96e"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
      </g>
    </svg>
  );
};

// ─── SmallBottle ─────────────────────────────
// 小さいボトル (ビターズ、シロップ)
export const SmallBottle: FC<BottleProps> = ({
  size = 64,
  liquidColor,
  label,
  className,
  isSelected = false,
  isUsed = false,
}) => {
  const p = 'sm';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={{ opacity: isUsed ? 0.5 : 1, transition: 'opacity 0.2s' }}
    >
      <BottleDefs prefix={p} liquidColor={liquidColor} isSelected={isSelected} />
      <g filter={isSelected ? `url(#${p}-glow)` : `url(#${p}-shadow)`}>
        {/* 小さい丸ボトル本体 */}
        <path
          d="M22 32 C22 26 24 22 28 20 L28 16 C28 14 29 12 31 12 L33 12 C35 12 36 14 36 16 L36 20 C40 22 42 26 42 32 L42 54 C42 58 39 60 36 60 L28 60 C25 60 22 58 22 54 Z"
          fill="url(#sm-glass)"
          stroke="#8a8a7a"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        {/* 液体 */}
        <path
          d="M23 36 L23 54 C23 57 25.5 59 28 59 L36 59 C38.5 59 41 57 41 54 L41 36 Z"
          fill={`url(#${p}-liquid)`}
        />
        {/* ドロッパー型キャップ */}
        <path
          d="M30 6 C30 4 34 4 34 6 L34 12 L30 12 Z"
          fill={`url(#${p}-cap)`}
          stroke="#777"
          strokeWidth={0.6}
        />
        {/* ドロッパーの丸い頭 */}
        <circle cx="32" cy="5" r="3" fill="#444" stroke="#666" strokeWidth={0.5} />
        <circle cx="31" cy="4" r="1" fill="#ffffff" fillOpacity={0.2} />
        {/* ガラスのハイライト */}
        <path d="M24 26 L25.5 26 L25.5 52 L24 52 Z" fill="#ffffff" fillOpacity={0.15} />
        {/* ラベルエリア (小さめ) */}
        <rect x="26" y="38" width="12" height="12" rx="1.5" fill="#e8dcc8" fillOpacity={0.85} stroke="#c9a96e" strokeWidth={0.4} />
        {/* ラベルテキスト */}
        {label && (
          <text
            x="32"
            y="46"
            textAnchor="middle"
            fontSize="3.5"
            fontWeight="bold"
            fill="#3a2a1a"
            fontFamily="sans-serif"
          >
            {label.length > 5 ? label.substring(0, 5) : label}
          </text>
        )}
        {/* 選択枠 */}
        {isSelected && (
          <path
            d="M22 32 C22 26 24 22 28 20 L28 16 C28 14 29 12 31 12 L33 12 C35 12 36 14 36 16 L36 20 C40 22 42 26 42 32 L42 54 C42 58 39 60 36 60 L28 60 C25 60 22 58 22 54 Z"
            fill="none"
            stroke="#c9a96e"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}
      </g>
    </svg>
  );
};
