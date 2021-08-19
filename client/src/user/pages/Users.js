import React from 'react';
import UserList from '../components/UsersList';

function Users() {
  // Dummy constant for front-end testing
  const USERS = [
    {
      id: 'u1',
      name: 'Akhil Naidu',
      image: 'https://bit.ly/dan-abramov',
      apps: 3,
    },
  ];

  return <UserList items={USERS} />;
}

export default Users;
