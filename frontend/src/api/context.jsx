import React,{ createContext, useContext, useState,} from 'react';

const MineIdContext = createContext();

export const MineIdProvider = ({ children }) => {
  const [mineId, setMineId] = useState(null);

  const setMineIdValue = (value) => {
    setMineId(value);
  };

  return (
    <MineIdContext.Provider value={{ mineId, setMineIdValue }}>
      {children}
    </MineIdContext.Provider>
  );
};

export const useMineId = () => {
  return useContext(MineIdContext);
};
