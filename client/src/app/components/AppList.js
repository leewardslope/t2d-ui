// Dummy data
import React from 'react';
import InfoCard from '../../shared/components/UIElements/InfoCard';
import { Button } from '@chakra-ui/react';
import AppItem from './AppItem';
import { Link } from 'react-router-dom';

const AppList = props => {
  if (props.items.length === 0) {
    const anotherItem = (
      <Link to="/app/new">
        <Button>Create New App</Button>
      </Link>
    );
    return (
      <>
        <InfoCard message="No Apps" anotherItem={anotherItem} />
      </>
    );
  }

  return (
    <ul>
      {props.items.map(app => (
        <AppItem
          key={app.id}
          id={app.id}
          image={app.image}
          name={app.name}
          title={app.title}
          description={app.description}
          creatorId={app.creator}
        />
      ))}
    </ul>
  );
};

export default AppList;
