import React from 'react';

interface GameProps {
  size: number;
  clock: boolean;
  time: number;
  renderInfo: boolean;
}

const Game: React.FC<GameProps> = React.memo(
  ({ size, clock, time, renderInfo }) => {
    return <></>;
  },
);

export default Game;
