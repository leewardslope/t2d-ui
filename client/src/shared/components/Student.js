import React, { useEffect, useState } from 'react';
import { VStack, Flex, Box, Spacer } from '@chakra-ui/react';
import ShowStudent from './students/ShowStudent';
import CreateStudent from './students/CreateStudent';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

export const GetStudentContext = React.createContext();

function Student() {
  const [studentsList, setStudentList] = useState([]);

  // A function to get data after modifications
  const getStudent = () => {
    axios.get(`${BASE_URL}/students`).then(student => {
      setStudentList(student.data);
    });
  };

  // One time fetching, without loop.
  useEffect(() => {
    getStudent();
  }, []);

  return (
    <VStack mx="4" my="2" p="2">
      <Flex>
        <VStack>
          <GetStudentContext.Provider value={{ getStudent, studentsList }}>
            <Box>
              <CreateStudent />
            </Box>
            <Spacer />
            <Box>
              <ShowStudent />
            </Box>
          </GetStudentContext.Provider>
        </VStack>
      </Flex>
    </VStack>
  );
}

export default Student;
