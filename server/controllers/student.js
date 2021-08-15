// Best place to list down all the router callbacks.

export const getStudents = (req, res) => {
  res.send('Router is Working');
};

// We will create a try catch block, because we are getting a request from the client and we need to handle that. => We need error handling
export const createStudent = async (req, res) => {
  try {
    // It will go to the student model and save its in this variable.
    const allStudents = await student.find();

    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
