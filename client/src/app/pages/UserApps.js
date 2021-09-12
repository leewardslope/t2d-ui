import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import AppList from '../components/AppList';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserApps = props => {
  // Getting the userId from the react routes: <Route path="/:userId/apps" exact> from App.js
  const userId = useParams().userId;
  const toast = useToast();
  const [loadedApps, setLoadedApps] = useState();
  // const loadedApps = DUMMY_APPS.filter(apps => apps.creatorId === userId);

  const appFilter = e => {
    setLoadedApps(prevApps => prevApps.filter(app => app.id !== e));
  };

  // let loadedApps;
  useEffect(() => {
    const getApps = async () => {
      try {
        const getData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/apps/user/${userId}/`
        );
        setLoadedApps(getData.data.apps || []);

      } catch (error) {
        toast({
          title: `${error.response.data.message}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      }
    };
    getApps();
  }, [toast, userId]);

  return <AppList items={loadedApps} filterApps={appFilter} />;
};

export default UserApps;
