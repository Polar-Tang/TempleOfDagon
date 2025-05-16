import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { AlertDestructive } from '@/components/AlertErrorComponent'
import useAuthReq from "@/hooks/useAuthReq"
import { verifyString, verifyMinLength, verifyMaxLength, verifyEmail } from '@/lib/helpers/validations'; // Adjust the import path as needed


type LinkDirection = {
  to: string
  label: string
}

type FieldDataProps = {
  field_tag: string,
  type: string,
  name: "password" | "email" | "name",
  id: string,
  placeholder: string,
  className: string
}

type AuthTypeProps = {
  titleH1: string
  cardDescription: string
  linkDirections?: LinkDirection[]
  field_data_props: FieldDataProps[]
  submit_bottom_text: string
  endpoint: string,
  endpointInSuccessCase: string
}


const AuthCard = ({ endpointInSuccessCase, titleH1, cardDescription, linkDirections, field_data_props, submit_bottom_text, endpoint }: AuthTypeProps) => {

  const {
    handleRegister,
    isUserHasLogged,
    setIsUserHasLogged,
    message,
    isReqSubmited,
    setisReqSubmited
  } = useAuthReq({ endpoint })
  const navigate = useNavigate()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isUserHasLogged || isReqSubmited ) {
      timeoutId = setTimeout(() => {
        setIsUserHasLogged(false)
        setisReqSubmited(false)
        if (endpointInSuccessCase && isUserHasLogged) {
          navigate(endpointInSuccessCase)

        }
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

            {linkDirections && <LinkList linkDirections={linkDirections} />}
            <Button type="submit" className="w-full">
              {submit_bottom_text}
            </Button>
            {(isUserHasLogged || isReqSubmited) && (
              <AlertDestructive
              title={message.title}
              description={message.description}
              variant={message.variant}
              />
            )}
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


type inputFiels = {
  password?: string
  name?: string
  email?: string
}

const InputList = ({ field_data_props }: { field_data_props: FieldDataProps[] }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({} as inputFiels)

  const validateField = (name: string, value: string) => {
    let error = null;

    const stringError = verifyString(name, value);
    if (stringError) return stringError;

    switch (name) {
      case 'name':
        error = verifyMinLength(name, value, 2) ||
          verifyMaxLength(name, value, 50);
        break;

      case 'email':
        error = verifyEmail(name, value) || verifyMinLength(name, value, 8)
        break;

      case 'password':
        error = verifyMinLength(name, value, 8) ||
          verifyMaxLength(name, value, 30);
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: validateField(name, value)
    }))

    console.log(formState)
  };


  return (
    <>
      {
        field_data_props.map((field_props) => {
          const inputName: "password" | "email" | "name" = field_props.name;

          return (
            <>
              {
                inputName == "password"
                  ? <div className="space-y-2 relative">

                    <Label htmlFor="password" >Password
                      <DotCheck valueField={formState[inputName]} nameField={inputName} />

                    </Label>
                    <div className="relative">
                      <Input
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder={field_props.placeholder}
                        className="pr-10"
                        onChange={handleInputChange}
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
                  </div >
                  :
                  <div className="space-y-2">
                    <Label htmlFor={field_props.name}>{field_props.name}
                      <DotCheck valueField={formState[inputName]} nameField={inputName} />
                    </Label>

                    <Input onChange={handleInputChange} name={field_props.name} id={field_props.id} type={field_props.type} placeholder={field_props.placeholder} required />
                  </div>
              }
            </>
          )
        }
        )}

    </>
  )

}

const DotCheck = ({ valueField, nameField }: { valueField: string | undefined, nameField: string }) => {
  return (
    <>
      {valueField ?
        <div className="relative group">
          <div
            className={`w-3 h-3 rounded-full ${Boolean(valueField) ? 'bg-red-500' : 'bg-green-500'}`}
            aria-label={Boolean(valueField) ? "Validation error" : "Validation passed"}
          ></div>

          <div className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap pointer-events-none">
            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-xs">
              {Boolean(valueField) ? valueField : `${nameField} is valid`}
            </div>
          </div>
        </div>
        : <span></span>}

    </>
  )
}