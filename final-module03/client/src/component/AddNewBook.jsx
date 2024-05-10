// AuthProvider.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token,setToken] = useState('')
  return (
    <AuthContext.Provider value={{ role, isLoggedIn, token, setRole, setIsLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
