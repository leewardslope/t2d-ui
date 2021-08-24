import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';

export const getKeys = async (req, res, next) => {
  console.log(`working`);
};

export const postKeys = async (req, res, next) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data!', 422)
    );
  }

  const keys = req.body;
  console.log(keys);
  console.log(req.userData.userId);

  // let user;
  // try {
  //   user = await User.findById(req.userData.userId);

  //   if (!user) {
  //     return next(new HttpError('Could not find user for provided ID!', 404));
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err });
  // }

  // let createdApp = new App({ ...app, creator: req.userData.userId });
  // // createdApp = { ...createdApp, image: 'https://picsum.photos/200' };
  // // createdApp = { ...createdApp, creator: req.userData.userId }; => This format is not working!

  // try {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();

  //   await createdApp.save({ session: session });
  //   user.apps.push(createdApp);

  //   // Mongo defined push, will only add the app ID to user.
  //   await user.save({ session: session });
  //   await session.commitTransaction();
  // } catch (err) {
  //   return next(new HttpError('Creating app failed, please try again!', 409));
  // }

  // res.status(201).json(createdApp);
};
