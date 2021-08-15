import React from 'react';
import { VStack, Flex, Box, Spacer } from '@chakra-ui/react';
import ShowStudent from './showStudent/ShowStudent';
import CreateStudent from './createStudent/CreateStudent';

function Student() {
  return (
    <VStack mx="4" my="2" p="2">
      <Flex>
        <VStack>
          <Box>
            <CreateStudent />
          </Box>
          <Spacer />
          <Box>
            <ShowStudent />
          </Box>
        </VStack>
      </Flex>
    </VStack>
  );
}

export default Student;
