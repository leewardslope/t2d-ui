import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './components/Navbar';
import TopMenu from './components/TopMenu';
import BlogContent from './components/BlogContent';
// import MainBody from './components/MainBody';
import Footer from './components/Footer';

import DokkuENV from './components/DokkuENV';
// import NewApp from './components/NewApp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Navbar />

      <NewApp />
      <BlogContent /> */}

      <TopMenu />
      <DokkuENV />

      {/* <MainBody /> */}
      <Footer />
    </ChakraProvider>
  );
}

export default App;
