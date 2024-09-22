import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { FaExclamationCircle, FaGithub } from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"

interface SignInCardProps {
    setState: (state: SignInFlow) => void
}
export const SignInCard = ({setState}: SignInCardProps) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending , setPending] = useState(false)
    const [error , setError] = useState("")


    const {signIn} = useAuthActions()
     
    const onPasswordSignIn = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
       signIn("password",{email,password})
       .catch((error) => {
        setError('Invalid email or password')
       })
       .finally(() => setPending(false))
    }

    const handleProviderSignIn = (value : "github" | "google") => {
        setPending(true)
       signIn(value)
       .finally(() => setPending(false))
    }


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-center">Login to continue</CardTitle>
            </CardHeader>
            <CardDescription className="text-center pb-4">
                Use your email or another service to continue
            </CardDescription>
            <div className="pb-4">
            {!!error && (
                <div className="bg-destructive/80  text-white text-sm p-3 rounded-md flex items-center gap-x-2">
                    <FaExclamationCircle className="size-4" />
                    {error}
                </div>
            )}
            </div>
             <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                  <Input
                  disabled={pending}
                  value={email}
                  type="email"
                  required
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
                   />
                    <Input
                    disabled={pending}
                    value={password}
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>Continue</Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button 
                    disabled={false}
                    onClick={() => handleProviderSignIn("google")}
                    variant="outline"
                    size="lg"
                    className="w-full relative font-semibold"
                    >
                        <FcGoogle  className="size-5 absolute left-2.5 top-3" />
                        Continue with Google
                    </Button>
                    <Button 
                    disabled={false}
                    onClick={() => handleProviderSignIn("github")}
                    variant="outline"
                    size="lg"
                    className="w-full relative font-semibold"
                    >
                        <FaGithub className="size-5 absolute left-2.5 top-3" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    Don't have an account?  <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign up</span>
                </p>
             </CardContent>
            
        </Card>
    )
}