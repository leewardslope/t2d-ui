import React, { useContext } from 'react';
import {
  Button,
  Heading,
  Flex,
  Box,
  Spacer,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { AuthContext } from '../../context/auth-context';
import NavMenu from './components/NavMenu';

const MainNavigation = props => {
  const auth = useContext(AuthContext);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  return (
    <MainHeader>
      {/* What ever we add here will act as props children for our MainHeader file */}
      <Flex
        //mx="4"
        // my="2"
        p="2"
        boxShadow="sm"
        // borderColor="gray.200"
        // borderWidth="2px"
        borderRadius="xl"
        w="100%"
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
        <Spacer />
        {isLargerThan1280 && <NavLinks />}

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
        {!isLargerThan1280 && <NavMenu />}
        <Box mx="2">
          <ColorModeSwitcher />
        </Box>
      </Flex>
    </MainHeader>
  );
};

export default MainNavigation;
