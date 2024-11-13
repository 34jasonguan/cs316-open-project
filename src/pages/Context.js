import React, { createContext, useContext, useState } from 'react';

// Create a Context for user state
const Context = createContext();

// Create a provider component
export const Provider = ({ children }) => {
    const [userID, setUserID] = useState('');

    return (
        <Context.Provider value={{ userID, setUserID }}>
            {children}
        </Context.Provider>
    );
};

// Custom hook for using the UserContext
export const useUser = () => {
    return useContext(Context);
};
