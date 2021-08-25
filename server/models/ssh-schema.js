import mongoose from 'mongoose';

// id will be created automatically.
const sshSchema = mongoose.Schema({
  host: { type: String, required: true },
  username: { type: String, required: true },
  sshName: { type: String, required: true },
  identity: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
});

const SSH = mongoose.model('ssh', sshSchema);

export default SSH;
