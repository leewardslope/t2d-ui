import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { HStack, VStack, Button, Heading } from '@chakra-ui/react';

import { validateRequire } from './FormikValidations';

import FormikInput from './FormikInput';

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const Test = () => (
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
        await new Promise(r => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <VStack>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <HStack key={index}>
                      <FormikInput
                        uniqueField={`friends.${index}.name`}
                        validation={validateRequire}
                        // label="Name"
                        placeholder="DOMAIN_NAME"
                        type="text"
                      />

                      <FormikInput
                        uniqueField={`friends.${index}.email`}
                        validation={validateRequire}
                        // label="Email"
                        placeholder="app.example.com"
                        type="text"
                      />

                      <Button
                        type="button"
                        className="secondary"
                        onClick={() => push({ name: '', email: '' })}
                      >
                        +
                      </Button>

                      {values.friends.length !== 1 && (
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
                {/* <Button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', email: '' })}
                >
                  +
                </Button> */}
              </VStack>
            )}
          </FieldArray>
          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  </VStack>
);

export default Test;
// ReactDOM.render(<InviteFriends />, document.getElementById('root'));