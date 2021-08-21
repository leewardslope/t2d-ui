import express from 'express';
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
router.post('/', createApp);

// First patch, with a mixture of some data in the URL and some from the body
router.patch('/:aid', updateApp);

router.delete('/:aid', deleteApp);

export default router;
