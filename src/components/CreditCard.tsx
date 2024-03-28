import { PhoneIcon, EmailIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { TCredit } from "../types";

interface CreditProps {
  credit: TCredit;
}

export default function CreditCard({ credit }: CreditProps) {
  return (
    <Link href={`/credit/${credit._id}`}>
      <Card key={credit._id}>
        <CardHeader>
          <Heading size="md">{`${credit.firstName} ${credit.lastName}`}</Heading>
        </CardHeader>
        <CardBody>
          <Box display="flex" alignItems="baseline" alignContent="center">
            <EmailIcon />
            <Text ml={2}>{credit.email}</Text>
          </Box>
          <Box display="flex" alignItems="baseline" alignContent="center">
            <PhoneIcon />
            <Text ml={2}>{credit.phone}</Text>
          </Box>
          <Box display="flex" alignItems="baseline" alignContent="center">
            <WarningIcon />
            <Text
              ml={2}
            >{`${credit.direction}, ${credit.municipio}, ${credit.department}`}</Text>
          </Box>
        </CardBody>
      </Card>
    </Link>
  );
}
