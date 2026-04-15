import type { FC } from 'react';

// ─── 共通 Props ─────────────────────────────
interface ShelfBackgroundProps {
  className?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. LiquorShelfBackground
//    バックバーの酒棚内部。3段の木製棚、暖かいアンバー照明。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const LiquorShelfBackground: FC<ShelfBackgroundProps> = ({ className }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    className={className}
  >
    <defs>
      {/* 壁面 (暗い木目の壁) */}
      <linearGradient id="ls-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1208" />
        <stop offset="40%" stopColor="#1e1610" />
        <stop offset="100%" stopColor="#141008" />
      </linearGradient>

      {/* 棚板 */}
      <linearGradient id="ls-shelf" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6b4a28" />
        <stop offset="30%" stopColor="#5c3a1e" />
        <stop offset="100%" stopColor="#4a2e16" />
      </linearGradient>

      {/* 棚板前面 */}
      <linearGradient id="ls-shelf-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5c3a1e" />
        <stop offset="100%" stopColor="#3a2410" />
      </linearGradient>

      {/* アンバーバックライト */}
      <radialGradient id="ls-amber-top" cx="0.5" cy="0.05" r="0.6">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.25} />
        <stop offset="50%" stopColor="#c9a96e" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      <radialGradient id="ls-amber-mid" cx="0.5" cy="0.38" r="0.5">
        <stop offset="0%" stopColor="#e8b84a" stopOpacity={0.12} />
        <stop offset="100%" stopColor="#e8b84a" stopOpacity={0} />
      </radialGradient>

      <radialGradient id="ls-amber-low" cx="0.5" cy="0.7" r="0.5">
        <stop offset="0%" stopColor="#e8b84a" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#e8b84a" stopOpacity={0} />
      </radialGradient>

      {/* 壁面の木目テクスチャ */}
      <pattern id="ls-walltex" x="0" y="0" width="400" height="16" patternUnits="userSpaceOnUse">
        <line x1="0" y1="4" x2="400" y2="4.5" stroke="#ffffff" strokeWidth="0.2" strokeOpacity="0.02" />
        <line x1="0" y1="9" x2="400" y2="8.5" stroke="#ffffff" strokeWidth="0.15" strokeOpacity="0.015" />
        <line x1="0" y1="13" x2="400" y2="13.5" stroke="#000000" strokeWidth="0.2" strokeOpacity="0.04" />
      </pattern>

      {/* 棚板の木目パターン */}
      <pattern id="ls-shelfgrain" x="0" y="0" width="400" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="400" y2="2.3" stroke="#ffffff" strokeWidth="0.3" strokeOpacity="0.04" />
        <line x1="0" y1="5" x2="400" y2="4.8" stroke="#000000" strokeWidth="0.2" strokeOpacity="0.06" />
      </pattern>

      {/* ボトルシルエット用 */}
      <linearGradient id="ls-bottle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1208" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#0e0a06" stopOpacity={0.7} />
      </linearGradient>

      {/* ボトルのアンバー反射 */}
      <linearGradient id="ls-bottle-glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#8b6a3a" stopOpacity={0.15} />
      </linearGradient>
    </defs>

    {/* ── 壁面 ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#ls-wall)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#ls-walltex)" />

    {/* ── 照明グロー ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#ls-amber-top)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#ls-amber-mid)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#ls-amber-low)" />

    {/* 天井照明ストリップ */}
    <line x1="60" y1="0" x2="340" y2="0" stroke="#c9a96e" strokeWidth="3" strokeOpacity={0.2} />
    <rect x="60" y="0" width="280" height="4" fill="#c9a96e" fillOpacity={0.05} />

    {/* ━━━━ 棚段 1 (y ≈ 110) ━━━━ */}
    {/* 棚板 (奥行きのある天板) */}
    <rect x="10" y="110" width="380" height="10" rx="1" fill="url(#ls-shelf)" />
    <rect x="10" y="110" width="380" height="10" fill="url(#ls-shelfgrain)" />
    {/* 棚板ハイライト */}
    <line x1="10" y1="110" x2="390" y2="110" stroke="#8b6a3a" strokeWidth="0.8" strokeOpacity={0.35} />
    {/* 棚板前面 */}
    <rect x="10" y="120" width="380" height="8" rx="1" fill="url(#ls-shelf-front)" />

    {/* Row 1 ボトル (棚の上、y=110 が底辺) */}
    <path d="M36 110 L36 56 C36 50 40 46 44 46 L48 46 C52 46 56 50 56 56 L56 110" fill="url(#ls-bottle)" />
    <rect x="40" y="68" width="12" height="18" rx="1.5" fill="#c9a96e" fillOpacity={0.06} />

    <path d="M90 110 L90 62 C90 56 93 52 97 52 L101 52 C105 52 108 56 108 62 L108 110" fill="url(#ls-bottle)" />
    <rect x="94" y="72" width="10" height="16" rx="1.5" fill="url(#ls-bottle-glow)" />

    <path d="M146 110 L146 40 C146 34 150 30 154 30 L158 30 C162 30 166 34 166 40 L166 110" fill="url(#ls-bottle)" />
    <rect x="150" y="54" width="12" height="20" rx="1.5" fill="#c9a96e" fillOpacity={0.05} />

    <path d="M206 110 L206 52 C206 46 210 42 214 42 L220 42 C224 42 228 46 228 52 L228 110" fill="url(#ls-bottle)" />
    <rect x="211" y="64" width="12" height="18" rx="1.5" fill="url(#ls-bottle-glow)" />

    <path d="M264 110 L264 58 C264 52 267 48 271 48 L275 48 C279 48 282 52 282 58 L282 110" fill="url(#ls-bottle)" />

    <path d="M324 110 L324 44 C324 38 328 34 332 34 L336 34 C340 34 344 38 344 44 L344 110" fill="url(#ls-bottle)" />
    <rect x="329" y="58" width="10" height="20" rx="1.5" fill="#c9a96e" fillOpacity={0.05} />

    {/* ━━━━ 棚段 2 (y ≈ 270) ━━━━ */}
    <rect x="10" y="270" width="380" height="10" rx="1" fill="url(#ls-shelf)" />
    <rect x="10" y="270" width="380" height="10" fill="url(#ls-shelfgrain)" />
    <line x1="10" y1="270" x2="390" y2="270" stroke="#8b6a3a" strokeWidth="0.8" strokeOpacity={0.3} />
    <rect x="10" y="280" width="380" height="8" rx="1" fill="url(#ls-shelf-front)" />

    {/* Row 2 ボトル */}
    <path d="M50 270 L50 196 C50 190 53 186 57 186 L63 186 C67 186 70 190 70 196 L70 270" fill="url(#ls-bottle)" />
    <rect x="54" y="210" width="12" height="24" rx="2" fill="url(#ls-bottle-glow)" />

    <path d="M110 270 L110 206 C110 200 114 196 118 196 L122 196 C126 196 130 200 130 206 L130 270" fill="url(#ls-bottle)" />
    <rect x="114" y="218" width="12" height="20" rx="1.5" fill="#c9a96e" fillOpacity={0.05} />

    <path d="M172 270 L172 192 C172 184 176 180 180 180 L186 180 C190 180 194 184 194 192 L194 270" fill="url(#ls-bottle)" />
    <rect x="177" y="204" width="12" height="28" rx="2" fill="#c9a96e" fillOpacity={0.06} />

    <path d="M240 270 L240 200 C240 192 244 188 248 188 L254 188 C258 188 262 192 262 200 L262 270" fill="url(#ls-bottle)" />

    <path d="M306 270 L306 210 C306 204 310 200 314 200 L318 200 C322 200 326 204 326 210 L326 270" fill="url(#ls-bottle)" />
    <rect x="310" y="224" width="12" height="18" rx="1.5" fill="url(#ls-bottle-glow)" />

    <path d="M362 270 L362 198 C362 192 365 188 369 188 L373 188 C377 188 380 192 380 198 L380 270" fill="url(#ls-bottle)" />

    {/* ━━━━ 棚段 3 (y ≈ 420) ━━━━ */}
    <rect x="10" y="420" width="380" height="10" rx="1" fill="url(#ls-shelf)" />
    <rect x="10" y="420" width="380" height="10" fill="url(#ls-shelfgrain)" />
    <line x1="10" y1="420" x2="390" y2="420" stroke="#8b6a3a" strokeWidth="0.8" strokeOpacity={0.25} />
    <rect x="10" y="430" width="380" height="8" rx="1" fill="url(#ls-shelf-front)" />

    {/* Row 3 ボトル */}
    <path d="M40 420 L40 356 C40 350 44 346 48 346 L52 346 C56 346 60 350 60 356 L60 420" fill="url(#ls-bottle)" />
    <rect x="44" y="368" width="12" height="20" rx="1.5" fill="#c9a96e" fillOpacity={0.05} />

    <path d="M106 420 L106 362 C106 354 110 350 114 350 L120 350 C124 350 128 354 128 362 L128 420" fill="url(#ls-bottle)" />
    <rect x="111" y="372" width="12" height="22" rx="2" fill="url(#ls-bottle-glow)" />

    <path d="M180 420 L180 348 C180 342 184 338 188 338 L192 338 C196 338 200 342 200 348 L200 420" fill="url(#ls-bottle)" />

    <path d="M244 420 L244 358 C244 350 248 346 252 346 L258 346 C262 346 266 350 266 358 L266 420" fill="url(#ls-bottle)" />
    <rect x="249" y="372" width="12" height="18" rx="1.5" fill="#c9a96e" fillOpacity={0.06} />

    <path d="M316 420 L316 364 C316 358 320 354 324 354 L328 354 C332 354 336 358 336 364 L336 420" fill="url(#ls-bottle)" />
    <rect x="320" y="376" width="12" height="18" rx="1.5" fill="url(#ls-bottle-glow)" />

    {/* 底面 (棚の下の暗い影) */}
    <rect x="0" y="438" width="400" height="62" fill="#0a0804" fillOpacity={0.5} />

    {/* 左右の棚柱 */}
    <rect x="0" y="0" width="10" height="500" fill="#3a2410" />
    <rect x="390" y="0" width="10" height="500" fill="#3a2410" />
    <line x1="10" y1="0" x2="10" y2="500" stroke="#5c3a1e" strokeWidth="0.5" strokeOpacity={0.3} />
    <line x1="390" y1="0" x2="390" y2="500" stroke="#5c3a1e" strokeWidth="0.5" strokeOpacity={0.3} />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. FridgeBackground
//    業務用バー冷蔵庫の内部。ステンレス壁、冷白LED、ゴムシール。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FridgeBackground: FC<ShelfBackgroundProps> = ({ className }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    className={className}
  >
    <defs>
      {/* ステンレス壁面 */}
      <linearGradient id="fr-steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a3e42" />
        <stop offset="30%" stopColor="#484c52" />
        <stop offset="50%" stopColor="#52565c" />
        <stop offset="70%" stopColor="#484c52" />
        <stop offset="100%" stopColor="#3a3e42" />
      </linearGradient>

      {/* LED ストリップのグロー (上部) */}
      <linearGradient id="fr-led-glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c0e0ff" stopOpacity={0.2} />
        <stop offset="15%" stopColor="#a0c8e8" stopOpacity={0.08} />
        <stop offset="40%" stopColor="#80b0d0" stopOpacity={0.02} />
        <stop offset="100%" stopColor="#6090b0" stopOpacity={0} />
      </linearGradient>

      {/* 冷気の拡散グロー (中央) */}
      <radialGradient id="fr-cold-glow" cx="0.5" cy="0.3" r="0.6">
        <stop offset="0%" stopColor="#d0e8ff" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#80a0c0" stopOpacity={0} />
      </radialGradient>

      {/* 棚板 (ワイヤーラック風) */}
      <linearGradient id="fr-rack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#70747a" />
        <stop offset="50%" stopColor="#5a5e64" />
        <stop offset="100%" stopColor="#50545a" />
      </linearGradient>

      {/* ステンレスのブラシ目パターン */}
      <pattern id="fr-brush" x="0" y="0" width="6" height="500" patternUnits="userSpaceOnUse">
        <line x1="1" y1="0" x2="1" y2="500" stroke="#ffffff" strokeWidth="0.2" strokeOpacity="0.025" />
        <line x1="3" y1="0" x2="3" y2="500" stroke="#ffffff" strokeWidth="0.15" strokeOpacity="0.02" />
        <line x1="5" y1="0" x2="5" y2="500" stroke="#000000" strokeWidth="0.2" strokeOpacity="0.03" />
      </pattern>

      {/* ゴムシール */}
      <linearGradient id="fr-seal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="40%" stopColor="#2a2a2a" />
        <stop offset="60%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
    </defs>

    {/* ── ステンレス壁面 ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#fr-steel)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#fr-brush)" />

    {/* ── ゴムパッキンフレーム (扉周り) ── */}
    {/* 上辺 */}
    <rect x="0" y="0" width="400" height="14" fill="url(#fr-seal)" />
    <line x1="0" y1="14" x2="400" y2="14" stroke="#333" strokeWidth="0.5" />
    {/* 下辺 */}
    <rect x="0" y="486" width="400" height="14" fill="url(#fr-seal)" />
    <line x1="0" y1="486" x2="400" y2="486" stroke="#333" strokeWidth="0.5" />
    {/* 左辺 */}
    <rect x="0" y="0" width="14" height="500" fill="url(#fr-seal)" />
    <line x1="14" y1="0" x2="14" y2="500" stroke="#333" strokeWidth="0.5" />
    {/* 右辺 */}
    <rect x="386" y="0" width="14" height="500" fill="url(#fr-seal)" />
    <line x1="386" y1="0" x2="386" y2="500" stroke="#333" strokeWidth="0.5" />

    {/* ゴムの丸みを表すハイライト */}
    <line x1="3" y1="14" x2="3" y2="486" stroke="#444" strokeWidth="1" strokeOpacity={0.3} />
    <line x1="397" y1="14" x2="397" y2="486" stroke="#444" strokeWidth="1" strokeOpacity={0.3} />
    <line x1="14" y1="3" x2="386" y2="3" stroke="#444" strokeWidth="1" strokeOpacity={0.3} />
    <line x1="14" y1="497" x2="386" y2="497" stroke="#444" strokeWidth="1" strokeOpacity={0.3} />

    {/* ── LED ストリップ (上部内壁) ── */}
    <rect x="14" y="14" width="372" height="4" fill="#d0e8ff" fillOpacity={0.15} />
    <line x1="20" y1="16" x2="380" y2="16" stroke="#e0f0ff" strokeWidth="1.5" strokeOpacity={0.25} />
    {/* LED光の拡散 */}
    <rect x="14" y="14" width="372" height="486" fill="url(#fr-led-glow)" />
    <rect x="14" y="14" width="372" height="486" fill="url(#fr-cold-glow)" />

    {/* ━━━━ ワイヤーラック棚 1 (y ≈ 160) ━━━━ */}
    {/* ラック枠 */}
    <rect x="24" y="158" width="352" height="6" rx="1" fill="url(#fr-rack)" />
    {/* ワイヤー模様 */}
    <line x1="24" y1="160" x2="376" y2="160" stroke="#7a7e84" strokeWidth="0.8" />
    <line x1="24" y1="162" x2="376" y2="162" stroke="#60646a" strokeWidth="0.6" />
    {/* ワイヤーの縦ライン */}
    <line x1="80" y1="158" x2="80" y2="164" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="140" y1="158" x2="140" y2="164" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="200" y1="158" x2="200" y2="164" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="260" y1="158" x2="260" y2="164" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="320" y1="158" x2="320" y2="164" stroke="#6a6e74" strokeWidth="0.5" />
    {/* 棚のハイライト */}
    <line x1="24" y1="158" x2="376" y2="158" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.08} />
    {/* ラック支持ブラケット (左右) */}
    <rect x="20" y="148" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />
    <rect x="374" y="148" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />

    {/* ━━━━ ワイヤーラック棚 2 (y ≈ 310) ━━━━ */}
    <rect x="24" y="308" width="352" height="6" rx="1" fill="url(#fr-rack)" />
    <line x1="24" y1="310" x2="376" y2="310" stroke="#7a7e84" strokeWidth="0.8" />
    <line x1="24" y1="312" x2="376" y2="312" stroke="#60646a" strokeWidth="0.6" />
    <line x1="80" y1="308" x2="80" y2="314" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="140" y1="308" x2="140" y2="314" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="200" y1="308" x2="200" y2="314" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="260" y1="308" x2="260" y2="314" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="320" y1="308" x2="320" y2="314" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="24" y1="308" x2="376" y2="308" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.06} />
    <rect x="20" y="298" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />
    <rect x="374" y="298" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />

    {/* ━━━━ ワイヤーラック棚 3 (y ≈ 430) ━━━━ */}
    <rect x="24" y="428" width="352" height="6" rx="1" fill="url(#fr-rack)" />
    <line x1="24" y1="430" x2="376" y2="430" stroke="#7a7e84" strokeWidth="0.8" />
    <line x1="24" y1="432" x2="376" y2="432" stroke="#60646a" strokeWidth="0.6" />
    <line x1="80" y1="428" x2="80" y2="434" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="140" y1="428" x2="140" y2="434" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="200" y1="428" x2="200" y2="434" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="260" y1="428" x2="260" y2="434" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="320" y1="428" x2="320" y2="434" stroke="#6a6e74" strokeWidth="0.5" />
    <line x1="24" y1="428" x2="376" y2="428" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.05} />
    <rect x="20" y="418" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />
    <rect x="374" y="418" width="6" height="18" rx="1" fill="#50545a" stroke="#60646a" strokeWidth="0.5" />

    {/* ── 結露のドット (微細) ── */}
    <circle cx="60" cy="80" r="0.8" fill="#c0d8f0" fillOpacity={0.1} />
    <circle cx="180" cy="120" r="0.6" fill="#c0d8f0" fillOpacity={0.08} />
    <circle cx="300" cy="60" r="0.7" fill="#c0d8f0" fillOpacity={0.09} />
    <circle cx="120" cy="220" r="0.6" fill="#c0d8f0" fillOpacity={0.07} />
    <circle cx="340" cy="200" r="0.8" fill="#c0d8f0" fillOpacity={0.08} />
    <circle cx="240" cy="370" r="0.7" fill="#c0d8f0" fillOpacity={0.07} />
    <circle cx="80" cy="400" r="0.6" fill="#c0d8f0" fillOpacity={0.06} />

    {/* ── 温度表示 (右上) ── */}
    <rect x="330" y="24" width="46" height="20" rx="3" fill="#1a2030" fillOpacity={0.7} stroke="#3a4050" strokeWidth="0.5" />
    <text x="353" y="38" textAnchor="middle" fontSize="10" fill="#60a8f0" fillOpacity={0.6} fontFamily="monospace">4°C</text>
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. ToolShelfBackground
//    暗いペグボード/ワークショップラック。フック、ツール輪郭。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ToolShelfBackground: FC<ShelfBackgroundProps> = ({ className }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    className={className}
  >
    <defs>
      {/* ペグボード背景 */}
      <linearGradient id="ts-board" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#141c18" />
        <stop offset="50%" stopColor="#101810" />
        <stop offset="100%" stopColor="#0a120e" />
      </linearGradient>

      {/* ペグボード穴パターン */}
      <pattern id="ts-pegs" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="14" cy="14" r="2" fill="#0d1a12" />
        <circle cx="14" cy="14" r="1.6" fill="#060e09" />
      </pattern>

      {/* 暖かい薄暗い光 */}
      <radialGradient id="ts-warmglow" cx="0.5" cy="0.15" r="0.65">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.1} />
        <stop offset="50%" stopColor="#c9a96e" stopOpacity={0.03} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      <radialGradient id="ts-warmglow2" cx="0.5" cy="0.65" r="0.5">
        <stop offset="0%" stopColor="#e8b84a" stopOpacity={0.06} />
        <stop offset="100%" stopColor="#e8b84a" stopOpacity={0} />
      </radialGradient>

      {/* ツール輪郭線のスタイル用 */}
      {/* フックの金属 */}
      <linearGradient id="ts-hook" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#70747a" />
        <stop offset="100%" stopColor="#50545a" />
      </linearGradient>
    </defs>

    {/* ── ペグボード ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#ts-board)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#ts-pegs)" />

    {/* ── 暖かい照明 ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#ts-warmglow)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#ts-warmglow2)" />

    {/* 上部のダウンライト */}
    <line x1="80" y1="0" x2="320" y2="0" stroke="#c9a96e" strokeWidth="2" strokeOpacity={0.12} />

    {/* ── ボード枠 ── */}
    <rect x="8" y="8" width="384" height="484" rx="2" fill="none" stroke="#1b3022" strokeWidth="2" strokeOpacity={0.5} />

    {/* ━━━━ ツール 1: シェーカー (左上) ━━━━ */}
    {/* フック */}
    <circle cx="80" cy="50" r="5" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="80" y1="55" x2="80" y2="62" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* シェーカーシルエット (アウトライン) */}
    <path
      d="M64 70 L60 160 C60 168 66 172 76 172 L84 172 C94 172 100 168 100 160 L96 70 Z"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.5"
      strokeOpacity={0.3}
      strokeDasharray="4 3"
    />
    {/* キャップ */}
    <path
      d="M66 70 L70 48 C70 42 74 40 80 40 C86 40 90 42 90 48 L94 70"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.2"
      strokeOpacity={0.25}
      strokeDasharray="3 3"
    />
    {/* ストレーナーの段差 */}
    <line x1="66" y1="70" x2="94" y2="70" stroke="#c9a96e" strokeWidth="0.8" strokeOpacity={0.2} />

    {/* ━━━━ ツール 2: バースプーン (中央上) ━━━━ */}
    <circle cx="200" cy="40" r="4" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="200" y1="44" x2="200" y2="52" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* ツイストハンドル */}
    <path
      d="M200 56 C202 70 198 84 200 98 C202 112 198 126 200 140 C202 154 198 168 200 182 C202 196 198 210 200 224"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.3"
      strokeOpacity={0.28}
      strokeDasharray="3 3"
    />
    {/* スプーン先 */}
    <ellipse
      cx="200"
      cy="232"
      rx="10"
      ry="6"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.2"
      strokeOpacity={0.25}
      strokeDasharray="3 2"
    />

    {/* ━━━━ ツール 3: ジガー (右上) ━━━━ */}
    <circle cx="320" cy="50" r="5" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="320" y1="55" x2="320" y2="64" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* 上カップ */}
    <path
      d="M304 100 L298 68 C298 64 306 60 320 60 C334 60 342 64 342 68 L336 100"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.4"
      strokeOpacity={0.28}
      strokeDasharray="4 3"
    />
    {/* くびれ */}
    <line x1="304" y1="100" x2="336" y2="100" stroke="#c9a96e" strokeWidth="1" strokeOpacity={0.22} />
    {/* 下カップ (逆さ) */}
    <path
      d="M306 100 L300 136 C300 140 308 144 320 144 C332 144 340 140 340 136 L334 100"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.4"
      strokeOpacity={0.28}
      strokeDasharray="4 3"
    />

    {/* ━━━━ ツール 4: ストレーナー (左下) ━━━━ */}
    <circle cx="90" cy="230" r="4" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="90" y1="234" x2="90" y2="242" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* 丸い網部分 */}
    <ellipse
      cx="90"
      cy="276"
      rx="36"
      ry="24"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.3"
      strokeOpacity={0.26}
      strokeDasharray="4 3"
    />
    {/* 網目のホールパターン */}
    <circle cx="78" cy="272" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    <circle cx="90" cy="268" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    <circle cx="102" cy="272" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    <circle cx="84" cy="282" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    <circle cx="96" cy="282" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    <circle cx="90" cy="276" r="2.5" fill="none" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity={0.18} />
    {/* ハンドル */}
    <path d="M126 276 L160 276" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeOpacity={0.22} strokeDasharray="3 3" />
    {/* スプリングの耳 */}
    <path d="M56 268 L46 258" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeOpacity={0.18} strokeDasharray="2 2" />
    <path d="M56 284 L46 294" fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeOpacity={0.18} strokeDasharray="2 2" />

    {/* ━━━━ ツール 5: マドラー/ミキシンググラス (中央下) ━━━━ */}
    <circle cx="220" cy="280" r="4" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="220" y1="284" x2="220" y2="292" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* ミキシンググラス輪郭 */}
    <path
      d="M200 296 L196 400 C196 408 204 412 220 412 C236 412 244 408 244 400 L240 296 Z"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.4"
      strokeOpacity={0.24}
      strokeDasharray="4 3"
    />
    {/* 注ぎ口 */}
    <path d="M200 296 L192 290" fill="none" stroke="#c9a96e" strokeWidth="1" strokeOpacity={0.2} strokeDasharray="2 2" />

    {/* ━━━━ ツール 6: ペアリングナイフ (右下) ━━━━ */}
    <circle cx="330" cy="230" r="4" fill="none" stroke="url(#ts-hook)" strokeWidth="2" />
    <line x1="330" y1="234" x2="330" y2="244" stroke="url(#ts-hook)" strokeWidth="2" />

    {/* ハンドル */}
    <path
      d="M324 248 L324 296 C324 300 328 302 332 302 L336 302 C340 302 344 300 344 296 L344 248 Z"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1.2"
      strokeOpacity={0.22}
      strokeDasharray="3 3"
    />
    {/* ブレード */}
    <path
      d="M328 302 L326 350 C326 356 334 362 334 362 L342 302"
      fill="none"
      stroke="#c9a96e"
      strokeWidth="1"
      strokeOpacity={0.2}
      strokeDasharray="3 2"
    />

    {/* ━━━━ 横ラック (下部、小物置き場) ━━━━ */}
    <line x1="30" y1="440" x2="370" y2="440" stroke="#1b3022" strokeWidth="3" strokeOpacity={0.5} />
    <line x1="30" y1="442" x2="370" y2="442" stroke="#1b3022" strokeWidth="1" strokeOpacity={0.3} />

    {/* ラック支柱 */}
    <line x1="30" y1="432" x2="30" y2="448" stroke="#1b3022" strokeWidth="2" strokeOpacity={0.4} />
    <line x1="370" y1="432" x2="370" y2="448" stroke="#1b3022" strokeWidth="2" strokeOpacity={0.4} />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. GlassShelfBackground
//    バックライト付きガラス棚。エッジライト効果、暖かいバックライト。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const GlassShelfBackground: FC<ShelfBackgroundProps> = ({ className }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    className={className}
  >
    <defs>
      {/* 背面壁 */}
      <linearGradient id="gs-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a1410" />
        <stop offset="50%" stopColor="#0d1a12" />
        <stop offset="100%" stopColor="#081008" />
      </linearGradient>

      {/* 暖色バックライト (全体) */}
      <radialGradient id="gs-backlight" cx="0.5" cy="0.4" r="0.65">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.12} />
        <stop offset="50%" stopColor="#c9a96e" stopOpacity={0.04} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      {/* 棚板エッジライト (明るい線) */}
      <linearGradient id="gs-edge-glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
        <stop offset="10%" stopColor="#ffffff" stopOpacity={0.2} />
        <stop offset="50%" stopColor="#ffffff" stopOpacity={0.25} />
        <stop offset="90%" stopColor="#ffffff" stopOpacity={0.2} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
      </linearGradient>

      {/* 棚板本体 (ほぼ透明なガラス) */}
      <linearGradient id="gs-shelf-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.06} />
        <stop offset="50%" stopColor="#ffffff" stopOpacity={0.02} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.04} />
      </linearGradient>

      {/* アンバートップライト */}
      <radialGradient id="gs-amber-top" cx="0.5" cy="0" r="0.5">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.18} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      {/* 棚板間のアンバーLEDストリップ */}
      <linearGradient id="gs-led-strip" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0} />
        <stop offset="10%" stopColor="#c9a96e" stopOpacity={0.08} />
        <stop offset="50%" stopColor="#c9a96e" stopOpacity={0.1} />
        <stop offset="90%" stopColor="#c9a96e" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </linearGradient>

      {/* グラスシルエットの微妙なグロー */}
      <radialGradient id="gs-glass-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.04} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
      </radialGradient>
    </defs>

    {/* ── 背面壁 ── */}
    <rect x="0" y="0" width="400" height="500" fill="url(#gs-wall)" />
    <rect x="0" y="0" width="400" height="500" fill="url(#gs-backlight)" />
    <rect x="0" y="0" width="400" height="200" fill="url(#gs-amber-top)" />

    {/* 天井照明ストリップ */}
    <line x1="40" y1="0" x2="360" y2="0" stroke="#c9a96e" strokeWidth="2.5" strokeOpacity={0.15} />

    {/* 左右のフレーム支柱 */}
    <rect x="0" y="0" width="8" height="500" fill="#1b3022" fillOpacity={0.6} />
    <rect x="392" y="0" width="8" height="500" fill="#1b3022" fillOpacity={0.6} />
    <line x1="8" y1="0" x2="8" y2="500" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity={0.08} />
    <line x1="392" y1="0" x2="392" y2="500" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity={0.08} />

    {/* ━━━━ ガラス棚 1 (y ≈ 120) ━━━━ */}
    {/* LEDストリップ (棚の下に仕込む) */}
    <rect x="20" y="114" width="360" height="2" fill="url(#gs-led-strip)" />

    {/* ガラス棚板 */}
    <rect x="16" y="118" width="368" height="5" rx="1" fill="url(#gs-shelf-glass)" />
    {/* エッジライト (上辺) */}
    <line x1="16" y1="118" x2="384" y2="118" stroke="url(#gs-edge-glow)" strokeWidth="1.5" />
    {/* エッジライト (下辺) */}
    <line x1="16" y1="123" x2="384" y2="123" stroke="url(#gs-edge-glow)" strokeWidth="0.8" />
    {/* 左右端のエッジ輝き */}
    <circle cx="16" cy="120" r="3" fill="#ffffff" fillOpacity={0.06} />
    <circle cx="384" cy="120" r="3" fill="#ffffff" fillOpacity={0.06} />

    {/* Row 1 グラスシルエット */}
    {/* マティーニグラス */}
    <g opacity={0.18}>
      <path d="M60 118 L60 96 L40 68 L80 68 L60 96" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="50" y1="118" x2="70" y2="118" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* マティーニグラス 2 */}
    <g opacity={0.15}>
      <path d="M130 118 L130 98 L112 72 L148 72 L130 98" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="122" y1="118" x2="138" y2="118" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* クーペグラス */}
    <g opacity={0.16}>
      <path d="M210 118 L210 100 C210 92 194 80 194 80 L226 80 C226 80 210 92 210 100" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="202" y1="118" x2="218" y2="118" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* クーペグラス 2 */}
    <g opacity={0.14}>
      <path d="M280 118 L280 100 C280 92 266 82 266 82 L294 82 C294 82 280 92 280 100" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="272" y1="118" x2="288" y2="118" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ニックアンドノラ */}
    <g opacity={0.16}>
      <path d="M348 118 L348 100 C348 96 338 86 338 84 C338 80 358 80 358 84 C358 86 348 96 348 100" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="340" y1="118" x2="356" y2="118" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ━━━━ ガラス棚 2 (y ≈ 250) ━━━━ */}
    <rect x="20" y="244" width="360" height="2" fill="url(#gs-led-strip)" />

    <rect x="16" y="248" width="368" height="5" rx="1" fill="url(#gs-shelf-glass)" />
    <line x1="16" y1="248" x2="384" y2="248" stroke="url(#gs-edge-glow)" strokeWidth="1.5" />
    <line x1="16" y1="253" x2="384" y2="253" stroke="url(#gs-edge-glow)" strokeWidth="0.8" />
    <circle cx="16" cy="250" r="3" fill="#ffffff" fillOpacity={0.05} />
    <circle cx="384" cy="250" r="3" fill="#ffffff" fillOpacity={0.05} />

    {/* Row 2 グラスシルエット */}
    {/* ロックグラス (タンブラー) */}
    <g opacity={0.17}>
      <path d="M52 248 L56 206 L84 206 L88 248" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      {/* カットパターン */}
      <line x1="60" y1="212" x2="58" y2="244" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
      <line x1="70" y1="212" x2="68" y2="244" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
      <line x1="80" y1="212" x2="78" y2="244" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
    </g>

    {/* ロックグラス 2 */}
    <g opacity={0.15}>
      <path d="M132 248 L136 210 L160 210 L164 248" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="140" y1="216" x2="138" y2="244" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.35} />
      <line x1="148" y1="216" x2="146" y2="244" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.35} />
      <line x1="156" y1="216" x2="154" y2="244" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.35} />
    </g>

    {/* ハイボールグラス */}
    <g opacity={0.16}>
      <path d="M216 248 L218 192 L244 192 L246 248" fill="none" stroke="#ffffff" strokeWidth="1.1" />
    </g>

    {/* ハイボールグラス 2 */}
    <g opacity={0.14}>
      <path d="M286 248 L288 196 L312 196 L314 248" fill="none" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* コリンズグラス */}
    <g opacity={0.15}>
      <path d="M354 248 L356 186 L378 186 L380 248" fill="none" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* ━━━━ ガラス棚 3 (y ≈ 380) ━━━━ */}
    <rect x="20" y="374" width="360" height="2" fill="url(#gs-led-strip)" />

    <rect x="16" y="378" width="368" height="5" rx="1" fill="url(#gs-shelf-glass)" />
    <line x1="16" y1="378" x2="384" y2="378" stroke="url(#gs-edge-glow)" strokeWidth="1.5" />
    <line x1="16" y1="383" x2="384" y2="383" stroke="url(#gs-edge-glow)" strokeWidth="0.8" />
    <circle cx="16" cy="380" r="3" fill="#ffffff" fillOpacity={0.04} />
    <circle cx="384" cy="380" r="3" fill="#ffffff" fillOpacity={0.04} />

    {/* Row 3 グラスシルエット */}
    {/* ワイングラス */}
    <g opacity={0.15}>
      <path d="M60 378 L60 362 C60 354 48 340 48 334 C48 328 72 328 72 334 C72 340 60 354 60 362" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="50" y1="378" x2="70" y2="378" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ワイングラス 2 */}
    <g opacity={0.13}>
      <path d="M130 378 L130 364 C130 356 120 344 120 338 C120 332 140 332 140 338 C140 344 130 356 130 364" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="122" y1="378" x2="138" y2="378" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* フルートグラス (シャンパン) */}
    <g opacity={0.14}>
      <path d="M208 378 L208 356 C208 348 200 338 200 332 C200 326 216 326 216 332 C216 338 208 348 208 356" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="200" y1="378" x2="216" y2="378" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ショットグラス 1 */}
    <g opacity={0.14}>
      <path d="M270 378 L272 358 L290 358 L292 378" fill="none" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* ショットグラス 2 */}
    <g opacity={0.12}>
      <path d="M316 378 L318 360 L334 360 L336 378" fill="none" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ゴブレット */}
    <g opacity={0.14}>
      <path d="M374 378 L374 366 C374 360 364 350 364 344 C364 340 384 340 384 344 C384 350 374 360 374 366" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="366" y1="378" x2="382" y2="378" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* ── 底面の影 ── */}
    <rect x="0" y="460" width="400" height="40" fill="#060e09" fillOpacity={0.4} />
  </svg>
);
