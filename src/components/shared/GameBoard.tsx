import { Box } from "@chakra-ui/react";
import React from "react";
import SquareButton from "./SquareButton";

// Define the prop types
interface GameBoardProps {
  squares: ("X" | "O" | undefined)[];
  winner?: "X" | "O";
  clickable?: boolean;
  onClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = React.memo(
  ({ squares, winner, clickable, onClick }) => {
    const size = 3; // Hardcoding for a 3x3 board
    const rows = [];

    for (let i = 0; i < size; i++) {
      const cols = [];
      for (let j = 0; j < size; j++) {
        const index = i * size + j;

        cols.push(
          <SquareButton
            key={index}
            value={squares[index]}
            winner={winner}
            clickable={clickable}
            onClick={() => onClick(index)}
          />
        );
      }
      rows.push(
        <Box className="board-row" key={i}>
          {cols}
        </Box>
      );
    }

    return <Box className="board">{rows}</Box>;
  }
);

export default GameBoard;
