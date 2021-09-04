import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast, SimpleGrid, useMediaQuery } from '@chakra-ui/react';

import UserList from '../components/UsersList';

const Users = () => {
  const toast = useToast();
  const [USERS, SetUSERS] = useState([]);

  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://75.119.143.54:5000/api/users');
        SetUSERS(response.data.users);
      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    getUsers();
  }, [toast]);

  return (
    <>
      {isLargerThan1280 && (
        <SimpleGrid mx={24} minChildWidth="300px" spacing="0px">
          {USERS.length && <UserList items={USERS} />}
        </SimpleGrid>
      )}
      {!isLargerThan1280 && (
        <SimpleGrid minChildWidth="300px" spacing="0px">
          {USERS.length && <UserList items={USERS} />}
        </SimpleGrid>
      )}
    </>
  );
};

export default Users;
