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
  Divider,
  Spacer,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  RepeatIcon,
  StarIcon,
  WarningIcon,
} from "@chakra-ui/icons";

const Instructions = React.memo(({ goBack }: { goBack: () => void }) => {
  return (
    <Fade in>
      <VStack spacing={6} align="start" p={5}>
        <Heading as="h2" size="2xl" textAlign="center">
          Gameplay Guide
        </Heading>
        <Divider borderColor="gray.300" />

        <Stack direction="row" align="center" spacing={3}>
          <Icon as={StarIcon} boxSize="8" color="blue.500" />
          <Heading as="h3" size="lg">
            Ultimate Tic Tac Toe
          </Heading>
        </Stack>
        <List spacing={2} pl={5}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Comprised of 9 Tic Tac Toe boards arranged in a 3x3 grid.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Each move you make dictates where your opponent can play next.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Aim to win the smaller boards, and consequently, control the larger
            board.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Keep in mind the strategic significance of every move. Sometimes,
            sacrificing a small board win can give an advantage on the main
            board.
          </ListItem>
        </List>

        <Spacer height="20px" />

        <Stack direction="row" align="center" spacing={3}>
          <Icon as={RepeatIcon} boxSize="8" color="teal.500" />
          <Heading as="h3" size="lg">
            Crazy Mode
          </Heading>
        </Stack>
        <Text fontSize="md" pl={5} fontWeight="medium">
          Enhance your strategy in Ultimate Tic Tac Toe! Each player receives a
          "shuffle" power. Pressing this button will rearrange the main 9
          squares randomly. But beware! This can only be done once per game.
        </Text>

        <Spacer height="20px" />

        <Stack direction="row" align="center" spacing={3}>
          <Icon as={WarningIcon} boxSize="8" color="yellow.500" />
          <Heading as="h3" size="lg">
            Battle Squares Mode
          </Heading>
        </Stack>
        <Text fontSize="md" pl={5} fontWeight="medium">
          It's a race to power! A square will be highlighted in light purple.
          The player who secures this square first is awarded the "shuffle"
          power. With this, you can rearrange the main 9 squares in any random
          sequence. This power is a one-time opportunity, so use it wisely.
        </Text>

        <Spacer height="20px" />

        <Box alignSelf="center" mt={5}>
          <Button colorScheme="teal" onClick={goBack}>
            Return
          </Button>
        </Box>
      </VStack>
    </Fade>
  );
});

export default Instructions;
