import React from 'react';
import UserItem from './UserItem';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h1>No users Found</h1>
      </div>
    );
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
