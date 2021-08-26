import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';
import Env from '../models/env-schema.js';

export const getENVByAppId = async (req, res, next) => {
  const appId = req.params.aid;

  let oldEnv;
  try {
    oldEnv = await Env.findOne({ appID: appId });
  } catch (err) {
    return next(
      new HttpError('Could not delete the app, please try again!', 500)
    );
  }

  if (!oldEnv) {
    res
      .status(200)
      .json({ message: `You haven't configured your ENV variables` });
  } else {
    res.status(200).json({ env: oldEnv });
  }
};

export const createENV = async (req, res, next) => {
  const appId = req.params.aid;
  const envs = req.body.env;

  const vars = envs.map(e => e.var);
  const vals = envs.map(e => e.val);

  let oldEnv;
  try {
    oldEnv = await Env.findOne({ appID: appId });
  } catch (err) {
    return next(
      new HttpError('Could not delete the app, please try again!', 500)
    );
  }

  if (!oldEnv) {
    let createdENV = new Env({ var: vars, val: vals, appID: appId });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      await createdENV.save({ session: session });
      // app.env.push(createdENV);

      // Mongo defined push, will only add the app ID to user.
      //  await env.save({ session: session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return next(new HttpError('Adding ENV failed, please try again!', 409));
    }
    // res.status(200).write({ message: 'Testing' });
    res.status(200).json({ message: 'successfully saved' });
  } else {
    oldEnv.var = vars;
    oldEnv.val = vals;

    try {
      await oldEnv.save();
      res.status(200).json({ message: 'ENV Variables Saved' });
    } catch (err) {
      // Just to show that we can also use this, rather than hard coding errors every time.
      res.status(505).json({ message: err.message });
    }
  }
};

export const updateENV = async (req, res, next) => {};
