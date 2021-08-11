import React from 'react';
import {
  List,
  ListItem,
  ListIcon,
  CircularProgress,
  Progress,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

function Status() {
  return (
    <List spacing={3} ml="4">
      <ListItem>
        <ListIcon as={MdCheckCircle} color="green.500" />
        Downloaded Talk to Dokku with Dokku requirements
      </ListItem>
      <ListItem>
        <ListIcon as={MdCheckCircle} color="green.500" />
        {`Step 01: Downloading required Plugins => Done`}
      </ListItem>
      <ListItem>
        <ListIcon as={MdCheckCircle} color="green.500" />
        {`Step 02: Downloading required Buildpacks => Done`}
      </ListItem>
      <ListItem>
        <CircularProgress mr="2" isIndeterminate size="16px" color="blue.500" />
        {/* <Spinner size="xs" /> */}
        {`Step 03: Installing your App => Ongoing`}
      </ListItem>
      <Progress size="xs" isIndeterminate />
    </List>
  );
}

export default Status;
