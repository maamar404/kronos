import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [textSearch, setTextSearch] = useState('');

  return (
    <SearchContext.Provider value={[textSearch, setTextSearch]}>
      {children}
    </SearchContext.Provider>
  );
};