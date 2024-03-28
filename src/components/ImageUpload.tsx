/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Field, useField, useFormikContext } from "formik";

export default function ImageUpload() {
  const [files, setFiles] = useState<any[]>([]);
  const [field] = useField({ name: "document" });
  const { setFieldValue } = useFormikContext();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue("document", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <FormControl gridColumn="span 2" isRequired>
      <FormLabel htmlFor="document">Documento</FormLabel>
      <HStack>
        <Flex
          {...getRootProps({ className: "dropzone" })}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          h={90}
          width={"100%"}
        >
          <Field
            value={undefined}
            id={"document"}
            name={"document"}
            {...getInputProps()}
          />
          <Center h={"100%"} w={"100%"}>
            <Text>{"Arrastre y suelte una imagen aquí"}</Text>
          </Center>
        </Flex>
        {files.length > 0 ? (
          <Box
            maxH={90}
            h={90}
            maxW={90}
            w={90}
            width={"100%"}
            borderWidth="1px"
            borderRadius="md"
          >
            <img
              src={files[0].preview}
              alt={`Preview of ${files[0].name}`}
              onLoad={() => {
                URL.revokeObjectURL(files[0].preview);
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        ) : null}
      </HStack>
    </FormControl>
  );
}
