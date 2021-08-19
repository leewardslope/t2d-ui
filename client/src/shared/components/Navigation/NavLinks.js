import React from 'react';
import { Spacer, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const navLinks = [
    {
      id: 1,
      name: 'Apps',
      url: '/u1/apps',
    },
    {
      id: 2,
      name: 'All Users',
      url: '/',
    },
    {
      id: 3,
      name: 'Quick Setup',
      url: '/setup',
    },
    {
      id: 4,
      name: 'New App',
      url: '/app/new',
    },
  ];

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
              _hover={{
                background: 'teal.500',
                borderRadius: 'md',
                color: 'white',
              }}
              ml="8"
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
