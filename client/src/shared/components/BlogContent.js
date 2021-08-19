import React from 'react';
import { VStack } from '@chakra-ui/react';
import BlogList from './BlogList';
import { useState } from 'react';

function BlogContent() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'My New website', body: 'lorem ipsum ..', author: 'Akhil' },
    { id: 2, title: 'Welcome Party', body: 'lorem ipsum ..', author: 'Akhil' },
    {
      id: 3,
      title: 'I am Naruto Uzumaki',
      body: 'lorem ipsum ..',
      author: 'Naruto',
    },
  ]);

  const handleDelete = id => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };
  return (
    <VStack
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
      <BlogList blogs={blogs} title={'All Posts!'} />
      <BlogList
        blogs={blogs.filter(blog => blog.author === 'Akhil')}
        title={'Posts by Akhil !'}
        handleDelete={handleDelete}
      />
    </VStack>
  );
}

export default BlogContent;
