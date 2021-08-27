import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';
import Env from '../models/env-schema.js';
import Ssh from '../models/ssh-schema.js';

let app;

// I can essentially make it as a middleware => After check-auth and before rest of the routes.
export const checkConnection = async (req, res, next) => {
  const appId = req.params.aid;
  try {
    app = await App.findById(appId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ app: app.toObject({ getters: true }) });
};

export const establishConnection = async (req, res, next) => {};
