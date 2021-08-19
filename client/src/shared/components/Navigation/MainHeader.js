import React from 'react';
import { Flex } from '@chakra-ui/react';

const MainHeader = props => {
  return (
    <Flex>
      {/* props.children is a special prop => will always refer to the things which we pass in the opening and closing tag of the component => I intended to use it in Main Navigation */}
      {props.children}
    </Flex>
  );
};

export default MainHeader;
