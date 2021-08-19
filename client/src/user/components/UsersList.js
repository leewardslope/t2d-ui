import React from 'react';
import UserItem from './UserItem';
import { Flex, Heading, VStack } from '@chakra-ui/react';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <Flex justifyContent="center">
        <VStack
          mx="4"
          my="2"
          p="2"
          // w="100%"
          // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '20vw' }}
          alignItems="stretch"
          boxShadow="base"
          borderColor="gray.400"
          borderRadius="xl"
          _hover={{
            boxShadow: 'md',
            borderRadius: 'xl',
            borderColor: 'grey.800',
          }}
        >
          <Heading size="lg">No users Found</Heading>
        </VStack>
      </Flex>
    );
  }

  return (
    <ul>
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          appsCount={user.apps}
        />
      ))}
    </ul>
  );
};

export default UsersList;
