import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import UserList from '../components/UsersList';
import { BASE_URL } from '../../BASE_URL';

const Users = () => {
  const toast = useToast();
  const [USERS, SetUSERS] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
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

  return <>{USERS.length && <UserList items={USERS} />}</>;
};

export default Users;
