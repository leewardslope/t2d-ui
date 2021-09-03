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
import FormikInput from './components/FormikInput';
// import FormikRadio from './components/FormikRadio';
import FormikSelect from './components/FormikSelect';
import { BASE_URL } from '../../../../BASE_URL';
import FormikTextArea from './components/FormikTextArea';

const FormikApp = ({ setActiveStep, appSetupForm, setAppSetupForm, ...props }) => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const history = useHistory();
  const redirectTo = `/${auth.userId}/apps`;

  return (
    <Formik
      initialValues={appSetupForm}
      onSubmit={(values, actions) => {
        const sendData = async () => {
          try {
            setAppSetupForm(values)
            setActiveStep(2)
            // await axios.post(`${BASE_URL}/api/apps`, values, {
            //   headers: { Authorization: `Bearer ${auth.token}` },
            // });
            // toast({
            //   title: `New App Created`,
            //   status: 'success',
            //   position: 'top',
            //   isClosable: true,
            // });

            // history.push(redirectTo);
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
          <Heading marginTop='8' align="center" size="lg">
            New App
          </Heading>
          <Flex>
            <Spacer />
            <VStack
              backgroundColor="white"
              paddingX="14"
              paddingY="10"
              m="8"
              boxShadow="md"
              spacing="8"
              // borderColor="gray.200"
              // borderWidth="2px"
              borderRadius="xl"
              // w="50%"
              w="600px"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >


              <FormikInput
                validation={validateRequire}
                uniqueField="title"
                label="App Name"
                placeholder="Name your App"
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

              <FormikSelect
                validation={validateRequire}
                uniqueField="app"
                label="Choose an App"
                placeholder="Choose an App"
                options={['Forem', 'Wordpress']}
                formHelper="Choose an App to install on your server"
              />
              <FormikInput
                // validation={validateRequire}
                uniqueField="url"
                label="Domain Name"
                placeholder="https://app.example.com"
                formHelper="If not provided, we will create a subdomain for you"
              />

              <FormikTextArea
                validation={validateRequire}
                uniqueField="description"
                label="Description"
                placeholder="Let's Rock and Roll"
                formHelper=""
              />

              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                color="teal"
                onClick={() => setActiveStep(0)}
              >
                Back
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
