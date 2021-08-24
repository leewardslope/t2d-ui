import React, { useContext } from 'react';
import { Button, Heading, Flex, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { AuthContext } from '../../context/auth-context';

const MainNavigation = props => {
  const auth = useContext(AuthContext);
  return (
    <MainHeader>
      {/* What ever we add here will act as props children for our MainHeader file */}
      <Flex
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
        <Box mx="2">
          <Link to="/">
            <Heading
              fontWeight="extrabold"
              p="2"
              size="md"
              bgGradient="linear(to-r, teal.300, teal.400, blue.300, blue.400, purple.400, purple.500)"
              bgClip="text"
            >
              Leewardslope
            </Heading>
          </Link>
        </Box>

        <NavLinks />

        {!auth.isLoggedIn && (
          <Box mx="2">
            <Link to="/auth">
              <Button colorScheme="teal">Authenticate</Button>
            </Link>
          </Box>
        )}

        {auth.isLoggedIn && (
          <Box mx="2">
            <Button onClick={auth.logout} colorScheme="teal">
              Logout
            </Button>
          </Box>
        )}
        <Box mx="2">
          <ColorModeSwitcher />
        </Box>
      </Flex>
    </MainHeader>
  );
};

export default MainNavigation;
