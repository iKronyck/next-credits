"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function FloatingButton() {
  return (
    <Box position="fixed" bottom="4" right="4" zIndex="1">
      <Link href="/create-credit">
        <button className="bg-teal-400 h-14 w-14 rounded-full shadow-md text-white">
          <AddIcon />
        </button>
      </Link>
    </Box>
  );
}
