// UserContext.js

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSub, setUserSub] = useState(null);

  return (
    <UserContext.Provider value={{ userSub, setUserSub }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
