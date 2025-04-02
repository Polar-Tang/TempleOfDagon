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
import useAuthReq from "@/hooks/useAuthReq"

type LinkDirection = {
  to: string
  label: string
}

type FieldDataProps = {
  field_tag: string,
  type: string,
  name: string,
  id: string,
  placeholder: string,
  className: string
}

type AuthTypeProps = {
  titleH1: string
  cardDescription: string
  linkDirections: LinkDirection[]
  field_data_props: FieldDataProps[]
  submit_bottom_text: string
  endpoint: string
}


const AuthCard = ({ titleH1, cardDescription, linkDirections, field_data_props, submit_bottom_text, endpoint }: AuthTypeProps) => {

  const {
    handleRegister,
    isUserHasLogged,
    setIsUserHasLogged,
    message
  } = useAuthReq({ endpoint })

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

  

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{titleH1}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} >
          <div className="space-y-4">
            <InputList field_data_props={field_data_props} />
            <hr />
            <LinkList linkDirections={linkDirections} />
            <Button type="submit" className="w-full">
              {submit_bottom_text}
            </Button>
            {isUserHasLogged && (<AlertDestructive title={message.title} description={message.description} variant={message.variant} />)}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default AuthCard

const LinkList = ({ linkDirections }: { linkDirections: LinkDirection[] }) => {
  return (
    <>
      {linkDirections.map((link, index) => (
        <Link key={index} to={link.to} className="text-sm text-black block text-right hover:underline">
          {link.label}
        </Link>
      ))}
    </>
  )
}

const InputList = ({ field_data_props }: { field_data_props: FieldDataProps[] }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {
        field_data_props.map((field_props) => (
          <>
            {field_props.name == "password"
              ? <div className="space-y-2 relative">
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
              :
              <div className="space-y-2">
                <Label htmlFor={field_props.name}>{field_props.name}</Label>
                <Input name={field_props.name} id={field_props.id} type={field_props.type} placeholder={field_props.placeholder} required />
              </div>
            }
          </>
        ))}

    </>
  )
}