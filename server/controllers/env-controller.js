import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';
import ENV from '../models/env-schema.js';

export const getENVByAppId = async (req, res, next) => {};

export const createENV = async (req, res, next) => {};

export const updateENV = async (req, res, next) => {};
