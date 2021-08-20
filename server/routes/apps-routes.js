import express from 'express';

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

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const apps = DUMMY_APPS.filter(e => {
    return e.creator === userId;
  });

  res.json({ apps });
});

router.get('/:aid', (req, res, next) => {
  const appId = req.params.aid;
  const apps = DUMMY_APPS.find(e => {
    return e.id === appId;
  });

  res.json({ apps });
});

export default router;
