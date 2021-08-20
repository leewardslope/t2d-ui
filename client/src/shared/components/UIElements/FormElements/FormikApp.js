import React from 'react';
import { Button, VStack, Flex, Spacer } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';

const FormikApp = () => {
  return (
    <Formik
      initialValues={{ app: '', repo: '' }}
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
              p="2"
              boxShadow="md"
              // borderColor="gray.200"
              // borderWidth="2px"
              borderRadius="xl"
              // w="50%"
              w="400px"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >
              <FormikInput
                validation={validateRequire}
                uniqueField="app"
                label="App Name"
                placeholder="Name your App"
                formHelper=""
              />

              <FormikInput
                validation={validateRequire}
                uniqueField="repo"
                label="Github URL"
                placeholder="https://github.com/akhil-naidu/myapp"
                formHelper="You can also attach the official repo"
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

export default FormikApp;
