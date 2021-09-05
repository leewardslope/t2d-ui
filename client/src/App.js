import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { THEME } from './theme';

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
import Setup from './ssh/Setup';

import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

function App() {
  const { userId, token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/setup" exact>
          <Setup />
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
    <ChakraProvider theme={THEME}>
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
          <MainNavigation body={routes} />
          {/* App -> Main Navigation -> Main Header -> Sidebar -> body*/}
        </Router>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
