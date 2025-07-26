import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE1JTlRFU1QyIiwiYXVkIjoiVU5LTk9XTiIsImlzSW52ZXN0b3IiOmZhbHNlLCJ1c2VyTmFtZSI6IkFETUlOVEVTVDIiLCJleHAiOjI3NjczNTAyMjIxLCJ1c2VySWQiOjk4MjMsImlhdCI6MTc1MzUwMjIyMX0.IIV77LV09t7udo4xhQ0UtS7LGAaGvfXLhCEG3LYDYM1c3KjQKxd-f5qHoXvLsWQfyknd_Ob5e-FaHR8XHdS4pg"
  );
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get_token");
        console.log(res.data);
        setToken(res.data);
      } catch (err) {
        console.log({ error: err });
      }
    };
    handleLogin();
  }, []);

  useEffect(() => {
    // const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem("userData");

    // if (storedToken && storedUserData) {
    if (storedUserData) {
      // setToken(storedToken);
      try {
        setUserData(JSON.parse(storedUserData));

        // Set up heartbeat interval
        // setInterval(async () => {
        //   try {
        //     const heartbeatRes = await axios.get(
        //       "/api/admin/public/api/v1/heartbeat",
        //       {
        //         headers: {
        //           Authorization: `Bearer ${token}`,
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     );
        //     console.log("Heartbeat success:", heartbeatRes.data);
        //   } catch (err) {
        //     console.error("Heartbeat failed:", err);
        //   }
        // }, 10 * 60 * 1000); // 10 minutes
      } catch (err) {
        console.error("Failed to parse userData from localStorage:", err);
        // localStorage.removeItem("userData");
      }
      // console.log('Loaded from localStorage → Token:', storedToken);
    } else {
      console.log("No auth data found in localStorage.");
    }
  }, []);

  const login = (user) => {
    setUserData(user);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{ token, userData, setToken, login, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth
export const useAuth = () => useContext(AuthContext);
