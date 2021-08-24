import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  Button,
  VStack,
  HStack,
  Flex,
  Spacer,
  Heading,
  useToast,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { AuthContext } from '../../shared/context/auth-context';

import { validateRequire } from '../../shared/components/UIElements/FormElements/components/FormikValidations';
import FormikInput from '../../shared/components/UIElements/FormElements/components/FormikInput';

// import FormikSelect from '../../shared/components/UIElements/FormElements/components/FormikSelect';

const UpdateApp = () => {
  // Getting the userId from the react routes: <Route path="/apps/:appsId" exact> from App.js
  const appId = useParams().appsId;

  const toast = useToast();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const redirectTo = `/${auth.userId}/apps`;
  const [appData, setAppData] = useState({
    app: '',
    repo: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `http://75.119.143.54:5000/api/apps/${appId}`
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
    <SimpleGrid columns={[1, 1, 2, 2]} spacing="0px">
      <Spacer />
      <Formik
        enableReinitialize
        initialValues={{ ...appData }}
        onSubmit={(values, actions) => {
          const sendData = async () => {
            try {
              await axios.patch(
                `http://75.119.143.54:5000/api/apps/${appId}`,
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
                  Editing App
                </Heading>

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
                  // validation={validateRequire}
                  uniqueField="repo"
                  label="Github URL"
                  placeholder={appData.repo}
                  formHelper="Place Holder contains your previous value"
                />
                <Divider />
                <HStack>
                  <Spacer />

                  <Link to={redirectTo}>
                    <Button>Cancel</Button>
                  </Link>
                  <Spacer />
                  <Button
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Spacer />
                </HStack>
              </VStack>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>

      <Formik
        enableReinitialize
        initialValues={{ ...appData }}
        onSubmit={(values, actions) => {
          const sendData = async () => {
            try {
              await axios.patch(
                `http://75.119.143.54:5000/api/apps/${appId}`,
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
                  Editing App
                </Heading>

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
                  // validation={validateRequire}
                  uniqueField="repo"
                  label="Github URL"
                  placeholder={appData.repo}
                  formHelper="Place Holder contains your previous value"
                />
                <Divider />
                <HStack>
                  <Spacer />

                  <Link to={redirectTo}>
                    <Button>Cancel</Button>
                  </Link>
                  <Spacer />
                  <Button
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Spacer />
                </HStack>
              </VStack>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>
      <Spacer />
    </SimpleGrid>
  );
};

export default UpdateApp;
