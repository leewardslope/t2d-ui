import express from 'express';
import bodyParser from 'body-parser';

import appsRoutes from './routes/apps-routes.js';

const app = express();

app.use('/api/apps', appsRoutes);

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

app.listen(5000);
