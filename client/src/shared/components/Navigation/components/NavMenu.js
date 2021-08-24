import React, { useContext } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  ArrowForwardIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';

const NavMenu = () => {
  const auth = useContext(AuthContext);
  return (
    <Menu>
      <MenuButton
        isRound="true"
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        //variant="outline"
        variant="ghost"
      />
      <MenuList>
        {auth.isLoggedIn && (
          <NavLink to="/">
            <MenuItem icon={<ExternalLinkIcon />}>Dashboard</MenuItem>
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <NavLink to={`/${auth.userId}/apps`}>
            <MenuItem icon={<RepeatIcon />}>Apps</MenuItem>
          </NavLink>
        )}
        <NavLink to="/">
          <MenuItem icon={<SearchIcon />}>All Users</MenuItem>
        </NavLink>
        <NavLink to="/setup">
          <MenuItem icon={<ArrowForwardIcon />}>Quick Setup</MenuItem>
        </NavLink>
        {auth.isLoggedIn && (
          <NavLink to="/app/new">
            <MenuItem icon={<AddIcon />}>New App</MenuItem>
          </NavLink>
        )}
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
