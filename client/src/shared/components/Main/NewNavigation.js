import React, { useContext } from 'react';
import {
  chakra,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Button,
  useColorMode,
  Image,
  useToast,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@chakra-ui/react';

import { useViewportScroll } from 'framer-motion';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

import { AuthContext } from '../../context/auth-context';

// import Section from './components/Section';
import Features from './components/Features';
import MobileNavContent from './components/MobileNavContent';

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
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  const toast = useToast();
  const [USER, setUSER] = React.useState({});

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/${auth.userId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setUSER(response.data);
        // console.log(response.data);
      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    auth.userId && getUsers();
  }, [toast, auth]);

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

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
        <chakra.div h="3.5rem" mx="8">
          <Flex
            w="full"
            h="full"
            // px="4"
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
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar size={'sm'} name={USER.name} src={USER.image} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Settings</MenuItem>
                      <MenuItem onClick={toggleMode} icon={<SwitchIcon />}>
                        Switch to {text} mode
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        onClick={auth.logout}
                        colorscheme="teal"
                        variant="solid"
                        size="sm"
                      >
                        Sign Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </HStack>

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
          {MobileNavContent(mobileNav)}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}
