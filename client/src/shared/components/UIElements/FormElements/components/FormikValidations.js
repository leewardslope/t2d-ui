export function validateRequire(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value === 'Wordpress') {
    error = 'We are Working on it';
  }
  return error;
}

export function validateConfirmPassword(value, password) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value !== password) {
    error = "Passwords don't match";
  }
  return error;
}


export function validateName(value) {
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

export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

export function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length <= 7) {
    error = 'Password should be minimum 8 letters';
  }
  return error;
}
