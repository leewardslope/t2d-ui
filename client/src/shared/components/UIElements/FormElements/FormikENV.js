import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, VStack, HStack, Heading, useToast, useBreakpointValue } from '@chakra-ui/react';
import { Formik, Form, FieldArray } from 'formik';

// import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import { AuthContext } from '../../../context/auth-context';
// import FormikRadio from './components/FormikRadio';
// import FormikSelect from './components/FormikSelect';

const FormikAppUpdate = () => {
  // Getting the userId from the react routes: <Route path="/apps/:appsId" exact> from App.js
  const appId = useParams().appsId;

  const buttonSize = useBreakpointValue(['100%', '80%', '50%', '30%'])


  const toast = useToast();
  const auth = useContext(AuthContext);
  // const history = useHistory();
  // const redirectTo = `/${auth.userId}/apps`;
  const [envData, setEnvData] = useState({
    env: [
      {
        var: 'COMMUNITY_NAME',
        val: '',
      },
      {
        var: 'APP_DOMAIN',
        val: '',
      },
      {
        var: 'DOKKU_LETSENCRYPT_EMAIL',
        val: '',
      },
      {
        var: 'DEFAULT_EMAIL',
        val: '',
      },
      {
        var: 'FOREM_OWNER_SECRET',
        val: '',
      },
      {
        var: 'SECRET_KEY_BASE',
        val: '',
      },
      {
        var: 'AWS_ID',
        val: '',
      },
      {
        var: 'AWS_SECRET',
        val: '',
      },
      {
        var: 'AWS_BUCKET_NAME',
        val: '',
      },
      {
        var: 'AWS_UPLOAD_REGION',
        val: '',
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/env/${appId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );

        if (loadedData.data.message) {
          toast({
            title: `${loadedData.data.message}`,
            status: 'info',
            position: 'top',
            isClosable: true,
          });
          // setEnvData(loadedData.data.env);
        } else {
          const all = loadedData.data.env;

          const newEnv = [];
          for (var i = 0; i < all.var.length; i++) {
            newEnv.push({
              var: all.var[i],
              val: all.val[i],
            });
          }
          setEnvData({ env: newEnv });
        }
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
  }, [toast, appId, auth]);

  return (
    <VStack
      marginY="3"
      maxWidth="1100px"
      w="100%"
      marginX="auto"
      spacing="6"
    >
      <Heading marginY="5" size="lg">
        Environment Variables
      </Heading>

      <Formik
        enableReinitialize
        initialValues={envData}
        onSubmit={async values => {
          // await new Promise(r => setTimeout(r, 500));
          // console.log(values);
          try {
            const errorToast = () => {
              toast({
                title: `"ENV_VALUE" fields can't be empty`,
                status: 'error',
                position: 'top',
                isClosable: true,
              });
            };

            const saveData = async values => {
              try {
                const status = await axios.post(
                  `${process.env.REACT_APP_BASE_URL}/api/env/${appId}`,
                  values,
                  { headers: { Authorization: `Bearer ${auth.token}` } }
                );

                toast({
                  title: `${status.data.message}`,
                  status: 'success',
                  position: 'top',
                  isClosable: true,
                });
              } catch (error) {
                toast({
                  title: `${error.response.data.message}`,
                  status: 'error',
                  position: 'top',
                  isClosable: true,
                });
              }
            };

            const notFilled = await values.env.filter((e, index) => !e.val);

            notFilled.length ? errorToast() : saveData(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form style={{ width: "100%" }}>
            <FieldArray name="env">
              {({ insert, remove, push }) => (
                <VStack spacing="6" w="100%">
                  {values.env.length > 0 &&
                    values.env.map((env, index) => (
                      <HStack width="100%" key={index}>
                        <FormikInput
                          uniqueField={`env.${index}.var`}
                          // validation={validateRequire}
                          // label="Name"
                          placeholder="Environment Variable"
                          type="text"
                        />

                        <FormikInput
                          uniqueField={`env.${index}.val`}
                          // validation={validateRequire}
                          // label="Email"
                          placeholder="Environment Value"
                          type="text"
                        />
                        <Button
                          type="button"
                          colorScheme="teal"   variant="outline"
                          onClick={() => push({ var: '', val: '' })}
                        >
                          +
                        </Button>

                        {values.env.length !== 1 && (
                          <Button
                            type="button"
                            colorScheme="red"
                            onClick={() => remove(index)}
                          >
                            x
                          </Button>
                        )}
                      </HStack>
                    ))}
                  <Button colorScheme="teal"
                    type="submit"
                    width={buttonSize}
                    mt='8'>Save</Button>
                </VStack>

              )}
            </FieldArray>

          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default FormikAppUpdate;
