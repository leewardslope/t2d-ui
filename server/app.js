import express from 'express';
import bodyParser from 'body-parser';

import appsRoutes from './routes/apps-routes.js';

const app = express();

app.use('/api/apps', appsRoutes);

app.listen(5000);
