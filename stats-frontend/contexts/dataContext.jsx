import {createContext, useContext} from 'react'

const dataContext = createContext();
export const useDataContext = () => useContext(dataContext);

const DataProvider = ({children}) => {
    const value={}
    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
  )
}

export default DataProvider;