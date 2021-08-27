import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, VStack, HStack, Heading, useToast } from '@chakra-ui/react';
import { Formik, Form, FieldArray } from 'formik';

// import { validateRequire } from './components/FormikValidations';
import FormikInput from './components/FormikInput';
import { AuthContext } from '../../../context/auth-context';
// import FormikRadio from './components/FormikRadio';
// import FormikSelect from './components/FormikSelect';

const FormikAppUpdate = () => {
  // Getting the userId from the react routes: <Route path="/apps/:appsId" exact> from App.js
  const appId = useParams().appsId;

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
        var: 'DOMAIN_NAME',
        val: '',
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const loadedData = await axios.get(
          `http://75.119.143.54:5000/api/env/${appId}`,
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

          // setEnvData(loadedData.data);
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
      p="4"
      m="8"
      boxShadow="md"
      // borderColor="gray.200"
      // borderWidth="2px"
      borderRadius="xl"
      // w="50%"
      w="500px"
      // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      alignItems="stretch"
    >
      <Heading align="center" size="lg">
        Add ENV Variables
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
                  `http://75.119.143.54:8081/api/env/${appId}`,
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
          <Form>
            <FieldArray name="env">
              {({ insert, remove, push }) => (
                <VStack>
                  {values.env.length > 0 &&
                    values.env.map((env, index) => (
                      <HStack key={index}>
                        <FormikInput
                          uniqueField={`env.${index}.var`}
                          // validation={validateRequire}
                          // label="Name"
                          placeholder="ENV_VAR"
                          type="text"
                        />

                        <FormikInput
                          uniqueField={`env.${index}.val`}
                          // validation={validateRequire}
                          // label="Email"
                          placeholder="ENV_VALUE"
                          type="text"
                        />
                        <Button
                          type="button"
                          className="secondary"
                          onClick={() => push({ var: '', val: '' })}
                        >
                          +
                        </Button>

                        {values.env.length !== 1 && (
                          <Button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            x
                          </Button>
                        )}
                      </HStack>
                    ))}
                </VStack>
              )}
            </FieldArray>
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default FormikAppUpdate;
