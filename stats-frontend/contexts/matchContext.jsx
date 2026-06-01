'use client'
import {createContext, useState, useContext, useMemo} from 'react'

const matchContext = createContext();
export const useMatchContext = () => useContext(matchContext);

const MatchProvider = ({children}) => {
    const [selectedMatch, setSelectedMatch] = useState({map: 'none'});
    const value=useMemo(()=>({
        selectedMatch, setSelectedMatch
    }),[selectedMatch]);
    return (
        <matchContext.Provider value={value}>
            {children}
        </matchContext.Provider>
  )
}

export default MatchProvider;