import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({ email });
  };

  const signup = async (email, password) => {
    await axios.post("http://localhost:5000/auth/signup", { email, password });
  };

  return <AuthContext.Provider value={{ user, login, signup }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
