import React, { FC, useRef, useState, useEffect, useLayoutEffect } from 'react';
import GameContainer from './GameContainer';
import Hint from './Hint';
import Status from './Status';
import ScoreBoard from './ScoreBoard';
import Screen from './Screen';
import Controls from './Controls';
import Game from '../game/controller';
import { cellSize } from '../constants';
import { GameStatus, Direction } from '../types';

const pixelRatioMediaQuery =
  '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-resolution: 2dppx)';

const keyCodeToDirectionMap: Record<number, Direction> = {
  38: 'up',
  39: 'right',
  40: 'down',
  37: 'left',
};

const arrowsKeyCodes = Object.keys(keyCodeToDirectionMap).map((key) =>
  Number(key)
);

const enterKeyCode = 13;

const spaceKeyCode = 32;

const gameStatusContorls = [enterKeyCode, spaceKeyCode];

const canvasSize = {
  width: 660,
  height: 440,
};

const SnakeGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);
  const [scaleIndex, setScaleIndex] = useState(window.devicePixelRatio);
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(
    Number(window.localStorage.getItem('record'))
  );
  const [status, setStatus] = useState<GameStatus>('unstarted');

  const generateNewGame = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');

    if (gameRef.current && gameRef.current.getStatus() !== 'unstarted') {
      gameRef.current.reset();
    }

    const game = new Game(
      ctx,
      scaleIndex,
      canvasSize.width / cellSize,
      canvasSize.height / cellSize,
      { onScoreChange: setScore, onStatusChange: setStatus }
    );
    game.init();
    gameRef.current = game;
    setScore(0);
    setStatus('unstarted');
  };

  const pauseGame = (): void => {
    gameRef.current.pause();
  };

  const continueGame = (): void => {
    gameRef.current.continue();
  };

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(pixelRatioMediaQuery);
    const updateScaleIndex = (): void => {
      setScaleIndex(window.devicePixelRatio);
    };

    // Safari does not support addEventListener and removeEventListener at MediaQueryList,
    // is has addListener removeListener method instead
    if (mediaQueryList.addEventListener && mediaQueryList.removeEventListener) {
      mediaQueryList.addEventListener('change', updateScaleIndex);

      return () => {
        mediaQueryList.removeEventListener('change', updateScaleIndex);
      };
      // eslint-disable-next-line no-else-return
    } else {
      mediaQueryList.addListener(updateScaleIndex);

      return () => {
        mediaQueryList.removeListener(updateScaleIndex);
      };
    }
  }, []);

  useEffect(() => {
    gameRef.current.fixScaleIndexChange(scaleIndex);
  }, [scaleIndex]);

  useLayoutEffect(() => {
    generateNewGame();
  }, []);

  useEffect(() => {
    if (score > record) {
      setRecord(score);
      window.localStorage.setItem('record', score.toString());
    }
  }, [score, record]);

  useEffect(() => {
    const callback = (e: KeyboardEvent): void => {
      const { keyCode } = e;
      const game = gameRef.current;
      const gameStatus = game.getStatus();

      if (arrowsKeyCodes.includes(keyCode)) {
        e.preventDefault();

        if (gameStatus === 'unstarted') {
          game.start();
        }

        game.updateDirection(keyCodeToDirectionMap[keyCode]);
      }

      if (gameStatusContorls.includes(keyCode) && e.target === document.body) {
        e.preventDefault();

        if (gameStatus === 'unstarted') {
          game.start();
        }

        if (gameStatus === 'active') {
          pauseGame();
        }

        if (gameStatus === 'pause') {
          continueGame();
        }

        if (gameStatus === 'game over') {
          generateNewGame();
        }
      }
    };

    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, []);

  return (
    <GameContainer>
      <Hint />
      <div className="info-row">
        <Status status={status} />
        <ScoreBoard record={record} score={score} />
      </div>
      <Screen
        ref={canvasRef}
        scaleIndex={scaleIndex}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <Controls
        status={status}
        generateNewGame={generateNewGame}
        pauseGame={pauseGame}
        continueGame={continueGame}
      />
    </GameContainer>
  );
};

export default SnakeGame;
