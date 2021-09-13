import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

import HttpError from '../models/https-error.js';
import Ssh from '../models/ssh-schema.js';
import User from '../models/user-schema.js';

dotenv.config();
const encrypt = new Cryptr(process.env.CRYPTR_SECRET);

export const getKeys = async (req, res, next) => {
  try {
    // const config = await Ssh.findById(req.userData.userId);
    const config = await Ssh.findOne({ creator: req.userData.userId });
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

  let newKey = new Ssh({
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
    const config = await Ssh.findOne({ creator: req.userData.userId });
    res.json(config);
  } catch (error) {
    console.log(error);
  }
};

// The frontend was not ready to use this.
export const deleteKeys = async (req, res, next) => {
  // I need to find the id of the key, it will be sent from frontend
  const keyId = req.params.kid;

  let key;
  try {
    // const config = await Ssh.findOne({ creator: req.userData.userId });
    key = await Ssh.findById(keyId).populate('creator'); // in order to use populate we need to configure ref first
  } catch (err) {
    return next(
      new HttpError('Could not delete the key, please try again!', 500)
    );
  }

  if (!key) {
    return next(new HttpError('Could not find key for this ID!', 404));
  }

  // remember => creator here is a full object which has access via populated content using ref
  if (key.creator.id !== req.userData.userId) {
    new HttpError('You are not allowed to delete/update this key', 403);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await key.remove({ session: session });

    key.creator.keys.pull(key); // Mongodb Pull => Not Array Pull

    await key.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
  res.status(200).json({ message: 'key deleted' });
};
