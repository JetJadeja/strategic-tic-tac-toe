import React from "react";
import { Button, Heading, Text, VStack, Fade } from "@chakra-ui/react";

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

export default Instructions;
