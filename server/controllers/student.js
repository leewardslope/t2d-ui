import Student from '../models/Student.js';
// Best place to list down all the router callbacks.

// We will create a try catch block, because we are getting a request from the client and we need to handle that. => We need error handling
export const getStudents = async (req, res) => {
  try {
    // It will go to the student model and save its in this variable.
    const allStudents = await Student.find();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const student = req.body;
  // Creating new student via model
  const newStudent = new Student(student);
  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    await Student.findByIdAndRemove(id).exec();
    res.send('successfully deleted');
  } catch (error) {
    console.log(error);
  }
};
