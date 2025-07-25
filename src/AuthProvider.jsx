import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE1JTlRFU1QyIiwiYXVkIjoiVU5LTk9XTiIsImlzSW52ZXN0b3IiOmZhbHNlLCJ1c2VyTmFtZSI6IkFETUlOVEVTVDIiLCJleHAiOjI3NjczNDUyODgxLCJ1c2VySWQiOjk4MjMsImlhdCI6MTc1MzQ1Mjg4MX0.7yFw2Hi1emuDZNb-2LebxsGALfboo9E2zgXoGM1GJA1K6BsPANal1ADpWoWK_pOw4ILgtx-zJpw_-HwCKAEk3Q");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');

    // if (storedToken && storedUserData) {
     if (storedUserData) {

      // setToken(storedToken);
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        console.error('Failed to parse userData from localStorage:', err);
        localStorage.removeItem('userData');
      }
      // console.log('Loaded from localStorage → Token:', storedToken);
    } else {
      console.log('No auth data found in localStorage.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userData, setToken, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth
export const useAuth = () => useContext(AuthContext);
