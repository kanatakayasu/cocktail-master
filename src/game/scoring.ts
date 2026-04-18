import type {
  GameRecipe,
  GameActionLog,
  GameModeConfig,
  ScoreResult,
  CheckpointResult,
  RecipeCheckpoint,
  GameRank,
} from '../types/game';

/**
 * チェックポイントベースの採点
 * 各材料やコンテナの状態（ステータス）を確認して採点する
 */
export function scoreGame(
  recipe: GameRecipe,
  playerActions: GameActionLog[],
  _mode: GameModeConfig
): ScoreResult {
  // 提供チェック
  const hasServe = playerActions.some(a => a.actionType === 'serve');
  if (!hasServe) {
    return {
      totalScore: 0,
      maxScore: recipe.checkpoints.reduce((sum, cp) => sum + cp.points, 0),
      rank: 'retry',
      checkpointResults: recipe.checkpoints.map(cp => ({ checkpoint: cp, passed: false })),
      playerActions,
    };
  }

  // 各チェックポイントを評価
  const checkpointResults: CheckpointResult[] = recipe.checkpoints.map(cp => ({
    checkpoint: cp,
    passed: evaluateCheckpoint(cp, playerActions),
  }));

  const maxScore = checkpointResults.reduce((sum, cr) => sum + cr.checkpoint.points, 0);
  const earnedScore = checkpointResults
    .filter(cr => cr.passed)
    .reduce((sum, cr) => sum + cr.checkpoint.points, 0);

  // 不要な材料のペナルティ: チェックポイントで参照されていない材料を検出
  const validIngredientIds = new Set<string>();
  for (const cp of recipe.checkpoints) {
    if (cp.ingredientId) validIngredientIds.add(cp.ingredientId);
    if (cp.garnishId) validIngredientIds.add(cp.garnishId);
  }

  const extraIngredientCount = playerActions.filter(
    a =>
      (a.actionType === 'addIngredient' || a.actionType === 'topUp') &&
      a.targetId != null &&
      !validIngredientIds.has(a.targetId)
  ).length;

  const penalty = extraIngredientCount * 5;
  const totalScore = Math.max(0, earnedScore - penalty);

  const rank = getRank(totalScore, maxScore);

  return {
    totalScore,
    maxScore,
    rank,
    checkpointResults,
    playerActions,
  };
}

/**
 * 個別チェックポイントの評価
 */
function evaluateCheckpoint(cp: RecipeCheckpoint, actions: GameActionLog[]): boolean {
  switch (cp.type) {
    case 'glass':
      return actions.some(a =>
        a.actionType === 'selectGlass' && a.targetId === cp.glassId
      );

    case 'ingredient':
      return actions.some(a =>
        a.actionType === 'addIngredient' &&
        a.targetId === cp.ingredientId &&
        a.toArea === cp.containerId
      );

    case 'topUp':
      return actions.some(a =>
        a.actionType === 'topUp' && a.targetId === cp.ingredientId
      );

    case 'ice':
      return actions.some(a =>
        a.actionType === 'addIce' && a.toArea === cp.containerId
      );

    case 'technique':
      return actions.some(a =>
        a.actionType === 'performTechnique' && a.targetId === cp.technique
      );

    case 'pourToGlass':
      return actions.some(a =>
        a.actionType === 'pourToGlass' && a.targetId === cp.containerId
      );

    case 'garnish':
      return actions.some(a =>
        a.actionType === 'garnish' && a.targetId === cp.garnishId
      );

    default:
      return false;
  }
}

function getRank(score: number, maxScore: number): GameRank {
  if (maxScore === 0) return 'retry';
  const pct = score / maxScore;
  if (pct >= 0.95) return 'perfect';
  if (pct >= 0.8) return 'excellent';
  if (pct >= 0.6) return 'good';
  return 'retry';
}

export const RANK_LABELS: Record<GameRank, { label: string; emoji: string; color: string }> = {
  perfect: { label: 'Perfect!', emoji: '\u{1F31F}', color: '#FFD700' },
  excellent: { label: 'Excellent!', emoji: '\u2728', color: '#c9a96e' },
  good: { label: 'Good', emoji: '\u{1F44D}', color: '#90EE90' },
  retry: { label: 'Retry...', emoji: '\u{1F4AA}', color: '#FF6B6B' },
};
