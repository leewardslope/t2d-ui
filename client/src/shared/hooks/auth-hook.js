import { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(); // this variable is different from the below used, remember scoping => but using this in it.

  // Let's store token in local storage, i'm not ready for using cookies now!
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    // need of token expiration checks => date + 1hr
    // either we have it or create it (have it, is in case of 'refresh' login)
    // 1000 * 60 * 60;
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // Local storage is globally available variable and it stores in txt format.

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    // Local storage is just a text, we need to convert it into an object
    const storedData = JSON.parse(localStorage.getItem('userData'));
    // Checking if +1 hr time > present time
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration > new Date())
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { userId, token, login, logout };
};

export default useAuth;
