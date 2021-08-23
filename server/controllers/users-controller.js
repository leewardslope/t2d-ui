import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import HttpError from '../models/https-error.js';
import User from '../models/user-schema.js';

dotenv.config();
console.log();

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
  // user = { ...user, image: 'https://bit.ly/dan-abramov' }; => Taking this a bit down

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
    return next(new HttpError('SignUp failed, please try again later', 500));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(user.password, 12);
  } catch (err) {
    return next(new HttpError('Creating User failed, please try again!', 500));
  }

  user = {
    ...user,
    image: 'https://bit.ly/dan-abramov',
    password: hashedPassword,
  };

  const createdUser = new User(user);

  try {
    await createdUser.save();
  } catch (err) {
    // res.status(409).json({ message: err.message });

    return next(new HttpError('Creating User failed, please try again!', 409));
  }

  // Once we have working token, we can add a middleware in routes to restrict certain things without this token
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Creating User failed, please try again!', 409));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
  // res.json({ user: createdUser.toObject({ getters: true }) }); => I don't even want to send other details like even the hashed password.
};

export const login = async (req, res, next) => {
  const user = req.body;
  let identifier;
  try {
    identifier = await User.findOne({ email: user.email });

    if (!identifier) {
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

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(user.password, identifier.password);
  } catch (err) {
    // What ever is the case, the above Comparison produces a boolean true or false
    return next(new HttpError('Creating User failed, please try again!', 500));
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        'could not identify the user, credentials seems to be wrong!',
        401
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifier.id, email: identifier.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Login failed, please try again!', 409));
  }

  res.json({ userId: identifier.id, email: identifier.email, token: token });
  // res.json({
  //   message: 'logged in!',
  //   user: identifier.toObject({ getters: true }),
  // });
};
