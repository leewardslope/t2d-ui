import express from 'express';
import { check } from 'express-validator';
// check is a method, that provides middleware, once middleware was created => you need to use that in the controller by importing other packages to display error!

import {
  getENVByAppId,
  createENV,
  updateENV,
} from '../controllers/env-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.get('/:aid', getENVByAppId);

// router.use(checkAuth);

router.post('/:aid', createENV);

router.patch(
  '/:aid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updateENV
);

export default router;
