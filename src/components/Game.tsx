import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import GameBoard from "./GameBoard";

interface GameProps {
  size: number;
  time: number;
}

// Define an enum for players
export enum Player {
  Player1 = "Player1",
  Player2 = "Player2",
}

interface TurnIndicatorProps {
  player: "X" | "O";
  isActive: boolean;
}

interface LastMoveLocation {
  row: number | null;
  col: number | null;
  outerRow: number | null;
  outerCol: number | null;
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ player, isActive }) => {
  const color = isActive ? (player === "X" ? "#fc7341" : "#2db2e2") : "#d1d1d1";
  const opacity = isActive ? 1 : 0.5; // 50% opacity for the inactive player
  const boxShadow = isActive ? "0px 0px 15px rgba(0, 0, 0, 0.1)" : "none";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1rem"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      transition="box-shadow 0.3s, color 0.3s, opacity 0.3s"
      boxShadow={boxShadow}
      marginRight={player === "X" ? "1rem" : "0"}
      marginLeft={player === "O" ? "1rem" : "0"}
      opacity={opacity}
    >
      <Text
        marginBottom="1rem"
        fontWeight="bold"
        color={color}
        transition="color 0.3s"
      >
        Player {player === "X" ? 1 : 2}
      </Text>
      <Text fontSize="4xl" color={color} transition="color 0.3s">
        {player}
      </Text>
    </Box>
  );
};

const Game: React.FC<GameProps> = React.memo(({ size, time }) => {
  const initialSquares = Array(size * size)
    .fill(null)
    .map(() => Array(size * size).fill(null));

  const [squares, setSquares] = useState<typeof initialSquares>(initialSquares);
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

    if (winner || !isCurrentBoard(outer_idx) || squares[outer_idx][inner_idx]) {
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="row"
      >
        <TurnIndicator player="X" isActive={xIsNext} />

        <Box className="game-grid" mx={5}>
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
        <TurnIndicator player="O" isActive={!xIsNext} />
      </Box>
    </Box>
  );
});

export default Game;
