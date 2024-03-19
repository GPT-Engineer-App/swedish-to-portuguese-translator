import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, useToast, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [exampleSentences, setExampleSentences] = useState([]);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

    try {
      const translationResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=sv|pt`);
      const translationData = await translationResponse.json();
      setTranslation(translationData.responseData.translatedText);

      const examplesResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(translationData.responseData.translatedText)}&langpair=pt|pt&of=json&mt=1`);
      const examplesData = await examplesResponse.json();
      setExampleSentences(examplesData.matches.slice(0, 5).map((match) => match.segment));
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
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
        {loading ? (
          <Spinner />
        ) : (
          <>
            {translation && (
              <Text fontSize="xl" textAlign="center">
                Translation: {translation}
              </Text>
            )}
            {exampleSentences.length > 0 && (
              <VStack spacing={2} align="start">
                <Text fontSize="lg" fontWeight="bold">
                  Example Sentences:
                </Text>
                {exampleSentences.map((sentence, index) => (
                  <Text key={index}>{sentence}</Text>
                ))}
              </VStack>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
