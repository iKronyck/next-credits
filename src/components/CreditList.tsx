"use client";
import { SimpleGrid } from "@chakra-ui/react";
import CreditCard from "./CreditCard";
import { TCredit } from "types";

interface CreditListProps {
  data: TCredit[];
}

export default function CreditList({ data }: CreditListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
      {data.map((credit) => (
        <CreditCard key={credit._id} credit={credit} />
      ))}
    </div>
  );
}
