import { cellSize, cellColorDict } from '../lib/constants';
import { Field, CellType } from '../types';

class GameView {
  private ctx: CanvasRenderingContext2D;

  private scaleIndex: number;

  constructor(ctx: CanvasRenderingContext2D, scaleIndex: number) {
    this.ctx = ctx;
    this.scaleIndex = scaleIndex;

    this.scaleCanvas();
  }

  public drawField(field: Field): void {
    const xAmount = field.length;
    const yAmount = field[0].length;

    for (let x = 0; x < xAmount; x++) {
      for (let y = 0; y < yAmount; y++) {
        this.drawCell(x, y, field[x][y]);
      }
    }
  }

  private drawCell(x: number, y: number, pointType: CellType): void {
    this.ctx.fillStyle = cellColorDict[pointType];
    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  private scaleCanvas(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.scaleIndex, this.scaleIndex);
  }

  public updateScaleIndex(scaleIndex: number): void {
    this.scaleIndex = scaleIndex;
    this.scaleCanvas();
  }
}

export default GameView;
