import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {
    console.log('hello');
  },
  logout: () => {
    console.log('hello');
  },
});
