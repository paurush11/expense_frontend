import React, { createContext, useContext, useState } from 'react';

type GlobalUIStateContextType = {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
};

const GlobalUIStateContext = createContext<GlobalUIStateContextType | undefined>(undefined);

export const GlobalUIStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <GlobalUIStateContext.Provider value={{ isModalOpen, setModalOpen }}>
            {children}
        </GlobalUIStateContext.Provider>
    );
};

export const useGlobalUIState = () => {
    const context = useContext(GlobalUIStateContext);
    if (!context) throw new Error('useGlobalUIState must be used within a GlobalUIStateProvider');
    return context;
};