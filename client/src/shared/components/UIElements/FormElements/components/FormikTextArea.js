import React from 'react';
import {
  Textarea,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
} from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';

const FormikTextArea = props => {
  const { validation, uniqueField, placeholder, label, formHelper, type } =
    props;
  return (
    <Field name={uniqueField} validate={validation}>
      {({ field }) => (
        <FormControl>
          <FormLabel htmlFor={uniqueField}>{label}</FormLabel>
          <Textarea
            {...field}
            id={uniqueField}
            type={type}
            placeholder={placeholder}
          />
          <FormHelperText>{formHelper}</FormHelperText>
          <Box color="red">
            <ErrorMessage name={uniqueField} />
          </Box>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikTextArea;
