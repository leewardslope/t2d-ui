import React, { useState } from 'react';
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

function CreateStudent() {
  const [student, setStudent] = useState({
    regNo: '',
    name: '',
    grade: '',
    section: '',
  });

  const toast = useToast();

  const createStudent = e => {
    e.preventDefault();
    axios
      .post('http://75.119.143.54:5000/students', student)
      .then(() =>
        toast({
          title: 'Added New User',
          status: 'success',
          position: 'top',
          isClosable: true,
        })
      )
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
    // console.log(student);
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
              defaultValue={student.section}
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
            <FormHelperText>
              Select only if you're know your section.
            </FormHelperText>
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
