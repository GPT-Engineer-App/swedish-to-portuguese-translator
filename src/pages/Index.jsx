import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const toast = useToast();

  const handleTranslation = async () => {
    if (inputText.trim() === "") {
      toast({
        title: "Please enter a word",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=sv|pt`);
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Swedish to Portuguese Translator
        </Heading>
        <Input placeholder="Enter a Swedish word" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <Button colorScheme="blue" onClick={handleTranslation}>
          Translate
        </Button>
        {translation && (
          <Text fontSize="xl" textAlign="center">
            Translation: {translation}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
