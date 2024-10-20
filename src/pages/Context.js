import React, { createContext, useContext, useState } from 'react';

// Create a Context for user state
const Context = createContext();

// Create a provider component
export const Provider = ({ children }) => {
    const [username, setUsername] = useState('');

    return (
        <Context.Provider value={{ username, setUsername }}>
            {children}
        </Context.Provider>
    );
};

// Custom hook for using the UserContext
export const useUser = () => {
    return useContext(Context);
};
