import React, { useContext, useState } from 'react'
import { AlertProps } from "@/types/AlertTypes"
import { AuthContext } from '@/context/AuthContext'

const useAuthReq = ({ endpoint }: { endpoint: string }) => {
  const [isUserHasLogged, setIsUserHasLogged] = useState(false)
  const [message, setMessage] = useState({ title: "", description: "", variant: "destructive" } as AlertProps)
  const [isReqSubmited, setisReqSubmited] = useState(false)
  // const {setToken} = useContext(AuthContext)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const formularioJSX = e.target as HTMLFormElement
    const formValues: FormData = new FormData(formularioJSX)

    const form_state = {
      password: formValues.get("password"),
      name: formValues.get("name"),
      email: formValues.get("email")
    }
    try {
      const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_state)
      })

      const data = await responseHTTP.json()
      const messageFromData = data.response.message
      const messageDescription = data.response.payload.detail
      console.log("Is ok from the backend ", data.response.ok)
      if (data.response.ok) {
        setIsUserHasLogged(true)
        sessionStorage.setItem("access_token", String(messageDescription))
        setMessage({ title: messageFromData, description: "Bienvenido a halloween", variant: "default" })
        return
        // setTimeout(() => {
        // 	login(data.response.payload.detail)
        // }, 2000)
      }
      data.response.payload.
      setIsUserHasLogged(false)
      setisReqSubmited(true)
      setMessage({ title: messageFromData, description: messageDescription, variant: "destructive" })
      return

    } catch (error) {
      console.log(error)
      setisReqSubmited(true)
      setIsUserHasLogged(false)
      setMessage({ title: "Error", description: "Ocurrió un error, por favor intente de nuevo más tarde ", variant: "destructive" })
    }
  }

  return {
    handleRegister,
    isUserHasLogged,
    setIsUserHasLogged,
    setMessage,
    message,
    isReqSubmited, 
    setisReqSubmited
  }
}

export default useAuthReq