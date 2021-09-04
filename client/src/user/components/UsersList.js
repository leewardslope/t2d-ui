import React from 'react';
// import { SimpleGrid } from '@chakra-ui/react';

import UserItem from './UserItem';
import InfoCard from '../../shared/components/UIElements/InfoCard';

const UsersList = props => {
  // For users this might not be displayed as, I added a logic not to render if length is zero; but in case => If you want to use it in Apps => you need to display no apps.
  if (props.items.length === 0) {
    return <InfoCard message="No Users Found" />;
  }

  return (
    <>
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          appsCount={user.apps.length}
        />
      ))}
    </>
  );
};

export default UsersList;
