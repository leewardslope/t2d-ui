import React, { useState, useCallback, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import Navbar from './shared/components/Navbar';
// import TopMenu from './shared/components/TopMenu';
// import BlogContent from './shared/components/BlogContent';
// import MainBody from './shared/components/MainBody';
// import Footer from './shared/components/Footer';

// import DokkuENV from './shared/components/DokkuENV';
// import NewApp from './shared/components/NewApp';
// import Student from './shared/components/Student';

import MainNavigation from './shared/components/Navigation/MainNavigation';

import Users from './user/pages/Users';
import NewApp from './app/pages/NewApp';
import UserApps from './app/pages/UserApps';
import UpdateApp from './app/pages/UpdateApp';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(); // this variable is differnt from the below used, remember scoping => but using this in it.

  // Let's store token in localstorage, i'm not ready for using cookies now!
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    // need of token expiration checks => date + 1hr
    // either we have it or create it (have it, is in case of 'refresh' login)
    // 1000 * 60 * 60;
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // Local storage is globally available variable and it stores in txt format.

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    // Local storage is just a text, we neet to convert it into an object
    const storedData = JSON.parse(localStorage.getItem('userData'));
    // Checking if +1 hr time > present time
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration > new Date())
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/apps" exact>
          <UserApps />
        </Route>
        <Route path="/app/new" exact>
          <NewApp />
        </Route>
        <Route path="/apps/:appsId" exact>
          <UpdateApp />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/apps" exact>
          <UserApps />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  // value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
  // value={{ isLoggedIn, login, logout }}>

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <MainNavigation />

          {routes}
        </Router>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
