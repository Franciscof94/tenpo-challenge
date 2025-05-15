import { useState, type ReactNode } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { AUTH_KEY } from "../../../routes/routes";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem(AUTH_KEY);
  });

  const login = (fakeToken: string) => {
    setToken(fakeToken);
    sessionStorage.setItem(AUTH_KEY, fakeToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
