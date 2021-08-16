import express from 'express';
import { test } from '../controllers/test.js';

const router = express.Router();

// Getting routes via callbacks, i.e., controller. (you should create the respective functions in student controller and import them here)
router.get('/', test);

export default router;
