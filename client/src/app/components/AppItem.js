import React from 'react';
import {
  Avatar,
  Heading,
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  StackDivider,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AppItem = props => {
  const deleteHandle = () => {
    // Should make user to confirm things.
    console.log('pressed on delete');
  };

  return (
    <Flex m="2" justifyContent="center">
      <VStack
        divider={<StackDivider borderColor="grey.100" />}
        borderColor="grey.100"
        borderRadius="xl"
        mx="4"
        my="2"
        p="2"
        // w="100%"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        boxShadow="base"
        _hover={{
          boxShadow: 'md',
          borderRadius: 'xl',
          borderColor: 'grey.800',
        }}
      >
        <HStack p="2">
          <Box>
            <Avatar name={props.name} src={props.image} />
          </Box>

          <Box>
            <Heading size="md" color="teal">
              {props.title}
            </Heading>
            <Text fontSize="md">{props.name}</Text>
          </Box>
        </HStack>
        <VStack>
          <Text fontSize="md">{props.description}</Text>
          <HStack>
            <Button colorScheme="teal" variant="outline">
              Terminal
            </Button>
            <Link to={`/apps/${props.id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button colorScheme="red" variant="solid" onClick={deleteHandle}>
              Delete
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default AppItem;
