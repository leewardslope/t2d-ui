import React from 'react';
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        {/* <Navbar />
          <NewApp />
          <BlogContent />
          <DokkuENV />
          <MainBody />
        <Footer /> */}

        {/* <Student /> */}
        {/* <TopMenu /> */}

        <MainNavigation />
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/app/new" exact>
            <NewApp />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
