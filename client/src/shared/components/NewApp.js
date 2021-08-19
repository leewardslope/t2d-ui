import React from 'react';
import {
  VStack,
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react';
const envVariables = [
  {
    id: 0,
    name: 'APP_NAME',
    value: 'forem',
  },
  {
    id: 1,
    name: 'APP_DOMAIN',
    value: 'app.leewardslope.com',
  },
  {
    id: 2,
    name: 'APP_PROTOCOL',
    value: 'https://',
  },
];

function NewApp() {
  const addNewENV = (e, { id }) => {
    console.log(e);
  };

  const [value, setValue] = React.useState('');
  const [envName, setEnvName] = React.useState('');
  const handleChange = (e, name) => {
    setValue(e.target.value);
  };

  return (
    <VStack>
      <Text mb="8px">
        Value of {envName} is {value}
      </Text>
      <Stack spacing={4}>
        {envVariables.map(env => (
          <InputGroup key={env.id}>
            <InputLeftAddon children={env.name} />
            <Input
              onChange={e => handleChange(e, env.name)}
              placeholder="mysite"
            />
          </InputGroup>
        ))}
      </Stack>
      <Divider />

      <HStack>
        <Input onChange={e => handleChange(e)} placeholder="ENV_NAME" />
        <Input onChange={e => handleChange(e)} placeholder="ENV_VALUE" />
        <Button onClick={() => addNewENV()}>Add</Button>
      </HStack>

      <Divider />
    </VStack>
  );
}

export default NewApp;
