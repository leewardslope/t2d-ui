import React, { useState, useEffect, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import AppList from '../components/AppList';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';
import { AuthContext } from '../../shared/context/auth-context';

const UserApps = props => {
  // Getting the userId from the react routes: <Route path="/:userId/apps" exact> from App.js
  const auth = useContext(AuthContext);

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
          `${BASE_URL}/api/apps/user/${auth.userId}/`
        );
        setLoadedApps(getData.data.apps);
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
  }, [toast, auth.userId]);

  return <AppList items={loadedApps} filterApps={appFilter} />;
};

export default UserApps;
