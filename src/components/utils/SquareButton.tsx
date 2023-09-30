import { Button } from "@chakra-ui/react";
import React from "react";

// Define the prop types
interface SquareProps {
  value?: "X" | "O";
  winner?: "X" | "O";
  clickable?: boolean;
  onClick?: () => void;
}

const SquareButton: React.FC<SquareProps> = React.memo(
  ({ value, winner, clickable, onClick }) => {
    const color = value === "X" ? "#fc7341" : "#2db2e2";
    const bgColor =
      winner === "X"
        ? "#ffccb5"
        : winner === "O"
        ? "#dbf5ff"
        : clickable
        ? "#e2ffec"
        : "#f7f9fc";
    const hoverBgColor = clickable ? "#c7fcd1" : bgColor;

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
