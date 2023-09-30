import React, { useState } from 'react';
import Game from './components/Game';

const ReactApp = (): React.ReactElement => {
  const [boardSize, setBoardSize] = useState(3);
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(10);
  const [matchID, setMatchID] = useState(0);

  const newGame = (size: number, clock: boolean, time: number) => {
    setBoardSize(size);
    setClock(clock);
    setTime(time);
    setMatchID((prevMatchID) => prevMatchID + 1);
  };

  return (
    <div className="app">
      {/* <SettingsForm
        defaultValues={{ boardSize, clock, time, matchID }}
        submitCallback={newGame}
      /> */}
      <br />
      <Game
        key={matchID}
        size={boardSize}
        clock={clock}
        time={time}
        renderInfo={true}
      />
    </div>
  );
};

export default ReactApp;
