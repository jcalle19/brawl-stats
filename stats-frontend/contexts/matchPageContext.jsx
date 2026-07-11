'use client'
import {createContext, useContext, useState, useMemo} from 'react'

const matchPageContext = createContext();
export const useMatchPageContext = () => useContext(matchPageContext);

const MatchPageProvider = ({children}) => {
    const [currPage, setCurrPage] = useState(0);

    const value=useMemo(()=>({
        currPage, setCurrPage
    }),[currPage]);
    return (
        <matchPageContext.Provider value={value}>
            {children}
        </matchPageContext.Provider>
  )
}

export default MatchPageProvider;