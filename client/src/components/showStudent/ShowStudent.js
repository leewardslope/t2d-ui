import React, { useState } from 'react';
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
import axios from 'axios';

function ShowStudent() {
  const [studentsList, setStudentList] = useState([]);

  // I'm not sure whether to use the setState in useEffect function.
  const updateSite = () => {
    axios.get('http://75.119.143.54:5000/students').then(allStudents => {
      setStudentList(allStudents.data);
    });
  };

  updateSite();

  const deleteStudent = id => {
    axios.delete(`http://75.119.143.54:5000/students/${id}`);
  };

  // For some reason I don't feel like using setStudentList in a useEffect, so added the function updateSite

  return (
    <VStack boxShadow="md" borderRadius="xl" m="4">
      <Heading>Show Students</Heading>
      <Table size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
