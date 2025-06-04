import { AuthContext } from '@/context/AuthContext'
import { accessToken } from '@/types/ContextTypes'
import { useContext, useEffect } from 'react'
import FourOFourPage from '../404Page'

const LogoutPage = () => {
    const { setisUserLogged, setToken, setjwe } = useContext(AuthContext)

    useEffect(() => {
        setisUserLogged(false)
        setToken("")
        setjwe({} as accessToken)
        sessionStorage.removeItem("access_token")
    }, [])
    

  return (
    <>
    <FourOFourPage title='Goodbye' description='Thank you, return soon' redir='/login' />
    </>
  )
}

export default LogoutPage