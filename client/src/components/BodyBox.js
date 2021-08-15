import React from 'react';
import { Box } from '@chakra-ui/react';

function BodyBox({ inBodyBox }) {
  return (
    <Box
      _hover={{
        borderWidth: '1px',
        borderBottomWidth: '4px',
        borderRightWidth: '4px',
        borderColor: 'blue.200',
        boxShadow: 'lg',

        borderRadius: 'lg',
      }}
      // borderRadius="lg"
      boxShadow="xs"
      height="180px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // boxShadow="md"
      p="6"
      rounded="xl"
      // textAlign="center"
    >
      {inBodyBox}
    </Box>
  );
}

export default BodyBox;
