
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  email: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Improved useEffect to ensure synchronization with localStorage
  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("studygenius_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("Auth state restored from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("studygenius_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in a real app, you'd call a backend API
    const user = { email, isAuthenticated: true };
    localStorage.setItem("studygenius_user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
    console.log("User logged in:", user);
  };

  const signup = async (email: string, password: string) => {
    // Mock signup - in a real app, you'd call a backend API
    const user = { email, isAuthenticated: true };
    localStorage.setItem("studygenius_user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
    console.log("User signed up:", user);
  };

  const logout = () => {
    localStorage.removeItem("studygenius_user");
    setUser(null);
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
