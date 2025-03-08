import { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({ email });
  };

  const signup = async (email, password) => {
    await axios.post(`${API_URL}/auth/signup`, { email, password });
  };

  return <AuthContext.Provider value={{ user, login, signup }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
