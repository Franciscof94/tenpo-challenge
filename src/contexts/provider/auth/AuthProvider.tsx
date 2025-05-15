import { useState, type ReactNode } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("authToken");
  });

  const login = (fakeToken: string) => {
    setToken(fakeToken);
    sessionStorage.setItem("authToken", fakeToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
