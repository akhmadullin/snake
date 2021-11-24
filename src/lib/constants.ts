import { CellType } from '../types';

export const cellSize = 20;

export const cellColorDict: Record<CellType, string> = {
  empty: '#333',
  food: '#fc0',
  snakeHead: '#fff',
  snakeBody: '#bbb',
};
