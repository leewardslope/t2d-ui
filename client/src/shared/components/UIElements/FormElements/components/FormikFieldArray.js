import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { HStack, VStack, Button, Heading } from '@chakra-ui/react';

// import { validateRequire } from './FormikValidations';

import FormikInput from './FormikInput';

const FormikFieldArray = () => {
  const initialValues = {
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
  };

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
        initialValues={initialValues}
        onSubmit={async values => {
          // await new Promise(r => setTimeout(r, 500));
          // console.log(values);
          try {
            const notFilled = await values.env.filter((e, index) => !e.val);
            console.log(notFilled);
            notFilled.length
              ? console.log('not filled')
              : console.log('all filled');
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

export default FormikFieldArray;
// ReactDOM.render(<InviteFriends />, document.getElementById('root'));
