import React, { useState } from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  useColorModeValue,
  Fade,
  ChakraProvider,
} from "@chakra-ui/react";
import Game from "./components/Game";
import Instructions from "./components/shared/Instructions";
import Setup from "./components/Setup";
import { FaPlay, FaBookOpen } from "react-icons/fa";

const App = (): React.ReactElement => {
  const [currentView, setCurrentView] = useState<string>("intro");

  const hoverBg = useColorModeValue("blue.700", "blue.900");

  const [boardSize] = useState(3);
  const [matchID, setMatchID] = useState(0);

  const [previousView, setPreviousView] = useState<string>("intro");

  const navigateTo = (view: string) => {
    setPreviousView(currentView); // Before changing the view, save the current view as previousView
    setCurrentView(view as any);
  };

  const restartGame = () => {
    setMatchID((prev) => prev + 1); // Incrementing matchID to remount the Game component
  };

  const [mode, setMode] = useState<"single" | "twoPlayer">("twoPlayer");
  const [timerLength, setTimerLength] = useState<number>(10); // default to 10 minutes
  const [gameMode, setGameMode] = useState<string>("normal");

  return (
    <ChakraProvider>
      <Center
        className="app"
        h="100vh"
        bgGradient="linear(to-b, gray.900, gray.700)"
        color="white"
        p={6} // added padding to give a bit of margin
      >
        <VStack spacing={8} w="100%" maxW="800px">
          <Heading
            as="h1"
            size="4xl"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Strategic Tic Tac Toe
          </Heading>

          {currentView === "intro" && (
            <VStack spacing={4}>
              <Button
                size="lg"
                colorScheme="teal"
                leftIcon={<FaPlay />}
                _hover={{
                  bg: hoverBg,
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => navigateTo("settings")}
              >
                Play
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="teal"
                leftIcon={<FaBookOpen />}
                _hover={{
                  borderColor: hoverBg,
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => navigateTo("instructions")}
              >
                Instructions
              </Button>
            </VStack>
          )}

          {currentView === "settings" && (
            <VStack spacing={4} w="100%" borderRadius="md" p={4}>
              <Setup
                timerLength={timerLength}
                setTimerLength={setTimerLength}
                mode={mode}
                setMode={setMode}
                gameMode={gameMode}
                setGameMode={setGameMode}
                onConfirm={() => navigateTo("game")}
                onHome={() => navigateTo("intro")}
              />
            </VStack>
          )}

          {currentView === "game" && (
            <VStack spacing={4} w="100%" borderRadius="md" p={4}>
              <HStack spacing={8}>
                <Button
                  mb={4}
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => navigateTo("intro")}
                >
                  Home
                </Button>

                <Button
                  mb={4}
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => navigateTo("instructions")}
                >
                  Instructions
                </Button>

                <Button
                  mb={4}
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => {
                    restartGame();
                    navigateTo("settings");
                  }}
                >
                  Restart
                </Button>
              </HStack>

              <Game
                key={matchID}
                size={boardSize}
                time={timerLength ? timerLength * 60 : null}
                gameMode={gameMode}
                mode={mode}
              />
            </VStack>
          )}

          {currentView === "instructions" && (
            <Instructions goBack={() => navigateTo(previousView)} />
          )}
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default App;
