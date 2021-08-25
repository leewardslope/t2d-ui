import express from 'express';
import { check } from 'express-validator';

import {
  getKeys,
  postKeys,
  updateKeys,
  deleteKeys,
} from '../controllers/ssh-keys-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

router.use(checkAuth);
router.get('/', getKeys);
router.post(
  '/new',
  [
    check('host').not().isEmpty(),
    check('username').not().isEmpty(),
    check('sshName').not().isEmpty(),
    check('identity').not().isEmpty(),
  ],
  postKeys
);
router.patch(
  '/update',
  [
    check('host').not().isEmpty(),
    check('username').not().isEmpty(),
    check('sshName').not().isEmpty(),
    check('identity').not().isEmpty(),
  ],
  updateKeys
);

router.delete('/update', deleteKeys);

export default router;
