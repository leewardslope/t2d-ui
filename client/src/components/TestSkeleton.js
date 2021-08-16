import React from 'react';
import { Box, SkeletonText } from '@chakra-ui/react';

function TestSkeleton() {
  return (
    <Box w="100%">
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
}

export default TestSkeleton;
