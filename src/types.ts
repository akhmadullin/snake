export type GameStatus = 'unstarted' | 'active' | 'pause' | 'game over';

export type CellType = 'empty' | 'food' | 'snakeHead' | 'snakeBody';

export type Direction = 'up' | 'right' | 'down' | 'left';

export type Point = {
  x: number;
  y: number;
};

export type Food = Point;

export type Snake = Point[];

export type Field = CellType[][];
