import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";

interface Options {
  label: string;
  value: string | number;
}

interface FormikSelectProps {
  name: string;
  label: string;
  error: string;
  isRequired?: boolean;
  options: Options[];
}

export default function FormikSelect({
  name,
  label,
  error,
  options,
  isRequired = false,
}: FormikSelectProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={error !== ""}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field as={Select} id={name} name={name} variant="filled">
        <option disabled>Selecione una opción</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
