
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user for demonstration
const MOCK_USER: User = {
  id: 'user123',
  displayName: 'John Traveler',
  email: 'john@example.com',
  photoURL: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = () => {
      setTimeout(() => {
        // For demo purposes, we'll use local storage to persist login state
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
          setUser(MOCK_USER);
        } else {
          setUser(null);
        }
        setLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  const login = async (): Promise<void> => {
    setLoading(true);
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('isLoggedIn', 'true');
    setUser(MOCK_USER);
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
