import React, { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import { getProfile, getUser } from './services/fetch-utils';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [userName, setUserName] = useState('');
  const stateAndSetters = {
    user,
    setUser,
    userName,
    setUserName,
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfile();
        setUserName(data.user_name);
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    };
    loadData();
  }, []);

  return <DataContext.Provider value={stateAndSetters}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
