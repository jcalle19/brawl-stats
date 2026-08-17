'use client'
import {createContext, useContext, useState, useMemo} from 'react'

const matchPageContext = createContext();
export const useMatchPageContext = () => useContext(matchPageContext);

const MatchPageProvider = ({children}) => {
    const [currPage, setCurrPage] = useState(0);
    const [matchBoxOpen, setMatchBoxOpen] = useState(false);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);

    const value=useMemo(()=>({
        currPage, setCurrPage,
        matchBoxOpen, setMatchBoxOpen,
        sidePanelOpen, setSidePanelOpen,
    }),[currPage, matchBoxOpen, sidePanelOpen]);
    return (
        <matchPageContext.Provider value={value}>
            {children}
        </matchPageContext.Provider>
  )
}

export default MatchPageProvider;