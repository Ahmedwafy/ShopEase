"use client";
import { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  logged: boolean;
  setLogged: (value: boolean) => void;
  handleLogin: (token: string) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [logged, setLogged] = useState(false);

  // Save Log In state even after reload page
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLogged(true); // update state if token exists
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("userToken", token);
    setLogged(true); // update state
  };

  // Provide value to other components
  return (
    <AuthContext.Provider value={{ logged, setLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// To Use Context in other components
// Ex: const { logged } = useAuth(); and not  const { logged } = useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext); // Use Value from AuthContext.Provider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // context contains { logged, setLogged } to use them in any component
};
