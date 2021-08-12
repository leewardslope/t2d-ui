import React from 'react';
import {
  VStack,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
// import { useState } from 'react';
import { envVariables } from './globalDynamicVariables';

function DokkuENV() {
  // lets use use state when it is needed, that is when need in a render.
  //const [envVariables, setEnvVariables] = useState([]);

  const handleChange = (e, id) => {
    let editENV = envVariables.filter(env => id === env.id);
    editENV[0].value = e.target.value;
    console.log(editENV[0].value, editENV[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('On Submit');
    console.log(
      `dokku config:set ${envVariables[0].value} ${envVariables[1].name}=${envVariables[1].value} ${envVariables[2].name}=${envVariables[2].value}`
    );
  };

  return (
    <VStack>
      <form onSubmit={e => handleSubmit(e)}>
        {envVariables.map(env => (
          <HStack key={env.id}>
            <FormControl isRequired>
              <FormLabel>{env.name}</FormLabel>
              <Input
                onChange={e => handleChange(e, env.id)}
                placeholder={env.value}
              />
            </FormControl>
          </HStack>
        ))}
        <Box pt="2">
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </VStack>
  );
}

export default DokkuENV;
