import mongoose from 'mongoose';

// id will be created automatically.
const appSchema = mongoose.Schema({
  app: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  repo: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  env: { type: mongoose.Types.ObjectId, ref: 'env' },
});

const App = mongoose.model('app', appSchema);

export default App;
