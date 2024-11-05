// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

//TODO: Handling logout if token expires

interface AuthContextType {
  user: JwtPayload | null; // Specify the user as JwtPayload or null
  authTokens: string | null;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authTokens: null,
  loginUser: () => {},
  logoutUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const [user, setUser] = useState<JwtPayload | null>(() =>
    authTokens ? jwtDecode<JwtPayload>(authTokens) : null
  );

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode<JwtPayload>(authTokens));
    } else {
      setUser(null);
    }
  }, [authTokens]);

  const loginUser = (token: string) => {
    console.log("token", token);
    setAuthTokens(token);
    localStorage.setItem("token", token);
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
