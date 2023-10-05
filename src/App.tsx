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
import { FaPlay, FaBookOpen } from "react-icons/fa"; // Importing icons for added flair

const Instructions = React.memo(({ goBack }: { goBack: () => void }) => {
  return (
    <Fade in>
      <VStack spacing={5}>
        <Heading as="h2" size="2xl">
          Instructions
        </Heading>
        <Text fontSize="lg">Here are the instructions for the game...</Text>
        <Button colorScheme="teal" onClick={goBack}>
          Back
        </Button>
      </VStack>
    </Fade>
  );
});

const App = (): React.ReactElement => {
  const [currentView, setCurrentView] = useState<
    "intro" | "game" | "instructions"
  >("intro");
  const bgColor = useColorModeValue("gray.900", "gray.800");
  const hoverBg = useColorModeValue("blue.700", "blue.900");

  const [boardSize, setBoardSize] = useState(3);
  const [clock, setClock] = useState(false);
  const [time, setTime] = useState(10);
  const [matchID, setMatchID] = useState(0);

  const [previousView, setPreviousView] = useState<
    "intro" | "game" | "instructions"
  >("intro");

  const navigateTo = (view: "intro" | "game" | "instructions") => {
    setPreviousView(currentView); // Before changing the view, save the current view as previousView
    setCurrentView(view);
  };

  const restartGame = () => {
    setMatchID((prev) => prev + 1); // Incrementing matchID to remount the Game component
  };

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
                onClick={() => navigateTo("game")}
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
                  onClick={restartGame}
                >
                  Restart
                </Button>
              </HStack>

              <Game key={matchID} size={boardSize} time={time} />
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
