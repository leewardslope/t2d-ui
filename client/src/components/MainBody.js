import React from 'react';
import { VStack } from '@chakra-ui/react';
import Body from './Body';

function MainBody() {
  return (
    <VStack
      mx="4"
      my="2"
      p="2"
      // borderColor="gray.200"
      // borderWidth="2px"
      // boxShadow="base"
      borderRadius="xl"

      // w="100%"
      // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
    >
      <Body />
    </VStack>
  );
}

export default MainBody;
