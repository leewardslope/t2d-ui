import express from 'express';
import { check } from 'express-validator';
// check is a method, that provides middleware, once middleware was created => you need to use that in the controller by importing other packages to display error!

import {
  getAppById,
  getAppsByUserId,
  createApp,
  updateApp,
  deleteApp,
} from '../controllers/apps-controller.js';

const router = express.Router();

router.get('/:aid', getAppById);

router.get('/user/:uid', getAppsByUserId);

router.post(
  '/',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  createApp
);

router.patch(
  '/:aid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updateApp
);

router.delete('/:aid', deleteApp);

export default router;
