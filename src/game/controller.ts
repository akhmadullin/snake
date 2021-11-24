import { Direction, GameStatus } from '../types';
import Queue from '../lib/queue';
import GameData from './data';
import GameView from './view';

type Callbacks = {
  onScoreChange: (score: number) => void;
  onStatusChange: (status: GameStatus) => void;
};

class GameController {
  private data: GameData;

  private view: GameView;

  private status: GameStatus;

  private directionsToApply: Queue<Direction>;

  private callbacks: Callbacks;

  private intervalId: ReturnType<typeof setInterval>;

  constructor(
    ctx: CanvasRenderingContext2D,
    scaleIndex: number,
    columnsAmount: number,
    rowsAmount: number,
    callbacks: Callbacks
  ) {
    this.data = new GameData(columnsAmount, rowsAmount);
    this.view = new GameView(ctx, scaleIndex);
    this.directionsToApply = new Queue();
    this.callbacks = callbacks;
    this.setStatus('unstarted');
  }

  public init(): void {
    this.view.drawField(this.data.getField());
  }

  public start(): void {
    this.setStatus('active');
    this.go();
  }

  private setStatus(status: GameStatus): void {
    this.status = status;
    this.callbacks.onStatusChange(status);
  }

  private go(): void {
    let score = this.data.getScore();

    this.intervalId = setInterval(() => {
      const shouldContinue = this.data.updateField();

      if (!shouldContinue) {
        this.gameOver();
        return;
      }

      const currentScore = this.data.getScore();
      if (currentScore > score) {
        score = currentScore;
        this.callbacks.onScoreChange(score);
        this.increaseSpeed();
      }

      if (!this.directionsToApply.isEmpty()) {
        const direction = this.directionsToApply.dequeue();
        this.data.updateDirection(direction);
      }

      this.view.drawField(this.data.getField());
    }, this.getSpeed());
  }

  private increaseSpeed(): void {
    clearInterval(this.intervalId);
    this.go();
  }

  private getSpeed(): number {
    return Math.max(50, 3000 / (this.data.getScore() + 10));
  }

  private gameOver(): void {
    this.setStatus('game over');
    clearInterval(this.intervalId);
  }

  public pause(): void {
    this.setStatus('pause');
    clearInterval(this.intervalId);
  }

  public continue(): void {
    this.start();
  }

  public reset(): void {
    clearInterval(this.intervalId);
  }

  public updateDirection(direction: Direction): void {
    if (this.directionsToApply.last !== direction) {
      this.directionsToApply.enqueue(direction);
    }
  }

  public getStatus(): GameStatus {
    return this.status;
  }

  public fixScaleIndexChange(scaleIndex: number): void {
    this.view.updateScaleIndex(scaleIndex);
    this.view.drawField(this.data.getField());
  }
}

export default GameController;
