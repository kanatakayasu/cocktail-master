import type { FC } from 'react';

/**
 * バーシーン SVG コンポーネント
 * カウンター越しにキッチン/バックバーを見る客視点の構図。
 *
 * 上半分 (y: 0–260): 4 象限 — 酒棚 / 冷蔵庫 / ツール棚 / グラス棚
 * 下半分 (y: 260–480): 木製カウンター天板 + 前面パネル
 */

interface BarSceneSVGProps {
  className?: string;
  onShelfTap?: (shelf: 'liquorShelf' | 'fridge' | 'toolShelf' | 'glassShelf') => void;
}

const BarSceneSVG: FC<BarSceneSVGProps> = ({ className, onShelfTap }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 480"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    className={className}
  >
    <defs>
      {/* ── 共通グラデーション ── */}

      {/* 壁面 */}
      <linearGradient id="bs-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#060e09" />
        <stop offset="40%" stopColor="#0d1a12" />
        <stop offset="100%" stopColor="#142218" />
      </linearGradient>

      {/* カウンター天板: 暖かい木目 */}
      <linearGradient id="bs-counter-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6b4226" />
        <stop offset="15%" stopColor="#8b5e3c" />
        <stop offset="50%" stopColor="#7a4a2e" />
        <stop offset="85%" stopColor="#5c3520" />
        <stop offset="100%" stopColor="#4a2a18" />
      </linearGradient>

      {/* カウンター前面 */}
      <linearGradient id="bs-counter-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3e2214" />
        <stop offset="100%" stopColor="#2a1610" />
      </linearGradient>

      {/* カウンター反射 */}
      <linearGradient id="bs-counter-reflect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.08} />
        <stop offset="50%" stopColor="#ffffff" stopOpacity={0.02} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
      </linearGradient>

      {/* 木目パターン */}
      <pattern id="bs-woodgrain" x="0" y="0" width="800" height="12" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="800" y2="3.5" stroke="#ffffff" strokeWidth="0.3" strokeOpacity="0.04" />
        <line x1="0" y1="7" x2="800" y2="6.5" stroke="#ffffff" strokeWidth="0.2" strokeOpacity="0.03" />
        <line x1="0" y1="10" x2="800" y2="10.5" stroke="#000000" strokeWidth="0.3" strokeOpacity="0.06" />
      </pattern>

      {/* ── 酒棚 (左上) グラデーション ── */}
      <linearGradient id="bs-liquor-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a2a18" />
        <stop offset="100%" stopColor="#0d1a12" />
      </linearGradient>

      {/* 酒棚のアンバーバックライト */}
      <radialGradient id="bs-liquor-glow" cx="0.5" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.15} />
        <stop offset="60%" stopColor="#c9a96e" stopOpacity={0.05} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      {/* 棚板木材 */}
      <linearGradient id="bs-shelf-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5c3a20" />
        <stop offset="50%" stopColor="#4a2e18" />
        <stop offset="100%" stopColor="#3a2010" />
      </linearGradient>

      {/* ボトルシルエット */}
      <linearGradient id="bs-bottle-sil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1b3022" stopOpacity={0.6} />
        <stop offset="100%" stopColor="#0d1a12" stopOpacity={0.8} />
      </linearGradient>

      {/* アンバーボトルシルエット (暖色ヒント) */}
      <linearGradient id="bs-bottle-amber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.12} />
        <stop offset="100%" stopColor="#8b6a3a" stopOpacity={0.18} />
      </linearGradient>

      {/* ── 冷蔵庫 (右上) ── */}
      <linearGradient id="bs-fridge-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3a3e42" />
        <stop offset="50%" stopColor="#2e3236" />
        <stop offset="100%" stopColor="#22262a" />
      </linearGradient>

      {/* 冷蔵庫内部の青白いグロー */}
      <radialGradient id="bs-fridge-glow" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stopColor="#c0d8f0" stopOpacity={0.12} />
        <stop offset="50%" stopColor="#90b0d0" stopOpacity={0.06} />
        <stop offset="100%" stopColor="#6090b0" stopOpacity={0} />
      </radialGradient>

      {/* ── ツール棚 (左下) ── */}
      <linearGradient id="bs-tool-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#141c18" />
        <stop offset="100%" stopColor="#0a120e" />
      </linearGradient>

      {/* ── グラス棚 (右下) ── */}
      <linearGradient id="bs-glass-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#121a16" />
        <stop offset="100%" stopColor="#0d1a12" />
      </linearGradient>

      {/* グラス棚のバックライト */}
      <radialGradient id="bs-glass-glow" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.1} />
        <stop offset="60%" stopColor="#c9a96e" stopOpacity={0.03} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      {/* ── 天井照明 ── */}
      <radialGradient id="bs-overhead-center" cx="0.5" cy="0" r="0.65">
        <stop offset="0%" stopColor="#c9a96e" stopOpacity={0.2} />
        <stop offset="50%" stopColor="#c9a96e" stopOpacity={0.06} />
        <stop offset="100%" stopColor="#c9a96e" stopOpacity={0} />
      </radialGradient>

      <radialGradient id="bs-overhead-left" cx="0.2" cy="0" r="0.4">
        <stop offset="0%" stopColor="#e8b84a" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#e8b84a" stopOpacity={0} />
      </radialGradient>

      <radialGradient id="bs-overhead-right" cx="0.8" cy="0" r="0.4">
        <stop offset="0%" stopColor="#e8b84a" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#e8b84a" stopOpacity={0} />
      </radialGradient>

      {/* ペグボードパターン */}
      <pattern id="bs-pegboard" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.2" fill="#1b3022" fillOpacity={0.4} />
      </pattern>
    </defs>

    {/* ━━━━━━━━ 壁面ベース ━━━━━━━━ */}
    <rect x="0" y="0" width="800" height="480" fill="url(#bs-wall)" />

    {/* 象限を分ける中央の仕切り線 (縦) */}
    <line x1="400" y1="0" x2="400" y2="260" stroke="#1b3022" strokeWidth="3" strokeOpacity={0.7} />
    {/* 上段/下段仕切り (横) */}
    <line x1="0" y1="130" x2="800" y2="130" stroke="#1b3022" strokeWidth="2" strokeOpacity={0.5} />

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         TOP-LEFT: 酒棚 (Liquor Shelf) — x:0–400, y:0–130
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <rect x="0" y="0" width="400" height="130" fill="url(#bs-liquor-bg)" />
    <rect x="0" y="0" width="400" height="130" fill="url(#bs-liquor-glow)" />

    {/* 棚板 Row 1 (上段) */}
    <rect x="16" y="48" width="368" height="6" rx="1" fill="url(#bs-shelf-wood)" />
    {/* 棚板の上面ハイライト */}
    <line x1="16" y1="48" x2="384" y2="48" stroke="#8b6a3a" strokeWidth="0.5" strokeOpacity={0.3} />

    {/* Row 1 ボトルシルエット (6本) */}
    <path d="M40 48 L40 22 C40 18 43 16 46 16 L48 16 C51 16 54 18 54 22 L54 48" fill="url(#bs-bottle-sil)" />
    <rect x="43" y="30" width="8" height="10" rx="1" fill="#c9a96e" fillOpacity={0.06} />
    <path d="M90 48 L90 26 C90 22 92 20 95 20 L97 20 C100 20 102 22 102 26 L102 48" fill="url(#bs-bottle-sil)" />
    <path d="M140 48 L140 16 C140 12 143 10 146 10 L148 10 C151 10 154 12 154 16 L154 48" fill="url(#bs-bottle-sil)" />
    <rect x="143" y="24" width="8" height="12" rx="1" fill="url(#bs-bottle-amber)" />
    <path d="M200 48 L200 20 C200 16 202 14 205 14 L209 14 C212 14 214 16 214 20 L214 48" fill="url(#bs-bottle-sil)" />
    <path d="M260 48 L260 24 C260 20 262 18 265 18 L267 18 C270 18 272 20 272 24 L272 48" fill="url(#bs-bottle-sil)" />
    <rect x="263" y="30" width="6" height="10" rx="1" fill="#c9a96e" fillOpacity={0.05} />
    <path d="M320 48 L320 18 C320 14 323 12 326 12 L328 12 C331 12 334 14 334 18 L334 48" fill="url(#bs-bottle-sil)" />

    {/* 棚板 Row 2 (下段) */}
    <rect x="16" y="112" width="368" height="6" rx="1" fill="url(#bs-shelf-wood)" />
    <line x1="16" y1="112" x2="384" y2="112" stroke="#8b6a3a" strokeWidth="0.5" strokeOpacity={0.3} />

    {/* Row 2 ボトルシルエット (5本) */}
    <path d="M56 112 L56 76 C56 72 58 68 61 68 L65 68 C68 68 70 72 70 76 L70 112" fill="url(#bs-bottle-sil)" />
    <rect x="59" y="84" width="8" height="14" rx="1" fill="#c9a96e" fillOpacity={0.06} />
    <path d="M120 112 L120 82 C120 78 123 76 126 76 L128 76 C131 76 134 78 134 82 L134 112" fill="url(#bs-bottle-sil)" />
    <path d="M190 112 L190 70 C190 66 192 64 195 64 L199 64 C202 64 204 66 204 70 L204 112" fill="url(#bs-bottle-sil)" />
    <rect x="193" y="80" width="8" height="14" rx="1" fill="url(#bs-bottle-amber)" />
    <path d="M260 112 L260 80 C260 74 264 72 268 72 L272 72 C276 72 280 74 280 80 L280 112" fill="url(#bs-bottle-sil)" />
    <path d="M340 112 L340 78 C340 74 343 72 346 72 L348 72 C351 72 354 74 354 78 L354 112" fill="url(#bs-bottle-sil)" />
    <rect x="343" y="86" width="8" height="12" rx="1" fill="#c9a96e" fillOpacity={0.05} />

    {/* 酒棚ラベル */}
    <text x="200" y="128" textAnchor="middle" fontSize="11" fill="#c9a96e" fillOpacity={0.35} fontFamily="sans-serif">酒棚</text>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         TOP-RIGHT: 冷蔵庫 (Fridge) — x:400–800, y:0–130
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <rect x="400" y="0" width="400" height="130" fill="url(#bs-fridge-body)" />

    {/* ステンレスパネルの縦ブラシ目テクスチャ */}
    <line x1="420" y1="0" x2="420" y2="130" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.03} />
    <line x1="460" y1="0" x2="460" y2="130" stroke="#ffffff" strokeWidth="0.2" strokeOpacity={0.02} />
    <line x1="500" y1="0" x2="500" y2="130" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.03} />
    <line x1="540" y1="0" x2="540" y2="130" stroke="#ffffff" strokeWidth="0.2" strokeOpacity={0.02} />
    <line x1="580" y1="0" x2="580" y2="130" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.03} />
    <line x1="620" y1="0" x2="620" y2="130" stroke="#ffffff" strokeWidth="0.2" strokeOpacity={0.02} />
    <line x1="660" y1="0" x2="660" y2="130" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.03} />
    <line x1="700" y1="0" x2="700" y2="130" stroke="#ffffff" strokeWidth="0.2" strokeOpacity={0.02} />
    <line x1="740" y1="0" x2="740" y2="130" stroke="#ffffff" strokeWidth="0.3" strokeOpacity={0.03} />
    <line x1="780" y1="0" x2="780" y2="130" stroke="#ffffff" strokeWidth="0.2" strokeOpacity={0.02} />

    {/* 冷蔵庫の扉の枠 */}
    <rect x="412" y="6" width="376" height="118" rx="3" fill="none" stroke="#4a4e52" strokeWidth="2" />

    {/* 内部の青白いグロー */}
    <rect x="412" y="6" width="376" height="118" rx="3" fill="url(#bs-fridge-glow)" />

    {/* ドアヒンジ(左側) */}
    <rect x="406" y="30" width="4" height="12" rx="1" fill="#50545a" />
    <rect x="406" y="88" width="4" height="12" rx="1" fill="#50545a" />

    {/* ハンドル (右側、縦型) */}
    <rect x="770" y="30" width="6" height="70" rx="3" fill="#5a5e64" stroke="#6a6e74" strokeWidth="0.5" />
    {/* ハンドルのハイライト */}
    <line x1="772" y1="34" x2="772" y2="96" stroke="#ffffff" strokeWidth="0.8" strokeOpacity={0.1} />

    {/* ゴムパッキンのエッジ (暗い枠) */}
    <rect x="414" y="8" width="372" height="114" rx="2" fill="none" stroke="#1a1e22" strokeWidth="1.5" />

    {/* 温度インジケーター LED */}
    <circle cx="432" cy="18" r="2" fill="#60a8f0" fillOpacity={0.5} />
    <circle cx="432" cy="18" r="1" fill="#80c0ff" fillOpacity={0.7} />

    {/* 冷蔵庫ラベル */}
    <text x="600" y="128" textAnchor="middle" fontSize="11" fill="#90b0c8" fillOpacity={0.35} fontFamily="sans-serif">冷蔵庫</text>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         BOTTOM-LEFT: ツール棚 (Tool Shelf) — x:0–400, y:130–260
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <rect x="0" y="130" width="400" height="130" fill="url(#bs-tool-bg)" />

    {/* ペグボードパターン */}
    <rect x="10" y="136" width="380" height="118" fill="url(#bs-pegboard)" />

    {/* ペグボードの枠 */}
    <rect x="10" y="136" width="380" height="118" rx="2" fill="none" stroke="#1b3022" strokeWidth="1" strokeOpacity={0.4} />

    {/* ── ツールシルエット ── */}

    {/* シェーカー */}
    <g opacity={0.35}>
      {/* ボディ */}
      <path d="M60 176 L56 230 C56 234 60 236 66 236 L74 236 C80 236 84 234 84 230 L80 176 Z" fill="none" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* キャップ */}
      <path d="M62 176 L66 160 C66 156 74 156 74 160 L78 176 Z" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* フック */}
      <circle cx="70" cy="152" r="4" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </g>

    {/* バースプーン */}
    <g opacity={0.3}>
      {/* 長い柄 (ツイスト) */}
      <path d="M150 150 C152 160 148 170 150 180 C152 190 148 200 150 210 C152 220 148 230 150 240" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="2 2" />
      {/* スプーン部分 (下) */}
      <ellipse cx="150" cy="244" rx="6" ry="4" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="2 2" />
      {/* フック */}
      <circle cx="150" cy="146" r="3" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </g>

    {/* ジガー (メジャーカップ) */}
    <g opacity={0.32}>
      {/* 上カップ */}
      <path d="M220 186 L214 164 C214 160 218 158 224 158 L232 158 C238 158 242 160 242 164 L236 186" fill="none" stroke="#c9a96e" strokeWidth="1.3" strokeDasharray="3 2" />
      {/* 下カップ (逆さ) */}
      <path d="M222 186 L216 212 C216 216 220 218 228 218 L228 218 C236 218 240 216 240 212 L234 186" fill="none" stroke="#c9a96e" strokeWidth="1.3" strokeDasharray="3 2" />
      {/* くびれライン */}
      <line x1="218" y1="186" x2="238" y2="186" stroke="#c9a96e" strokeWidth="1" strokeOpacity={0.4} />
      {/* フック */}
      <circle cx="228" cy="152" r="3.5" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </g>

    {/* ストレーナー */}
    <g opacity={0.28}>
      {/* 丸い部分 */}
      <ellipse cx="310" cy="190" rx="22" ry="14" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* 穴パターン */}
      <circle cx="302" cy="188" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
      <circle cx="310" cy="186" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
      <circle cx="318" cy="188" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
      <circle cx="306" cy="194" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
      <circle cx="314" cy="194" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.6" />
      {/* ハンドル */}
      <path d="M332 190 L358 190" fill="none" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* 耳 (左右) */}
      <path d="M290 184 L284 178" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M290 196 L284 202" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" />
      {/* フック */}
      <circle cx="310" cy="170" r="3" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </g>

    {/* マドラー */}
    <g opacity={0.26}>
      <line x1="370" y1="156" x2="370" y2="240" stroke="#c9a96e" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="370" cy="244" r="4" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="370" cy="152" r="3" fill="none" stroke="#c9a96e" strokeWidth="1" />
    </g>

    {/* ツール棚ラベル */}
    <text x="200" y="256" textAnchor="middle" fontSize="11" fill="#c9a96e" fillOpacity={0.3} fontFamily="sans-serif">ツール棚</text>

    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         BOTTOM-RIGHT: グラス棚 (Glass Shelf) — x:400–800, y:130–260
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
    <rect x="400" y="130" width="400" height="130" fill="url(#bs-glass-bg)" />
    <rect x="400" y="130" width="400" height="130" fill="url(#bs-glass-glow)" />

    {/* ガラス棚板 (透明棚 edge-lit) */}
    <rect x="416" y="178" width="368" height="3" rx="1" fill="#ffffff" fillOpacity={0.04} />
    <line x1="416" y1="178" x2="784" y2="178" stroke="#ffffff" strokeWidth="0.8" strokeOpacity={0.12} />
    <line x1="416" y1="181" x2="784" y2="181" stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.06} />

    <rect x="416" y="230" width="368" height="3" rx="1" fill="#ffffff" fillOpacity={0.03} />
    <line x1="416" y1="230" x2="784" y2="230" stroke="#ffffff" strokeWidth="0.8" strokeOpacity={0.1} />
    <line x1="416" y1="233" x2="784" y2="233" stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.05} />

    {/* ── グラスシルエット Row 1 (上段: y=178) ── */}

    {/* カクテルグラス (マティーニ型) */}
    <g opacity={0.25}>
      <path d="M450 178 L450 162 L432 142 L468 142 L450 162" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="442" y1="178" x2="458" y2="178" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* カクテルグラス 2 */}
    <g opacity={0.22}>
      <path d="M510 178 L510 164 L494 146 L526 146 L510 164" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <line x1="502" y1="178" x2="518" y2="178" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* クーペグラス */}
    <g opacity={0.23}>
      <path d="M580 178 L580 164 C580 158 566 148 566 148 L594 148 C594 148 580 158 580 164" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="572" y1="178" x2="588" y2="178" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* ショットグラス */}
    <g opacity={0.2}>
      <path d="M640 178 L642 162 L658 162 L660 178" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="642" y1="162" x2="658" y2="162" stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.5} />
    </g>

    {/* ワイングラス */}
    <g opacity={0.22}>
      <path d="M720 178 L720 166 C720 160 710 150 710 146 C710 142 730 142 730 146 C730 150 720 160 720 166" fill="none" stroke="#ffffff" strokeWidth="1.1" />
      <line x1="712" y1="178" x2="728" y2="178" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* ── グラスシルエット Row 2 (下段: y=230) ── */}

    {/* タンブラー (ロックグラス) */}
    <g opacity={0.22}>
      <path d="M448 230 L452 198 L474 198 L478 230" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      {/* カットパターン */}
      <line x1="456" y1="204" x2="454" y2="226" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
      <line x1="464" y1="204" x2="462" y2="226" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
      <line x1="472" y1="204" x2="470" y2="226" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.4} />
    </g>

    {/* ハイボールグラス (コリンズ) */}
    <g opacity={0.2}>
      <path d="M530 230 L532 190 L554 190 L556 230" fill="none" stroke="#ffffff" strokeWidth="1.1" />
    </g>

    {/* タンブラー 2 */}
    <g opacity={0.22}>
      <path d="M608 230 L612 200 L632 200 L636 230" fill="none" stroke="#ffffff" strokeWidth="1.1" />
    </g>

    {/* コリンズグラス 2 (背が高い) */}
    <g opacity={0.18}>
      <path d="M686 230 L688 186 L706 186 L708 230" fill="none" stroke="#ffffff" strokeWidth="1" />
    </g>

    {/* フルートグラス (シャンパン) */}
    <g opacity={0.2}>
      <path d="M758 230 L758 212 C758 204 750 196 750 192 C750 188 766 188 766 192 C766 196 758 204 758 212" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="752" y1="230" x2="764" y2="230" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* グラス棚ラベル */}
    <text x="600" y="256" textAnchor="middle" fontSize="11" fill="#c9a96e" fillOpacity={0.3} fontFamily="sans-serif">グラス棚</text>

    {/* ━━━━━━━━ 天井アンバー照明 (全体覆い) ━━━━━━━━ */}
    <rect x="0" y="0" width="800" height="260" fill="url(#bs-overhead-center)" />
    <rect x="0" y="0" width="400" height="200" fill="url(#bs-overhead-left)" />
    <rect x="400" y="0" width="400" height="200" fill="url(#bs-overhead-right)" />

    {/* 天井際のハイライトライン */}
    <line x1="100" y1="0" x2="700" y2="0" stroke="#c9a96e" strokeWidth="2" strokeOpacity={0.15} />

    {/* ━━━━━━━━ カウンター (y: 260–480) ━━━━━━━━ */}

    {/* カウンターのエッジ（手前の角丸い縁） */}
    <path
      d="M0 260 Q0 256 4 256 L796 256 Q800 256 800 260"
      fill="#8b5e3c"
      stroke="#5c3520"
      strokeWidth="0.5"
    />

    {/* カウンター天板 */}
    <rect x="0" y="260" width="800" height="60" fill="url(#bs-counter-top)" />
    {/* 木目パターン */}
    <rect x="0" y="260" width="800" height="60" fill="url(#bs-woodgrain)" />

    {/* カウンター表面のガラスのような反射 */}
    <rect x="0" y="260" width="800" height="20" fill="url(#bs-counter-reflect)" />

    {/* 反射のハイライトライン */}
    <line x1="40" y1="268" x2="350" y2="268" stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.06} />
    <line x1="420" y1="270" x2="760" y2="270" stroke="#ffffff" strokeWidth="0.4" strokeOpacity={0.05} />

    {/* カウンター天板のゴールドエッジ */}
    <line x1="0" y1="320" x2="800" y2="320" stroke="#c9a96e" strokeWidth="1.5" strokeOpacity={0.2} />

    {/* カウンター前面 */}
    <rect x="0" y="320" width="800" height="160" fill="url(#bs-counter-front)" />

    {/* カウンター前面の装飾パネル */}
    <rect x="40" y="340" width="200" height="100" rx="4" fill="#ffffff" fillOpacity={0.015} stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.03} />
    <rect x="300" y="340" width="200" height="100" rx="4" fill="#ffffff" fillOpacity={0.015} stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.03} />
    <rect x="560" y="340" width="200" height="100" rx="4" fill="#ffffff" fillOpacity={0.015} stroke="#ffffff" strokeWidth="0.5" strokeOpacity={0.03} />

    {/* ━━━━━━━━ クリッカブルオーバーレイ ━━━━━━━━ */}

    {/* 酒棚タップエリア */}
    <rect
      x="0"
      y="0"
      width="400"
      height="130"
      fill="transparent"
      style={{ cursor: onShelfTap ? 'pointer' : undefined }}
      onClick={onShelfTap ? () => onShelfTap('liquorShelf') : undefined}
    />

    {/* 冷蔵庫タップエリア */}
    <rect
      x="400"
      y="0"
      width="400"
      height="130"
      fill="transparent"
      style={{ cursor: onShelfTap ? 'pointer' : undefined }}
      onClick={onShelfTap ? () => onShelfTap('fridge') : undefined}
    />

    {/* ツール棚タップエリア */}
    <rect
      x="0"
      y="130"
      width="400"
      height="130"
      fill="transparent"
      style={{ cursor: onShelfTap ? 'pointer' : undefined }}
      onClick={onShelfTap ? () => onShelfTap('toolShelf') : undefined}
    />

    {/* グラス棚タップエリア */}
    <rect
      x="400"
      y="130"
      width="400"
      height="130"
      fill="transparent"
      style={{ cursor: onShelfTap ? 'pointer' : undefined }}
      onClick={onShelfTap ? () => onShelfTap('glassShelf') : undefined}
    />
  </svg>
);

export default BarSceneSVG;
