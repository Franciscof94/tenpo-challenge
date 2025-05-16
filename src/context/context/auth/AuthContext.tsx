import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (fakeToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);