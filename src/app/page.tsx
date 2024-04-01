import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { getCredits } from "@/actions/credit";
import CreditList from "@/components/CreditList";
import FloatingButton from "@/components/FloatingButton";

export default async function Home() {
  const credits = await getCredits();
  return (
    <Flex height="100vh" width="100%" px={10} py={10} direction="column">
      <Box>
        <Text fontSize="4xl">Listado de creditos:</Text>
      </Box>
      <CreditList data={credits} />
      <FloatingButton />
    </Flex>
  );
}
