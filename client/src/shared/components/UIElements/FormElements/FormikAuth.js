import React, { useState, useContext } from 'react';
import {
  Button,
  VStack,
  Flex,
  Spacer,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import {
  validatePassword,
  validateEmail,
  validateName,
  validateConfirmPassword,
} from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import { AuthContext } from '../../../context/auth-context';

const FormikAuth = () => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={(values, actions) => {
        const sendDetails = async () => {
          if (isLoginMode) {
            try {
              const { confirmPassword, ...newValues } = values;
              const receivedDetails = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/login`,
                newValues
              );

              // { headers: { Authorization: `Bearer ${auth.token}` } }
              // For login and signup this will be generated.

              actions.setSubmitting(false);
              actions.resetForm();
              toast({
                title: `Logged In`,
                status: 'success',
                position: 'top',
                isClosable: true,
              });
              // console.log(receivedDetails.data.user);
              auth.login(
                receivedDetails.data.userId,
                receivedDetails.data.token
              );
              // auth.login(receivedDetails.response.data.user.id);
              // auth.login(receivedDetails.data.user.id);
            } catch (error) {
              // console.log(error);
              actions.setSubmitting(false);
              toast({
                title: `${error.response.data.message}`,
                status: 'error',
                position: 'top',
                isClosable: true,
              });
            }
            // actions.resetForm();
          } else {
            try {
              const receivedDetails = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/users/signup`,
                values
              );

              actions.setSubmitting(false);
              toast({
                title: `Account Created, you can SignIn now`,
                status: 'success',
                position: 'top',
                isClosable: true,
              });
              actions.resetForm();
              auth.login(
                receivedDetails.data.userId,
                receivedDetails.data.token
              );
            } catch (error) {
              actions.setSubmitting(false);
              actions.resetForm();
              toast({
                title: `${error.response.data.message}`,
                status: 'error',
                position: 'top',
                isClosable: true,
              });
            }
          }
        };
        sendDetails();
      }}
    >
      {props => (
        <Form>
          <Heading my="8" align="center" size="lg">
            Welcome to t2d
          </Heading>
          <Flex>
            <Spacer />
            <VStack
              px="8"
              py="12"
              boxShadow="md"
              backgroundColor="white"
              // borderColor="gray.200"
              // borderWidth="2px"
              borderRadius="xl"
              // w="50%"
              spacing="4"
              w="500px"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >

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
              {!isLoginMode && (
                <FormikInput
                  validation={(value) => validateConfirmPassword(value, props.values.password)}
                  uniqueField="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter Your Password"
                />
              )}
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {isLoginMode ? 'Sign In' : 'Sign Up'}
              </Button>
              <Button color="teal" variant="outline" onClick={switchModeHandler}>
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
