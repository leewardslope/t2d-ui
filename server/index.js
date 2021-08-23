import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './routes/student.js';
import testRoutes from './routes/test.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json({ limit: '20mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: 'true' }));
app.use(cors());

app.use('/', express.static('../client/build'));

// Routes with middleware (index to route to controller)
app.use('/students', studentRoutes);
app.use('/test', testRoutes);

// Configuring and Connecting to mongoDB
const CONNECTION_URL = process.env.MONGO_DB_URL;
const NODE_PORT = process.env.NODE_PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(NODE_PORT, () => {
      console.log(`Connection established and running on PORT: ${NODE_PORT}`);
    })
  )
  .catch(err => console.error(err.message));

mongoose.set('useFindAndModify', false);
