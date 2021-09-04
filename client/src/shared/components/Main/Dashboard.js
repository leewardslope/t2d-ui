import React from 'react';
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  Spacer,
  HStack,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { AiOutlineSearch } from 'react-icons/ai';

const Dashboard = () => {
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
          defaultIndex={1}
          borderBottomColor="transparent"
          colorScheme="teal"
        >
          <TabList>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Dashboard
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Apps
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              Quick Setup
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
