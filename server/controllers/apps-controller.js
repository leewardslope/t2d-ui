import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';

export const getAppById = async (req, res, next) => {
  const appId = req.params.aid;

  let apps;
  try {
    apps = await App.findById(appId);
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
  } catch (err) {
    const error = new HttpError(
      'Fetching apps failed, please try again later!',
      500
    );
    return next(error);
  }

  if (!apps || apps.length === 0) {
    // Intentionally added 203, so that it will not be considered as an error!
    return next(new HttpError('could not find an app for the user id', 203));
  }

  res.json({ apps: apps.map(e => e.toObject({ getters: true })) });
};

export const createApp = async (req, res, next) => {
  // Using the Validation result of the middleware created in the routes file.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data!', 422)
    );
  }

  const app = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId);

    if (!user) {
      return next(new HttpError('Could not find user for provided ID!', 404));
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }

  let createdApp = new App({ ...app, creator: req.userData.userId });
  // createdApp = { ...createdApp, image: 'https://picsum.photos/200' };
  // createdApp = { ...createdApp, creator: req.userData.userId }; => This format is not working!

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdApp.save({ session: session });
    user.apps.push(createdApp);

    // Mongo defined push, will only add the app ID to user.
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Creating app failed, please try again!', 409));
  }

  res.status(201).json(createdApp);
};

export const updateApp = async (req, res, next) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // For more detailed error, check the errors related stuff here => console.log(errors)
    next(new HttpError('Invalid inputs passed, please check your data!', 422));
  }

  // For patch request we will also have a body
  const { title, description, repo } = req.body;
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

  // req.userData.userId => came from token
  // app.creator.toString() => as this is coming from mongodb; sometimes we need to make it a string for comparisons.
  if (app.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to use/update this app', 403)
    );
  }

  app.title = title;
  app.description = description;
  app.repo = repo;

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
    app = await App.findById(appId).populate('creator'); // in order to use populate we need to configure ref first
  } catch (err) {
    return next(
      new HttpError('Could not delete the app, please try again!', 500)
    );
  }

  if (!app) {
    return next(new HttpError('Could not find app for this ID!', 404));
  }

  // remember => creator here is a full object which has access via populated content using ref
  if (app.creator.id !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to delete/update this app', 403)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await app.remove({ session: session });

    app.creator.apps.pull(app); // Mongodb Pull => Not Array Pull

    await app.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
  res.status(200).json({ message: 'deleted app' });
};
