import mongoose from 'mongoose';

// id will be created automatically.
const envSchema = mongoose.Schema({
  var: [{ type: String, required: true }],
  val: [{ type: String, required: true }],
  app: { type: mongoose.Types.ObjectId, ref: 'app' },
});

const ENV = mongoose.model('env', envSchema);

export default ENV;
