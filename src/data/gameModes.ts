import type { GameModeConfig } from '../types/game';

export const gameModes: GameModeConfig[] = [
  {
    id: 'select',
    label: 'カクテル指定',
    labelEn: 'Select Cocktail',
    description: '好きなカクテルを選んで調理に挑戦',
    showHints: true,
  },
  {
    id: 'random',
    label: 'ランダム',
    labelEn: 'Random',
    description: 'ランダムに選ばれたカクテルに挑戦',
    showHints: true,
  },
];

export function getGameMode(id: string): GameModeConfig | undefined {
  return gameModes.find(m => m.id === id);
}
