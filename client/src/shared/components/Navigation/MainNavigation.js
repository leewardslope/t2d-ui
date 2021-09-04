import React from 'react';

import MainHeader from './MainHeader';
// import { AuthContext } from '../../context/auth-context';

const MainNavigation = props => {
  const { body } = props;
  // const auth = React.useContext(AuthContext);
  // const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  return <>{<MainHeader body={body} />}</>;
};

export default MainNavigation;
