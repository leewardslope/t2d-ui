import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Status from './Status';
import BodyBox from './BodyBox';
import TerminalStatus from './TerminalStatus';
import TestSkeleton from './TestSkeleton';

function Body() {
  return (
    <SimpleGrid w="100%" minChildWidth="460px" spacing="20px">
      <BodyBox inBodyBox={<Status />} />
      <BodyBox inBodyBox={<TerminalStatus />} />
      <BodyBox inBodyBox={<TestSkeleton />} />
      <BodyBox inBodyBox={<TestSkeleton />} />
      <BodyBox inBodyBox={<TestSkeleton />} />
      <BodyBox inBodyBox={<TestSkeleton />} />
    </SimpleGrid>
  );
}

export default Body;
