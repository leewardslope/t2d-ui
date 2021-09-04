import React, { useContext } from 'react';
import {
  Box,
  useColorModeValue,
  CloseButton,
  VStack,
  Button,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';

const MobileNavContent = mobileNav => {
  const bg = useColorModeValue('white', 'gray.800');
  const auth = useContext(AuthContext);

  return (
    <VStack
      pos="absolute"
      zIndex={2}
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />

      {!auth.isLoggedIn && (
        <NavLink to="/blog">
          <Box w="full" variant="solid">
            Blog
          </Box>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink to="/">
          <Box w="full" variant="ghost">
            Price
          </Box>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink to="/auth">
          <Box w="full" variant="ghost">
            Sign in/Sign up
          </Box>
        </NavLink>
      )}

      {auth.isLoggedIn && (
        <NavLink to="/setup">
          <Button w="full" variant="ghost">
            Server Setup
          </Button>
        </NavLink>
      )}

      {auth.isLoggedIn && (
        <Button onClick={auth.logout} w="full" variant="ghost">
          Sign Out
        </Button>
      )}
    </VStack>
  );
};

export default MobileNavContent;
