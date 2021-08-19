export function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}
