import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';
import Env from '../models/env-schema.js';
import Ssh from '../models/ssh-schema.js';

import SSH2Promise from 'ssh2-promise';
// import SFTP from 'ssh2-promise/lib/sftp';
import fs from 'fs';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();
const encrypt = new Cryptr(process.env.CRYPTR_SECRET);
let app;

// I can essentially make it as a middleware => After check-auth and before rest of the routes.
export const checkConnection = async (req, res, next) => {
  const appId = req.params.aid;
  const userId = req.userData.userId;

  // Checking existence of App
  let app;
  try {
    app = await App.findById(appId);
  } catch (error) {
    return next(new HttpError('Unable to locate the app', 404));
  }

  // Backed user validation.
  let user;
  if (app.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not allowed to use/update this app', 403)
    );
  } else {
    user = await User.findById(req.userData.userId).populate('keys');
  }

  // console.log(user.keys);

  // Checking the existence of SSH Keys
  if (user.keys.length === 0) {
    return next(
      new HttpError(
        `You haven't configured your Server, please add at least one SSH Key`,
        403
      )
    );
  } else {
    // Based on user requirement, I will extract the key, for now, I will use [0]
    const serverKey = user.keys[0];
    const encrypted = serverKey.identity;
    const decryptedString = encrypt.decrypt(encrypted);

    // Saving Key in node server filesystem.
    try {
      await fs.writeFileSync(`./ssh_keys/${serverKey.host}`, decryptedString);
    } catch (err) {
      console.log(err);
      return next(
        new HttpError(
          `Unable to extract the provided SSH Key, Please try again later`,
          500
        )
      );
    }
  }

  // Checking required ENV variables.
  let env;
  if (app.app == 'Forem') {
    env = await Env.findOne({ appID: appId });
    if (!env) {
      // I know for sure, right now it should have at least one env.
      // Also, I should make tight validations so user will provide all the required ENV variables
      return next(
        new HttpError(
          `You haven't configured your ENV variables, please add them by "Editing your APP"`,
          403
        )
      );
    }
  } else if (app.app === 'Wordpress') {
    console.log('Wordpress Logic goes here');
  }

  res.status(200).json({ message: 'Checking Passed, Moving to Step 02' });
};

export const establishConnection = async (req, res, next) => {
  res.status(200).json({
    message: 'Establish Connection to your SSH Server, Moving to Step 03',
  });
};
