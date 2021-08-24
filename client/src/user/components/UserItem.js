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
  Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserItem = props => {
  return (
    <Flex m="2" justifyContent="center">
      <VStack
        divider={<StackDivider borderColor="grey.100" />}
        mx="4"
        my="2"
        p="2"
        // w="100%"
        // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '20vw' }}
        w="300px"
        // alignItems="stretch"
      >
        <Link to={`/${props.id}/apps`}>
          <HStack
            p="2"
            // borderWidth="1px"
            w="300px"
            boxShadow="base"
            borderColor="gray.400"
            borderRadius="xl"
            _hover={{
              boxShadow: 'md',
              borderRadius: 'xl',
              borderColor: 'grey.800',
            }}
          >
            <Box mx="2">
              <Avatar name={props.name} src={props.image} />
            </Box>

            <Box>
              <Heading size="md" color="teal">
                {props.name}
              </Heading>
              <Text fontSize="md">
                {props.appsCount} {props.appsCount === 1 ? 'app' : 'apps'}
              </Text>
            </Box>
            <Spacer />
          </HStack>
        </Link>
      </VStack>
    </Flex>
  );
};

export default UserItem;
