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
  Box,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { AuthContext } from '../../../context/auth-context';
import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import FormikENV from './FormikENV';
import { BASE_URL } from '../../../../BASE_URL';

// import FormikRadio from './components/FormikRadio';
// import FormikSelect from './components/FormikSelect';

const FormikAppUpdate = () => {
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

  const [envVariabeForm, setEnvVariableForm] = useState({
    env: [
      {
        var: 'COMMUNITY_NAME',
        val: '',
      },
      {
        var: 'DOMAIN_NAME',
        val: '',
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `${BASE_URL}/api/apps/${appId}`
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
      <Formik
        enableReinitialize
        initialValues={{ ...appData }}
        onSubmit={(values, actions) => {
          const sendData = async () => {
            try {
              await axios.patch(
                `${BASE_URL}/api/apps/${appId}`,
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
            <Heading my="8" align="center" size="lg">
              Edit {appData.title}
            </Heading>
            <Flex>
              <VStack
                paddingY="10"
                paddingX="14"
                mx="8"
                backgroundColor="white"
                boxShadow="md"
                // borderColor="gray.200"
                // borderWidth="2px"
                borderRadius="xl"
                spacing="8"
                // w="50%"
                w="600px"
                // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
                alignItems="stretch"
              >


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
                  label="Domain Name"
                  placeholder={appData.repo}
                  formHelper="Place Holder contains your previous value"
                />

                <Button
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Link to={redirectTo}>
                  <Button width="100%"
                    type="button"
                    variant="outline">Cancel</Button>
                </Link>

              </VStack>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>
      <Box>
        <FormikENV envVariabeForm={envVariabeForm} setEnvVariableForm={setEnvVariableForm} />
      </Box>
    </SimpleGrid>
  );
};

export default FormikAppUpdate;
