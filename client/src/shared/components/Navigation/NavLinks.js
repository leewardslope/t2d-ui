import React from 'react';
import { Spacer, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { navLinks } from './components/navLinks';

const NavLinks = () => {
  return (
    <>
      <Spacer />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <NavLink to="/" exact>
          <Box p="2" ml="8">
            Dashboard
          </Box>
        </NavLink>
        {navLinks.map(links => (
          <NavLink key={links.id} to={links.url}>
            <Box
              p="2"
              ml="8"
              _hover={{
                background: 'teal.500',
                borderRadius: 'md',
                color: 'white',
              }}
            >
              {links.name}
            </Box>
          </NavLink>
        ))}
      </Box>
      <Spacer />
      {/* End */}
    </>
  );
};

export default NavLinks;
