import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {
    console.log('hello');
  },
  logout: () => {
    console.log('hello');
  },
});
