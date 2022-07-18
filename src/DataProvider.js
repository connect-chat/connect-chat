import React from 'react';
import { useState, 
  useContext, 
  createContext } from 'react';
import { getUser } from './services/fetch-utils';
import { getMessages } from './services/fetch-utils';
import { getRooms } from './services/fetch-utils';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [messages, setMessages] = useState(getMessages());
  const [rooms, setRooms] = useState(getRooms());
  const stateAndSetters = {
    user,
    setUser,
    rooms,
    setRooms,
    messages,
    setMessages
  };

  return <DataContext.Provider value={stateAndSetters}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
