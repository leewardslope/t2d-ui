import React, { useContext } from 'react';
import { Spacer, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
// import { navLinks } from './components/navLinks';
import { AuthContext } from '../../context/auth-context';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Spacer />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {auth.isLoggedIn && (
          <NavLink to="/" exact>
            <Box p="2" ml="8">
              Dashboard
            </Box>
          </NavLink>
        )}

        {auth.isLoggedIn && (
          <NavLink to={`/${auth.userId}/apps`}>
            <Box
              p="2"
              ml="8"
              _hover={{
                background: 'teal.500',
                borderRadius: 'md',
                color: 'white',
              }}
            >
              Apps
            </Box>
          </NavLink>
        )}

        <NavLink to="/">
          <Box
            p="2"
            ml="8"
            _hover={{
              background: 'teal.500',
              borderRadius: 'md',
              color: 'white',
            }}
          >
            All Users
          </Box>
        </NavLink>

        <NavLink to="/setup">
          <Box
            p="2"
            ml="8"
            _hover={{
              background: 'teal.500',
              borderRadius: 'md',
              color: 'white',
            }}
          >
            Quick Setup
          </Box>
        </NavLink>

        {auth.isLoggedIn && (
          <NavLink to="/app/new">
            <Box
              p="2"
              ml="8"
              _hover={{
                background: 'teal.500',
                borderRadius: 'md',
                color: 'white',
              }}
            >
              New App
            </Box>
          </NavLink>
        )}
      </Box>
      <Spacer />
      {/* End */}
    </>
  );
};

export default NavLinks;
