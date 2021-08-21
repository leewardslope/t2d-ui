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

// First get request, will be documented for more info!
router.get('/user/:uid', getAppsByUserId);

// First post request created. Will be documented for more info!
// we are not limited to one middleware => executes from left to right
router.post(
  '/',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  createApp
);
// need validation => added a new package called express-validator => manual validation is a lot of messy code

// First patch, with a mixture of some data in the URL and some from the body
router.patch(
  '/:aid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updateApp
);
// need validation => express-validator

router.delete('/:aid', deleteApp);

export default router;
