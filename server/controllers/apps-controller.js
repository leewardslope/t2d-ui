import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';

// With the delete method => I will overwrite the array => so to negate assignment errors, I changed it to let from const.
let DUMMY_APPS = [
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

export const getAppById = async (req, res, next) => {
  const appId = req.params.aid;

  try {
    const apps = await App.findById(appId);
    // To make life easier and convert _id to id
    res.json({ apps: apps.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an App!',
      500
    );
    return next(error);
  }

  if (!apps) {
    const error = new HttpError('could not find an app for the app id', 404);
    return next(error);
  }
};

export const getAppsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let apps;

  try {
    apps = await App.find({ creator: userId });
    // This will not return an object to use `toObject` method
    res.json({ apps: apps.map(e => e.toObject({ getters: true })) });
  } catch (err) {
    const error = new HttpError(
      'Fetching apps failed, please try again later!',
      500
    );
    return next(error);
  }

  if (!apps || apps.length === 0) {
    return next(new HttpError('could not find an app for the user id', 404));
  }
};

export const createApp = async (req, res, next) => {
  // Using the Validation result of the middleware created in the routes file.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data!', 422);
  }

  const app = req.body;

  const createdApp = new App(app);
  try {
    await createdApp.save();
    res.status(201).json(createdApp);
  } catch (err) {
    // res.status(409).json({ message: err.message });
    return next(new HttpError('Creating app failed, please try again!', 409));
  }
};

export const updateApp = async (req, res, next) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // For more detailed error, check the errors related stuff here => console.log(errors)
    throw new HttpError('Invalid inputs passed, please check your data!', 422);
  }

  // For patch request we will also have a body
  const { title, description } = req.body;
  const appId = req.params.aid;
  let app;

  try {
    app = await App.findById(appId);
    // I need one more try catch, so came out by using let
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update app', 500)
    );
  }

  app.title = title;
  app.description = description;

  try {
    await app.save();
    res.status(200).json({ app: app.toObject({ getters: true }) });
  } catch (err) {
    // Just to show that we can also use this, rather than hard coding errors every time.
    res.status(505).json({ message: err.message });
  }
};

export const deleteApp = async (req, res, next) => {
  const appId = req.params.aid;
  let app;

  try {
    app = await App.findById(appId);
  } catch (err) {
    return next(
      new HttpError('Could not delete the app, please try again!', 500)
    );
  }

  try {
    await app.remove();
    res.status(200).json({ message: 'deleted app' });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
};
