import express from 'express';
import {
  getAppById,
  getAppsByUserId,
  createApp,
} from '../controllers/apps-controller.js';

const router = express.Router();

router.get('/:aid', getAppById);

// First get request, will be documented for more info!
router.get('/user/:uid', getAppsByUserId);

// First post request created. Will be documented for more info!
router.post('/', createApp);

export default router;
