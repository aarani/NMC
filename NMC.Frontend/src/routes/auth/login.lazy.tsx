import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/login')({
    component: LoginComponent
})

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { API } from '@/main' 

export default function LoginComponent() {

  const [error, setError] = useState("");

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate({ from: '/auth/login' })
  
  const loginMutation = useMutation({
    mutationFn: async (data) => {
        try {
            const res = await API.post("/auth/login", { Email: email, Password: password } , {
                params: {
                    useCookies: true
                }
            });
            
            if (res.status != 200)
              throw "Invalid email or password";

            navigate({ to: "/" });
            return res;
        } catch (error) {
            setError("Invalid email or password");
            throw error;
        }
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(data) => setEmail(data.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required  value={password} onChange={(data) => setPassword(data.target.value)}/>
            </div>
            {error && <p className=" py-2 text-red-500 text-sm">{error}</p>}
            <Button type="button" onClick={() => loginMutation.mutate()} className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
