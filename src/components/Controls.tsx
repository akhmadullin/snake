import React, { FC } from 'react';
import { GameStatus } from '../types';

type ControlsProps = {
  status: GameStatus;
  resetGame: () => void;
  pauseGame: () => void;
  continueGame: () => void;
};

const Controls: FC<ControlsProps> = ({
  status,
  resetGame,
  pauseGame,
  continueGame,
}) => {
  return (
    <div className="controls-row">
      <button type="button" className="nes-btn" onClick={resetGame}>
        Reset game
      </button>
      {status === 'active' && (
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={pauseGame}
        >
          Pause
        </button>
      )}
      {status === 'pause' && (
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={continueGame}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Controls;
