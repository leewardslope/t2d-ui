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
  useMediaQuery,
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
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
        maxW="1280px"
        alignItems="center"
        justifyContent="space-between"
        ml={4}
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
            <NavLink to={`/${auth.userId}/activity`}>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                Activity
              </Tab>
            </NavLink>
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
      <HStack spacing={3} alignItems="center" mr={4}>
        {isLargerThan1280 && (
          <NavLink to="/setup">
            <Button
              // mx="4"
              colorScheme="teal"
              variant="outline"
            >
              Server Setup
            </Button>
          </NavLink>
        )}
      </HStack>
    </Flex>
  );
};

export default Dashboard;
