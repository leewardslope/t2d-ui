import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Socket.io
import { createServer } from 'http';
import { Server } from 'socket.io';

// This is not the default import model supported by nodejs, so I should add the .js suffix
import HttpError from './models/https-error.js';
import appsRoutes from './routes/apps-routes.js';
import usersRoutes from './routes/users-routes.js';
import keysRoutes from './routes/ssh-keys-routes.js';
import envRoutes from './routes/env-routes.js';
import buildRoutes from './routes/build-route.js';

import test from './tasks/test.js';

// Loading ENV variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // This is to make the development server compatible
  cors: {
    origin: ['http://75.119.143.54:8081'],
  },
});

io.on('connection', socket => {
  // console.log(socket);
  app.set('socket', socket); // With this I can use socket in any route by pointing it
  // const socket = req.app.get('socket');

  // socket.on('build-data', (number, string, object) => {
  //   console.log(number, string, object);
  // });
});

// adding this body-parser to help post requests => and should be before the respective request.
app.use(bodyParser.json({ limit: '20mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: 'true' }));
app.use(cors());

app.use('/', express.static('../client/build'));

app.use('/api/apps', appsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/ssh', keysRoutes);
app.use('/api/env', envRoutes);
app.use('/api/build', buildRoutes);
app.use('/ansible', test);

// This is another middleware which I want to run after all routes
// Put in other words, this middleware will be reached, if the above middleware fails
app.use((use, res, next) => {
  // Now I would like to push a 404 error, so let me handle this by my own error handler by importing it => HttpError
  const error = new HttpError('could not find this route', 404);
  next(error);
});

// 4 variable middleware, express detects it as a special middle ware to handle, errors.
// Any error from the above routes will sit here!
// This should be triggered
app.use((error, req, res, next) => {
  // If by chance I had some on-place error handle, it will not repeat again.
  if (res.headerSent) {
    return next(error);
  }

  return res
    .status(error.code || 500)
    .json({ message: error.message || 'An Unknown Error Occurred!' });
});

// Configuring and Connecting to mongoDB
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_PORT = process.env.NODE_PORT || 5000;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    httpServer.listen(NODE_PORT, () => {
      console.log(`Connection established and running on PORT: ${NODE_PORT}`);
    })
  )
  .catch(err => console.error(err.message));

mongoose.set('useFindAndModify', false);
