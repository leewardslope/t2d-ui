import React from 'react';
import { VStack, Flex, Heading } from '@chakra-ui/react';

const InfoCard = props => {
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
        <Heading align="center" size="lg">
          {props.message}
        </Heading>
        {props.anotherItem}
      </VStack>
    </Flex>
  );
};

export default InfoCard;
