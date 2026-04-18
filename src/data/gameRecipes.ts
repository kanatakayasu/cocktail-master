import type { GameRecipe } from '../types/game';

export const gameRecipes: GameRecipe[] = [
  // ============================================================
  // 1. ジントニック (Gin & Tonic) - BUILD
  // ============================================================
  {
    id: 'game-gin-tonic',
    cocktailId: 'gin-tonic',
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
      { id: 'mh-garnish', type: 'garnish', garnishId: 'maraschino-cherry', label: 'チェリーを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 9. ギムレット (Gimlet) - SHAKE
  // ============================================================
  {
    id: 'game-gimlet',
    cocktailId: 'gimlet',
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
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'dq-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'dq-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'shaker', label: 'ホワイトラムをシェーカーに注ぐ', points: 20 },
      { id: 'dq-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 20 },
      { id: 'dq-syrup', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: 'シュガーシロップを加える', points: 10 },
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
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'cm-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'cm-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'shaker', label: 'シトロンウォッカをシェーカーに注ぐ', points: 15 },
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

  // ============================================================
  // 15. ジンバック (Gin Buck) - BUILD
  // ============================================================
  {
    id: 'game-gin-buck',
    cocktailId: 'gin-buck',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'gb-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'gb-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'gb-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'glass', label: 'ジンをグラスに注ぐ', points: 20 },
      { id: 'gb-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'glass', label: 'レモンジュースを加える', points: 15 },
      { id: 'gb-ginger', type: 'topUp', ingredientId: 'ginger-ale', label: 'ジンジャーエールで満たす', points: 25 },
      { id: 'gb-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'gb-garnish', type: 'garnish', garnishId: 'lemon-slice', label: 'レモンスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 16. モスコミュール (Moscow Mule) - BUILD
  // ============================================================
  {
    id: 'game-moscow-mule',
    cocktailId: 'moscow-mule',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'copper-mug',
    checkpoints: [
      { id: 'mm-glass', type: 'glass', glassId: 'copper-mug', label: '銅製マグを選ぶ', points: 10 },
      { id: 'mm-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'mm-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 20 },
      { id: 'mm-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'glass', label: 'ライムジュースを加える', points: 15 },
      { id: 'mm-ginger', type: 'topUp', ingredientId: 'ginger-beer', label: 'ジンジャービアで満たす', points: 25 },
      { id: 'mm-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'mm-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 17. ブラック・ルシアン (Black Russian) - BUILD
  // ============================================================
  {
    id: 'game-black-russian',
    cocktailId: 'black-russian',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'br-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'br-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'br-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 35 },
      { id: 'br-kahlua', type: 'ingredient', ingredientId: 'kahlua', containerId: 'glass', label: 'カルーアをグラスに注ぐ', points: 30 },
      { id: 'br-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 18. カルーア・ミルク (Kahlua Milk) - BUILD
  // ============================================================
  {
    id: 'game-kahlua-milk',
    cocktailId: 'kahlua-milk',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'km-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'km-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'km-kahlua', type: 'ingredient', ingredientId: 'kahlua', containerId: 'glass', label: 'カルーアをグラスに注ぐ', points: 30 },
      { id: 'km-milk', type: 'topUp', ingredientId: 'milk', label: 'ミルクで満たす', points: 30 },
      { id: 'km-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
    ],
  },

  // ============================================================
  // 19. キール (Kir) - BUILD
  // ============================================================
  {
    id: 'game-kir',
    cocktailId: 'kir',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'wine-glass',
    checkpoints: [
      { id: 'kr-glass', type: 'glass', glassId: 'wine-glass', label: 'ワイングラスを選ぶ', points: 15 },
      { id: 'kr-cassis', type: 'ingredient', ingredientId: 'creme-de-cassis', containerId: 'glass', label: 'クレーム・ド・カシスをグラスに注ぐ', points: 30 },
      { id: 'kr-wine', type: 'topUp', ingredientId: 'white-wine', label: '白ワインで満たす', points: 40 },
      { id: 'kr-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 20. キール・ロワイヤル (Kir Royale) - BUILD
  // ============================================================
  {
    id: 'game-kir-royale',
    cocktailId: 'kir-royale',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'champagne-flute',
    checkpoints: [
      { id: 'kry-glass', type: 'glass', glassId: 'champagne-flute', label: 'フルートグラスを選ぶ', points: 15 },
      { id: 'kry-cassis', type: 'ingredient', ingredientId: 'creme-de-cassis', containerId: 'glass', label: 'クレーム・ド・カシスをグラスに注ぐ', points: 30 },
      { id: 'kry-champagne', type: 'topUp', ingredientId: 'champagne', label: 'シャンパンで満たす', points: 40 },
      { id: 'kry-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 21. ミモザ (Mimosa) - BUILD
  // ============================================================
  {
    id: 'game-mimosa',
    cocktailId: 'mimosa',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'champagne-flute',
    checkpoints: [
      { id: 'mi-glass', type: 'glass', glassId: 'champagne-flute', label: 'フルートグラスを選ぶ', points: 15 },
      { id: 'mi-oj', type: 'ingredient', ingredientId: 'orange-juice', containerId: 'glass', label: 'オレンジジュースをグラスに注ぐ', points: 30 },
      { id: 'mi-champagne', type: 'topUp', ingredientId: 'champagne', label: 'シャンパンで満たす', points: 40 },
      { id: 'mi-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 22. ベリーニ (Bellini) - BUILD
  // ============================================================
  {
    id: 'game-bellini',
    cocktailId: 'bellini',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'champagne-flute',
    checkpoints: [
      { id: 'bl-glass', type: 'glass', glassId: 'champagne-flute', label: 'フルートグラスを選ぶ', points: 15 },
      { id: 'bl-peach', type: 'ingredient', ingredientId: 'peach-puree', containerId: 'glass', label: 'ピーチピューレをグラスに注ぐ', points: 35 },
      { id: 'bl-prosecco', type: 'topUp', ingredientId: 'prosecco', label: 'プロセッコで満たす', points: 35 },
      { id: 'bl-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 23. シャンディ・ガフ (Shandy Gaff) - BUILD
  // ============================================================
  {
    id: 'game-shandy-gaff',
    cocktailId: 'shandy-gaff',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'pilsner-glass',
    checkpoints: [
      { id: 'sg-glass', type: 'glass', glassId: 'pilsner-glass', label: 'ピルスナーグラスを選ぶ', points: 15 },
      { id: 'sg-beer', type: 'ingredient', ingredientId: 'beer', containerId: 'glass', label: 'ビールをグラスに注ぐ', points: 30 },
      { id: 'sg-ginger', type: 'topUp', ingredientId: 'ginger-ale', label: 'ジンジャーエールで満たす', points: 35 },
      { id: 'sg-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
    ],
  },

  // ============================================================
  // 24. レッドアイ (Red Eye) - BUILD
  // ============================================================
  {
    id: 'game-red-eye',
    cocktailId: 'red-eye',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'pilsner-glass',
    checkpoints: [
      { id: 're-glass', type: 'glass', glassId: 'pilsner-glass', label: 'ピルスナーグラスを選ぶ', points: 15 },
      { id: 're-beer', type: 'ingredient', ingredientId: 'beer', containerId: 'glass', label: 'ビールをグラスに注ぐ', points: 30 },
      { id: 're-tomato', type: 'topUp', ingredientId: 'tomato-juice', label: 'トマトジュースで満たす', points: 35 },
      { id: 're-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
    ],
  },

  // ============================================================
  // 25. ソルティ・ドッグ (Salty Dog) - BUILD
  // ============================================================
  {
    id: 'game-salty-dog',
    cocktailId: 'salty-dog',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'sld-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'sld-salt', type: 'garnish', garnishId: 'salt-rim', label: 'スノースタイルにする', points: 10 },
      { id: 'sld-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'sld-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 30 },
      { id: 'sld-gf', type: 'topUp', ingredientId: 'grapefruit-juice', label: 'グレープフルーツジュースで満たす', points: 25 },
      { id: 'sld-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
    ],
  },

  // ============================================================
  // 26. ブラッディ・マリー (Bloody Mary) - BUILD
  // ============================================================
  {
    id: 'game-bloody-mary',
    cocktailId: 'bloody-mary',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'bm-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'bm-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'bm-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 20 },
      { id: 'bm-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'glass', label: 'レモンジュースを加える', points: 10 },
      { id: 'bm-tabasco', type: 'ingredient', ingredientId: 'tabasco', containerId: 'glass', label: 'タバスコを加える', points: 5 },
      { id: 'bm-worcestershire', type: 'ingredient', ingredientId: 'worcestershire-sauce', containerId: 'glass', label: 'ウスターソースを加える', points: 5 },
      { id: 'bm-tomato', type: 'topUp', ingredientId: 'tomato-juice', label: 'トマトジュースで満たす', points: 20 },
      { id: 'bm-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
      { id: 'bm-garnish', type: 'garnish', garnishId: 'celery', label: 'セロリを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 27. パロマ (Paloma) - BUILD
  // ============================================================
  {
    id: 'game-paloma',
    cocktailId: 'paloma',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'pl-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'pl-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'pl-tequila', type: 'ingredient', ingredientId: 'tequila', containerId: 'glass', label: 'テキーラをグラスに注ぐ', points: 25 },
      { id: 'pl-gf', type: 'ingredient', ingredientId: 'grapefruit-juice', containerId: 'glass', label: 'グレープフルーツジュースを加える', points: 15 },
      { id: 'pl-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 15 },
      { id: 'pl-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'pl-salt', type: 'garnish', garnishId: 'salt-rim', label: 'スノースタイルにする', points: 10 },
      { id: 'pl-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 28. メキシカン・ミュール (Mexican Mule) - BUILD
  // ============================================================
  {
    id: 'game-mexican-mule',
    cocktailId: 'mexican-mule',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'copper-mug',
    checkpoints: [
      { id: 'xm-glass', type: 'glass', glassId: 'copper-mug', label: '銅製マグを選ぶ', points: 10 },
      { id: 'xm-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'xm-tequila', type: 'ingredient', ingredientId: 'tequila', containerId: 'glass', label: 'テキーラをグラスに注ぐ', points: 20 },
      { id: 'xm-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'glass', label: 'ライムジュースを加える', points: 15 },
      { id: 'xm-ginger', type: 'topUp', ingredientId: 'ginger-beer', label: 'ジンジャービアで満たす', points: 25 },
      { id: 'xm-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'xm-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 29. オールド・ファッションド (Old Fashioned) - BUILD
  // ============================================================
  {
    id: 'game-old-fashioned',
    cocktailId: 'old-fashioned',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'of-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'of-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖をグラスに入れる', points: 10 },
      { id: 'of-bitters', type: 'ingredient', ingredientId: 'angostura-bitters', containerId: 'glass', label: 'アンゴスチュラビターズを加える', points: 10 },
      { id: 'of-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'of-bourbon', type: 'ingredient', ingredientId: 'bourbon', containerId: 'glass', label: 'バーボンをグラスに注ぐ', points: 30 },
      { id: 'of-build', type: 'technique', technique: 'build', containerId: 'glass', label: 'ビルドする', points: 15 },
      { id: 'of-orange', type: 'garnish', garnishId: 'orange-peel', label: 'オレンジピールを飾る', points: 10 },
      { id: 'of-cherry', type: 'garnish', garnishId: 'maraschino-cherry', label: 'マラスキーノチェリーを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 30. ミント・ジュレップ (Mint Julep) - BUILD
  // ============================================================
  {
    id: 'game-mint-julep',
    cocktailId: 'mint-julep',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'mj-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'mj-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖をグラスに入れる', points: 10 },
      { id: 'mj-mint', type: 'ingredient', ingredientId: 'mint-leaves', containerId: 'glass', label: 'ミントの葉をグラスに入れる', points: 15 },
      { id: 'mj-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'mj-bourbon', type: 'ingredient', ingredientId: 'bourbon', containerId: 'glass', label: 'バーボンをグラスに注ぐ', points: 30 },
      { id: 'mj-build', type: 'technique', technique: 'build', containerId: 'glass', label: 'ビルドする', points: 15 },
      { id: 'mj-garnish', type: 'garnish', garnishId: 'mint-leaves', label: 'ミントの葉を飾る', points: 10 },
    ],
  },

  // ============================================================
  // 31. ゴッドファーザー (Godfather) - BUILD
  // ============================================================
  {
    id: 'game-godfather',
    cocktailId: 'godfather',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'gf-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'gf-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'gf-whiskey', type: 'ingredient', ingredientId: 'rye-whiskey', containerId: 'glass', label: 'ウイスキーをグラスに注ぐ', points: 30 },
      { id: 'gf-amaretto', type: 'ingredient', ingredientId: 'amaretto', containerId: 'glass', label: 'アマレットをグラスに注ぐ', points: 30 },
      { id: 'gf-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 20 },
    ],
  },

  // ============================================================
  // 32. ラスティ・ネイル (Rusty Nail) - BUILD
  // ============================================================
  {
    id: 'game-rusty-nail',
    cocktailId: 'rusty-nail',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'rn-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'rn-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'rn-scotch', type: 'ingredient', ingredientId: 'scotch-whiskey', containerId: 'glass', label: 'スコッチウイスキーをグラスに注ぐ', points: 30 },
      { id: 'rn-drambuie', type: 'ingredient', ingredientId: 'drambuie', containerId: 'glass', label: 'ドランブイをグラスに注ぐ', points: 25 },
      { id: 'rn-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 15 },
      { id: 'rn-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 33. ホーセズ・ネック (Horse's Neck) - BUILD
  // ============================================================
  {
    id: 'game-horses-neck',
    cocktailId: 'horses-neck',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'hn-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'hn-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'hn-brandy', type: 'ingredient', ingredientId: 'brandy', containerId: 'glass', label: 'ブランデーをグラスに注ぐ', points: 25 },
      { id: 'hn-ginger', type: 'topUp', ingredientId: 'ginger-ale', label: 'ジンジャーエールで満たす', points: 25 },
      { id: 'hn-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'hn-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 20 },
    ],
  },

  // ============================================================
  // 34. ニコラシカ (Nikolaschka) - BUILD
  // ============================================================
  {
    id: 'game-nikolaschka',
    cocktailId: 'nikolaschka',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'cordial-glass',
    checkpoints: [
      { id: 'nk-glass', type: 'glass', glassId: 'cordial-glass', label: 'リキュールグラスを選ぶ', points: 15 },
      { id: 'nk-brandy', type: 'ingredient', ingredientId: 'brandy', containerId: 'glass', label: 'ブランデーをグラスに注ぐ', points: 35 },
      { id: 'nk-lemon', type: 'garnish', garnishId: 'lemon-wheel', label: 'レモンの輪切りを飾る', points: 25 },
      { id: 'nk-sugar', type: 'garnish', garnishId: 'sugar-rim', label: 'シュガーリムにする', points: 25 },
    ],
  },

  // ============================================================
  // 35. アペロール・スプリッツ (Aperol Spritz) - BUILD
  // ============================================================
  {
    id: 'game-aperol-spritz',
    cocktailId: 'aperol-spritz',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'wine-glass',
    checkpoints: [
      { id: 'as-glass', type: 'glass', glassId: 'wine-glass', label: 'ワイングラスを選ぶ', points: 10 },
      { id: 'as-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'as-prosecco', type: 'ingredient', ingredientId: 'prosecco', containerId: 'glass', label: 'プロセッコをグラスに注ぐ', points: 25 },
      { id: 'as-aperol', type: 'ingredient', ingredientId: 'aperol', containerId: 'glass', label: 'アペロールをグラスに注ぐ', points: 25 },
      { id: 'as-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダを加える', points: 15 },
      { id: 'as-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'as-garnish', type: 'garnish', garnishId: 'orange-slice', label: 'オレンジスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 36. モヒート (Mojito) - BUILD
  // ============================================================
  {
    id: 'game-mojito',
    cocktailId: 'mojito',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'mo-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'mo-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖をグラスに入れる', points: 5 },
      { id: 'mo-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'glass', label: 'ライムジュースを加える', points: 10 },
      { id: 'mo-mint', type: 'ingredient', ingredientId: 'mint-leaves', containerId: 'glass', label: 'ミントの葉をグラスに入れる', points: 10 },
      { id: 'mo-muddle', type: 'technique', technique: 'build', containerId: 'glass', label: 'マドルする', points: 10 },
      { id: 'mo-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'mo-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'glass', label: 'ホワイトラムをグラスに注ぐ', points: 25 },
      { id: 'mo-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 15 },
      { id: 'mo-garnish', type: 'garnish', garnishId: 'mint-leaves', label: 'ミントの葉を飾る', points: 10 },
    ],
  },

  // ============================================================
  // 37. カイピリーニャ (Caipirinha) - BUILD
  // ============================================================
  {
    id: 'game-caipirinha',
    cocktailId: 'caipirinha',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'cp-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'cp-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖をグラスに入れる', points: 10 },
      { id: 'cp-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'glass', label: 'ライムジュースを加える', points: 15 },
      { id: 'cp-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'cp-cachaca', type: 'ingredient', ingredientId: 'cachaca', containerId: 'glass', label: 'カシャーサをグラスに注ぐ', points: 30 },
      { id: 'cp-build', type: 'technique', technique: 'build', containerId: 'glass', label: 'ビルドする', points: 15 },
      { id: 'cp-garnish', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 15 },
    ],
  },

  // ============================================================
  // 38. アイリッシュ・コーヒー (Irish Coffee) - BUILD
  // ============================================================
  {
    id: 'game-irish-coffee',
    cocktailId: 'irish-coffee',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'irish-coffee-glass',
    checkpoints: [
      { id: 'ic-glass', type: 'glass', glassId: 'irish-coffee-glass', label: '耐熱グラスを選ぶ', points: 10 },
      { id: 'ic-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖をグラスに入れる', points: 10 },
      { id: 'ic-whiskey', type: 'ingredient', ingredientId: 'irish-whiskey', containerId: 'glass', label: 'アイリッシュウイスキーをグラスに注ぐ', points: 25 },
      { id: 'ic-coffee', type: 'topUp', ingredientId: 'hot-coffee', label: 'ホットコーヒーで満たす', points: 25 },
      { id: 'ic-build', type: 'technique', technique: 'build', containerId: 'glass', label: 'ビルドする', points: 10 },
      { id: 'ic-cream', type: 'ingredient', ingredientId: 'cream', containerId: 'glass', label: '生クリームをフロートする', points: 20 },
    ],
  },

  // ============================================================
  // 39. ロングアイランド・アイスティー (Long Island Iced Tea) - BUILD
  // ============================================================
  {
    id: 'game-long-island-iced-tea',
    cocktailId: 'long-island-iced-tea',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'collins-glass',
    checkpoints: [
      { id: 'li-glass', type: 'glass', glassId: 'collins-glass', label: 'コリンズグラスを選ぶ', points: 5 },
      { id: 'li-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'li-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'glass', label: 'ウォッカをグラスに注ぐ', points: 10 },
      { id: 'li-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'glass', label: 'ジンをグラスに注ぐ', points: 10 },
      { id: 'li-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'glass', label: 'ホワイトラムをグラスに注ぐ', points: 10 },
      { id: 'li-tequila', type: 'ingredient', ingredientId: 'tequila', containerId: 'glass', label: 'テキーラをグラスに注ぐ', points: 10 },
      { id: 'li-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'glass', label: 'コアントローを加える', points: 10 },
      { id: 'li-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'glass', label: 'レモンジュースを加える', points: 10 },
      { id: 'li-cola', type: 'topUp', ingredientId: 'cola', label: 'コーラで満たす', points: 15 },
      { id: 'li-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 5 },
      { id: 'li-garnish', type: 'garnish', garnishId: 'lemon-slice', label: 'レモンスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 40. B-52 - BUILD
  // ============================================================
  {
    id: 'game-b-52',
    cocktailId: 'b-52',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'shot-glass',
    checkpoints: [
      { id: 'b52-glass', type: 'glass', glassId: 'shot-glass', label: 'シューターグラスを選ぶ', points: 15 },
      { id: 'b52-kahlua', type: 'ingredient', ingredientId: 'kahlua', containerId: 'glass', label: 'カルーアをグラスに注ぐ', points: 25 },
      { id: 'b52-baileys', type: 'ingredient', ingredientId: 'baileys', containerId: 'glass', label: 'ベイリーズをフロートする', points: 25 },
      { id: 'b52-gm', type: 'ingredient', ingredientId: 'grand-marnier', containerId: 'glass', label: 'グランマルニエをフロートする', points: 25 },
      { id: 'b52-build', type: 'technique', technique: 'build', containerId: 'glass', label: 'ビルドする', points: 10 },
    ],
  },

  // ============================================================
  // 41. ジンフィズ (Gin Fizz) - SHAKE
  // ============================================================
  {
    id: 'game-gin-fizz',
    cocktailId: 'gin-fizz',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'tumbler',
    checkpoints: [
      { id: 'gf2-glass', type: 'glass', glassId: 'tumbler', label: 'タンブラーを選ぶ', points: 10 },
      { id: 'gf2-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 20 },
      { id: 'gf2-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 10 },
      { id: 'gf2-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: '砂糖をシェーカーに入れる', points: 5 },
      { id: 'gf2-ice-s', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'gf2-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'gf2-ice-g', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'gf2-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'gf2-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 10 },
      { id: 'gf2-garnish', type: 'garnish', garnishId: 'lemon-slice', label: 'レモンスライスを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 42. ホワイト・レディ (White Lady) - SHAKE
  // ============================================================
  {
    id: 'game-white-lady',
    cocktailId: 'white-lady',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'wl-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'wl-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 20 },
      { id: 'wl-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 15 },
      { id: 'wl-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'wl-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'wl-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'wl-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 43. シンガポール・スリング (Singapore Sling) - SHAKE
  // ============================================================
  {
    id: 'game-singapore-sling',
    cocktailId: 'singapore-sling',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'collins-glass',
    checkpoints: [
      { id: 'ss-glass', type: 'glass', glassId: 'collins-glass', label: 'コリンズグラスを選ぶ', points: 10 },
      { id: 'ss-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 15 },
      { id: 'ss-cherry', type: 'ingredient', ingredientId: 'cherry-heering', containerId: 'shaker', label: 'チェリーヒーリングをシェーカーに注ぐ', points: 15 },
      { id: 'ss-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 10 },
      { id: 'ss-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'ss-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'ss-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'ss-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 10 },
      { id: 'ss-garnish', type: 'garnish', garnishId: 'maraschino-cherry', label: 'マラスキーノチェリーを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 44. トム・コリンズ (Tom Collins) - BUILD
  // ============================================================
  {
    id: 'game-tom-collins',
    cocktailId: 'tom-collins',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'build',
    requiredGlassId: 'collins-glass',
    checkpoints: [
      { id: 'tc-glass', type: 'glass', glassId: 'collins-glass', label: 'コリンズグラスを選ぶ', points: 10 },
      { id: 'tc-ice', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 10 },
      { id: 'tc-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'glass', label: 'ジンをグラスに注ぐ', points: 20 },
      { id: 'tc-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'glass', label: 'レモンジュースを加える', points: 15 },
      { id: 'tc-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'glass', label: '砂糖を加える', points: 5 },
      { id: 'tc-soda', type: 'topUp', ingredientId: 'soda', label: 'ソーダで満たす', points: 20 },
      { id: 'tc-build', type: 'technique', technique: 'build', containerId: 'glass', label: '軽くビルドする', points: 10 },
      { id: 'tc-lemon-g', type: 'garnish', garnishId: 'lemon-slice', label: 'レモンスライスを飾る', points: 5 },
      { id: 'tc-cherry', type: 'garnish', garnishId: 'maraschino-cherry', label: 'マラスキーノチェリーを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 45. アラスカ (Alaska) - SHAKE
  // ============================================================
  {
    id: 'game-alaska',
    cocktailId: 'alaska',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'ak-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'ak-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 25 },
      { id: 'ak-chartreuse', type: 'ingredient', ingredientId: 'chartreuse-jaune', containerId: 'shaker', label: 'シャルトリューズ・ジョーヌをシェーカーに注ぐ', points: 20 },
      { id: 'ak-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'ak-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'ak-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
      { id: 'ak-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 46. エスプレッソ・マティーニ (Espresso Martini) - SHAKE
  // ============================================================
  {
    id: 'game-espresso-martini',
    cocktailId: 'espresso-martini',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'em-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'em-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'shaker', label: 'ウォッカをシェーカーに注ぐ', points: 20 },
      { id: 'em-kahlua', type: 'ingredient', ingredientId: 'kahlua', containerId: 'shaker', label: 'カルーアをシェーカーに注ぐ', points: 15 },
      { id: 'em-espresso', type: 'ingredient', ingredientId: 'espresso', containerId: 'shaker', label: 'エスプレッソをシェーカーに注ぐ', points: 15 },
      { id: 'em-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'em-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'em-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 47. バラライカ (Balalaika) - SHAKE
  // ============================================================
  {
    id: 'game-balalaika',
    cocktailId: 'balalaika',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'bk-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'bk-vodka', type: 'ingredient', ingredientId: 'vodka', containerId: 'shaker', label: 'ウォッカをシェーカーに注ぐ', points: 20 },
      { id: 'bk-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 15 },
      { id: 'bk-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'bk-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'bk-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'bk-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 48. XYZ - SHAKE
  // ============================================================
  {
    id: 'game-xyz',
    cocktailId: 'xyz',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'xyz-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'xyz-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'shaker', label: 'ホワイトラムをシェーカーに注ぐ', points: 20 },
      { id: 'xyz-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 15 },
      { id: 'xyz-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'xyz-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'xyz-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'xyz-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 49. マイタイ (Mai Tai) - SHAKE
  // ============================================================
  {
    id: 'game-mai-tai',
    cocktailId: 'mai-tai',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'mt2-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 5 },
      { id: 'mt2-dark', type: 'ingredient', ingredientId: 'dark-rum', containerId: 'shaker', label: 'ダークラムをシェーカーに注ぐ', points: 15 },
      { id: 'mt2-white', type: 'ingredient', ingredientId: 'white-rum', containerId: 'shaker', label: 'ホワイトラムをシェーカーに注ぐ', points: 10 },
      { id: 'mt2-cointreau', type: 'ingredient', ingredientId: 'cointreau', containerId: 'shaker', label: 'コアントローをシェーカーに注ぐ', points: 10 },
      { id: 'mt2-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 10 },
      { id: 'mt2-orgeat', type: 'ingredient', ingredientId: 'orgeat-syrup', containerId: 'shaker', label: 'オルゲートシロップを加える', points: 10 },
      { id: 'mt2-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'mt2-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'mt2-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'mt2-mint', type: 'garnish', garnishId: 'mint-leaves', label: 'ミントの葉を飾る', points: 5 },
      { id: 'mt2-lime-g', type: 'garnish', garnishId: 'lime-wedge', label: 'ライムウェッジを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 50. ブルー・ハワイ (Blue Hawaii) - SHAKE
  // ============================================================
  {
    id: 'game-blue-hawaii',
    cocktailId: 'blue-hawaii',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'goblet',
    checkpoints: [
      { id: 'bh-glass', type: 'glass', glassId: 'goblet', label: 'ゴブレットを選ぶ', points: 10 },
      { id: 'bh-rum', type: 'ingredient', ingredientId: 'white-rum', containerId: 'shaker', label: 'ホワイトラムをシェーカーに注ぐ', points: 15 },
      { id: 'bh-curacao', type: 'ingredient', ingredientId: 'blue-curacao', containerId: 'shaker', label: 'ブルーキュラソーをシェーカーに注ぐ', points: 15 },
      { id: 'bh-pineapple', type: 'ingredient', ingredientId: 'pineapple-juice', containerId: 'shaker', label: 'パイナップルジュースをシェーカーに注ぐ', points: 15 },
      { id: 'bh-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 10 },
      { id: 'bh-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'bh-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'bh-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'bh-garnish', type: 'garnish', garnishId: 'pineapple-wedge', label: 'パイナップルウェッジを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 51. ウイスキー・サワー (Whiskey Sour) - SHAKE
  // ============================================================
  {
    id: 'game-whiskey-sour',
    cocktailId: 'whiskey-sour',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'sour-glass',
    checkpoints: [
      { id: 'ws-glass', type: 'glass', glassId: 'sour-glass', label: 'サワーグラスを選ぶ', points: 10 },
      { id: 'ws-whiskey', type: 'ingredient', ingredientId: 'rye-whiskey', containerId: 'shaker', label: 'ライウイスキーをシェーカーに注ぐ', points: 25 },
      { id: 'ws-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'ws-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: '砂糖をシェーカーに入れる', points: 5 },
      { id: 'ws-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'ws-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'ws-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'ws-lemon-g', type: 'garnish', garnishId: 'lemon-slice', label: 'レモンスライスを飾る', points: 5 },
      { id: 'ws-cherry', type: 'garnish', garnishId: 'maraschino-cherry', label: 'マラスキーノチェリーを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 52. ニューヨーク (New York) - SHAKE
  // ============================================================
  {
    id: 'game-new-york',
    cocktailId: 'new-york',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'ny-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'ny-whiskey', type: 'ingredient', ingredientId: 'rye-whiskey', containerId: 'shaker', label: 'ライウイスキーをシェーカーに注ぐ', points: 20 },
      { id: 'ny-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 15 },
      { id: 'ny-grenadine', type: 'ingredient', ingredientId: 'grenadine', containerId: 'shaker', label: 'グレナデンシロップを加える', points: 10 },
      { id: 'ny-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: '砂糖をシェーカーに入れる', points: 5 },
      { id: 'ny-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'ny-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'ny-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'ny-garnish', type: 'garnish', garnishId: 'orange-peel', label: 'オレンジピールを飾る', points: 5 },
    ],
  },

  // ============================================================
  // 53. アレキサンダー (Alexander) - SHAKE
  // ============================================================
  {
    id: 'game-alexander',
    cocktailId: 'alexander',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'al-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'al-brandy', type: 'ingredient', ingredientId: 'brandy', containerId: 'shaker', label: 'ブランデーをシェーカーに注ぐ', points: 20 },
      { id: 'al-cacao', type: 'ingredient', ingredientId: 'creme-de-cacao', containerId: 'shaker', label: 'クレーム・ド・カカオをシェーカーに注ぐ', points: 15 },
      { id: 'al-cream', type: 'ingredient', ingredientId: 'cream', containerId: 'shaker', label: '生クリームをシェーカーに注ぐ', points: 15 },
      { id: 'al-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'al-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'al-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'al-garnish', type: 'garnish', garnishId: 'nutmeg', label: 'ナツメグを振る', points: 5 },
    ],
  },

  // ============================================================
  // 54. ジャック・ローズ (Jack Rose) - SHAKE
  // ============================================================
  {
    id: 'game-jack-rose',
    cocktailId: 'jack-rose',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'jr-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'jr-calvados', type: 'ingredient', ingredientId: 'calvados', containerId: 'shaker', label: 'カルヴァドスをシェーカーに注ぐ', points: 25 },
      { id: 'jr-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 15 },
      { id: 'jr-grenadine', type: 'ingredient', ingredientId: 'grenadine', containerId: 'shaker', label: 'グレナデンシロップを加える', points: 15 },
      { id: 'jr-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'jr-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 20 },
      { id: 'jr-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
    ],
  },

  // ============================================================
  // 55. グラスホッパー (Grasshopper) - SHAKE
  // ============================================================
  {
    id: 'game-grasshopper',
    cocktailId: 'grasshopper',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'gh-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'gh-menthe', type: 'ingredient', ingredientId: 'creme-de-menthe', containerId: 'shaker', label: 'クレーム・ド・マントをシェーカーに注ぐ', points: 20 },
      { id: 'gh-cacao', type: 'ingredient', ingredientId: 'creme-de-cacao', containerId: 'shaker', label: 'クレーム・ド・カカオをシェーカーに注ぐ', points: 20 },
      { id: 'gh-cream', type: 'ingredient', ingredientId: 'cream', containerId: 'shaker', label: '生クリームをシェーカーに注ぐ', points: 15 },
      { id: 'gh-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'gh-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'gh-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 56. フレンチ75 (French 75) - SHAKE
  // ============================================================
  {
    id: 'game-french-75',
    cocktailId: 'french-75',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'champagne-flute',
    checkpoints: [
      { id: 'f75-glass', type: 'glass', glassId: 'champagne-flute', label: 'フルートグラスを選ぶ', points: 10 },
      { id: 'f75-gin', type: 'ingredient', ingredientId: 'gin', containerId: 'shaker', label: 'ジンをシェーカーに注ぐ', points: 20 },
      { id: 'f75-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 10 },
      { id: 'f75-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: '砂糖をシェーカーに入れる', points: 5 },
      { id: 'f75-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'f75-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'f75-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
      { id: 'f75-champagne', type: 'topUp', ingredientId: 'champagne', label: 'シャンパンで満たす', points: 15 },
      { id: 'f75-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 57. ピスコ・サワー (Pisco Sour) - SHAKE
  // ============================================================
  {
    id: 'game-pisco-sour',
    cocktailId: 'pisco-sour',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'sour-glass',
    checkpoints: [
      { id: 'ps-glass', type: 'glass', glassId: 'sour-glass', label: 'サワーグラスを選ぶ', points: 10 },
      { id: 'ps-pisco', type: 'ingredient', ingredientId: 'pisco', containerId: 'shaker', label: 'ピスコをシェーカーに注ぐ', points: 25 },
      { id: 'ps-lime', type: 'ingredient', ingredientId: 'lime-juice', containerId: 'shaker', label: 'ライムジュースをシェーカーに注ぐ', points: 15 },
      { id: 'ps-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'shaker', label: '砂糖をシェーカーに入れる', points: 5 },
      { id: 'ps-egg', type: 'ingredient', ingredientId: 'egg-white', containerId: 'shaker', label: '卵白をシェーカーに入れる', points: 10 },
      { id: 'ps-ice', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'ps-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'ps-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 15 },
    ],
  },

  // ============================================================
  // 58. ペニシリン (Penicillin) - SHAKE
  // ============================================================
  {
    id: 'game-penicillin',
    cocktailId: 'penicillin',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'shake',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'pn-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'pn-scotch', type: 'ingredient', ingredientId: 'scotch-whiskey', containerId: 'shaker', label: 'スコッチウイスキーをシェーカーに注ぐ', points: 25 },
      { id: 'pn-lemon', type: 'ingredient', ingredientId: 'lemon-juice', containerId: 'shaker', label: 'レモンジュースをシェーカーに注ぐ', points: 15 },
      { id: 'pn-honey', type: 'ingredient', ingredientId: 'honey-ginger-syrup', containerId: 'shaker', label: 'ハニージンジャーシロップを加える', points: 15 },
      { id: 'pn-ice-s', type: 'ice', containerId: 'shaker', label: 'シェーカーに氷を入れる', points: 5 },
      { id: 'pn-shake', type: 'technique', technique: 'shake', containerId: 'shaker', label: 'シェイクする', points: 15 },
      { id: 'pn-ice-g', type: 'ice', containerId: 'glass', label: 'グラスに氷を入れる', points: 5 },
      { id: 'pn-pour', type: 'pourToGlass', containerId: 'shaker', label: 'グラスに注ぐ', points: 10 },
    ],
  },

  // ============================================================
  // 59. サゼラック (Sazerac) - STIR
  // ============================================================
  {
    id: 'game-sazerac',
    cocktailId: 'sazerac',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'stir',
    requiredGlassId: 'old-fashioned-glass',
    checkpoints: [
      { id: 'sz-glass', type: 'glass', glassId: 'old-fashioned-glass', label: 'ロックグラスを選ぶ', points: 10 },
      { id: 'sz-absinthe', type: 'ingredient', ingredientId: 'absinthe', containerId: 'glass', label: 'アブサンでグラスをリンスする', points: 10 },
      { id: 'sz-whiskey', type: 'ingredient', ingredientId: 'rye-whiskey', containerId: 'mixingGlass', label: 'ライウイスキーをミキシンググラスに注ぐ', points: 20 },
      { id: 'sz-sugar', type: 'ingredient', ingredientId: 'sugar', containerId: 'mixingGlass', label: '砂糖をミキシンググラスに入れる', points: 5 },
      { id: 'sz-bitters', type: 'ingredient', ingredientId: 'peychauds-bitters', containerId: 'mixingGlass', label: 'ペイショーズビターズを加える', points: 10 },
      { id: 'sz-ice', type: 'ice', containerId: 'mixingGlass', label: 'ミキシンググラスに氷を入れる', points: 5 },
      { id: 'sz-stir', type: 'technique', technique: 'stir', containerId: 'mixingGlass', label: 'ステアする', points: 15 },
      { id: 'sz-pour', type: 'pourToGlass', containerId: 'mixingGlass', label: 'グラスに注ぐ', points: 15 },
      { id: 'sz-garnish', type: 'garnish', garnishId: 'lemon-peel', label: 'レモンピールを飾る', points: 10 },
    ],
  },

  // ============================================================
  // 60. ブールヴァルディエ (Boulevardier) - STIR
  // ============================================================
  {
    id: 'game-boulevardier',
    cocktailId: 'boulevardier',
    allowedModes: ['select', 'random'],
    primaryTechnique: 'stir',
    requiredGlassId: 'cocktail-glass',
    checkpoints: [
      { id: 'bv-glass', type: 'glass', glassId: 'cocktail-glass', label: 'カクテルグラスを選ぶ', points: 10 },
      { id: 'bv-bourbon', type: 'ingredient', ingredientId: 'bourbon', containerId: 'mixingGlass', label: 'バーボンをミキシンググラスに注ぐ', points: 20 },
      { id: 'bv-campari', type: 'ingredient', ingredientId: 'campari', containerId: 'mixingGlass', label: 'カンパリをミキシンググラスに注ぐ', points: 15 },
      { id: 'bv-vermouth', type: 'ingredient', ingredientId: 'sweet-vermouth', containerId: 'mixingGlass', label: 'スイートベルモットをミキシンググラスに注ぐ', points: 15 },
      { id: 'bv-ice', type: 'ice', containerId: 'mixingGlass', label: 'ミキシンググラスに氷を入れる', points: 5 },
      { id: 'bv-stir', type: 'technique', technique: 'stir', containerId: 'mixingGlass', label: 'ステアする', points: 15 },
      { id: 'bv-pour', type: 'pourToGlass', containerId: 'mixingGlass', label: 'グラスに注ぐ', points: 10 },
      { id: 'bv-garnish', type: 'garnish', garnishId: 'orange-peel', label: 'オレンジピールを飾る', points: 10 },
    ],
  },
];

export function getGameRecipe(cocktailId: string): GameRecipe | undefined {
  return gameRecipes.find(r => r.cocktailId === cocktailId);
}
