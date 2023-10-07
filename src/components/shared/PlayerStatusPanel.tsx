import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface PlayerStatusPanelProps {
  player: "X" | "O";
  isActive: boolean;
  timeLeft: number | null;
  onShuffle: () => void;
  hasShuffled: boolean;
  gameMode: string;
  battleSquareWinner: boolean;
}

const PlayerStatusPanel: React.FC<PlayerStatusPanelProps> = ({
  player,
  isActive,
  timeLeft,
  onShuffle,
  hasShuffled,
  gameMode,
  battleSquareWinner,
}) => {
  const color = isActive ? (player === "X" ? "#fc7341" : "#2db2e2") : "#d1d1d1";
  const opacity = isActive ? 1 : 0.5; // 50% opacity for the inactive player
  const boxShadow = isActive ? "0px 0px 15px rgba(0, 0, 0, 0.1)" : "none";

  const formatTime = (seconds: number): string | undefined => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (Number.isNaN(mins) || Number.isNaN(secs)) return;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
      {timeLeft !== null && (
        <Text marginTop="0.5rem" color={color} transition="color 0.3s">
          {formatTime(Math.floor(timeLeft))}
        </Text>
      )}
      {/* ... (existing children) */}
      {(gameMode === "crazy" || battleSquareWinner) && (
        <button
          onClick={onShuffle}
          disabled={hasShuffled}
          style={{
            marginTop: "1rem",
            padding: "0.3rem 0.3rem",
            backgroundColor: isActive && !hasShuffled ? "#38B2AC" : "#A0AEC0",
            borderRadius: "8px",
            cursor: isActive && !hasShuffled ? "pointer" : "not-allowed",
            transition: "background-color 0.3s, opacity 0.3s",
          }}
        >
          Shuffle Grids
        </button>
      )}
    </Box>
  );
};

export default PlayerStatusPanel;
