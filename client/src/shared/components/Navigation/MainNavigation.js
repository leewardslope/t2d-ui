import React, { useContext } from 'react';
import {
  Button,
  Flex,
  Box,
  useMediaQuery,
  Container,
  Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { AuthContext } from '../../context/auth-context';
import NavMenu from './components/NavMenu';

const MainNavigation = props => {
  const auth = useContext(AuthContext);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  return (
    <MainHeader >
      {/* What ever we add here will act as props children for our MainHeader file */}
      <Flex
        boxShadow="sm"
        backgroundColor="white"
        w="100%">
        <Container maxW="container.xl">
          <Flex
            alignItems="center"
            my="2"
            p="2"
          >
            <Box marginRight="12">
              <Link to="/">
                {/* <Heading
                  fontWeight="extrabold"
                  p="2"
                  size="md"
                  bgColor="blackAlpha.800"
                  bgClip="text"
                >
                  <Image src="./logo.svg"></Image>
                </Heading> */}
                <Image width="12" src="/logo.svg"></Image>
              </Link>
            </Box>
            {isLargerThan1280 && <NavLinks />}

            {!auth.isLoggedIn && (
              <Box mx="2">
                <Link to="/auth">
                  <Button variant="ghost" colorScheme="teal">SignIn</Button>
                </Link>
              </Box>
            )}

            {auth.isLoggedIn && (
              <Box mx="2">
                <Button variant="ghost" onClick={auth.logout} colorScheme="teal">
                  Sign Out
                </Button>
              </Box>
            )}
            {!isLargerThan1280 && <NavMenu />}
          </Flex>
        </Container>
      </Flex>
    </MainHeader>
  );
};

export default MainNavigation;
