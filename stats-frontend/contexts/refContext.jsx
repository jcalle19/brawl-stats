'use client'
import {createContext, useContext, useRef, useMemo} from 'react'

const refContext = createContext();
export const useRefContext = () => useContext(refContext);

const RefProvider = ({children}) => {
    const currUsername = useRef('');

    const value=useMemo(()=>({
        currUsername
    }),[]);
    return (
        <refContext.Provider value={value}>
            {children}
        </refContext.Provider>
  )
}

export default RefProvider;