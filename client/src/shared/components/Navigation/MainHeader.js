import React, { useContext } from 'react';
import Dashboard from '../Main/Dashboard';
import NewNavigation from '../Main/NewNavigation';
import { AuthContext } from '../../context/auth-context';

const MainHeader = props => {
  const auth = useContext(AuthContext);
  return (
    <>
      {/* props.children is a special prop => will always refer to the things which we pass in the opening and closing tag of the component => I intended to use it in Main Navigation */}
      {/* {props.children} */}
      <NewNavigation />
      {auth.isLoggedIn && <Dashboard />}
    </>
  );
};

export default MainHeader;
