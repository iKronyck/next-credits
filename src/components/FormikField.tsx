import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface FormikFieldProps {
  name: string;
  label: string;
  error: string;
  isRequired?: boolean;
  type?: HTMLInputTypeAttribute;
}

export default function FormikField({
  name,
  label,
  error,
  type = "text",
  isRequired = false,
}: FormikFieldProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={error !== ""}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field as={Input} id={name} name={name} type={type} variant="filled" />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
