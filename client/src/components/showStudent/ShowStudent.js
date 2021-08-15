import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios';

function ShowStudent() {
  const [studentsList, setStudentList] = useState([]);

  useEffect(() => {
    axios.get('http://75.119.143.54:5000/students').then(allStudents => {
      setStudentList(allStudents.data);
      // console.log(studentsList);
    });
  }, []);

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
            <Th isNumeric>Reg. No.</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentsList.map(student => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.grade}</Td>
              <Td>{student.section}</Td>
              <Td isNumeric>{student.regNo}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Grade</Th>
            <Th>Section</Th>
            <Th isNumeric>Reg. No.</Th>
          </Tr>
        </Tfoot>
      </Table>
    </VStack>
  );
}

export default ShowStudent;
