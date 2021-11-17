import React, { FC } from 'react';
import ScoreBoardItem from './ScoreBoardItem';

type ScoreBoardProps = {
  record: number;
  score: number;
};

const ScoreBoard: FC<ScoreBoardProps> = ({ record, score }) => {
  return (
    <div className="scoreboard">
      <ScoreBoardItem icon="trophy" value={record} />
      <ScoreBoardItem icon="coin" value={score} />
    </div>
  );
};

export default ScoreBoard;
