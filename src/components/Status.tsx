import React, { FC } from 'react';
import { GameStatus } from '../types';

type StatusProps = {
  status: GameStatus;
};

const Status: FC<StatusProps> = ({ status }) => {
  return (
    <div>
      {status === 'unstarted' && (
        <span className="nes-badge">
          <span className="is-dark">Waiting</span>
        </span>
      )}
      {status === 'active' && (
        <span className="nes-badge">
          <span className="is-success">Active</span>
        </span>
      )}
      {status === 'pause' && (
        <span className="nes-badge">
          <span className="is-warning">Pause</span>
        </span>
      )}
      {status === 'game over' && (
        <span className="nes-badge">
          <span className="is-error">Game Over</span>
        </span>
      )}
    </div>
  );
};

export default Status;
