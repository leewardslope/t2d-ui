import mongoose from 'mongoose';

// Creating Schema
// Always keep these names similar to that of the names we use in frontEnd
const studentSchema = mongoose.Schema({
  regNo: Number,
  name: String,
  grade: String,
  section: {
    type: String,
    default: 'A',
  },
  // subjects: [String],
});

// Creating Models
const student = mongoose.model('student', studentSchema);

export default student;

// Now using this model we can create our CRUD operations.
