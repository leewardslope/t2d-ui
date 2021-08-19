import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import Navbar from './components/Navbar';
// import TopMenu from './components/TopMenu';
// import BlogContent from './components/BlogContent';
// import MainBody from './components/MainBody';
// import Footer from './components/Footer';

// import DokkuENV from './components/DokkuENV';
// import NewApp from './components/NewApp';
// import Student from './components/Student';

import Users from './user/pages/Users';
import NewApp from './app/pages/NewApp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          {/* <Navbar />
          <NewApp />
          <BlogContent />
          <DokkuENV />
         <MainBody />
          <Footer /> */}

          {/* <TopMenu />
          <Student /> */}

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
