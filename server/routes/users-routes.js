import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';

import {
  getUsers,
  signup,
  login,
  getUserByUserId,
} from '../controllers/users-controller.js';

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  signup
);

router.post('/login', login);

router.use(checkAuth);
router.get('/:uid', getUserByUserId);

export default router;
