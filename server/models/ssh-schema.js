import mongoose from 'mongoose';

// id will be created automatically.
const sshSchema = mongoose.Schema({
  sshName: { type: String, required: true },
  sshKey: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
});

const SSH = mongoose.model('ssh', sshSchema);

export default SSH;
