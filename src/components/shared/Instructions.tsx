import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Fade,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const Instructions = React.memo(({ goBack }: { goBack: () => void }) => {
  return (
    <Fade in>
      <VStack spacing={5} align="start" width="80%">
        <Heading as="h2" size="2xl">
          Instructions
        </Heading>

        <Heading as="h3" size="lg" mb={2}>
          Ultimate Tic Tac Toe:
        </Heading>
        <List spacing={2} mb={4}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Ultimate Tic Tac Toe is a 3x3 grid of standard 3x3 Tic Tac Toe
            boards.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            The player makes a move in any of the small boards.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            The next move by the opponent must be made in the board
            corresponding to the cell of the previous move.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            If a small board is won or is a draw, the next player can play
            anywhere.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            The game is won when a player wins three small boards in a row,
            column, or diagonal.
          </ListItem>
        </List>

        <Heading as="h3" size="lg" mb={2}>
          Crazy Mode:
        </Heading>
        <Text fontSize="md" mb={4}>
          This is Ultimate Tic Tac Toe with a twist! Both players get a button
          called "shuffle" that allows them to rearrange the 9 main squares in a
          random order. This shuffle can only be used once by each player during
          the game.
        </Text>

        <Heading as="h3" size="lg" mb={2}>
          Battle Squares Mode:
        </Heading>
        <Text fontSize="md" mb={4}>
          Similar to the standard game, but one square is highlighted in light
          purple. The first player to win this square earns a "shuffle" button,
          allowing them to rearrange the 9 main squares in a random order. This
          power can only be used once.
        </Text>

        <Box alignSelf="center">
          <Button colorScheme="teal" onClick={goBack}>
            Back
          </Button>
        </Box>
      </VStack>
    </Fade>
  );
});

export default Instructions;
