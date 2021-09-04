import React, { useContext } from 'react';
import {
  chakra,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  Image,
} from '@chakra-ui/react';

import { useViewportScroll } from 'framer-motion';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

import { AuthContext } from '../../context/auth-context';

// import Section from './components/Section';
import Features from './components/Features';

export default function Header(props) {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const auth = useContext(AuthContext);

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  const MobileNavContent = (
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

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor="teal.400"
        w="full"
        overflowY="hidden"
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <chakra.div h="3.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Link to="/">
                <HStack>
                  <Image width="10" src="/logo.svg"></Image>
                </HStack>
              </Link>
            </Flex>
            <Flex>
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                {!auth.isLoggedIn && (
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        bg={bg}
                        color="gray.500"
                        display="inline-flex"
                        alignItems="center"
                        fontSize="md"
                        _hover={{ color: cl }}
                        _focus={{ boxShadow: 'none' }}
                        rightIcon={<IoIosArrowDown />}
                      >
                        Features
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      w="100vw"
                      maxW="md"
                      _focus={{ boxShadow: 'md' }}
                    >
                      <Features />
                    </PopoverContent>
                  </Popover>
                )}
                {!auth.isLoggedIn && (
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Blog
                  </Button>
                )}
                {!auth.isLoggedIn && (
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Pricing
                  </Button>
                )}
              </HStack>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                {!auth.isLoggedIn && (
                  <Link to="/auth">
                    <Button colorScheme="teal" variant="ghost" size="sm">
                      Sign in
                    </Button>
                  </Link>
                )}
                {!auth.isLoggedIn && (
                  <Link to="/auth">
                    <Button colorScheme="teal" variant="solid" size="sm">
                      Sign up
                    </Button>
                  </Link>
                )}
                {auth.isLoggedIn && (
                  <Button
                    onClick={auth.logout}
                    colorScheme="teal"
                    variant="solid"
                    size="sm"
                  >
                    Sign out
                  </Button>
                )}
              </HStack>
              <IconButton
                size="sm"
                fontSize="lg"
                isRound="true"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                isRound="true"
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}
