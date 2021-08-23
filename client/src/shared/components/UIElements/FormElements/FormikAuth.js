import React, { useState, useContext } from 'react';
import {
  Button,
  VStack,
  Flex,
  Spacer,
  Heading,
  Divider,
  Box,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import {
  validatePassword,
  validateEmail,
  validateName,
} from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import { AuthContext } from '../../../context/auth-context';

const FormikAuth = () => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [giveInitialValues, setGiveInitialValues] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  // });

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Formik
      // initialValues={giveInitialValues}
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        const sendDetails = async () => {
          if (isLoginMode) {
            try {
              const receivedDetails = await axios.post(
                'http://75.119.143.54:5000/api/users/login',
                values
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
                'http://75.119.143.54:5000/api/users/signup',
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
