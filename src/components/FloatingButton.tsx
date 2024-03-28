"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function FloatingButton() {
  return (
    <Box position="fixed" bottom="4" right="4" zIndex="1">
      <Link href="/create-credit">
        <Button
          colorScheme="teal"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          leftIcon={<AddIcon />}
        />
      </Link>
    </Box>
  );
}
