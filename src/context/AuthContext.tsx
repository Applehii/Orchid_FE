import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../service/localStorageService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userName: string) => {
    setIsAuthenticated(true);
    setUser(userName);
    localStorage.setItem("userName", userName);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
