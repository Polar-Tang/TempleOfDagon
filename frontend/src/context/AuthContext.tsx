import { createContext, useEffect, useState } from 'react'
import type { AuthContextProps, ParentProps, accessToken } from '@/types/ContextTypes'
import { jwtDecode } from "jwt-decode";
import { Preferencess } from '@/types/AuthProps';

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: ParentProps) => {
    const [isUserLogged, setisUserLogged] = useState(false)
    const [jwe, setjwe] = useState({} as accessToken)
    const [token, setToken] = useState("")
    const [preferences, setpreferences] = useState({} as Preferencess)

    useEffect(() => {
        const access_token = sessionStorage.getItem("access_token")
        console.log("tHE ACCESDASDFASDTGF from the context ", access_token)
        if (access_token) {
            const object_access_token = jwtDecode(access_token) as accessToken
            setjwe(object_access_token )
            setisUserLogged(true)
        }
    }, [])
    
        
        
        // setjwe(object_access_token)
    return (
        <AuthContext.Provider value={{

            isUserLogged,
            setisUserLogged,
            jwe,
            setjwe,
            token,
            setToken,
            setpreferences,
            preferences
        }}>

            {children}

        </AuthContext.Provider>
    )
}

export default AuthProvider
