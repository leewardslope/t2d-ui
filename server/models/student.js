import mongoose from 'mongoose';

// Creating Schema
const studentSchema = mongoose.Schema({
  registrationNumber: Number,
  name: String,
  grade: String,
  section: {
    type: String,
    default: 'A',
  },
  subjects: [String],
});

// Creating Models
const student = mongoose.model('student', studentSchema);

export default student;

// Now using this model we can create our CRUD operations.
