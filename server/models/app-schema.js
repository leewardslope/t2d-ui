import mongoose from 'mongoose';

// id will be created automatically.
const appSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
});

const App = mongoose.model('app', appSchema);

export default App;
