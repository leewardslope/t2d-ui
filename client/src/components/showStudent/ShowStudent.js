import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

function ShowStudent({ studentsList, deleteStudent }) {
  return (
    <VStack boxShadow="md" borderRadius="xl" m="4">
      <Heading>Show Students</Heading>
      <Table size="sm">
        <TableCaption>List of Students</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Grade</Th>
            <Th>Section</Th>
            <Th>Reg. No.</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentsList.map(student => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.grade}</Td>
              <Td>{student.section}</Td>
              <Td>{student.regNo}</Td>
              <Td isNumeric>
                <HStack>
                  <IconButton
                    size="sm"
                    isRound
                    colorScheme="teal"
                    icon={<EditIcon />}
                    variant="outline"
                  ></IconButton>
                  <IconButton
                    onClick={() => deleteStudent(student._id)}
                    size="sm"
                    isRound
                    colorScheme="red"
                    variant="outline"
                    icon={<DeleteIcon />}
                  ></IconButton>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Grade</Th>
            <Th>Section</Th>
            <Th isNumeric>Reg. No.</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Tfoot>
      </Table>
    </VStack>
  );
}

export default ShowStudent;
