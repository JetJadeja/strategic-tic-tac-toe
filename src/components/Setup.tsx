import React from "react";
import { Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";

const Setup: React.FC<{
  onConfirm: () => void;
  onHome: () => void;
  mode: "single" | "twoPlayer";
  setMode: React.Dispatch<any>;
  timerLength: number | "custom" | "none"; // Add "none" to the type
  setTimerLength: React.Dispatch<any>;
  gameMode: "normal" | "crazy";
  setGameMode: React.Dispatch<any>;
}> = ({
  mode,
  timerLength,
  gameMode,
  onConfirm,
  onHome,
  setMode,
  setTimerLength,
  setGameMode,
}) => {
  return (
    <VStack spacing={12}>
      {" "}
      {/* Increased spacing */}
      <Heading as="h2" size="xl">
        Game Setup
      </Heading>
      <VStack spacing={6} alignItems="flex-start">
        <HStack spacing={4}>
          <Text minWidth="100px">Choose Mode:</Text>
          <Button
            colorScheme={mode === "single" ? "teal" : undefined}
            onClick={() => setMode("single")}
          >
            Single Player
          </Button>
          <Button
            colorScheme={mode === "twoPlayer" ? "teal" : undefined}
            onClick={() => setMode("twoPlayer")}
          >
            2-Player
          </Button>
        </HStack>
        <HStack spacing={4}>
          <Text minWidth="100px">Timer Length:</Text>
          {["None", "5 mins", "10 mins", "15 mins", "30 mins"].map((time) => (
            <Button
              key={time}
              colorScheme={
                (timerLength.toString() === "None"
                  ? "None"
                  : `${timerLength.toString()} mins`) === time
                  ? "teal"
                  : undefined
              }
              onClick={() =>
                setTimerLength(
                  time === "custom"
                    ? 0
                    : time === "None"
                    ? "None"
                    : parseInt(time)
                )
              }
            >
              {time}
            </Button>
          ))}
        </HStack>
        <HStack spacing={4}>
          <Text minWidth="100px">Game Mode:</Text>
          <Button
            colorScheme={gameMode === "normal" ? "teal" : undefined}
            onClick={() => setGameMode("normal")}
            disabled={mode === "twoPlayer"}
          >
            Normal
          </Button>
          <Button
            colorScheme={gameMode === "crazy" ? "teal" : undefined}
            onClick={() => setGameMode("crazy")}
            disabled={mode === "twoPlayer"}
          >
            Crazy
          </Button>
        </HStack>
      </VStack>
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={onConfirm}>
          Start Game
        </Button>
        <Button onClick={onHome}>Home</Button>
      </HStack>
    </VStack>
  );
};
export default Setup;
