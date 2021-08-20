export function validateRequire(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value === 'admin') {
    error = 'Nice try!';
  } else if (value.length <= 4) {
    error = 'minimum 5 letters';
  }
  return error;
}
export function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value === 'admin') {
    error = 'Nice try!';
  } else if (value.length <= 7) {
    error = 'minimum 8 letters';
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
