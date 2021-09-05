import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import { FaClipboardCheck, FaRss } from 'react-icons/fa';
import { AiFillGift } from 'react-icons/ai';
import { BsGearFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { HiCode, HiCollection } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import React, { useContext } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import { AuthContext } from '../../context/auth-context';

export default function Swibc(props) {
  const { body } = props;
  const sidebar = useDisclosure();

  // const { toggleColorMode: toggleMode } = useColorMode();
  // const text = useColorModeValue('dark', 'light');
  // const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const auth = useContext(AuthContext);

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

  const NavItem = props => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: 'blackAlpha.300',
          color: 'whiteAlpha.900',
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: 'gray.300',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = props => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="teal"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Image width="10" src="/logo.svg"></Image>
        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          Leewardslope
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode}>Integrations</NavItem>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          {/* <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for guides... (not yet ready)" />
          </InputGroup> */}
          <Link to="/app/new">
            <Box>
              <Button m={2}>Create New App</Button>
            </Box>
          </Link>

          <Flex align="center">
            {/* <Icon color="gray.500" as={FaBell} cursor="pointer" /> */}
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
                {/* <MenuItem onClick={toggleMode} icon={<SwitchIcon />}>
                  Switch to {text} mode
                </MenuItem> */}
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
          </Flex>
        </Flex>

        <Dashboard />
        <Box as="main" p="4">
          {/* <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96"></Box> */}
          <Box m={4}>{body}</Box>
        </Box>
      </Box>
    </Box>
  );
}
