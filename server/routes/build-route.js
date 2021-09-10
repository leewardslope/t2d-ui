import express from 'express';
import { check } from 'express-validator';
// check is a method, that provides middleware, once middleware was created => you need to use that in the controller by importing other packages to display error!

import {
  checkConnection,
  establishConnection,
  send,
  installDokku,
} from '../controllers/build-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.use(checkAuth);
router.get('/:aid/check', checkConnection);
router.get('/:aid/connect', establishConnection);
router.get('/:aid/send', send);
router.get('/:aid/dokku', installDokku);

export default router;
