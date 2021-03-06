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
  Image,
  Container
} from '@chakra-ui/react';

import { useViewportScroll } from 'framer-motion';

import { Link } from 'react-router-dom';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';

import { AuthContext } from '../../context/auth-context';

// import Section from './components/Section';
import Features from './components/Features';
import MobileNavContent from './components/MobileNavContent';

export default function Header(props) {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const auth = useContext(AuthContext);

  const { scrollY } = useViewportScroll();
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

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
        borderTopColor="teal.400"
        w="full"
        overflowY="hidden"
        boxShadow="base"
      >
        <Container paddingY="1" maxW="container.xl">
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
                      <Button colorScheme="teal" variant="ghost" size="md">
                        Sign in
                      </Button>
                    </Link>
                  )}
                  {!auth.isLoggedIn && (
                    <Link to="/auth">
                      <Button colorScheme="teal" variant="solid" size="md">
                        Sign up
                      </Button>
                    </Link>
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
        </Container>
      </chakra.header>

    </React.Fragment>
  );
}
