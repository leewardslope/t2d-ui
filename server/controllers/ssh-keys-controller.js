import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Cryptr from 'cryptr';
// import bcrypt from 'bcryptjs';

import HttpError from '../models/https-error.js';
import SSH from '../models/ssh-schema.js';
import User from '../models/user-schema.js';

const encrypt = new Cryptr('iwillhack');

export const getKeys = async (req, res, next) => {
  try {
    const config = await SSH.findById(req.userData.userId);
    res.json(config);
  } catch (error) {
    console.log(error);
  }
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

  let user;
  try {
    user = await User.findById(req.userData.userId);

    if (!user) {
      return next(new HttpError('Could not find user for provided ID!', 404));
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }

  const encryptedString = encrypt.encrypt(keys.identity);

  let newKey = new SSH({
    ...keys,
    identity: encryptedString,
    creator: req.userData.userId,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await newKey.save({ session: session });
    user.keys.push(newKey);

    // Mongo defined push, will only add the ID to user.
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError('Saving SSH Key failed, please try again!', 409));
  }

  res.status(200).json({ message: 'Key Added' });
};

export const updateKeys = async (req, res, next) => {
  try {
    const config = await SSH.findById(req.userData.userId);
    res.json(config);
  } catch (error) {
    console.log(error);
  }
};

export const deleteKeys = async (req, res, next) => {
  try {
    const config = await SSH.findById(req.userData.userId);
    res.json(config);
  } catch (error) {
    console.log(error);
  }
};
