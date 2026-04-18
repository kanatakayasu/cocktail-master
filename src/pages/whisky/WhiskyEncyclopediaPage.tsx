import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  FlaskConical,
} from 'lucide-react';
import { whiskyDistilleries } from '../../data/whisky';
import type { WhiskyDistillery } from '../../types/whisky';

// ─── 定数 ───────────────────────────────────────

type TabKey = 'distilleries' | 'production' | 'tasting' | 'drinking';

interface TabDef {
  key: TabKey;
  label: string;
  emoji: string;
}

const TABS: TabDef[] = [
  { key: 'distilleries', label: '蒸留所', emoji: '🏭' },
  { key: 'production', label: '製造工程', emoji: '⚗️' },
  { key: 'tasting', label: 'テイスティング', emoji: '👃' },
  { key: 'drinking', label: '飲み方・カクテル', emoji: '🥃' },
];

const COUNTRY_FILTERS = [
  { key: 'all', label: '全て' },
  { key: 'scotland', label: 'スコットランド' },
  { key: 'ireland', label: 'アイルランド' },
  { key: 'usa', label: 'アメリカ' },
  { key: 'canada', label: 'カナダ' },
  { key: 'japan', label: '日本' },
  { key: 'other', label: 'その他' },
] as const;

const COUNTRY_LABELS: Record<string, string> = {
  scotland: 'スコットランド',
  ireland: 'アイルランド',
  usa: 'アメリカ',
  canada: 'カナダ',
  japan: '日本',
  other: 'その他',
};

// 製造工程データ
const PRODUCTION_STEPS = [
  {
    emoji: '🌾',
    title: '製麦（モルティング）',
    description: '大麦を水に浸して発芽させ、その後乾燥させて麦芽（モルト）を作る。スコッチではピート（泥炭）で燻すことでスモーキーな風味が生まれる。発芽の度合いがフレーバーに大きく影響する重要な工程。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Highland_park_malting_floor.jpg/800px-Highland_park_malting_floor.jpg',
  },
  {
    emoji: '⚙️',
    title: '粉砕（ミリング）',
    description: '乾燥させた麦芽をローラーミルで粉砕し、グリスト（粗挽き粉）にする。粗さの配分（ハスク・グリッツ・フラワー）が糖化効率を左右する。粉砕が細かすぎると濾過に時間がかかり、粗すぎると糖分の抽出が不十分になる。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Grain_mill_at_Jack_Daniel%27s_Distillery.jpg/800px-Grain_mill_at_Jack_Daniel%27s_Distillery.jpg',
  },
  {
    emoji: '🫗',
    title: '糖化（マッシング）',
    description: 'グリストに温水を加えてマッシュタン（糖化槽）で撹拌し、デンプンを糖に変換する。通常63〜70℃の温水を3回に分けて注ぎ、甘い麦汁（ウォート）を得る。温度管理が発酵に適した糖分組成を決定する。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Glenfiddich_mash_tun.jpg/800px-Glenfiddich_mash_tun.jpg',
  },
  {
    emoji: '🧫',
    title: '発酵（ファーメンテーション）',
    description: 'ウォートをウォッシュバック（発酵槽）に移し、酵母を加えて発酵させる。48〜72時間かけてアルコール度数7〜9%のウォッシュ（発酵液）を得る。木製またはステンレス製の発酵槽が使われ、素材によって微妙に風味が異なる。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Glenfiddich_Washbacks.jpg/800px-Glenfiddich_Washbacks.jpg',
  },
  {
    emoji: '🔥',
    title: '蒸留（ディスティレーション）',
    description: 'ポットスチル（単式蒸留器）またはカラムスチル（連続式蒸留器）でアルコールを濃縮する。モルトウイスキーは通常2回蒸留（初留・再留）。スチルの形状やラインアームの角度がニュースピリッツの性格を決定づける。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stills_at_Dallas_Dhu.jpg/800px-Stills_at_Dallas_Dhu.jpg',
  },
  {
    emoji: '🪵',
    title: '熟成（マチュレーション）',
    description: 'ニュースピリッツをオーク樽に詰めて数年〜数十年熟成させる。バーボン樽、シェリー樽、ワイン樽など樽の種類で風味が大きく変わる。ウイスキーの風味の60〜80%は熟成過程で形成されるとされる。エンジェルズシェア（天使の分け前）として年間2〜3%が蒸発する。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Old_casks_in_Bushmill%27s_old_warehouse.jpg/800px-Old_casks_in_Bushmill%27s_old_warehouse.jpg',
  },
  {
    emoji: '🔄',
    title: 'ブレンド（ヴァッティング）',
    description: 'ブレンデッドウイスキーの場合、マスターブレンダーが数十種類のモルト原酒とグレーン原酒を調合する。シングルモルトでも異なる樽の原酒を組み合わせるヴァッティングにより一貫した味わいを実現する。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Blended_whisky.jpg',
  },
  {
    emoji: '🍾',
    title: '瓶詰め（ボトリング）',
    description: '最終的な加水調整でアルコール度数を40〜46%に調整し、瓶詰めする。カスクストレングス（樽出し原酒）は加水なしで瓶詰めされる。チルフィルタリング（冷却濾過）の有無も製品の特徴に影響を与える。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Shieldhall_Whisky_Bottling_Plant_-_geograph.org.uk_-_59318.jpg',
  },
];

// テイスティングデータ
const FLAVOR_CATEGORIES = [
  { emoji: '🔥', name: 'スモーキー', description: 'ピート、燻製、焚き火。アイラモルトに顕著', color: '#6B4226' },
  { emoji: '🌸', name: 'フローラル', description: '花のような香り。ローランドやスペイサイドに多い', color: '#E91E63' },
  { emoji: '🍎', name: 'フルーティー', description: 'りんご、洋梨、シトラス、トロピカルフルーツ', color: '#FF9800' },
  { emoji: '🌶️', name: 'スパイシー', description: 'シナモン、クローブ、胡椒。ライウイスキーに顕著', color: '#F44336' },
  { emoji: '🍯', name: 'スウィート', description: 'ハチミツ、バニラ、キャラメル、トフィー', color: '#FFC107' },
  { emoji: '🪵', name: 'ウッディー', description: 'オーク、サンダルウッド、樽由来の風味', color: '#795548' },
  { emoji: '🌾', name: 'モルティー', description: '麦芽、ビスケット、パン生地、穀物', color: '#CDDC39' },
  { emoji: '🥜', name: 'ナッティー', description: 'アーモンド、ヘーゼルナッツ、ウォールナッツ', color: '#8D6E63' },
  { emoji: '🌊', name: 'マリン', description: '潮風、海藻、ヨード。沿岸の蒸留所に特徴的', color: '#00BCD4' },
  { emoji: '🍫', name: 'リッチ', description: 'チョコレート、ダークフルーツ、シェリー樽由来', color: '#4E342E' },
];

const TASTING_STEPS = [
  { emoji: '👁️', title: '外観（Appearance）', description: '色の濃淡・粘性（レッグ/ティア）を観察。色が濃いほど長期熟成やシェリー樽の影響が大きい。グラスを傾けて戻した際の液体の流れ方でアルコール度数や粘度を推測できる。' },
  { emoji: '👃', title: '香り（Nose）', description: 'まずストレートで嗅ぎ、次に少量の水を加えて変化を楽しむ。グラスを回さず、鼻を近づけすぎないのがコツ。最初のインプレッション、時間経過による変化、加水後の変化の3段階で評価する。' },
  { emoji: '👅', title: '味わい（Palate）', description: '少量を口に含み、舌全体に広げる。甘味・酸味・苦味・スパイス感を評価。口の中での温度変化による風味の展開も重要なポイント。' },
  { emoji: '✨', title: '余韻（Finish）', description: '飲み込んだ後に残る風味の長さと質を評価。ショート・ミディアム・ロングで表現。余韻にどのフレーバーが残るかも銘柄の特徴を知る重要な手がかり。' },
];

// 飲み方データ
const DRINKING_METHODS = [
  {
    emoji: '🥃',
    name: 'ストレート（ニート）',
    nameEn: 'Straight / Neat',
    description: 'ウイスキーそのままを常温で味わう飲み方。ウイスキー本来の風味を最も直接的に感じられる。テイスティンググラス（グレンケアン）を使用すると香りが集まりやすい。チェイサー（水）を用意するのがマナー。',
    ratio: 'ウイスキーのみ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Glencairn_whisky_glass_and_lights.jpg/800px-Glencairn_whisky_glass_and_lights.jpg',
  },
  {
    emoji: '🧊',
    name: 'オン・ザ・ロック',
    nameEn: 'On the Rocks',
    description: 'ロックグラスに大きめの氷を入れ、ウイスキーを注ぐ。温度変化とともに風味が変わる楽しみがある。氷が溶けるにつれて加水効果も加わり、時間経過での味の変化を楽しめる。',
    ratio: 'ウイスキー＋氷',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Whiskey_with_spherical_ice.jpg',
  },
  {
    emoji: '💧',
    name: 'トワイスアップ',
    nameEn: 'Twice Up',
    description: 'ウイスキーと常温の水を1:1で混ぜる飲み方。アルコール度数が20〜30度になり、最も香りが引き立つとされる。ブレンダーがテイスティングする際にもよく用いられるプロフェッショナルな手法。',
    ratio: 'ウイスキー 1 : 水 1',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Glencairn_Glasses_and_Water_Jug.jpg/800px-Glencairn_Glasses_and_Water_Jug.jpg',
  },
  {
    emoji: '🚰',
    name: '水割り',
    nameEn: 'Mizuwari',
    description: '日本発祥の飲み方。グラスに氷を入れ、ウイスキーと冷水を1:2〜3の比率で混ぜる。食事と合わせやすい濃度になるのが特徴で、日本の食文化に合った飲み方として世界的にも認知されている。',
    ratio: 'ウイスキー 1 : 水 2〜3',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/1977_NatsumeGataMizuwariSet_Masahiro-Mori.jpg',
  },
  {
    emoji: '🫧',
    name: 'ハイボール',
    nameEn: 'Highball',
    description: 'ウイスキーをソーダ水（炭酸水）で割る飲み方。爽やかで飲みやすく、食中酒としても最適。日本ではサントリーの「角ハイボール」キャンペーン（2008年〜）で大ブームとなり、ウイスキー市場を復活させた。',
    ratio: 'ウイスキー 1 : ソーダ 3〜4',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Highball%2C_bar%2C_Golden_Gai%2C_Shinkjuku%2C_Tokyo%2C_Japan_in_2024.jpg/800px-Highball%2C_bar%2C_Golden_Gai%2C_Shinkjuku%2C_Tokyo%2C_Japan_in_2024.jpg',
  },
  {
    emoji: '🥂',
    name: 'ハーフロック',
    nameEn: 'Half Rock',
    description: 'ロックグラスに氷を入れ、ウイスキーと水を1:1で注ぐ飲み方。トワイスアップの氷入り版とも言える。オン・ザ・ロックより柔らかく、水割りより濃い、バランスの良い飲み方。',
    ratio: 'ウイスキー 1 : 水 1 ＋氷',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Glass_of_Scotch_and_soda.jpg/800px-Glass_of_Scotch_and_soda.jpg',
  },
];

// カクテルデータ
const WHISKY_COCKTAILS = [
  {
    emoji: '🍸',
    name: 'マンハッタン',
    nameEn: 'Manhattan',
    base: 'ライウイスキー（またはバーボン）',
    ingredients: ['ライウイスキー 45ml', 'スイートベルモット 15ml', 'アンゴスチュラビターズ 1dash'],
    technique: 'ステア',
    glass: 'カクテルグラス',
    description: '「カクテルの女王」と称される格式高いカクテル。19世紀後半のニューヨーク・マンハッタンクラブで誕生。マラスキーノチェリーを飾る。',
    color: '#8B0000',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/yk70e31606771240.jpg',
  },
  {
    emoji: '🥃',
    name: 'オールドファッションド',
    nameEn: 'Old Fashioned',
    base: 'バーボン（またはライウイスキー）',
    ingredients: ['バーボン 45ml', '角砂糖 1個', 'アンゴスチュラビターズ 2dash', 'ソーダ 少量'],
    technique: 'ビルド（マドル）',
    glass: 'オールドファッションドグラス',
    description: '最古のカクテルの一つとされる。角砂糖にビターズを染み込ませ、少量のソーダで溶かしてからウイスキーと氷を加える。オレンジピールで風味を添える。',
    color: '#D2691E',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
  },
  {
    emoji: '🍋',
    name: 'ウイスキーサワー',
    nameEn: 'Whisky Sour',
    base: 'バーボン',
    ingredients: ['バーボン 45ml', 'レモンジュース 20ml', '砂糖（シュガーシロップ）適量'],
    technique: 'シェイク',
    glass: 'サワーグラス',
    description: 'ウイスキーの力強さとレモンの酸味、砂糖の甘みのバランスが絶妙。卵白を加える「ボストンサワー」スタイルもある。',
    color: '#DAA520',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg',
  },
  {
    emoji: '🌿',
    name: 'ミントジュレップ',
    nameEn: 'Mint Julep',
    base: 'バーボン',
    ingredients: ['バーボン 60ml', 'ミントの葉 数枚', '砂糖（シュガーシロップ）適量', 'クラッシュドアイス'],
    technique: 'ビルド（マドル）',
    glass: 'ジュレップカップ（銀製または銅製）',
    description: 'ケンタッキーダービーの公式カクテル。ミントを潰して香りを引き出し、バーボンとクラッシュドアイスで仕上げる清涼感あふれる一杯。',
    color: '#2E8B57',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/squyyq1439907312.jpg',
  },
  {
    emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    name: 'ロブロイ',
    nameEn: 'Rob Roy',
    base: 'スコッチウイスキー',
    ingredients: ['スコッチ 45ml', 'スイートベルモット 15ml', 'アンゴスチュラビターズ 1dash'],
    technique: 'ステア',
    glass: 'カクテルグラス',
    description: 'マンハッタンのスコッチ版。スコットランドの英雄ロバート・ロイ・マクレガーにちなむ。マンハッタンよりスモーキーでドライな味わい。',
    color: '#722F37',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/typuyq1439456976.jpg',
  },
  {
    emoji: '🔑',
    name: 'ラスティネイル',
    nameEn: 'Rusty Nail',
    base: 'スコッチウイスキー',
    ingredients: ['スコッチ 45ml', 'ドランブイ 20ml'],
    technique: 'ビルド',
    glass: 'ロックグラス',
    description: 'スコッチとドランブイ（スコッチベースのハーブリキュール）を混ぜるだけのシンプルなカクテル。甘くスモーキーな味わい。「錆びた釘」という名前の由来は諸説ある。',
    color: '#B8860B',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/yqsvtw1478252982.jpg',
  },
  {
    emoji: '🎩',
    name: 'ゴッドファーザー',
    nameEn: 'Godfather',
    base: 'スコッチウイスキー',
    ingredients: ['スコッチ 45ml', 'アマレット 15ml'],
    technique: 'ビルド',
    glass: 'ロックグラス',
    description: '映画「ゴッドファーザー」にちなむカクテル。スコッチとアマレット（杏仁リキュール）の組み合わせで、アーモンドの甘い香りとスモーキーさが調和する。',
    color: '#8B4513',
    imageUrl: 'https://www.thecocktaildb.com/images/media/drink/e5zgao1582582378.jpg',
  },
];

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

// ─── 画像コンポーネント ─────────────────────────────

function LazyImage({
  src,
  alt,
  fallbackEmoji,
  fallbackColor,
  aspectRatio = '3/2',
}: {
  src?: string;
  alt: string;
  fallbackEmoji?: string;
  fallbackColor?: string;
  aspectRatio?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <div className="w-full rounded-lg overflow-hidden mb-3" style={{ aspectRatio }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  if (fallbackEmoji) {
    return (
      <div
        className="w-full rounded-lg overflow-hidden mb-3 flex items-center justify-center"
        style={{
          aspectRatio,
          background: `linear-gradient(135deg, ${fallbackColor || '#c9a96e'}30, ${fallbackColor || '#c9a96e'}08)`,
        }}
      >
        <span className="text-5xl opacity-50">{fallbackEmoji}</span>
      </div>
    );
  }

  return null;
}

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

// ─── タブ1: 蒸留所 ──────────────────────────

function DistilleriesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');

  const filtered = useMemo(() => {
    return whiskyDistilleries.filter((d: WhiskyDistillery) => {
      if (searchQuery && !d.name.includes(searchQuery) && !d.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (countryFilter !== 'all' && d.country !== countryFilter) return false;
      return true;
    });
  }, [searchQuery, countryFilter]);

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
          placeholder="蒸留所名で検索..."
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

      {/* フィルター */}
      <div>
        <span className="text-xs font-medium text-gray-500 mb-1.5 block">国</span>
        <div className="flex flex-wrap gap-1.5">
          {COUNTRY_FILTERS.map((f) => (
            <FilterPill
              key={f.key}
              label={f.label}
              active={countryFilter === f.key}
              onClick={() => setCountryFilter(f.key)}
            />
          ))}
        </div>
      </div>

      {/* 件数表示 */}
      <p className="text-xs text-gray-500">{filtered.length} 件の蒸留所</p>

      {/* 蒸留所グリッド */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${countryFilter}-${searchQuery}`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((d: WhiskyDistillery) => (
            <motion.div
              key={d.id}
              variants={cardVariants}
              exit="exit"
              layout
              className="glass-card overflow-hidden transition-all duration-300 flex flex-col"
              whileHover={{ scale: 1.02, boxShadow: `0 0 12px ${d.color}15` }}
            >
              {/* 蒸留所画像 */}
              <LazyImage
                src={d.imageUrl}
                alt={d.name}
                fallbackEmoji={d.emoji}
                fallbackColor={d.color}
                aspectRatio="16/9"
              />

              <div className="px-4 pb-4">
              {/* 蒸留所ヘッダー */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{d.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{d.name}</h3>
                  <p className="text-xs text-gray-500">{d.nameEn}</p>
                </div>
              </div>

              {/* 国・地域 */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span>{COUNTRY_LABELS[d.country]}</span>
                <span className="text-gray-600">|</span>
                <span>{d.region}</span>
              </div>

              {/* 設立 */}
              {d.founded && (
                <p className="text-xs text-gray-400 mb-2">
                  <span className="text-gray-500">設立:</span> {d.founded}
                </p>
              )}

              {/* 代表銘柄 */}
              <div className="border-t border-white/10 pt-2 mb-2">
                <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
                  代表銘柄
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {d.brands.map((brand) => (
                    <span
                      key={brand}
                      className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* 特徴 */}
              <div className="border-t border-white/10 pt-2 text-xs">
                <span className="text-gray-500">特徴:</span>{' '}
                <span className="text-gray-300">{d.features.join('、')}</span>
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FlaskConical size={40} className="mx-auto mb-3 opacity-40" />
          <p>条件に一致する蒸留所が見つかりません</p>
        </div>
      )}
    </div>
  );
}

// ─── タブ2: 製造工程 ──────────────────────────

function ProductionTab() {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-sm text-gray-400 leading-relaxed max-w-3xl mx-auto text-center mb-6">
        ウイスキーの製造は8つの主要工程で構成されています。
        原料の選定から瓶詰めまで、それぞれの工程がウイスキーの最終的な風味と品質を決定づけます。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PRODUCTION_STEPS.map((step, idx) => (
          <motion.div
            key={step.title}
            variants={cardVariants}
            className="glass-card overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(201,169,110,0.1)' }}
          >
            {'imageUrl' in step && step.imageUrl && (
              <LazyImage
                src={step.imageUrl}
                alt={step.title}
                fallbackEmoji={step.emoji}
                aspectRatio="16/9"
              />
            )}
            <div className="p-5 pt-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-accent-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">{step.emoji}</span>
                </div>
                <div>
                  <span className="text-xs text-accent-gold font-mono">STEP {idx + 1}</span>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── タブ3: テイスティング ──────────────────────────

function TastingTab() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* フレーバーホイール */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-xl">🎡</span>
          フレーバーカテゴリ
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          ウイスキーの風味は多種多様なフレーバー要素で構成されています。テイスティングの際にこれらのカテゴリを意識することで、より深く味わいを理解できます。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {FLAVOR_CATEGORIES.map((flavor) => (
            <motion.div
              key={flavor.name}
              className="glass-card p-3 text-center transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: `0 0 14px ${flavor.color}20` }}
              variants={cardVariants}
            >
              <span className="text-2xl block mb-1">{flavor.emoji}</span>
              <h4 className="text-sm font-semibold text-white mb-1">{flavor.name}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">{flavor.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* テイスティング手順 */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span>
          テイスティングの手順
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          ウイスキーを正しく評価するための基本的な手順です。テイスティンググラス（グレンケアン）を使用し、室温のウイスキーで行うのが理想的です。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TASTING_STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              className="glass-card p-5 transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(201,169,110,0.1)' }}
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-accent-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">{step.emoji}</span>
                </div>
                <div>
                  <span className="text-xs text-accent-gold font-mono">STEP {idx + 1}</span>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── タブ4: 飲み方・カクテル ──────────────────────────

function DrinkingTab() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 飲み方 */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-xl">🥃</span>
          ウイスキーの飲み方
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          ウイスキーには様々な飲み方があり、それぞれ異なる楽しみ方ができます。飲み方によって香りや味わいの印象が大きく変わります。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DRINKING_METHODS.map((method) => (
            <motion.div
              key={method.name}
              className="glass-card overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(201,169,110,0.1)' }}
              variants={cardVariants}
            >
              {'imageUrl' in method && method.imageUrl && (
                <LazyImage
                  src={method.imageUrl}
                  alt={method.name}
                  fallbackEmoji={method.emoji}
                  aspectRatio="4/3"
                />
              )}
              <div className="p-5 pt-3">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{method.emoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{method.name}</h4>
                    <p className="text-xs text-gray-500">{method.nameEn}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{method.description}</p>
                <div className="px-2 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 inline-block">
                  <span className="text-xs text-accent-gold font-medium">{method.ratio}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* カクテル */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-xl">🍸</span>
          ウイスキーカクテル
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          ウイスキーベースの代表的なカクテルです。検定ではカクテル名・ベースの種類・技法（ステア/シェイク/ビルド）が出題されます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHISKY_COCKTAILS.map((cocktail) => (
            <motion.div
              key={cocktail.name}
              className="glass-card transition-all duration-300 overflow-hidden relative"
              whileHover={{ scale: 1.02, boxShadow: `0 0 16px ${cocktail.color}15` }}
              variants={cardVariants}
            >
              {/* カクテル画像 */}
              {cocktail.imageUrl && (
                <LazyImage
                  src={cocktail.imageUrl}
                  alt={cocktail.name}
                  fallbackEmoji={cocktail.emoji}
                  fallbackColor={cocktail.color}
                  aspectRatio="3/2"
                />
              )}

              <div className="p-5 relative">
                {/* アクセントライン */}
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l"
                  style={{ backgroundColor: cocktail.color }}
                />

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cocktail.emoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cocktail.name}</h4>
                    <p className="text-xs text-gray-500">{cocktail.nameEn}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">{cocktail.description}</p>

                {/* メタ情報 */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="text-gray-500 shrink-0 w-16">ベース</span>
                    <span className="text-gray-300">{cocktail.base}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 shrink-0 w-16">技法</span>
                    <span className="text-accent-gold font-medium">{cocktail.technique}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 shrink-0 w-16">グラス</span>
                    <span className="text-gray-300">{cocktail.glass}</span>
                  </div>
                </div>

                {/* 材料 */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-500 block mb-1.5">材料</span>
                  <div className="flex flex-wrap gap-1">
                    {cocktail.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 text-gray-300 border border-white/10"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── メインページ ────────────────────────────────

export default function WhiskyEncyclopediaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabKey) || 'distilleries';

  const setTab = useCallback(
    (tab: TabKey) => {
      setSearchParams({ tab }, { replace: true });
    },
    [setSearchParams],
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'distilleries':
        return <DistilleriesTab />;
      case 'production':
        return <ProductionTab />;
      case 'tasting':
        return <TastingTab />;
      case 'drinking':
        return <DrinkingTab />;
      default:
        return <DistilleriesTab />;
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
          ウイスキー図鑑
        </h1>
        <p className="text-sm text-gray-500">
          蒸留所・製造工程・テイスティング・飲み方の百科事典
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
                    layoutId="whiskyActiveTab"
                    className="absolute inset-0 rounded bg-white/10 border border-white/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="whiskyActiveTabUnderline"
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
