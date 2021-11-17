import React, { FC } from 'react';
import { GameStatus } from '../types';

type ControlsProps = {
  status: GameStatus;
  generateNewGame: () => void;
  pauseGame: () => void;
  continueGame: () => void;
};

const Controls: FC<ControlsProps> = ({
  status,
  generateNewGame,
  pauseGame,
  continueGame,
}) => {
  return (
    <div className="controls-row">
      <button type="button" className="nes-btn" onClick={generateNewGame}>
        Play new game
      </button>
      {status === 'active' && (
        <button
          type="button"
          className="nes-btn is-warning"
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
