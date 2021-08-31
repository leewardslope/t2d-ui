import React from 'react';
import InfoCard from '../../shared/components/UIElements/InfoCard';
import { Button } from '@chakra-ui/react';
import AppItem from './AppItem';
import { Link } from 'react-router-dom';

const AppList = props => {
  if (!props.items || props.items.length === 0) {
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

  const onDeleteApp = e => {
    props.filterApps(e);
    // Go to UserApp.js
  };
  // props.items && => Helps in not showing no-apps

  // <SimpleGrid columns={[2, null, 3]} spacing="40px">
  return (
    // <SimpleGrid minChildWidth="300px" spacing="0px">
    <>
      {props.items.map(app => (
        <AppItem
          key={app.id}
          id={app.id}
          // image={app.image}
          image="https://forem.dev/images/OOj6V9EW_qwSfvCWiRvu1glK-F66cF7I6qplZ8om5pk/rs:fill:320:320/mb:500000/aHR0cHM6Ly9mb3Jl/bS5kZXYvcmVtb3Rl/aW1hZ2VzL3VwbG9h/ZHMvb3JnYW5pemF0/aW9uL3Byb2ZpbGVf/aW1hZ2UvMS8wNzc0/NDI3NC04OGQ1LTQx/MzEtOWY2Ni1iYjY0/MzAwMWFmZTEucG5n"
          name={app.app}
          title={app.title}
          description={app.description}
          creatorId={app.creator}
          onDelete={e => onDeleteApp(e)}
        />
      ))}
    </>
    // </SimpleGrid>
  );
};

export default AppList;
