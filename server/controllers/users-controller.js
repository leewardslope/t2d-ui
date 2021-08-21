import HttpError from '../models/https-error.js';
import { v4 as uuidv4 } from 'uuid';

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Akhil Naidu',
    email: 'kaparapu.akhilnaidu@gmail.com',
    password: 'iwillhack',
  },
];

export const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  //Checking for unique email address
  const existingEmail = DUMMY_USERS.find(e => e.email === email);
  if (existingEmail) {
    throw new HttpError('Could not create user, email already exists!', 422);
  }

  const createdUser = {
    id: uuidv4(),
    name: name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifier = DUMMY_USERS.find(e => e.email === email);
  // Non matching email or failed exact password
  if (!identifier || identifier.password !== password) {
    throw new HttpError(
      'could not identify the user, credentials seems to be wrong!',
      401
    );
  }

  res.json({ message: 'logged in!' });
};
