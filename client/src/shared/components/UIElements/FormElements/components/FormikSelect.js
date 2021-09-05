import React from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  Select,
} from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';

const FormikSelect = props => {
  const { validation, uniqueField, placeholder, label, formHelper, options } =
    props;
  return (
    <Field name={uniqueField} validate={validation}>
      {({ field }) => (
        <FormControl>
          <FormLabel fontSize="sm" color="blackAlpha.800" htmlFor={uniqueField}>{label}</FormLabel>

          <Select backgroundColor="blackAlpha.50" {...field} id={uniqueField} placeholder={placeholder}>
            {options.map(e => (
              <option key={e}>{e}</option>
            ))}
          </Select>

          <FormHelperText>{formHelper}</FormHelperText>
          <Box color="red.500" fontSize="xs">
            <ErrorMessage name={uniqueField} />
          </Box>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikSelect;
