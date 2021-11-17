import React, { FC, useRef, useState, useEffect, useLayoutEffect } from 'react';
import Header from './Header';
import Container from './Container';
import Hint from './Hint';
import Status from './Status';
import ScoreBoard from './ScoreBoard';
import Screen from './Screen';
import Controls from './Controls';
import { cellSize } from '../constants';
import { GameStatus } from '../types';
import Game from '../game/controller';

const pixelRatioMediaQuery =
  '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-resolution: 2dppx)';

const kodeToDirectionMap = {
  38: 'up',
  39: 'right',
  40: 'down',
  37: 'left',
};
const arrowsKeyCodes = Object.keys(kodeToDirectionMap).map((key) =>
  Number(key)
);

const Snake: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);
  const [scaleIndex, setScaleIndex] = useState(window.devicePixelRatio);
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(
    Number(window.localStorage.getItem('record'))
  );
  const [status, setStatus] = useState<GameStatus>('unstarted');

  const resetGame = (): void => {
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
      canvas.width / cellSize / scaleIndex,
      canvas.height / cellSize / scaleIndex,
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
      resetGame();
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
    if (status === 'game over') {
      const localStorageRecord = Number(window.localStorage.getItem('record'));
      if (score > localStorageRecord) {
        window.localStorage.setItem('record', score.toString());
      }
    }
  }, [status, score]);

  useEffect(() => {
    if (score >= record) {
      setRecord(score);
    }
  }, [score, record]);

  useLayoutEffect(() => {
    resetGame();
  }, []);

  useLayoutEffect(() => {
    const callback = (e: KeyboardEvent): void => {
      const { keyCode } = e;
      if (arrowsKeyCodes.includes(keyCode)) {
        e.preventDefault();
        const game = gameRef.current;
        if (game.getStatus() === 'unstarted') {
          game.start();
        }
        game.updateDirection(kodeToDirectionMap[keyCode]);
      }
    };
    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, []);

  return (
    <div className="content-wrapper">
      <Header />
      <Container>
        <Hint />
        <div className="info-row">
          <Status status={status} />
          <ScoreBoard record={record} score={score} />
        </div>
        <Screen ref={canvasRef} />
        <Controls
          status={status}
          resetGame={resetGame}
          pauseGame={pauseGame}
          continueGame={continueGame}
        />
      </Container>
    </div>
  );
};

export default Snake;
