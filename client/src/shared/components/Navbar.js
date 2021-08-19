import React from 'react';
import { Heading, Spacer, Flex, Box, Button } from '@chakra-ui/react';
import { dynamic } from './globalDynamicVariables';

function Navbar() {
  return (
    <Flex
      mx="4"
      my="2"
      p="2"
      boxShadow="md"
      // borderColor="gray.200"
      // borderWidth="2px"
      borderRadius="xl"
      // w="100%"
      // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
    >
      <Box>
        <Heading
          fontWeight="extrabold"
          p="2"
          size="md"
          bgGradient="linear(to-r, teal.300, teal.400, blue.300, blue.400, purple.400, purple.500)"
          bgClip="text"
        >
          {dynamic.heading}
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="teal" mr="2">
          Log in
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;
