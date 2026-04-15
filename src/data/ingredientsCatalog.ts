import type { IngredientMaster } from '../types/game';

export const ingredientsCatalog: IngredientMaster[] = [
  // ===== スピリッツ (liquorShelf) =====
  { id: 'gin', label: 'ジン', labelEn: 'Gin', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#c8dfc8', isAlcohol: true, aliases: ['ドライジン', 'ロンドンドライジン'] },
  { id: 'vodka', label: 'ウォッカ', labelEn: 'Vodka', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#e8f0f8', isAlcohol: true, aliases: [] },
  { id: 'white-rum', label: 'ホワイトラム', labelEn: 'White Rum', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#f5f0e0', isAlcohol: true, aliases: ['ラム', 'ライトラム'] },
  { id: 'dark-rum', label: 'ダークラム', labelEn: 'Dark Rum', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#8B4513', isAlcohol: true, aliases: [] },
  { id: 'tequila', label: 'テキーラ', labelEn: 'Tequila', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#f5e8c0', isAlcohol: true, aliases: ['ブランコテキーラ'] },
  { id: 'rye-whiskey', label: 'ライウイスキー', labelEn: 'Rye Whiskey', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#c68e17', isAlcohol: true, aliases: ['ウイスキー'] },
  { id: 'bourbon', label: 'バーボン', labelEn: 'Bourbon', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#d4881e', isAlcohol: true, aliases: ['バーボンウイスキー'] },
  { id: 'brandy', label: 'ブランデー', labelEn: 'Brandy', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#c08030', isAlcohol: true, aliases: ['コニャック'] },
  { id: 'scotch-whiskey', label: 'スコッチウイスキー', labelEn: 'Scotch Whisky', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#c68e17', isAlcohol: true, aliases: ['スコッチ'] },
  { id: 'irish-whiskey', label: 'アイリッシュウイスキー', labelEn: 'Irish Whiskey', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#d4a030', isAlcohol: true, aliases: [] },
  { id: 'calvados', label: 'カルヴァドス', labelEn: 'Calvados', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#c89040', isAlcohol: true, aliases: ['アップルブランデー'] },
  { id: 'cachaca', label: 'カシャーサ', labelEn: 'Cachaça', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#f0e8c8', isAlcohol: true, aliases: [] },
  { id: 'pisco', label: 'ピスコ', labelEn: 'Pisco', categoryId: 'spirit', shelfArea: 'liquorShelf', color: '#f0e8d0', isAlcohol: true, aliases: [] },

  // ===== リキュール (liquorShelf) =====
  { id: 'campari', label: 'カンパリ', labelEn: 'Campari', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#FF4444', isAlcohol: true, aliases: [] },
  { id: 'cointreau', label: 'コアントロー', labelEn: 'Cointreau', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#f8f0e0', isAlcohol: true, aliases: ['ホワイトキュラソー', 'オレンジキュラソー'] },
  { id: 'dry-vermouth', label: 'ドライ・ベルモット', labelEn: 'Dry Vermouth', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#f0e8c0', isAlcohol: true, aliases: ['ドライベルモット'] },
  { id: 'sweet-vermouth', label: 'スイートベルモット', labelEn: 'Sweet Vermouth', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#8B0000', isAlcohol: true, aliases: ['スイート・ベルモット'] },
  { id: 'kahlua', label: 'カルーア', labelEn: 'Kahlua', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#3E1F00', isAlcohol: true, aliases: ['コーヒーリキュール'] },
  { id: 'creme-de-cacao', label: 'クレーム・ド・カカオ', labelEn: 'Crème de Cacao', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#5C3317', isAlcohol: true, aliases: [] },
  { id: 'blue-curacao', label: 'ブルーキュラソー', labelEn: 'Blue Curaçao', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#0066FF', isAlcohol: true, aliases: [] },
  { id: 'cherry-heering', label: 'チェリーヒーリング', labelEn: 'Cherry Heering', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#8B0000', isAlcohol: true, aliases: [] },
  { id: 'amaretto', label: 'アマレット', labelEn: 'Amaretto', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#c68e17', isAlcohol: true, aliases: [] },
  { id: 'drambuie', label: 'ドランブイ', labelEn: 'Drambuie', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#c9a96e', isAlcohol: true, aliases: [] },
  { id: 'absinthe', label: 'アブサン', labelEn: 'Absinthe', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#8FBC8F', isAlcohol: true, aliases: [] },
  { id: 'aperol', label: 'アペロール', labelEn: 'Aperol', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#FF6347', isAlcohol: true, aliases: [] },
  { id: 'chartreuse-jaune', label: 'シャルトリューズ・ジョーヌ', labelEn: 'Chartreuse Jaune', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#DAA520', isAlcohol: true, aliases: ['イエローシャルトリューズ'] },
  { id: 'creme-de-cassis', label: 'クレーム・ド・カシス', labelEn: 'Crème de Cassis', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#4B0082', isAlcohol: true, aliases: ['カシス'] },
  { id: 'creme-de-menthe', label: 'クレーム・ド・ミント', labelEn: 'Crème de Menthe', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#00FF7F', isAlcohol: true, aliases: ['ミントリキュール'] },
  { id: 'baileys', label: 'ベイリーズ', labelEn: 'Baileys', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#C4A882', isAlcohol: true, aliases: ['ベイリーズ・アイリッシュクリーム'] },
  { id: 'grand-marnier', label: 'グラン・マルニエ', labelEn: 'Grand Marnier', categoryId: 'liqueur', shelfArea: 'liquorShelf', color: '#D2691E', isAlcohol: true, aliases: [] },

  // ===== ジュース (fridge) =====
  { id: 'orange-juice', label: 'オレンジジュース', labelEn: 'Orange Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#FFA500', isAlcohol: false, aliases: [] },
  { id: 'lime-juice', label: 'ライムジュース', labelEn: 'Lime Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#90EE90', isAlcohol: false, aliases: [] },
  { id: 'lemon-juice', label: 'レモンジュース', labelEn: 'Lemon Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#FFFACD', isAlcohol: false, aliases: [] },
  { id: 'cranberry-juice', label: 'クランベリージュース', labelEn: 'Cranberry Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#DC143C', isAlcohol: false, aliases: [] },
  { id: 'pineapple-juice', label: 'パイナップルジュース', labelEn: 'Pineapple Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#FFD700', isAlcohol: false, aliases: [] },
  { id: 'grapefruit-juice', label: 'グレープフルーツジュース', labelEn: 'Grapefruit Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#FFDAB9', isAlcohol: false, aliases: [] },
  { id: 'tomato-juice', label: 'トマトジュース', labelEn: 'Tomato Juice', categoryId: 'juice', shelfArea: 'fridge', color: '#DC143C', isAlcohol: false, aliases: [] },
  { id: 'peach-puree', label: '白桃ピューレ', labelEn: 'Peach Purée', categoryId: 'juice', shelfArea: 'fridge', color: '#FFE4B5', isAlcohol: false, aliases: ['ピーチピューレ'] },

  // ===== 炭酸・ミキサー (fridge) =====
  { id: 'tonic-water', label: 'トニックウォーター', labelEn: 'Tonic Water', categoryId: 'mixer', shelfArea: 'fridge', color: '#e8f4f8', isAlcohol: false, aliases: [] },
  { id: 'soda', label: 'ソーダ', labelEn: 'Soda Water', categoryId: 'mixer', shelfArea: 'fridge', color: '#f0f8ff', isAlcohol: false, aliases: ['炭酸水', 'ソーダ水'] },
  { id: 'cola', label: 'コーラ', labelEn: 'Cola', categoryId: 'mixer', shelfArea: 'fridge', color: '#3E1F00', isAlcohol: false, aliases: ['コカ・コーラ'] },
  { id: 'ginger-ale', label: 'ジンジャーエール', labelEn: 'Ginger Ale', categoryId: 'mixer', shelfArea: 'fridge', color: '#F5DEB3', isAlcohol: false, aliases: [] },
  { id: 'ginger-beer', label: 'ジンジャービア', labelEn: 'Ginger Beer', categoryId: 'mixer', shelfArea: 'fridge', color: '#DEB887', isAlcohol: false, aliases: [] },
  { id: 'coconut-milk', label: 'ココナッツミルク', labelEn: 'Coconut Milk', categoryId: 'mixer', shelfArea: 'fridge', color: '#FFFDD0', isAlcohol: false, aliases: ['ココナッツクリーム'] },
  { id: 'milk', label: '牛乳', labelEn: 'Milk', categoryId: 'mixer', shelfArea: 'fridge', color: '#FFFFF0', isAlcohol: false, aliases: ['ミルク'] },
  { id: 'cream', label: '生クリーム', labelEn: 'Heavy Cream', categoryId: 'mixer', shelfArea: 'fridge', color: '#FFFFF0', isAlcohol: false, aliases: ['クリーム'] },
  { id: 'champagne', label: 'シャンパン', labelEn: 'Champagne', categoryId: 'mixer', shelfArea: 'fridge', color: '#F5E6C8', isAlcohol: true, aliases: ['スパークリングワイン'] },
  { id: 'prosecco', label: 'プロセッコ', labelEn: 'Prosecco', categoryId: 'mixer', shelfArea: 'fridge', color: '#F5E6C8', isAlcohol: true, aliases: [] },
  { id: 'white-wine', label: '白ワイン', labelEn: 'White Wine', categoryId: 'mixer', shelfArea: 'fridge', color: '#F5E6B0', isAlcohol: true, aliases: [] },
  { id: 'beer', label: 'ビール', labelEn: 'Beer', categoryId: 'mixer', shelfArea: 'fridge', color: '#F5C71A', isAlcohol: true, aliases: [] },
  { id: 'espresso', label: 'エスプレッソ', labelEn: 'Espresso', categoryId: 'mixer', shelfArea: 'fridge', color: '#3E1F00', isAlcohol: false, aliases: ['コーヒー'] },
  { id: 'hot-coffee', label: 'ホットコーヒー', labelEn: 'Hot Coffee', categoryId: 'mixer', shelfArea: 'fridge', color: '#4E2F10', isAlcohol: false, aliases: [] },

  // ===== シロップ・その他 (fridge) =====
  { id: 'grenadine', label: 'グレナデンシロップ', labelEn: 'Grenadine', categoryId: 'syrup', shelfArea: 'fridge', color: '#DC143C', isAlcohol: false, aliases: ['グレナデン'] },
  { id: 'sugar', label: '砂糖', labelEn: 'Sugar', categoryId: 'syrup', shelfArea: 'fridge', color: '#FFFFF0', isAlcohol: false, aliases: ['角砂糖', 'シュガーシロップ'] },
  { id: 'orgeat-syrup', label: 'オルゲートシロップ', labelEn: 'Orgeat Syrup', categoryId: 'syrup', shelfArea: 'fridge', color: '#F5DEB3', isAlcohol: false, aliases: ['アーモンドシロップ'] },
  { id: 'honey-ginger-syrup', label: 'ハニージンジャーシロップ', labelEn: 'Honey Ginger Syrup', categoryId: 'syrup', shelfArea: 'fridge', color: '#DAA520', isAlcohol: false, aliases: [] },
  { id: 'angostura-bitters', label: 'アンゴスチュラビターズ', labelEn: 'Angostura Bitters', categoryId: 'other', shelfArea: 'fridge', color: '#8B4513', isAlcohol: true, aliases: ['ビターズ'] },
  { id: 'peychauds-bitters', label: 'ペイショーズビターズ', labelEn: "Peychaud's Bitters", categoryId: 'other', shelfArea: 'fridge', color: '#DC143C', isAlcohol: true, aliases: [] },
  { id: 'salt', label: '塩', labelEn: 'Salt', categoryId: 'other', shelfArea: 'fridge', color: '#FFFFFF', isAlcohol: false, aliases: [] },
  { id: 'egg-white', label: '卵白', labelEn: 'Egg White', categoryId: 'other', shelfArea: 'fridge', color: '#FFFFF0', isAlcohol: false, aliases: [] },
  { id: 'tabasco', label: 'タバスコ', labelEn: 'Tabasco', categoryId: 'other', shelfArea: 'fridge', color: '#FF4500', isAlcohol: false, aliases: [] },
  { id: 'worcestershire-sauce', label: 'ウスターソース', labelEn: 'Worcestershire Sauce', categoryId: 'other', shelfArea: 'fridge', color: '#4E2F10', isAlcohol: false, aliases: [] },

  // ===== 氷 =====
  { id: 'ice', label: '氷', labelEn: 'Ice', categoryId: 'ice', shelfArea: 'fridge', color: '#d0ecf8', isAlcohol: false, aliases: ['アイス', 'クラッシュドアイス'] },

  // ===== ガーニッシュ (fridge) =====
  { id: 'lime-wedge', label: 'ライムウェッジ', labelEn: 'Lime Wedge', categoryId: 'garnish', shelfArea: 'fridge', color: '#32CD32', isAlcohol: false, aliases: ['ライム'] },
  { id: 'lime-slice', label: 'ライムスライス', labelEn: 'Lime Slice', categoryId: 'garnish', shelfArea: 'fridge', color: '#32CD32', isAlcohol: false, aliases: [] },
  { id: 'lime-peel', label: 'ライムピール', labelEn: 'Lime Peel', categoryId: 'garnish', shelfArea: 'fridge', color: '#32CD32', isAlcohol: false, aliases: [] },
  { id: 'lemon-slice', label: 'レモンスライス', labelEn: 'Lemon Slice', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFD700', isAlcohol: false, aliases: [] },
  { id: 'lemon-peel', label: 'レモンピール', labelEn: 'Lemon Peel', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFD700', isAlcohol: false, aliases: [] },
  { id: 'orange-slice', label: 'オレンジスライス', labelEn: 'Orange Slice', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFA500', isAlcohol: false, aliases: ['オレンジピール'] },
  { id: 'olive', label: 'オリーブ', labelEn: 'Olive', categoryId: 'garnish', shelfArea: 'fridge', color: '#6B8E23', isAlcohol: false, aliases: [] },
  { id: 'maraschino-cherry', label: 'マラスキーノチェリー', labelEn: 'Maraschino Cherry', categoryId: 'garnish', shelfArea: 'fridge', color: '#DC143C', isAlcohol: false, aliases: ['チェリー'] },
  { id: 'pineapple-wedge', label: 'パイナップルウェッジ', labelEn: 'Pineapple Wedge', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFD700', isAlcohol: false, aliases: ['パイナップル'] },
  { id: 'mint-leaves', label: 'ミントの葉', labelEn: 'Mint Leaves', categoryId: 'garnish', shelfArea: 'fridge', color: '#2E8B57', isAlcohol: false, aliases: ['ミント'] },
  { id: 'nutmeg', label: 'ナツメグ', labelEn: 'Nutmeg', categoryId: 'garnish', shelfArea: 'fridge', color: '#8B7355', isAlcohol: false, aliases: [] },
  { id: 'sugar-rim', label: '砂糖（スノースタイル）', labelEn: 'Sugar Rim', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFFFFF', isAlcohol: false, aliases: [] },
  { id: 'salt-rim', label: '塩（スノースタイル）', labelEn: 'Salt Rim', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFFFFF', isAlcohol: false, aliases: [] },
  { id: 'celery', label: 'セロリスティック', labelEn: 'Celery Stick', categoryId: 'garnish', shelfArea: 'fridge', color: '#90EE90', isAlcohol: false, aliases: ['セロリ'] },
  { id: 'coffee-beans', label: 'コーヒービーンズ', labelEn: 'Coffee Beans', categoryId: 'garnish', shelfArea: 'fridge', color: '#4E2F10', isAlcohol: false, aliases: [] },
  { id: 'orange-peel', label: 'オレンジピール', labelEn: 'Orange Peel', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFA500', isAlcohol: false, aliases: [] },
  { id: 'lemon-wheel', label: 'レモン輪切り', labelEn: 'Lemon Wheel', categoryId: 'garnish', shelfArea: 'fridge', color: '#FFD700', isAlcohol: false, aliases: [] },
];

// ヘルパー: IDから材料マスタを取得
export function getIngredient(id: string): IngredientMaster | undefined {
  return ingredientsCatalog.find(i => i.id === id);
}

