import React, { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import { getProfile, getUser } from './services/fetch-utils';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [birthday, setBirthday] = useState('');
  const [userName, setUserName] = useState('');
  const stateAndSetters = {
    user,
    setUser,
    userName,
    setUserName,
    birthday,
    setBirthday
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfile();
        if (data) {
          setUserName(data.user_name);
          setBirthday(data.user_birthday);
        }
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    };
    loadData();
  }, [user]);
  //every time the user changes, we will fetch the profile again

  return <DataContext.Provider value={stateAndSetters}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
