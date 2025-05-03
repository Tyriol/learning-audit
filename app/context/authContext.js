"use client";

import { useState, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
