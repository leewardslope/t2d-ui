import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  VStack,
  Flex,
  Heading,
  useToast,
  SimpleGrid,
  Box,
  useBreakpointValue
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { AuthContext } from '../../../context/auth-context';
import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import FormikENV from './FormikENV';

// import FormikRadio from './components/FormikRadio';
// import FormikSelect from './components/FormikSelect';

const FormikAppUpdate = () => {
  // Getting the userId from the react routes: <Route path="/apps/:appsId" exact> from App.js
  const appId = useParams().appsId;
  const buttonSize = useBreakpointValue(['100%', '80%', '50%', '30%'])


  const toast = useToast();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const redirectTo = `/${auth.userId}/apps`;
  const [appData, setAppData] = useState({
    app: '',
    repo: '',
    domain: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/apps/${appId}`
        );

        setAppData(loadedData.data.apps);
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
  }, [toast, appId]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ ...appData }}
        onSubmit={(values, actions) => {
          const sendData = async () => {
            try {
              await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/api/apps/${appId}`,
                {
                  ...values,
                  creator: auth.userId,
                },
                { headers: { Authorization: `Bearer ${auth.token}` } }
              );

              actions.setSubmitting(false);
              // await actions.resetForm();

              // alert(JSON.stringify({ ...values }, null, 2));
              toast({
                title: `Updated Successfully`,
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
            }
          };
          sendData();
        }}
      >
        {props => (
          <Form>
            <Flex>
              <VStack
                marginY="3"
                maxWidth="1100px"
                w="100%"
                marginX="auto"
                spacing="6"
              >
                <Heading marginY="5"  size="lg">
                  Editing {appData.title}
                </Heading>
                <SimpleGrid mt="8" columns={[1, 1, 1, 2]} spacing="4" width="full">
                  <FormikInput
                    validation={validateRequire}
                    uniqueField="title"
                    label="App Name"
                    placeholder={appData.title}
                    formHelper="Place Holder contains your previous value"
                  />

                  <FormikInput
                    validation={validateRequire}
                    uniqueField="description"
                    label="Description"
                    placeholder={appData.description}
                    formHelper="Place Holder contains your previous value"
                  />

                  <FormikInput
                    validation={validateRequire}
                    uniqueField="domain"
                    label="Domain Name"
                    placeholder={appData.domain}
                    formHelper="Place Holder contains your previous value"
                  />

                  <FormikInput
                    // validation={validateRequire}
                    uniqueField="repo"
                    label="Github URL"
                    placeholder={appData.repo}
                    formHelper="Place Holder contains your previous value"
                  />
                </SimpleGrid>
                <Button
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width={buttonSize}
                  mt='8'

                >
                  Submit
                </Button>

              </VStack>
            </Flex>
          </Form>
        )}
      </Formik>
      <Box>
        <FormikENV />
      </Box>
    </>
  );
};

export default FormikAppUpdate;
