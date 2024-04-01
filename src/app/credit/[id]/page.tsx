"use client";
import useCredit from "../../../hooks/useCredit";
import { useSearchParams } from "next/navigation";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

const TitleSection = ({
  title,
  information,
}: {
  title: string;
  information: string;
}) => (
  <div>
    <Text fontSize={20} fontWeight="bold">
      {title}
    </Text>
    <Text fontSize={18}>{information}</Text>
  </div>
);

export default function Page() {
  const { credit, isLoading } = useCredit();
  return (
    <div className="w-screen h-screen">
      <div className="grid md:grid-cols-6 gap-4">
        <div className="max-md:hidden" />
        <div className="col-span-6 md:col-span-4 my-10 mx-7 md:my-10 md:mx-5">
          {!isLoading && credit ? (
            <section className="flex rounded-xl flex-col overflow-hidden shadow-lg bg-white p-5">
              <div className="flex flex-row items-center">
                <Box
                  position="relative"
                  h={220}
                  w={220}
                  style={{ borderRadius: 110, overflow: "hidden" }}
                >
                  <Image
                    src={credit.selfie}
                    alt={`Selfie of ${credit.firstName}-${credit.lastName}`}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </Box>
                <div className="ml-4">
                  <Heading
                    mb={5}
                  >{`${credit?.firstName} ${credit?.lastName}`}</Heading>
                  <TitleSection title="Telefono:" information={credit.phone} />
                  <TitleSection title="Email:" information={credit.email} />
                  <TitleSection
                    title="Dirección"
                    information={`${credit.direction}, ${credit.municipio}, ${credit.department}`}
                  />
                </div>
              </div>
              <div className="w-full h-72 relative mt-5">
                <Image
                  src={credit.document}
                  alt={`Document of ${credit.firstName}-${credit.lastName}`}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  style={{ borderRadius: 10 }}
                />
              </div>
            </section>
          ) : null}
        </div>
        <div className="max-md:hidden" />
      </div>
    </div>
  );
}
