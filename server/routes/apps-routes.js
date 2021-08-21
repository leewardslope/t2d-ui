import express from 'express';
import { getAppById, getAppsByUserId } from '../controllers/apps-controller.js';

const router = express.Router();

router.get('/:aid', getAppById);

router.get('/user/:uid', getAppsByUserId);

export default router;
