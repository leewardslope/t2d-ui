import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './routes/student.js';

const app = express();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json({ limit: '20mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: 'true' }));
app.use(cors());

// Routes with middleware (index to route to controller)
app.use('/students', studentRoutes);

// Configuring and Connecting to mongoDB
const CONNECTION_URL =
  'mongodb+srv://leewardslope:iwillhack@cluster0.stpm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
