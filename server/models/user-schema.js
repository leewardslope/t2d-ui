import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// id will be created automatically.
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  apps: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema);

export default User;
