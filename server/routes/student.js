import express from 'express';
import {
  getStudents,
  createStudent,
  deleteStudent,
} from '../controllers/student.js';
import Student from '../models/Student.js';

const router = express.Router();

// Getting routes via callbacks, i.e., controller. (you should create the respective functions in student controller and import them here)
router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

export default router;
