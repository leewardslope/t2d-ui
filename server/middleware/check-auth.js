import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import HttpError from '../models/https-error.js';

dotenv.config();

export default (req, res, next) => {
  // This is not required but I can't stop myself :p

  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'

    if (!token) {
      throw new Error('Authentication Failed');
    }

    // When creating the token, we stored the userId and email
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Now I will dynamically add the data to the request, even GET request will have a body
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    return next(new HttpError('Authentication Failed', 403));
  }
};
