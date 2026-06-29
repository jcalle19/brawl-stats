'use client'
import {createContext, useState, useContext, useMemo} from 'react'

const matchContext = createContext();
export const useMatchContext = () => useContext(matchContext);

const MatchProvider = ({children}) => {
    const [selectedMatch, setSelectedMatch] = useState({map: 'none'});
    const [focusedMapStats, setFocusedMapStats] = useState({
            brawlerTotalGames: 0, 
            brawlerWL: 0,
            brawlerMVP: 0,
            mapTotalGames: 0,
            mapWL: 0,
            mapMVP: 0
        });
    const value=useMemo(()=>({
        selectedMatch, setSelectedMatch,
        focusedMapStats, setFocusedMapStats,
    }),[selectedMatch]);
    return (
        <matchContext.Provider value={value}>
            {children}
        </matchContext.Provider>
  )
}

export default MatchProvider;