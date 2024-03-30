import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Text,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
import { Field, useField, useFormikContext } from "formik";

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

export default function TakePhoto() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string>("");
  const [field] = useField({ name: "selfie" });
  const { setFieldValue } = useFormikContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc as string);
  }, [webcamRef]);

  return (
    <FormControl gridColumn="span 2" isRequired>
      <FormLabel htmlFor="selfie">Selfie</FormLabel>
      <Field value={undefined} id={"selfie"} name={"selfie"} />
      <Button
        px={0}
        py={4}
        borderWidth="1px"
        borderRadius="md"
        h={190}
        width={"100%"}
        onClick={onOpen}
      >
        {field.value && !isOpen ? (
          <img
            src={image}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        ) : null}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selfie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {image === "" ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Box w={"100%"} h={"100%"} position="static">
                <img src={image} style={{ width: "100%", height: "100%" }} />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {image === "" ? (
              <Button
                w="100%"
                mt={4}
                colorScheme="teal"
                onClick={capture}
                leftIcon={
                  <Icon
                    viewBox="0 0 512 512"
                    style={{ width: 20, height: 20 }}
                    color="white"
                    mr={4}
                  >
                    <path
                      fill="currentColor"
                      d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z"
                    />
                  </Icon>
                }
              >
                <Text>Take photo</Text>
              </Button>
            ) : (
              <Box w={"100%"}>
                <HStack left={190} right={0} bottom={20}>
                  <Button
                    w={"100%"}
                    colorScheme="teal"
                    mx={0}
                    leftIcon={<CheckIcon />}
                    onClick={() => {
                      setFieldValue("selfie", image);
                      onClose();
                    }}
                  >
                    <Text>Accept</Text>
                  </Button>
                  <Button
                    w={"100%"}
                    colorScheme="red"
                    leftIcon={<RepeatIcon />}
                    onClick={() => setImage("")}
                  >
                    <Text>Retake</Text>
                  </Button>
                </HStack>
              </Box>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
}
