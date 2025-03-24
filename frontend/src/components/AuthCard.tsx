/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { AlertDestructive } from '@/components/AlertErrorComponent'

type variant = "default" | "destructive"

type AlertProps = {
  title: string
  description: string
  variant: variant
}

const AuthCard = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isUserHasLogged, setIsUserHasLogged] = useState(false)
  const [message, setMessage] = useState({title: "", description: "", variant: "destructive"} as AlertProps)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    if (isUserHasLogged) {
      timeoutId = setTimeout(() => {
        setIsUserHasLogged(false)
      }, 2000)
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isUserHasLogged]) 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const formularioJSX = e.target as HTMLFormElement
    const formValues: FormData = new FormData(formularioJSX)

    const form_state = {
      password: formValues.get("password"),
      email: formValues.get("email")
    }
    // for(let field in form_state) {
    //     form_state[field]: string = 
    // }
    try{
      const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
        console.log("Is ok?", data.response.ok)
        setIsUserHasLogged(true)
        setMessage({title: messageFromData, description: messageDescription, variant: "default"})
        console.log("Variant?", message.variant)
        return
				// setTimeout(() => {
				// 	login(data.response.payload.detail)
				// }, 2000)
			}
      setIsUserHasLogged(true)
      setMessage({title: messageFromData, description: messageDescription, variant: "destructive"})
      return
		} catch (error) {
			setIsUserHasLogged(true)
      setMessage({title: "Error", description: "Ocurri&oacute un error, por favor intente de nuevo m&aacutes tarde ", variant: "destructive"})
		}
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaRegEyeSlash className="bg-transparent" /> : <FaRegEye className="bg-transparent" />}
                </button>
              </div>
            </div>
            <hr />
            <Link to={"/register"} className="text-sm text-black block text-right">
              No tengo cuenta
            </Link>
            <Link to={"/register"} className="text-sm text-black block text-right">
              Olvid&eacute mi contrase&ntildea
            </Link>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {isUserHasLogged && (<AlertDestructive title={message.title} description={message.description} variant={message.variant} />)}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default AuthCard