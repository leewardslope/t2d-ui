import React from 'react';
import { VStack, Flex, Heading, HStack, Box, Spacer } from '@chakra-ui/react';
import ShowStudent from './showStudent/ShowStudent';
import CreateStudent from './createStudent/CreateStudent';

function Student() {
  return (
    <VStack mx="4" my="2" p="2">
      <Flex>
        <HStack alignItems="stretch">
          <Box>
            <ShowStudent />
          </Box>
          <Spacer />
          <Box>
            <CreateStudent />
          </Box>
        </HStack>
      </Flex>
    </VStack>
  );
}

export default Student;
