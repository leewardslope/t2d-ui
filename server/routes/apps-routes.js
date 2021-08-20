import express from 'express';

import HttpError from '../models/https-error.js';

const router = express.Router();

const DUMMY_APPS = [
  {
    id: 'a1',
    name: 'Forem',
    title: 'Leewardslope',
    description: 'An open source platform to build community based on DEV',
    creator: 'u1',
  },
  {
    id: 'a2',
    name: 'Forem',
    title: 'DEV',
    description: 'An open source platform to build community based on DEV',
    creator: 'u2',
  },
  {
    id: 'a3',
    name: 'Forem',
    title: 'DEV',
    description: 'An open source platform to build community based on DEV',
    creator: 'u1',
  },
];

router.get('/:aid', (req, res, next) => {
  const appId = req.params.aid;
  const apps = DUMMY_APPS.find(e => {
    return e.id === appId;
  });

  if (!apps) {
    const error = new HttpError('could not find an app for the app id', 404);
    throw error;
  }

  res.json({ apps });
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const apps = DUMMY_APPS.filter(e => {
    return e.creator === userId;
  });

  // For some reason, filter method cannot use !apps to give error
  if (apps.length === 0) {
    // const error = new Error('could not find an app for the user id');
    // error.code = 404;
    // return next(error);
    // throw error;
    return next(new HttpError('could not find an app for the user id', 404));
  }

  res.json({ apps });
});

export default router;
