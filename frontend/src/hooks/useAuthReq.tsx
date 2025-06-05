import React, { useContext, useState } from 'react'
import { AlertProps } from "@/types/AlertTypes"
import { AuthContext } from '@/context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { accessToken } from '@/types/ContextTypes'

const useAuthReq = ({ endpoint }: { endpoint: string }) => {
  const { setisUserLogged } = useContext(AuthContext)
  const [message, setMessage] = useState({ title: "", description: "", variant: "destructive" } as AlertProps)
  const [isReqSubmited, setisReqSubmited] = useState(false)
  const { setjwe, setpreferences } = useContext(AuthContext)

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
      if (data.response.ok) {
        if (endpoint === "login") {
          const preferencesToken = responseHTTP.headers.get("x-preferences-token")
          console.log("#The preferrences header ", preferencesToken)
          if (preferencesToken) {
            const asdf = preferencesToken.split('.');
            const payloadJson = atob(asdf[1])
            
            const preferences = JSON.parse(payloadJson)
            setpreferences(preferences[0])
          }
          setisUserLogged(true)
          sessionStorage.setItem("access_token", String(messageDescription))
          const object_access_token = jwtDecode(messageDescription) as accessToken
          setjwe(object_access_token)

        }
        setMessage({ title: messageFromData, description: "Bienvenido a halloween", variant: "default" })
        return
        // setTimeout(() => {
        // 	login(data.response.payload.detail)
        // }, 2000)
      }

      setisReqSubmited(true)
      if (responseHTTP.status === 400) {
        setMessage({ title: messageFromData, description: messageDescription, variant: "destructive" })
        return
      }
      return

    } catch (error) {
      setisReqSubmited(true)
      setMessage({ title: "Error", description: "Ocurrió un error, por favor intente de nuevo más tarde ", variant: "destructive" })
    }
  }

  return {
    handleRegister,
    setMessage,
    message,
    isReqSubmited,
    setisReqSubmited
  }
}

export default useAuthReq