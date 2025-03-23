/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// interface LoginCardProps {
//     cardTitle: string;
//     cardDescription: string;
//     label: string[];
//     buttonText: string;
// }

// const LoginCard: React.FC<LoginCardProps> = ({
//     cardTitle,
//     cardDescription,
//     label,
//     buttonText
// }
// type formScheme = {
//     email: string
//     password: string
// }

const LoginCard = () => {

    // const form_state: formScheme = {
    //     email: '',
    //     password: ''
    // }

    const handleRegister = (e: React.FormEvent) => { 
        e.preventDefault()
        const formularioJSX = e.target as HTMLFormElement
        const formValues: FormData = new FormData(formularioJSX)
        
        console.log(formValues.get("email"))
        // for(let field in form_state) {
        //     form_state[field]: string = 
        // }
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          </CardContent>
        </Card>
      )
}

export default LoginCard