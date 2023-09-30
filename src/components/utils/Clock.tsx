import { Box, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

// Define an enum for players
export enum Player {
  Player1 = "Player1",
  Player2 = "Player2",
}

interface CountDownProps {
  seconds: number;
  currentPlayer: Player;
  timeOverCallback: (player: Player) => void;
  endTurnCallback: (nextPlayer: Player) => void;
}

const Clock: React.FC<CountDownProps> = ({
  seconds,
  currentPlayer,
  timeOverCallback,
  endTurnCallback,
}) => {
  const [elapsedPlayer1, setElapsedPlayer1] = useState<number>(0);
  const [elapsedPlayer2, setElapsedPlayer2] = useState<number>(0);
  const lastTick = useRef<Date | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const dt = now.getTime() - (lastTick.current?.getTime() || now.getTime());

      if (currentPlayer === Player.Player1) {
        const newElapsed = elapsedPlayer1 + dt;
        if (newElapsed / 1000 >= seconds) {
          timeOverCallback(Player.Player1);
          return;
        }
        setElapsedPlayer1(newElapsed);
      } else {
        const newElapsed = elapsedPlayer2 + dt;
        if (newElapsed / 1000 >= seconds) {
          timeOverCallback(Player.Player2);
          return;
        }
        setElapsedPlayer2(newElapsed);
      }

      lastTick.current = new Date();
    };

    timer.current = setInterval(tick, 1000);
    return () => clearInterval(timer.current!);
  }, [
    currentPlayer,
    elapsedPlayer1,
    elapsedPlayer2,
    seconds,
    timeOverCallback,
  ]);

  const endTurn = () => {
    clearInterval(timer.current!);
    const nextPlayer =
      currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1;
    endTurnCallback(nextPlayer);
    lastTick.current = new Date();
  };

  const remainingPlayer1 = seconds - Math.floor(elapsedPlayer1 / 1000);
  const remainingPlayer2 = seconds - Math.floor(elapsedPlayer2 / 1000);

  return (
    <VStack spacing={2} align="start">
      <Text
        color="blue.500"
        fontWeight="medium"
        onClick={endTurn}
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Player 1: {("0" + Math.floor(remainingPlayer1 / 60)).slice(-2)}:
        {("0" + (remainingPlayer1 % 60)).slice(-2)}
      </Text>
      <Text
        color="red.500"
        fontWeight="medium"
        onClick={endTurn}
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Player 2: {("0" + Math.floor(remainingPlayer2 / 60)).slice(-2)}:
        {("0" + (remainingPlayer2 % 60)).slice(-2)}
      </Text>
    </VStack>
  );
};

export default Clock;
