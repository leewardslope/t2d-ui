import React from 'react';
import {
  VStack,
  HStack,
  StackDivider,
  Heading,
  Text,
  Spacer,
} from '@chakra-ui/react';

function BlogList({ blogs, title }) {
  return (
    <VStack
      divider={<StackDivider borderColor="grey.100" />}
      mx="4"
      my="2"
      p="2"
      boxShadow="md"
      borderColor="gray.400"
      borderRadius="xl"
      w="100%"
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
      alignItems="stretch"
    >
      <Heading color="teal">{title}</Heading>
      {blogs.map(blog => (
        <HStack
          p="2"
          borderWidth="1px"
          borderRadius="md"
          key={blog.id}
          _hover={{
            boxShadow: 'lg',
            color: 'teal',
            borderRadius: 'xl',
            borderColor: 'grey.800',
          }}
        >
          <Text fontSize="lg" fontWeight="bold">
            {blog.title}
          </Text>
          <Spacer />
          <Text fontSize="xs"> written by {blog.author}</Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default BlogList;
