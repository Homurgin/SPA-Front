//AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuth: false, user: null });
  const [users, setUsers] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState({});
  const [tempCourse, setTempCourse] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, users, setUsers, registeredCourses, setRegisteredCourses, tempCourse, setTempCourse }}>
      {children}
    </AuthContext.Provider>
  );
};
