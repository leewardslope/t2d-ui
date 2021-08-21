import HttpError from '../models/https-error.js';
import { v4 as uuidv4 } from 'uuid';

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

export const getAppById = (req, res, next) => {
  const appId = req.params.aid;
  const apps = DUMMY_APPS.find(e => {
    return e.id === appId;
  });

  if (!apps) {
    const error = new HttpError('could not find an app for the app id', 404);
    throw error;
  }

  res.json({ apps });
};

export const getAppsByUserId = (req, res, next) => {
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
};

// First post request
// I wanna add a body-parser and that should be in the main routes folder, and before the url.
export const createApp = (req, res, next) => {
  // Here I will use object destructuring.
  const { name, title, description, creator } = req.body;
  // const props = req.body;

  // Creating an object literal, and
  // We could also create a class[modal] and use it as a blue print => but I will ; later replace it wil some mongodb logic
  const createdApp = {
    // id: props.id
    id: uuidv4(),
    name: name,
    title, // JS know this
    description,
    creator,
  };

  // Now this created app can be pushed to our DUMMY_APPS
  DUMMY_APPS.push(createdApp); // or with unshift() method to add first
  res.status(201).json({ app: createdApp });
};
