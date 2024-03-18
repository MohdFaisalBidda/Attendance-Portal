import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);

  const login = async (userData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        userData
      );
      setUser(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
      toast.success("Logged In Successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
