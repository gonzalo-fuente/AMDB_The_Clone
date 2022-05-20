import { createContext, useState } from "react";

export const TokenContext = createContext(null);

const TokenProvider = ({ children }) => {
  /* Get Token from localStorage */
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  /* Save Token to localStorage */
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  /* Remove Token from localStorage */
  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = {
    token,
    saveToken,
    clearToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export default TokenProvider;
