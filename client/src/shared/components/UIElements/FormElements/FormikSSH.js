import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  VStack,
  Flex,
  Spacer,
  Heading,
  useToast,
  useBreakpointValue,
  SimpleGrid
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
  const buttonSize = useBreakpointValue(['100%', '80%', '50%', '30%'])


  const history = useHistory();
  // const redirectTo = `/${auth.userId}/apps`;
  const redirectTo = `/app/new`;

  const [appData, setAppData] = useState({
    host: '',
    username: '',
    sshName: '',
    identity: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/ssh`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setAppData(loadedData.data);
      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    getData();
  }, [toast]);


  return (
    <Formik
      enableReinitialize
      initialValues={{ ...appData }}
      onSubmit={(values, actions) => {
        const sendData = async () => {
          try {
            await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/ssh/new`,
              values,
              {
                headers: { Authorization: `Bearer ${auth.token}` },
              }
            );
            toast({
              title: `New SSH Key connected`,
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
              marginY="3"
              maxWidth="1100px"
              w="100%"
              marginX="auto"
              spacing="5"
            >
              <Heading marginY="5" size="lg">
                Add SSH Key
              </Heading>
              <SimpleGrid mt="8" columns={[1, 1, 1, 2]} spacing="4" width="full">
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
              </SimpleGrid>

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
                uniqueField="identity"
                label="SSH Key"
                placeholder="Paste your SSH Private Key"
                formHelper="To find your Key => cat .ssh/id_rsa"
              />

              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                width={buttonSize}
                mt="8"
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
