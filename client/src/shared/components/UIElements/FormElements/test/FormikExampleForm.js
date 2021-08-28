import React from 'react';
import { Button, VStack, Flex, Spacer } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { validateName, validateEmail } from '../components/FormikValidations';
import FormikInput from '../components/FormikInput';

const FormikExampleForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Flex>
            <Spacer />
            <VStack
              p="4"
              m="8"
              boxShadow="md"
              // borderColor="gray.200"
              // borderWidth="2px"
              borderRadius="xl"
              // w="50%"
              w="500px"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >
              <FormikInput
                validation={validateName}
                uniqueField="name"
                label="Full Name"
                placeholder="Name"
              />

              <FormikInput
                validation={validateEmail}
                uniqueField="email"
                label="Email ID"
                placeholder="E-Mail Address"
              />

              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </VStack>
            <Spacer />
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default FormikExampleForm;
