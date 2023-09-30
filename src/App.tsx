import React, { useState, memo } from "react";
import Game from "./components/Game";

const Instructions = memo(() => {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <p>Here are the instructions for the game...</p>
    </div>
  );
});

const App = (): React.ReactElement => {
  const [boardSize, setBoardSize] = useState(3);
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(10);
  const [matchID, setMatchID] = useState(0);
  const [currentView, setCurrentView] = useState<
    "intro" | "game" | "instructions"
  >("intro");

  return (
    <div className="app">
      <h1>Ultimate Tic Tac Toe</h1>

      {currentView === "intro" && (
        <>
          <button onClick={() => setCurrentView("game")}>Play</button>
          <button onClick={() => setCurrentView("instructions")}>
            Instructions
          </button>
        </>
      )}

      {currentView === "game" && (
        <>
          <button onClick={() => setCurrentView("instructions")}>
            Instructions
          </button>
          <br />
          <Game
            key={matchID}
            size={boardSize}
            clock={clock}
            time={time}
            renderInfo={true}
          />
        </>
      )}

      {currentView === "instructions" && (
        <>
          <button onClick={() => setCurrentView("game")}>Back to Game</button>
          <Instructions />
        </>
      )}
    </div>
  );
};

export default App;
