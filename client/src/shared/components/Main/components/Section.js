import React from 'react';

import { chakra, Link, Box, useColorModeValue } from '@chakra-ui/react';

const Section = props => {
  const ic = useColorModeValue('teal.600', 'teal.50');
  const hbg = useColorModeValue('gray.50', 'teal.400');
  const tcl = useColorModeValue('gray.900', 'gray.50');
  const dcl = useColorModeValue('gray.500', 'gray.50');
  return (
    <Link
      m={-3}
      p={3}
      display="flex"
      alignItems="start"
      rounded="lg"
      _hover={{ bg: hbg }}
    >
      <chakra.svg
        flexShrink={0}
        h={6}
        w={6}
        color={ic}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {props.icon}
      </chakra.svg>
      <Box ml={4}>
        <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
          {props.title}
        </chakra.p>
        <chakra.p mt={1} fontSize="sm" color={dcl}>
          {props.children}
        </chakra.p>
      </Box>
    </Link>
  );
};

export default Section;
