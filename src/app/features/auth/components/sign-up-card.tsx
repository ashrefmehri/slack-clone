import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { FaExclamationCircle, FaGithub } from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react"
import { useAuthActions } from "@convex-dev/auth/react"


interface SignUpCardProps {
    setState: (state: SignInFlow) => void
}

export const SignUpCard = ({setState}: SignUpCardProps) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pending , setPending] = useState(false)
    const [error , setError] = useState("")

    const {signIn} = useAuthActions()

    const handleProviderSignUp = (value : "github" | "google") => {
        setPending(true)
       signIn(value)
       .finally(() => setPending(false))
    }

    const onPasswordSignUp = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setError("Password and confirm password do not match")
            return
        }
        setPending(true)
        signIn("password",{name,email,password,flow:"signUp"})
        .catch((error) => {
            setError("Something went wrong")
        })
        .finally(() => setPending(false))
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-center">Sign up to continue</CardTitle>
            </CardHeader>
            <CardDescription className="text-center pb-4">
                Use your email or another service to Create an account
            </CardDescription>
            <div className="mb-4">
            {!!error && (
                <div className="bg-destructive/80  text-white text-sm p-3 rounded-md flex items-center gap-x-2">
                    <FaExclamationCircle className="size-4" />
                    {error}
                </div>
            )}
            </div>
             <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
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
                   value={name}
                   type="text"
                   required
                   placeholder="Full Name"
                   onChange={(e) => setName(e.target.value)}
                   />
                    
                    <Input
                    disabled={pending}
                    value={password}
                    type="password"
                    required
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />

<Input
                    disabled={pending}
                    value={confirmPassword}
                    type="password"
                    required
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>Continue</Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button 
                    disabled={pending}
                    onClick={() => handleProviderSignUp("google")}
                    variant="outline"
                    size="lg"
                    className="w-full relative font-semibold"
                    >
                        <FcGoogle  className="size-5 absolute left-2.5 top-3" />
                        Continue with Google
                    </Button>
                    <Button 
                    disabled={pending}
                    onClick={() => handleProviderSignUp("github")}
                    variant="outline"
                    size="lg"
                    className="w-full relative font-semibold"
                    >
                        <FaGithub className="size-5 absolute left-2.5 top-3" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                   Already have an account?  <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign in</span>
                </p>
             </CardContent>
            
        </Card>
    )
}