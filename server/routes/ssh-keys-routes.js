import express from 'express';
import { check } from 'express-validator';

import { getKeys, postKeys } from '../controllers/ssh-keys-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.use(checkAuth);

router.get('/', getKeys);

router.post(
  '/new',
  [check('sshName').not().isEmpty(), check('sshKey').not().isEmpty()],
  postKeys
);

export default router;
