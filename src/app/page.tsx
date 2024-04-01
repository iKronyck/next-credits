"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import CreditList from "@/components/CreditList";
import FloatingButton from "@/components/FloatingButton";
import useCredits from "hooks/useCredits";

export default function Home() {
  const { credits, isLoading } = useCredits();
  return (
    <Flex height="100vh" width="100%" px={10} py={10} direction="column">
      <Box>
        <Text fontSize="4xl">Listado de creditos:</Text>
      </Box>
      {!isLoading ? <CreditList data={credits} /> : null}
      <FloatingButton />
    </Flex>
  );
}
