import express from 'express';
import { check } from 'express-validator';

import { getUsers, signup, login } from '../controllers/users-controller.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  signup
);

router.post('/login', login);

export default router;
