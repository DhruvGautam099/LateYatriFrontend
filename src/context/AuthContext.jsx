import React, { createContext, useContext, useState, useEffect } from 'react';











const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('railway-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('railway-token'));

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('railway-user', JSON.stringify(user));
      localStorage.setItem('railway-token', token);
    } else {
      localStorage.removeItem('railway-user');
      localStorage.removeItem('railway-token');
    }
  }, [user, token]);

  const loginUser = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login: loginUser,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN'
    }}>
      {children}
    </AuthContext.Provider>);

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};