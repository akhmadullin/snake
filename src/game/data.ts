import getRandomIntInclusive from '../lib/get-random-int-inclusive';
import { Field, Point, Food, Snake, Direction } from '../types';

class GameData {
  private field: Field;

  private food: Food;

  private snake: Snake;

  private direction: Direction;

  private score: number;

  constructor(columnsAmount: number, rowsAmount: number) {
    this.score = 0;
    this.direction = 'up';

    this.generateField(columnsAmount, rowsAmount);

    this.generateFood();
    this.setFoodIntoField();

    this.generateSnakeCoord();
    this.setSnakeIntoField();
  }

  private generateField(xNumber: number, yNumber: number): void {
    this.field = [];
    for (let x = 0; x < xNumber; x++) {
      for (let y = 0; y < yNumber; y++) {
        if (!this.field[x]) {
          this.field[x] = [];
        }
        this.field[x][y] = 'empty';
      }
    }
  }

  public updateDirection(direction: Direction): void {
    if (direction === 'up' && this.direction !== 'down') {
      this.direction = 'up';
      return;
    }

    if (direction === 'right' && this.direction !== 'left') {
      this.direction = 'right';
      return;
    }

    if (direction === 'down' && this.direction !== 'up') {
      this.direction = 'down';
      return;
    }

    if (direction === 'left' && this.direction !== 'right') {
      this.direction = 'left';
    }
  }

  private getRandomEmptyPoint(): Point {
    const emptyRects = [];
    for (let x = 0; x < this.field.length; x++) {
      for (let y = 0; y < this.field[0].length; y++) {
        if (this.field[x][y] === 'empty') {
          emptyRects.push({ x, y });
        }
      }
    }
    return emptyRects[getRandomIntInclusive(0, emptyRects.length - 1)];
  }

  private generateFood(): void {
    this.food = this.getRandomEmptyPoint();
  }

  private generateSnakeCoord(): void {
    const head = this.getRandomEmptyPoint();
    this.snake = [head, { ...head, y: head.y + 1 }, { ...head, y: head.y + 2 }];
  }

  private setFoodIntoField(): void {
    this.field[this.food.x][this.food.y] = 'food';
  }

  private setSnakeIntoField(): void {
    this.snake.forEach(({ x, y }, idx) => {
      this.field[x][y] = idx === 0 ? 'snakeHead' : 'snakeBody';
    });
  }

  private getNextHeadPoint(): Point {
    const currentX = this.snake[0].x;
    const maxX = this.field.length - 1;

    const currentY = this.snake[0].y;
    const maxY = this.field[0].length - 1;

    if (this.direction === 'up') {
      const y = currentY - 1;
      const newY = y < 0 ? maxY : y;
      return { x: currentX, y: newY };
    }
    if (this.direction === 'right') {
      const x = currentX + 1;
      const newX = x > maxX ? 0 : x;
      return { x: newX, y: currentY };
    }
    if (this.direction === 'down') {
      const y = currentY + 1;
      const newY = y > maxY ? 0 : y;
      return { x: currentX, y: newY };
    }
    //   if (direction === 'left') {
    const x = currentX - 1;
    const newX = x < 0 ? maxX : x;
    return { x: newX, y: currentY };
  }

  public getField(): Field {
    return this.field;
  }

  public getScore(): number {
    return this.score;
  }

  public updateField(): boolean {
    const newHead = this.getNextHeadPoint();

    if (this.field[newHead.x][newHead.y] === 'snakeBody') {
      return false;
    }

    this.snake.unshift(newHead);

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 1;
      this.generateFood();
      this.setFoodIntoField();
    } else {
      const prevSnakeEnd = this.snake.pop();
      this.field[prevSnakeEnd.x][prevSnakeEnd.y] = 'empty';
    }

    this.setSnakeIntoField();

    return true;
  }
}

export default GameData;
