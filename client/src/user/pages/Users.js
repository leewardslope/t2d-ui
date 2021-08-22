import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import UserList from '../components/UsersList';

const Users = () => {
  const toast = useToast();
  const [USERS, SetUSERS] = useState([]);

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

  return <>{USERS.length && <UserList items={USERS} />}</>;
};

export default Users;
