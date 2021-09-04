import React, { useContext } from 'react';
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  Spacer,
  HStack,
  useColorModeValue,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

import { AuthContext } from '../../context/auth-context';

const Dashboard = () => {
  const auth = useContext(AuthContext);
  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      alignItems="center"
      justifyContent="space-between"
      // mx={2}
      borderWidth={0}
      overflowX="auto"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        ml={24}
        borderWidth={0}
        overflowX="auto"
      >
        <Tabs
          defaultIndex={0}
          borderBottomColor="transparent"
          colorScheme="teal"
        >
          <TabList>
            <NavLink to="/" exact>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                Dashboard
              </Tab>
            </NavLink>
            <NavLink to={`/${auth.userId}/apps`}>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                Apps
              </Tab>
            </NavLink>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Activity
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Settings
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Billing
            </Tab>{' '}
            <Tab isDisabled py={4} m={0}>
              Advanced
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Spacer />
      <HStack spacing={3} alignItems="center" mr="24">
        <NavLink to="/setup">
          <Button
            // mx="4"
            colorScheme="teal"
            variant="outline"
          >
            Quick Setup
          </Button>
        </NavLink>
        <InputGroup display={{ base: 'none', lg: 'block' }} ml="auto">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch />}
          />
          <Input type="tel" placeholder="Search..." />
        </InputGroup>
      </HStack>
    </Flex>
  );
};

export default Dashboard;
