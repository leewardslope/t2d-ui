import express from 'express';
import { getStudents } from '../controllers/student.js';

const router = express.Router();

// Getting routes via callbacks, i.e., controller.
router.get('/', getStudents);

export default router;
