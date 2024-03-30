import { Box, Card, CardHeader, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TCredit } from "../types";
import Image from "next/image";

interface CreditProps {
  credit: TCredit;
}

export default function CreditCard({ credit }: CreditProps) {
  return (
    <Link key={credit._id} href={`/credit/${credit._id}`}>
      <Card maxW="sm">
        <CardHeader>
          <HStack>
            <Box
              position="relative"
              h={120}
              w={120}
              style={{ borderRadius: 60, overflow: "hidden" }}
            >
              <Image
                src={credit.selfie}
                alt={`Document of ${credit.firstName}-${credit.lastName}`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </Box>
            <Box px="5" flex={1}>
              <Text
                fontSize={20}
                fontWeight="bold"
              >{`${credit.firstName} ${credit.lastName}`}</Text>
              <Text
                fontSize={15}
              >{`${credit.direction}, ${credit.municipio}, ${credit.department}`}</Text>
            </Box>
          </HStack>
        </CardHeader>
      </Card>
    </Link>
  );
}
