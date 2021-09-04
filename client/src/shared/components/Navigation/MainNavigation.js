import React, { useContext } from 'react';

import MainHeader from './MainHeader';
import { AuthContext } from '../../context/auth-context';

const MainNavigation = props => {
  const { body } = props;
  const auth = useContext(AuthContext);
  // const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  return (
    <>
      {auth.isLoggedIn && <MainHeader body={body} />}
      {!auth.isLoggedIn && <MainHeader />}
      {!auth.isLoggedIn && body}
    </>
  );
};

export default MainNavigation;
