import React, { useEffect, useState } from 'react';
import { VStack, Flex, Box, Spacer, useToast } from '@chakra-ui/react';
import ShowStudent from './showStudent/ShowStudent';
import CreateStudent from './createStudent/CreateStudent';
import axios from 'axios';

function Student() {
  // It is always best to write logic in parent and components in child
  const toast = useToast();

  // Related to Create Student
  const fillData = {
    regNo: '',
    name: '',
    grade: '',
    section: 'A',
  };

  const [student, setStudent] = useState(fillData);
  const createStudent = e => {
    e.preventDefault();
    axios
      .post('http://75.119.143.54:5000/students', student)
      .then(() => {
        toast({
          title: 'Added New User',
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        getStudent(); // To use this function, we created this parent component containing the complete logic
        setStudent(fillData); // reset
      })
      .catch(err => {
        toast({
          title: 'Check your Registration Number',
          status: 'error',
          position: 'top',
          isClosable: true,
        });
        toast({
          title: `${err}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
      });
  };

  // Related to show and delete students
  const [studentsList, setStudentList] = useState([]);
  const getStudent = () => {
    axios.get('http://75.119.143.54:5000/students').then(student => {
      setStudentList(student.data);
    });
  };

  const deleteStudent = id => {
    axios
      .delete(`http://75.119.143.54:5000/students/${id}`)
      .then(() => {
        toast({
          title: 'Deleted User',
          status: 'success',
          position: 'top',
          isClosable: true,
        });
        getStudent();
      })
      .catch(err =>
        toast({
          title: `${err}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      );
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <VStack mx="4" my="2" p="2">
      <Flex>
        <VStack>
          <Box>
            <CreateStudent
              student={student}
              createStudent={createStudent}
              setStudent={setStudent}
            />
          </Box>
          <Spacer />
          <Box>
            <ShowStudent
              studentsList={studentsList}
              deleteStudent={deleteStudent}
            />
          </Box>
        </VStack>
      </Flex>
    </VStack>
  );
}

export default Student;
