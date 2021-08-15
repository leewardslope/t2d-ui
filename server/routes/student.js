import express from 'express';
import { getStudents, createStudent } from '../controllers/student.js';
import student from '../models/student.js';

const router = express.Router();

// Getting routes via callbacks, i.e., controller.
router.get('/', getStudents);
router.post('/', createStudent);

export default router;
