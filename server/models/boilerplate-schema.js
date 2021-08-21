// Creating modal

import mongoose from 'mongoose';

const renameSchema = mongoose.Schema({});

const Rename = mongoose.model('rename', renameSchema);

export default Rename;

// Using model in controller
// Make sure your function is async
// You can choose any of the method to display error => but if you declare the constant `error` to save the `new HttpError` => then don't forget to `return next(error)`
import Rename from '../models/rename-schema.js';
const app = req.body;
const newStudent = new Rename(app); // even though the user sends more info than required, it will store according to the schema.
try {
  await newStudent.save();
  res.status(201).json(newStudent);
} catch (err) {
  // res.status(409).json({ message: err.message });
  return next(new HttpError('Creating app failed, please try again!', 409));
}
