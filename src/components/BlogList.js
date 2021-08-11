import React from 'react';
import {
  VStack,
  HStack,
  StackDivider,
  Heading,
  Text,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function BlogList({ blogs, title, handleDelete }) {
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
      maxW={{ base: '90vw', sm: '80vw', lg: '80vw', xl: '70vw' }}
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
          <Text fontSize="s"> written by {blog.author}</Text>
          <IconButton
            size="sm"
            isRound="true"
            colorScheme="teal"
            aria-label="Delete Post"
            icon={<DeleteIcon />}
            _hover={{ colorScheme: 'red' }}
            onClick={() => handleDelete(blog.id)}
          ></IconButton>
        </HStack>
      ))}
    </VStack>
  );
}

export default BlogList;
