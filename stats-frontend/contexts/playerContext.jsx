'use client'
import {createContext, useContext, useState} from 'react'

const playerContext = createContext();
const playerSetterContext = createContext();

export const usePlayerContext = () => useContext(playerContext);
export const usePlayerSetterContext = () => useContext(playerSetterContext);

const PlayerProvider = ({children}) => {
    const [selectedPlayer, setSelectedPlayer] = useState({});

    return (
        <playerSetterContext.Provider value={setSelectedPlayer}>
            <playerContext.Provider value={selectedPlayer}>
                {children}
            </playerContext.Provider>
        </playerSetterContext.Provider>
        
  )
}

export default PlayerProvider;