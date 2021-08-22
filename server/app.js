import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// This is not the default import model supported by nodejs, so I should add the .js suffix
import HttpError from './models/https-error.js';
import appsRoutes from './routes/apps-routes.js';
import usersRoutes from './routes/users-routes.js';

// Loading ENV variables
dotenv.config();

const app = express();

// adding this body-parser to help post requests => and should be before the respective request.
app.use(bodyParser.json({ limit: '20mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: 'true' }));
app.use(cors());

app.use('/api/apps', appsRoutes);
app.use('/api/users', usersRoutes);

// This is another middleware which I want to run after all routes
// Put in other words, this middleware will be reached, if the above middleware fails
app.use((use, res, next) => {
  // Now I would like to push a 404 error, so let me handle this by my own error handler by importing it => HttpError
  const error = new HttpError('could not find this route', 404);
  throw error; // There is nothing Synchronous here, so no need of using return next(error)
  // This will send things to our default error handler => you can find it below
});

// 4 variable middleware, express detects it as a special middle ware to handle, errors.
// Any error from the above routes will sit here!
// This should be triggered
app.use((error, req, res, next) => {
  // If by chance I had some on-place error handle, it will not repeat again.
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  // I can add this json as end to the above status
  res.json({ message: error.message || 'An Unknown Error Occurred!' });
});

// Configuring and Connecting to mongoDB
const CONNECTION_URL = process.env.MONGO_DB_URL;
const NODE_PORT = process.env.NODE_PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(NODE_PORT, () => {
      console.log(`Connection established and running on PORT: ${NODE_PORT}`);
    })
  )
  .catch(err => console.error(err.message));

mongoose.set('useFindAndModify', false);
