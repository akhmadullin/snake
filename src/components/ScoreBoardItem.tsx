import React, { FC } from 'react';

type ScoreBoardItemProps = {
  icon: string;
  value: number;
};

const ScoreBoardItem: FC<ScoreBoardItemProps> = ({ icon, value }) => {
  return (
    <span className="scoreboard-item">
      <i className={`nes-icon ${icon} is-medium`} />
      <span className="scoreboard-item__value">{value}</span>
    </span>
  );
};

export default ScoreBoardItem;
