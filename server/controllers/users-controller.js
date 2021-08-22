import { validationResult } from 'express-validator';

import HttpError from '../models/https-error.js';
import User from '../models/user-schema.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password'); //get everything except password
    res.json({ users: users.map(e => e.toObject({ getters: true })) });
  } catch (err) {
    next(new HttpError('Fetching users failed, pleased try again later!', 500));
  }
};

export const signup = async (req, res, next) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // For more detailed error, check the errors related stuff here => console.log(errors)
    next(new HttpError('Invalid inputs passed, please check your data!', 422));
  }

  let user = req.body;
  user = { ...user, image: 'https://bit.ly/dan-abramov' };

  //Checking for unique email address
  try {
    const existingEmail = await User.findOne({ email: user.email });
    if (existingEmail) {
      return next(
        new HttpError(
          'There is an existing user with the same email address',
          409
        )
      );
    }
  } catch (err) {
    return next(new HttpError('SignUp failed, please try again later', 400));
  }

  const createdUser = new User(user);

  try {
    await createdUser.save();
    res.json({ user: createdUser.toObject({ getters: true }) });
  } catch (err) {
    // res.status(409).json({ message: err.message });
    return next(new HttpError('Creating User failed, please try again!', 409));
  }
};

export const login = async (req, res, next) => {
  const user = req.body;

  try {
    const identifier = await User.findOne({ email: user.email });

    if (!identifier || identifier.password !== user.password) {
      return next(
        new HttpError(
          'could not identify the user, credentials seems to be wrong!',
          401
        )
      );
    }
  } catch (err) {
    return next(new HttpError('Login failed, try again!', 409));
  }

  res.json({ message: 'logged in!' });
};
