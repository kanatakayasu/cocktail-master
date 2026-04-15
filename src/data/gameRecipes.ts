import type { GameRecipe } from '../types/game';

export const gameRecipes: GameRecipe[] = [
  // ============================================================
  // 1. ジントニック (Gin & Tonic) - BUILD
  // ============================================================
  {
    id: 'game-gin-tonic',
    cocktailId: 'gin-tonic',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'gt-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'gt-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'gt-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'glass', label: 'ジンをグラスに注ぐ', points: 25 },
      { id: 'gt-tonic', type: 'topUp', ingredientId: 'tonic-water', label: 'トニックウォーターで満たす', points: 25 },
      { id: 'gt-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
      { id: 'gt-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 2. スクリュードライバー (Screwdriver) - BUILD
  // ============================================================
  {
    id: 'game-screwdriver',
    cocktailId: 'screwdriver',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'sd-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'sd-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'sd-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 25 },
      { id: 'sd-oj', type: 'topUp', ingredientId: 'orange-juice', label: 'オレンジジュースで満たす', points: 25 },
      { id: 'sd-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
      { id: 'sd-garnish', type: 'garnish', garnishId: 'orange-slice', label: 'オレンジスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 3. キューバ・リブレ (Cuba Libre) - BUILD
  // ============================================================
  {
    id: 'game-cuba-libre',
    cocktailId: 'cuba-libre',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'cl-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'cl-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'cl-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'glass', label: 'ホワイトラムをグラスに注ぐ', points: 20 },
      { id: 'cl-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'glass', label: 'ライムジュースを加える', points: 15 },
      { id: 'cl-cola', type: 'topUp', ingredientId: 'cola', label: 'コーラで満たす', points: 15 },
      { id: 'cl-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
      { id: 'cl-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 4. テキーラ・サンライズ (Tequila Sunrise) - BUILD
  // ============================================================
  {
    id: 'game-tequila-sunrise',
    cocktailId: 'tequila-sunrise',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'ts-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'ts-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'ts-tequila', type: 'ingredient', ingredientId: 'tequila', containerId: 'glass', label: 'テキーラをグラスに注ぐ', points: 25 },
      { id: 'ts-oj', type: 'topUp', ingredientId: 'orange-juice', label: 'オレンジジュースで満たす', points: 20 },
      { id: 'ts-grenadine', type: 'ingredient', ingredientId: 'grenadine', containerId: 'glass', label: 'グレナデンシロップを静かに沈める', points: 25 },
      { id: 'ts-garnish', type: 'garnish', garnishId: 'orange-slice', label: 'オレンジスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 5. カンパリ・ソーダ (Campari Soda) - BUILD
  // ============================================================
  {
    id: 'game-campari-soda',
    cocktailId: 'campari-soda',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'cs-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'cs-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'cs-campari', type: 'ingredient', ingredientId: 'campari', containerId: 'glass', label: 'カンパリをグラスに注ぐ', points: 25 },
      { id: 'cs-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 25 },
      { id: 'cs-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
      { id: 'cs-garnish', type: 'garnish', garnishId: 'orange-slice', label: 'オレンジスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 6. マティーニ (Martini) - STIR
  // ============================================================
  {
    id: 'game-martini',
    cocktailId: 'martini',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'stir',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'mt-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'mt-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'mixingGlass', label: 'ジンをミキシンググラスに注ぐ', points: 20 },
      { id: 'mt-vermouth', type: 'ingredient', ingredientId: 'dry-vermouth', containerId: 'mixingGlass', label: 'ドライベルモットをミキシンググラスに注ぐ', points: 20 },
      { id: 'mt-ice', type: 'ice', containerId: 'mixingGlass', label: 'ミキシンググラスに氷を入れる', points: 5 },
      { id: 'mt-stir', type: 'technique', technique: 'stir', containerId: 'mixingGlass', label: 'ステアする', points: 20 },
      { id: 'mt-pour', type: 'pourToGlass', containerId: 'mixingGlass', label: 'グラスに注ぐ', points: 15 },
      { id: 'mt-garnish', type: 'garnish', garnishId: 'olive', label: 'オリーブを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 7. ネグローニ (Negroni) - STIR
  // ============================================================
  {
    id: 'game-negroni',
    cocktailId: 'negroni',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'stir',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'ng-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'ng-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'mixingGlass', label: 'ジンをミキシンググラスに注ぐ', points: 15 },
      { id: 'ng-campari', type: 'ingredient', ingredientId: 'campari', containerId: 'mixingGlass', label: 'カンパリをミキシンググラスに注ぐ', points: 15 },
      { id: 'ng-vermouth', type: 'ingredient', ingredientId: 'sweet-vermouth', containerId: 'mixingGlass', label: 'スイートベルモットをミキシンググラスに注ぐ', points: 15 },
      { id: 'ng-ice', type: 'ice', containerId: 'mixingGlass', label: 'ミキシンググラスに氷を入れる', points: 5 },
      { id: 'ng-stir', type: 'technique', technique: 'stir', containerId: 'mixingGlass', label: 'ステアする', points: 15 },
      { id: 'ng-pour', type: 'pourToGlass', containerId: 'mixingGlass', label: 'グラスに注ぐ', points: 15 },
      { id: 'ng-garnish', type: 'garnish', garnishId: 'orange-slice', label: 'オレンジスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 8. マンハッタン (Manhattan) - STIR
  // ============================================================
  {
    id: 'game-manhattan',
    cocktailId: 'manhattan',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'stir',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'mh-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'mh-whiskey', type: 'ingredient', ingredientId: 'rye-whiskey', containerId: 'mixingGlass', label: 'ライウイスキーをミキシンググラスに注ぐ', points: 20 },
      { id: 'mh-vermouth', type: 'ingredient', ingredientId: 'sweet-vermouth', containerId: 'mixingGlass', label: 'スイートベルモットをミキシンググラスに注ぐ', points: 15 },
      { id: 'mh-bitters', type: 'ingredient', ingredientId: 'angostura-bitters', containerId: 'mixingGlass', label: 'アンゴスチュラビターズを加える', points: 10 },
      { id: 'mh-ice', type: 'ice', containerId: 'mixingGlass', label: 'ミキシンググラスに氷を入れる', points: 5 },
      { id: 'mh-stir', type: 'technique', technique: 'stir', containerId: 'mixingGlass', label: 'ステアする', points: 15 },
      { id: 'mh-pour', type: 'pourToGlass', containerId: 'mixingGlass', label: 'グラスに注ぐ', points: 15 },
      { id: 'mh-garnish', type: 'garnish', garnishId: 'cherry', label: 'チェリーを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 9. ギムレット (Gimlet) - SHAKE
  // ============================================================
  {
    id: 'game-gimlet',
    cocktailId: 'gimlet',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'gm-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'gm-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 25 },
      { id: 'gm-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 20 },
      { id: 'gm-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'gm-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'gm-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 20 },
    ],
  },

  // ============================================================
  // 10. ダイキリ (Daiquiri) - SHAKE
  // ============================================================
  {
    id: 'game-daiquiri',
    cocktailId: 'daiquiri',
    difficulty: 1,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'dq-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'dq-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'shaker', label: 'ホワイトラムをシェーカーに注ぐ', points: 20 },
      { id: 'dq-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 20 },
      { id: 'dq-syrup', type: 'ingredient', ingredientId: 'sugar-syrup', containerId: 'shaker', label: 'シュガーシロップを加える', points: 10 },
      { id: 'dq-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'dq-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'dq-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 11. マルガリータ (Margarita) - SHAKE
  // ============================================================
  {
    id: 'game-margarita',
    cocktailId: 'margarita',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'mg-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'mg-tequila', type: 'ingredient', ingredientId: 'tequila', containerId: 'shaker', label: 'テキーラをシェーカーに注ぐ', points: 20 },
      { id: 'mg-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 15 },
      { id: 'mg-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 15 },
      { id: 'mg-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'mg-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'mg-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 12. サイドカー (Sidecar) - SHAKE
  // ============================================================
  {
    id: 'game-sidecar',
    cocktailId: 'sidecar',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'sc-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'sc-brandy', type: 'ingredient', ingredientId: 'brandy', containerId: 'shaker', label: 'ブランデーをシェーカーに注ぐ', points: 20 },
      { id: 'sc-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 15 },
      { id: 'sc-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'sc-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'sc-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'sc-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 13. コスモポリタン (Cosmopolitan) - SHAKE
  // ============================================================
  {
    id: 'game-cosmopolitan',
    cocktailId: 'cosmopolitan',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'cm-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'cm-vodka', type: 'ingredient', ingredientId: 'vodka-citrus', containerId: 'shaker', label: 'シトロンウォッカをシェーカーに注ぐ', points: 15 },
      { id: 'cm-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 10 },
      { id: 'cm-cranberry', type: 'ingredient', ingredientId: 'cranberry-juice', containerId: 'shaker', label: 'クランベリージュースをシェーカーに注ぐ', points: 15 },
      { id: 'cm-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 10 },
      { id: 'cm-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'cm-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'cm-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'cm-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 14. ピニャ・コラーダ (Piña Colada) - BLEND
  // ============================================================
  {
    id: 'game-pina-colada',
    cocktailId: 'pina-colada',
    difficulty: 2,
    allowedModes: ['select', 'random'],
    primaryTechnique: 'blend',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'pc-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'pc-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'blender', label: 'ホワイトラムをブレンダーに入れる', points: 20 },
      { id: 'pc-coconut', type: 'ingredient', ingredientId: 'coconut-milk', containerId: 'blender', label: 'ココナッツミルクをブレンダーに入れる', points: 15 },
      { id: 'pc-pineapple', type: 'ingredient', ingredientId: 'pineapple-juice', containerId: 'blender', label: 'パイナップルジュースをブレンダーに入れる', points: 15 },
      { id: 'pc-ice', type: 'ice', containerId: 'blender', label: 'ブレンダーに氷を入れる', points: 5 },
      { id: 'pc-blend', type: 'technique', technique: 'blend', containerId: 'blender', label: 'ブレンドする', points: 15 },
      { id: 'pc-pour', type: 'pourToGlass', containerId: 'blender', label: 'グラスに注ぐ', points: 10 },
      { id: 'pc-garnish', type: 'garnish', garnishId: 'pineapple-wedge', label: 'パイナップルウェッジを飾る', points: 10 },
    ],
  },
];

export function getGameRecipe(cocktailId: string): GameRecipe | undefined {
  return gameRecipes.find(r => r.cocktailId === cocktailId);
}
