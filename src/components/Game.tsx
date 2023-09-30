import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import GameBoard from "./GameBoard";
import Clock, { Player } from "./utils/Clock";

interface GameProps {
  size: number;
  renderInfo: boolean;
  clock: boolean;
  time: number;
}

interface LastMoveLocation {
  row: number | null;
  col: number | null;
  outerRow: number | null;
  outerCol: number | null;
}

const Game: React.FC<GameProps> = React.memo(
  ({ size, renderInfo, clock, time }) => {
    const initialSquares = Array(size * size).fill(
      Array(size * size).fill(null)
    );

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
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Player1);

    const timeOver = (player: Player) => {
      if (player === Player.Player1) {
        setWinner("O");
      } else {
        setWinner("X");
      }
    };

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

    const endTurn = (nextPlayer: Player) => {
      setCurrentPlayer(nextPlayer);
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

    return (
      <Box className="game-container">
        <Box className="game-grid">
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
                        key={innerIdx}
                        squares={squares[boardIndex]}
                        winner={localWinners[boardIndex] as any}
                        clickable={isCurrentBoard(boardIndex)}
                        onClick={() => handleClick(innerIdx, boardIndex)}
                      />
                    );
                  })}
              </Box>
            ))}
        </Box>
        {renderInfo && (
          <Box className="game-info">
            <Text>{/* your status message */}</Text>
            {clock && (
              <Clock
                seconds={time * 60}
                currentPlayer={currentPlayer}
                timeOverCallback={timeOver}
                endTurnCallback={endTurn}
              />
            )}
          </Box>
        )}
      </Box>
    );
  }
);

export default Game;
