import React from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  Stack,
} from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';

const FormikInput = props => {
  const { validation, uniqueField, placeholder, label, formHelper, type } =
    props;
  return (
    <Field name={uniqueField} validate={validation}>
      {({ field }) => (
        <FormControl>
          <FormLabel fontSize="sm" color="blackAlpha.800" htmlFor={uniqueField}>{label}</FormLabel>
          <Input
            {...field}
            id={uniqueField}
            type={type}
            placeholder={placeholder}
            backgroundColor="blackAlpha.50"
          />
          <Stack>
            <Box color="red.500" fontSize="xs">
              <ErrorMessage name={uniqueField} />
            </Box>
            <FormHelperText>{formHelper}</FormHelperText>
          </Stack>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikInput;
