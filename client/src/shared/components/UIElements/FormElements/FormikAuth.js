import React, { useState, useContext } from 'react';
import {
  Button,
  VStack,
  Flex,
  Spacer,
  Heading,
  Divider,
  Box,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
// import { Link } from 'react-router-dom';
import {
  validatePassword,
  validateEmail,
  validateName,
} from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import { AuthContext } from '../../../context/auth-context';

const FormikAuth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Formik
      // initialValues={{ ...correctInitialValues }}
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
        auth.login();
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
              w="400px"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >
              <Heading align="center" size="lg">
                Welcome to t2d
              </Heading>

              {!isLoginMode && (
                <FormikInput
                  validation={validateName}
                  uniqueField="name"
                  label="Full Name"
                  placeholder="Name"
                />
              )}

              <FormikInput
                validation={validateEmail}
                uniqueField="email"
                label="Email ID"
                type="email"
                placeholder="E-Mail Address"
              />

              <FormikInput
                validation={validatePassword}
                uniqueField="password"
                label="Password"
                type="password"
                placeholder="Enter Your Password"
              />

              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {isLoginMode ? 'Sign In' : 'Sign Up'}
              </Button>
              <Box p="2">
                <Divider />
              </Box>
              <Button onClick={switchModeHandler}>
                Click Here To {isLoginMode ? 'Sign Up' : 'Sign In'}
              </Button>
            </VStack>
            <Spacer />
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default FormikAuth;
