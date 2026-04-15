import type { BeverageNode } from '../types';

export const beverageTree: BeverageNode = {
  name: '飲料',
  nameEn: 'Beverage',
  color: '#607D8B',
  children: [
    {
      name: 'アルコール飲料',
      nameEn: 'Alcoholic Beverage',
      color: '#E91E63',
      children: [
        {
          name: '醸造酒',
          nameEn: 'Fermented / Brewed',
          color: '#9C27B0',
          children: [
            { name: 'ワイン', nameEn: 'Wine', color: '#7B1FA2' },
            { name: 'ビール', nameEn: 'Beer', color: '#FFC107' },
            { name: '日本酒', nameEn: 'Sake', color: '#F5F5F5' },
            { name: '紹興酒', color: '#8D6E63' },
            { name: 'シードル', nameEn: 'Cider', color: '#CDDC39' },
          ],
        },
        {
          name: '蒸留酒',
          nameEn: 'Distilled / Spirits',
          color: '#FF5722',
          children: [
            { name: 'ジン', nameEn: 'Gin', color: '#4ECDC4' },
            { name: 'ウォッカ', nameEn: 'Vodka', color: '#95E1D3' },
            { name: 'ラム', nameEn: 'Rum', color: '#F38181' },
            { name: 'テキーラ', nameEn: 'Tequila', color: '#FCE38A' },
            { name: 'ウイスキー', nameEn: 'Whisky/Whiskey', color: '#E8A87C' },
            { name: 'ブランデー', nameEn: 'Brandy', color: '#C06C84' },
            { name: '焼酎', nameEn: 'Shochu', color: '#B0BEC5' },
            { name: 'カシャーサ', nameEn: 'Cachaca', color: '#A5D6A7' },
            { name: 'ピスコ', nameEn: 'Pisco', color: '#FFF9C4' },
            { name: 'アクアヴィット', nameEn: 'Aquavit', color: '#80DEEA' },
          ],
        },
        {
          name: '混成酒',
          nameEn: 'Compound / Mixed',
          color: '#3F51B5',
          children: [
            {
              name: 'リキュール',
              nameEn: 'Liqueur',
              color: '#7C4DFF',
              children: [
                { name: '香草・薬草系', color: '#4CAF50' },
                { name: '果実系', color: '#FF9800' },
                { name: 'ナッツ・種子・豆系', color: '#795548' },
                { name: 'クリーム系', color: '#FFF8E1' },
              ],
            },
            { name: 'ベルモット', nameEn: 'Vermouth', color: '#8BC34A' },
            { name: 'ビターズ', nameEn: 'Bitters', color: '#BF360C' },
          ],
        },
      ],
    },
    {
      name: '非アルコール飲料',
      nameEn: 'Non-Alcoholic / Soft Drink',
      color: '#00BCD4',
      children: [
        {
          name: '炭酸飲料',
          color: '#26C6DA',
          children: [
            { name: 'トニックウォーター', color: '#E0F7FA' },
            { name: 'ソーダ水（炭酸水）', color: '#B2EBF2' },
            { name: 'ジンジャーエール', color: '#FFF8E1' },
            { name: 'ジンジャービア', color: '#FFE0B2' },
            { name: 'コーラ', color: '#3E2723' },
          ],
        },
        {
          name: 'ジュース類',
          color: '#FF9800',
          children: [
            { name: 'オレンジジュース', color: '#FF9800' },
            { name: 'グレープフルーツジュース', color: '#FFEB3B' },
            { name: 'レモンジュース', color: '#FFF176' },
            { name: 'ライムジュース', color: '#C0CA33' },
            { name: 'パイナップルジュース', color: '#FFD54F' },
            { name: 'トマトジュース', color: '#F44336' },
            { name: 'クランベリージュース', color: '#C62828' },
          ],
        },
        {
          name: 'シロップ類',
          color: '#E91E63',
          children: [
            { name: 'グレナデンシロップ（ザクロ）', color: '#C2185B' },
            { name: 'シュガーシロップ（ゴムシロップ）', color: '#F5F5F5' },
            { name: 'その他フレーバーシロップ', color: '#F8BBD0' },
          ],
        },
        {
          name: '乳製品',
          color: '#FFF9C4',
          children: [
            { name: '牛乳', color: '#FFFFFF' },
            { name: '生クリーム', color: '#FFF8E1' },
            { name: 'ココナッツミルク', color: '#F5F5F5' },
          ],
        },
        {
          name: 'その他',
          color: '#795548',
          children: [
            { name: 'コーヒー', color: '#4E342E' },
            { name: '紅茶', color: '#A1887F' },
            { name: 'ミネラルウォーター', color: '#E3F2FD' },
          ],
        },
      ],
    },
  ],
};
