import React from 'react';
import {
  IconButton,
  Box,
  Spacer,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  // MenuOptionGroup,
  // MenuIcon,
  // MenuCommand,
  // MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  EditIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

function TopMenu() {
  return (
    <Flex
      mx="4"
      my="2"
      p="2"
      boxShadow="md"
      // borderWidth="2px"
      borderRadius="xl"
      // w="100%"
      // maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
    >
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘T">
              New Tab
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
              New Window
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      {/* Start */}

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box as="a" href="/" _hover={{ color: 'teal' }}>
          Home
        </Box>

        <Box
          as="a"
          href="/create"
          p="2"
          _hover={{ background: 'teal', borderRadius: 'md', color: 'white' }}
          ml="8"
        >
          New Blog
        </Box>
      </Box>
      <Spacer />
      {/* End */}
      <Box>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
}

export default TopMenu;
