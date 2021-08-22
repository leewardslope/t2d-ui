import React from 'react';
import {
  RadioGroup,
  HStack,
  Radio,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
} from '@chakra-ui/react';
import { Field, ErrorMessage } from 'formik';

const FormikRadio = props => {
  const { uniqueField, radioValues, label, formHelper, defaultValue } = props;
  return (
    <Field name={uniqueField}>
      {({ field }) => (
        <FormControl>
          <FormLabel htmlFor={uniqueField}>{label}</FormLabel>
          {/* <Input
            {...field}
            id={uniqueField}
            type={type}
            placeholder={placeholder}
          /> */}
          <RadioGroup defaultValue={defaultValue}>
            <HStack spacing="24px">
              {radioValues.map(e => (
                <Radio {...field} id={uniqueField} key={e} value={e}>
                  {e}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>

          <FormHelperText>{formHelper}</FormHelperText>
          <Box color="red">
            <ErrorMessage name={uniqueField} />
          </Box>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikRadio;
