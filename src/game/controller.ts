import { Direction, GameStatus } from '../types';
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

  private intervalId: ReturnType<typeof setInterval>;

  private callbacks: Callbacks;

  constructor(
    ctx: CanvasRenderingContext2D,
    scaleIndex: number,
    columnsAmount: number,
    rowsAmount: number,
    callbacks: Callbacks
  ) {
    this.data = new GameData(columnsAmount, rowsAmount);
    this.view = new GameView(ctx, scaleIndex);
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
    this.data.updateDirection(direction);
  }

  public getStatus(): GameStatus {
    return this.status;
  }
}

export default GameController;
