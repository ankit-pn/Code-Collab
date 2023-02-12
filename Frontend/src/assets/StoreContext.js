import { createContext, useState , useRef } from "react";

const StoreContext = createContext()

export const StoreProvider = ({children}) => { 
    const [options , setOptions] = useState(null)
    const [cast , setCast] = useState(null)
    const socketRef = useRef(null)

return(
    <StoreContext.Provider value={{
        options,
        setOptions,
        cast,
        setCast,
        socketRef

    }}>
        {children}
    </StoreContext.Provider>
    )
}

export default StoreContext