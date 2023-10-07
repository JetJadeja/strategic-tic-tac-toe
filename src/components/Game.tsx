import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import GameBoard from "./shared/GameBoard";
import PlayerStatusPanel from "./shared/PlayerStatusPanel";

interface GameProps {
  size: number;
  time: number | null;
  mode: string;
  gameMode: string;
}

// Define an enum for players
export enum Player {
  Player1 = "Player1",
  Player2 = "Player2",
}

interface LastMoveLocation {
  row: number | null;
  col: number | null;
  outerRow: number | null;
  outerCol: number | null;
}

const Game: React.FC<GameProps> = React.memo(
  ({ size, time, mode, gameMode }) => {
    const initialSquares = Array(size * size)
      .fill(null)
      .map(() => Array(size * size).fill(null));

    const [squares, setSquares] =
      useState<typeof initialSquares>(initialSquares);
    const [localWinners, setLocalWinners] = useState<(string | null)[]>(
      Array(size * size).fill(null)
    );
    const [lastMoveLocation, setLastMoveLocation] = useState<LastMoveLocation>({
      row: null,
      col: null,
      outerRow: null,
      outerCol: null,
    });
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    const [player1Time, setPlayer1Time] = useState(time);
    const [player2Time, setPlayer2Time] = useState(time);

    const [player1HasShuffled, setPlayer1HasShuffled] = useState(false);
    const [player2HasShuffled, setPlayer2HasShuffled] = useState(false);

    React.useEffect(() => {
      const interval = setInterval(() => {
        if (xIsNext) {
          setPlayer1Time((prev) => (prev ? prev - 1 : null));
          if (player1Time === 0) setWinner("O");
        } else {
          setPlayer2Time((prev) => (prev ? prev - 1 : null));
          if (player2Time === 0) setWinner("O");
        }
      }, 1000);

      // Cleanup the interval when component unmounts or player switches
      return () => clearInterval(interval);
    }, [xIsNext]);

    const isCurrentBoard = (idx: number) => {
      if (winner) return false;

      const { row, col } = lastMoveLocation;
      if (row === null || col === null) {
        return true;
      }

      const currentBoard = row * size + col;
      return localWinners[currentBoard]
        ? localWinners[idx] === null
        : idx === currentBoard;
    };

    const handleClick = (inner_idx: number, outer_idx: number) => {
      console.log(inner_idx, outer_idx);

      if (
        winner ||
        !isCurrentBoard(outer_idx) ||
        squares[outer_idx][inner_idx]
      ) {
        return;
      }

      const newSquares = squares.slice();
      newSquares[outer_idx][inner_idx] = xIsNext ? "X" : "O";

      setSquares(newSquares);

      const lastMove = {
        row: Math.floor(inner_idx / size),
        col: inner_idx % size,
        outerRow: Math.floor(outer_idx / size),
        outerCol: outer_idx % size,
      };

      const newWinnerLine = calculateWinner(newSquares[outer_idx], lastMove);
      const updatedWinners = localWinners.slice();
      updatedWinners[outer_idx] =
        newWinnerLine && newSquares[outer_idx][newWinnerLine[0]];
      setLocalWinners(updatedWinners);

      const globalWinnerLine = calculateWinner(updatedWinners, {
        row: lastMove.outerRow,
        col: lastMove.outerCol,
      });

      if (globalWinnerLine) {
        setWinner(updatedWinners[globalWinnerLine[0]]);
        alert("WINNER");
        setPlayer1HasShuffled(true);
        setPlayer2HasShuffled(true);
      }

      setLastMoveLocation(lastMove);
      setXIsNext(!xIsNext);
    };

    const calculateWinner = (
      squares: any[],
      lastMoveLocation: { row: number; col: number }
    ) => {
      if (!lastMoveLocation) return null;

      const x = lastMoveLocation.row;
      const y = lastMoveLocation.col;
      const lastPlayer = squares[x * size + y];
      if (lastPlayer === null) return null;

      // Generate possible winner lines for the last move
      var lines: { [key: string]: number[] } = {
        row: [],
        col: [],
        diag: [],
        antidiag: [],
      };

      for (let i = 0; i < size; i++) {
        lines.row.push(x * size + i);
        lines.col.push(i * size + y);
      }

      if (x === y) {
        for (let i = 0; i < size; i++) {
          lines.diag.push(i * size + i);
        }
      }

      if (x + y === size - 1) {
        for (let i = 0; i < size; i++) {
          lines.antidiag.push(i * size + size - 1 - i);
        }
      }

      // Check values on each candidate line
      for (let prop in lines) {
        const line = lines[prop];
        if (line.length !== size) continue;
        const result = line.reduce(
          (acc, index) => acc && squares[index] === lastPlayer,
          true
        );
        if (result) {
          return line;
        }
      }
      return null;
    };

    const shuffleBoards = () => {
      const newOrder = Array.from([...Array(size * size).keys()]).sort(
        () => Math.random() - 0.5
      );
      const newSquares = newOrder.map((i) => squares[i]);
      const newLocalWinners = newOrder.map((i) => localWinners[i]);

      setSquares(newSquares);
      setLocalWinners(newLocalWinners);

      if (xIsNext) {
        setPlayer1HasShuffled(true);
      } else {
        setPlayer2HasShuffled(true);
      }
    };

    return (
      <Box className="game-container">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="row"
        >
          <PlayerStatusPanel
            player="X"
            isActive={xIsNext}
            timeLeft={player1Time}
            gameMode={gameMode}
            hasShuffled={player1HasShuffled}
            onShuffle={shuffleBoards}
          />

          <Box className="game-grid" mx={8}>
            {Array(size)
              .fill(0)
              .map((_, outerIdx) => (
                <Box key={outerIdx} className="game-row">
                  {Array(size)
                    .fill(0)
                    .map((_, innerIdx) => {
                      const boardIndex = outerIdx * size + innerIdx;
                      return (
                        <GameBoard
                          key={boardIndex}
                          squares={squares[boardIndex]}
                          winner={localWinners[boardIndex] as any}
                          clickable={isCurrentBoard(boardIndex)}
                          onClick={(squareIndex) =>
                            handleClick(squareIndex, boardIndex)
                          }
                        />
                      );
                    })}
                </Box>
              ))}
          </Box>
          <PlayerStatusPanel
            player="O"
            isActive={!xIsNext}
            timeLeft={player2Time}
            gameMode={gameMode}
            hasShuffled={player2HasShuffled}
            onShuffle={shuffleBoards}
          />
        </Box>
      </Box>
    );
  }
);

export default Game;
