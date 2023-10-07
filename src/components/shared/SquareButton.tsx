import { Button } from "@chakra-ui/react";
import React from "react";

// Define the prop types
interface SquareProps {
  value?: "X" | "O";
  winner?: "X" | "O";
  clickable?: boolean;
  onClick?: () => void;
  isBattleSquare?: boolean;
}

const SquareButton: React.FC<SquareProps> = React.memo(
  ({ value, winner, clickable, onClick, isBattleSquare = false }) => {
    const color = value === "X" ? "#fc7341" : "#2db2e2";

    let bgColor = "#f0f8ff"; // Default

    if (isBattleSquare) {
      if (!winner) {
        if (clickable) {
          bgColor = "#a0ffe6"; // Light teal for clickable battle square
        } else {
          bgColor = "#d9b3ff"; // Light purple for unwon battle square
        }
      } else if (winner === "X") {
        bgColor = "#ff99cc"; // Mauve for X's victory on battle square
      } else if (winner === "O") {
        bgColor = "#4b45ff"; // Closer-to-blue shade for O's victory on battle square
      }
    } else if (winner === "X") {
      bgColor = "#ff7f50"; // Orange for X's victory
    } else if (winner === "O") {
      bgColor = "#1e90ff"; // Blue for O's victory
    } else if (clickable) {
      bgColor = "#90ee90"; // Green for other clickable squares
    }

    const hoverBgColor = isBattleSquare
      ? "#90c4ff"
      : clickable
      ? "#32cd32"
      : bgColor;

    return (
      <Button
        bg={bgColor}
        color={color}
        _hover={{ bg: hoverBgColor }}
        w="40px"
        h="40px"
        p="0"
        m="2px"
        border="1px solid #e2e8f0"
        borderRadius="4px"
        fontSize="24px"
        fontWeight="bold"
        lineHeight="40px"
        textAlign="center"
        onClick={onClick}
        _focus={{
          outline: "none",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        }}
        transition="all 0.3s"
      >
        {value}
      </Button>
    );
  }
);

export default SquareButton;
