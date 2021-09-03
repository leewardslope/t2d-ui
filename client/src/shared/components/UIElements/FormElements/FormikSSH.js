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
import { BASE_URL } from '../../../../BASE_URL';

const FormikSSH = ({ setActiveStep, setAppSSHForm, appSSHForm, ...props }) => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const history = useHistory();
  // const redirectTo = `/${auth.userId}/apps`;
  const redirectTo = `/app/new`;

  return (
    <Formik
      initialValues={appSSHForm}
      onSubmit={(values, actions) => {
        const sendData = async () => {
          try {
            setAppSSHForm(values)
            setActiveStep(1)
            // await axios.post(`${BASE_URL}/api/ssh/new`, values, {
            //   headers: { Authorization: `Bearer ${auth.token}` },
            // });
            // toast({
            //   title: `New SSH Key connected`,
            //   status: 'success',
            //   position: 'top',
            //   isClosable: true,
            // });

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
          <Heading align="center" mt="8" size="lg">
            Add SSH Key
          </Heading>
          <Flex>
            <Spacer />
            <VStack
              m="8"
              boxShadow="md"
              borderRadius="xl"
              backgroundColor="white"
              paddingX="14"
              paddingY="10"
              w="600px"
              spacing="8"
              alignItems="stretch"
            >


              <FormikInput
                validation={validateRequire}
                uniqueField="username"
                label="Server Host Name"
                placeholder="ubuntu"
                formHelper="Comparison ref => ssh ubuntu@176.52.63.112"
              />

              <FormikInput
                validation={validateRequire}
                uniqueField="host"
                label="IP Address of Your Server"
                placeholder="176.52.63.112"
                formHelper="Comparison ref => ssh ubuntu@176.52.63.112"
              />

              <FormikInput
                validation={validateRequire}
                uniqueField="sshName"
                label="SSH Key Name"
                placeholder="Name your SSH Key"
                formHelper="Any Name, this will be useful when managing multiple keys"
              />

              <FormikTextArea
                validation={validateRequire}
                uniqueField="identity"
                label="SSH Key"
                placeholder="Paste your SSH Private Key"
                formHelper="To find your Key => cat .ssh/id_rsa"
              />

              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Next
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
