import React, { useContext } from 'react';
import {
  Button,
  VStack,
  Flex,
  Heading,
  useToast,
  SimpleGrid,
  useBreakpointValue,

} from '@chakra-ui/react';
// import {useBreakpointValue} from '@chara'
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';
import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';
// import FormikRadio from './components/FormikRadio';
import FormikSelect from './components/FormikSelect';
import FormikTextArea from './components/FormikTextArea';
import FormikAppUpdate from './FormikENV';

const FormikApp = () => {
  const toast = useToast();
  const auth = useContext(AuthContext);

  const history = useHistory();
  const redirectTo = `/${auth.userId}/apps`;
  const buttonSize = useBreakpointValue(['100%', '80%', '50%', '30%'])

  return (
    <>
      <Formik
        initialValues={{
          app: '',
          repo: '',
          title: '',
          domain: '',
          description: '',
        }}
        onSubmit={(values, actions) => {
          const sendData = async () => {
            try {
              await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/apps`,
                values,
                {
                  headers: { Authorization: `Bearer ${auth.token}` },
                }
              );
              toast({
                title: `New App Created`,
                status: 'success',
                position: 'top',
                isClosable: true,
              });

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
              <VStack
                marginY="3"
                maxWidth="1100px"
                w="100%"
                marginX="auto"
                spacing="6"
              // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              >
                <Heading marginY="5" size="lg">
                  Create New App
                </Heading>
                <SimpleGrid mt="8" columns={[1, 1, 1, 2]} spacing="4" width="full">
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
                  />
                  <FormikInput
                    validation={validateRequire}
                    uniqueField="domain"
                    label="Domain Name"
                    placeholder="https://app.example.com"
                    formHelper="If not provided, we will create a subdomain for you"
                  />
                  <FormikInput
                    // validation={validateRequire}
                    uniqueField="repo"
                    label="Github Repo"
                    placeholder="https://github.com/username/projectname"
                    formHelper="If not provided, we will default it to official repo"
                  />
                </SimpleGrid>

                <FormikTextArea
                  validation={validateRequire}
                  uniqueField="description"
                  label="Description"

                  formHelper=""
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
            </Flex>
          </Form>
        )}
      </Formik>
      <FormikAppUpdate />
    </>);
};

export default FormikApp;
