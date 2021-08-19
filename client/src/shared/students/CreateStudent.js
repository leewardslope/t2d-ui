import React, { useState, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  HStack,
  Input,
  RadioGroup,
  Radio,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { GetStudentContext } from '../components/Student';

function CreateStudent() {
  const toast = useToast();
  // const { getStudent, studentsList } = useContext(GetStudentContext);
  const { getStudent } = useContext(GetStudentContext);

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

  return (
    <VStack boxShadow="md" borderRadius="xl">
      <form onSubmit={e => createStudent(e)}>
        <VStack m="4">
          <Heading> Create Student </Heading>
          <FormControl id="registration-number" isRequired>
            <FormLabel>Registration Number</FormLabel>
            <Input
              placeholder="140121019"
              value={student.regNo}
              onChange={e => {
                setStudent({ ...student, regNo: e.target.value });
              }}
            />
          </FormControl>
          <FormControl id="student-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Akhil Naidu"
              value={student.name}
              onChange={e => {
                setStudent({ ...student, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl id="grade" isRequired>
            <FormLabel>Grade</FormLabel>
            <Input
              placeholder="6th"
              value={student.grade}
              onChange={e => {
                setStudent({ ...student, grade: e.target.value });
              }}
            />
          </FormControl>

          <FormControl id="section" as="fieldset">
            <FormLabel as="legend">Section</FormLabel>
            <RadioGroup
              value={student.section}
              onChange={radio => {
                setStudent({ ...student, section: radio });
              }}
            >
              <HStack spacing="24px">
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
                <Radio value="C">C</Radio>
                <Radio value="D">D</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>Section D is for Heros.</FormHelperText>
          </FormControl>
          <Button mt="4" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default CreateStudent;
