import type { WhiskyTreeNode } from '../../types/whisky';

export const whiskyTree: WhiskyTreeNode = {
  name: 'ウイスキー',
  nameEn: 'Whisky / Whiskey',
  color: '#E8A87C',
  children: [
    {
      name: 'モルトウイスキー',
      nameEn: 'Malt Whisky',
      color: '#c9a96e',
      children: [
        {
          name: 'シングルモルト',
          nameEn: 'Single Malt',
          color: '#D4A574',
          children: [
            { name: 'スペイサイド', nameEn: 'Speyside', color: '#8BC34A' },
            { name: 'ハイランド', nameEn: 'Highland', color: '#4CAF50' },
            { name: 'ローランド', nameEn: 'Lowland', color: '#81C784' },
            { name: 'アイラ', nameEn: 'Islay', color: '#607D8B' },
            { name: 'キャンベルタウン', nameEn: 'Campbeltown', color: '#FF9800' },
            { name: 'アイランズ', nameEn: 'Islands', color: '#03A9F4' },
          ],
        },
        {
          name: 'ブレンデッドモルト',
          nameEn: 'Blended Malt',
          color: '#B8860B',
        },
      ],
    },
    {
      name: 'グレーンウイスキー',
      nameEn: 'Grain Whisky',
      color: '#FFB74D',
      children: [
        { name: 'シングルグレーン', nameEn: 'Single Grain', color: '#FFA726' },
        { name: 'ブレンデッドグレーン', nameEn: 'Blended Grain', color: '#FF8F00' },
      ],
    },
    {
      name: 'ブレンデッドウイスキー',
      nameEn: 'Blended Whisky',
      color: '#E57373',
      children: [
        { name: 'ジョニーウォーカー', nameEn: 'Johnnie Walker', color: '#D32F2F' },
        { name: 'バランタイン', nameEn: "Ballantine's", color: '#C62828' },
        { name: 'シーバスリーガル', nameEn: 'Chivas Regal', color: '#B71C1C' },
        { name: 'デュワーズ', nameEn: "Dewar's", color: '#E53935' },
      ],
    },
    {
      name: 'アメリカンウイスキー',
      nameEn: 'American Whiskey',
      color: '#8D6E63',
      children: [
        {
          name: 'バーボン',
          nameEn: 'Bourbon',
          color: '#A1887F',
          children: [
            { name: 'ストレートバーボン', nameEn: 'Straight Bourbon', color: '#BCAAA4' },
            { name: 'ボトルド・イン・ボンド', nameEn: 'Bottled-in-Bond', color: '#D7CCC8' },
          ],
        },
        { name: 'テネシーウイスキー', nameEn: 'Tennessee Whiskey', color: '#795548' },
        { name: 'ライウイスキー', nameEn: 'Rye Whiskey', color: '#6D4C41' },
        { name: 'コーンウイスキー', nameEn: 'Corn Whiskey', color: '#FFCC80' },
      ],
    },
    {
      name: 'アイリッシュウイスキー',
      nameEn: 'Irish Whiskey',
      color: '#66BB6A',
      children: [
        { name: 'シングルポットスチル', nameEn: 'Single Pot Still', color: '#43A047' },
        { name: 'シングルモルト', nameEn: 'Single Malt', color: '#2E7D32' },
        { name: 'グレーン', nameEn: 'Grain', color: '#388E3C' },
        { name: 'ブレンデッド', nameEn: 'Blended', color: '#4CAF50' },
      ],
    },
    {
      name: 'カナディアンウイスキー',
      nameEn: 'Canadian Whisky',
      color: '#EF5350',
      children: [
        { name: 'ベースウイスキー', nameEn: 'Base Whisky', color: '#E57373' },
        { name: 'フレーバリングウイスキー', nameEn: 'Flavouring Whisky', color: '#EF9A9A' },
      ],
    },
    {
      name: 'ジャパニーズウイスキー',
      nameEn: 'Japanese Whisky',
      color: '#CE93D8',
      children: [
        {
          name: 'サントリー系',
          color: '#AB47BC',
          children: [
            { name: '山崎', nameEn: 'Yamazaki', color: '#9C27B0' },
            { name: '白州', nameEn: 'Hakushu', color: '#7B1FA2' },
            { name: '知多', nameEn: 'Chita', color: '#6A1B9A' },
          ],
        },
        {
          name: 'ニッカ系',
          color: '#5C6BC0',
          children: [
            { name: '余市', nameEn: 'Yoichi', color: '#3F51B5' },
            { name: '宮城峡', nameEn: 'Miyagikyo', color: '#303F9F' },
          ],
        },
        {
          name: 'クラフト蒸留所',
          color: '#FF7043',
          children: [
            { name: '秩父', nameEn: 'Chichibu', color: '#E64A19' },
            { name: '厚岸', nameEn: 'Akkeshi', color: '#BF360C' },
            { name: '長濱', nameEn: 'Nagahama', color: '#DD2C00' },
            { name: '静岡', nameEn: 'Shizuoka', color: '#FF3D00' },
          ],
        },
      ],
    },
    {
      name: 'ワールドウイスキー',
      nameEn: 'World Whisky',
      color: '#26C6DA',
      children: [
        { name: '台湾（カバラン）', nameEn: 'Taiwan (Kavalan)', color: '#00BCD4' },
        { name: 'インド（アムルット）', nameEn: 'India (Amrut)', color: '#0097A7' },
        { name: 'オーストラリア', nameEn: 'Australia', color: '#00838F' },
      ],
    },
  ],
};
