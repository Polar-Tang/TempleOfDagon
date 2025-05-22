import { AuthContext } from '@/context/AuthContext'
import { accessToken } from '@/types/ContextTypes'
import { useContext, useEffect } from 'react'

const LogoutPage = () => {
    const { setisUserLogged, setToken, setjwe } = useContext(AuthContext)

    useEffect(() => {
        setisUserLogged(false)
        setToken("")
        setjwe({} as accessToken)
        sessionStorage.removeItem("access_token")
    }, [])
    

  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage