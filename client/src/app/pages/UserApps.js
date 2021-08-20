import React from 'react';
import PlaceList from '../components/AppList';
import { useParams } from 'react-router-dom';

const DUMMY_APPS = [
  {
    id: 'a1',
    name: 'forem',
    title: 'Leewardslope',
    description: 'An OpenSource community builder based upon DEV',
    creatorId: 'u1',
    image: 'https://picsum.photos/200',
  },
  {
    id: 'a2',
    name: 'forem',
    title: 'DEV',
    description: 'An OpenSource community builder based upon DEV',
    creatorId: 'u2',
    image: 'https://picsum.photos/200',
  },
  {
    id: 'a3',
    name: 'forem',
    title: 'DEV',
    description: 'An OpenSource community builder based upon DEV',
    creatorId: 'u1',
    image: 'https://picsum.photos/200',
  },
];

const UserApps = props => {
  // Getting the userId from the react routes: <Route path="/:userId/apps" exact> from App.js
  const userId = useParams().userId;
  const loadedApps = DUMMY_APPS.filter(apps => apps.creatorId === userId);

  return <PlaceList items={loadedApps} />;
};

export default UserApps;
