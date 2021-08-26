import mongoose from 'mongoose';

// id will be created automatically.
const envSchema = mongoose.Schema({
  var: [{ type: String, required: true }],
  val: [{ type: String, required: true }],
  // env: [{ type: String, required: true }],
  appID: { type: String, required: true },
});

const ENV = mongoose.model('env', envSchema);

export default ENV;
