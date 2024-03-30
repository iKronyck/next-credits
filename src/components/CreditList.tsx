"use client";
import { SimpleGrid } from "@chakra-ui/react";
import CreditCard from "./CreditCard";
import { TCredit } from "types";

interface CreditListProps {
  data: TCredit[];
}

export default function CreditList({ data }: CreditListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
      {data.map((credit) => (
        <CreditCard key={credit._id} credit={credit} />
      ))}
    </SimpleGrid>
  );
}
