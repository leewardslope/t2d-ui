import React, { useContext } from 'react';
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
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';
import { validateRequire } from './components/FormikValidations';
import FormikTextArea from './components/FormikTextArea';
import FormikInput from './components/FormikInput';

const FormikSSH = () => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const history = useHistory();
  const redirectTo = `/${auth.userId}/apps`;

  return (
    <Formik
      initialValues={{
        app: '',
        repo: '',
        title: '',
        description: '',
      }}
      onSubmit={(values, actions) => {
        const sendData = async () => {
          try {
            await axios.post('http://75.119.143.54:5000/api/ssh/new', values, {
              headers: { Authorization: `Bearer ${auth.token}` },
            });
            toast({
              title: `New App Created`,
              status: 'success',
              position: 'top',
              isClosable: true,
            });

            history.push(redirectTo);
            // Redirect the user to different page
          } catch (error) {
            toast({
              title: `${error.response.data.message}`,
              status: 'error',
              position: 'top',
              isClosable: true,
            });
          } finally {
            actions.resetForm();
            actions.setSubmitting(false);
          }
        };
        sendData();
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
                Add SSH Key
              </Heading>

              <FormikInput
                validation={validateRequire}
                uniqueField="sshName"
                label="SSH Key Name"
                placeholder="Name your SSH Key"
                formHelper=""
              />

              {/* <Field type="radio" name="picked" value="One" />
              <Field type="radio" name="picked" value="Two" /> */}

              {/* <FormikRadio
                uniqueField="app"
                label="Choose an App"
                radioValues={['Forem', 'Wordpress']}
                defaultValue="Forem"
                formHelper="Choose an App to install in your server"
              /> */}

              <FormikTextArea
                validation={validateRequire}
                uniqueField="sshKey"
                label="SSH Key"
                placeholder="Paste your SSH Private Key"
                formHelper="This key will be encrypted and you can remove it at any time"
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

export default FormikSSH;
