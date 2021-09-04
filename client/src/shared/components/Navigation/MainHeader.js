import React, { useContext } from 'react';
// import Dashboard from '../Main/Dashboard';
import NewNavigation from '../Main/NewNavigation';
import SideDrawer from '../Main/SideDrawer';
import { AuthContext } from '../../context/auth-context';
// import Demo from './Demo';

const MainHeader = props => {
  const { body } = props;
  const auth = useContext(AuthContext);

  return (
    <>
      {/* props.children is a special prop => will always refer to the things which we pass in the opening and closing tag of the component => I intended to use it in Main Navigation */}
      {/* {props.children} */}
      {!auth.isLoggedIn && <NewNavigation />}
      {/* {!auth.isLoggedIn && <Demo />} */}
      {!auth.isLoggedIn && body}

      {auth.isLoggedIn && <SideDrawer body={body} />}
      {/* {auth.isLoggedIn && <Dashboard />} */}
    </>
  );
};

export default MainHeader;
