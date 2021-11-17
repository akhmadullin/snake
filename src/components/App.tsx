import React, { FC } from 'react';
import Header from './Header';
import SnakeGame from './SnakeGame';

const App: FC = () => {
  return (
    <div className="content-wrapper">
      <Header />
      <SnakeGame />
    </div>
  );
};

export default App;
