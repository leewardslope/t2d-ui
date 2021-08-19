import React from 'react';
import UserItem from './UserItem';
import InfoCard from '../../shared/components/UIElements/InfoCard';

const UsersList = props => {
  if (props.items.length === 0) {
    return <InfoCard message="No Users Found" />;
  }

  return (
    <ul>
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          appsCount={user.apps}
        />
      ))}
    </ul>
  );
};

export default UsersList;
