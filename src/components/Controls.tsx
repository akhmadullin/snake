import React, { FC, MouseEvent } from 'react';
import { GameStatus } from '../types';

type ControlsProps = {
  status: GameStatus;
  generateNewGame: () => void;
  pauseGame: () => void;
  continueGame: () => void;
};

const callbackWithBlurRemoving = (callback: () => void) => {
  return (e: MouseEvent) => {
    callback();
    const target = e.target as HTMLButtonElement;
    target.blur();
  };
};

const Controls: FC<ControlsProps> = ({
  status,
  generateNewGame,
  pauseGame,
  continueGame,
}) => {
  return (
    <div className="controls-row">
      <button
        type="button"
        className="nes-btn"
        onClick={callbackWithBlurRemoving(generateNewGame)}
      >
        Play new game
      </button>
      {status === 'active' && (
        <button
          type="button"
          className="nes-btn is-warning"
          onClick={callbackWithBlurRemoving(pauseGame)}
        >
          Pause
        </button>
      )}
      {status === 'pause' && (
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={callbackWithBlurRemoving(continueGame)}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Controls;
