import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { usePocket } from "@/contexts/pb";

import { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const Register = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();


    const { user, register, logout } = usePocket();

    if (user) {
        return <div>
            Already logged in as: {JSON.stringify(user)}
            <Button onClick={logout}>Logout</Button>
        </div>;
    }

    const handleSubmit = async (event: any) => {
        event?.preventDefault();

        if (!emailRef.current?.value || !passwordRef.current?.value || !passwordConfirmRef.current?.value) {
            return;
        }

        await register(emailRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value);

        navigate("/login");

    };

    return (
        <div className="absolute h-full w-full bg-gradient-to-br from-blue-300 via-transparent to-transparent top-0 -z-10">
                    <div className="flex h-full">
                        <div className="absolute w-full h-full bg-gradient-to-bl from-green-300 via-transparent to-transparent top-0 -z-20">
                        </div>
        
                        <div className="flex-1 ml-20 mt-10 z-20">
                            <Card className="relative h-full flex items-center justify-center rounded-none rounded-tl-3xl">
                                <Link to={"/"}>
                                    <div className="absolute top-10 left-10 text-muted-foreground flex gap-3">
                                        <ArrowLeftIcon className="w-6 h-6" />
                                        Back to homepage
                                    </div>
                                </Link>
        
                                <div className="w-[80%]">
                                    <CardHeader>
                                        <CardTitle className="text-3xl">
                                            Register
                                        </CardTitle>
                                        <CardDescription className="text-xl">
                                            Create your deck in seconds.
                                        </CardDescription>
                                    </CardHeader>
        
                                    <CardContent className='flex gap-4 flex-col'>
                                        <div className="bg-blue-50 rounded flex-col flex border p-2 focus-within:border-blue-500">
                                            <Label htmlFor="email">Email</Label>
                                            <input
                                                ref={emailRef}
                                                type="email"
                                                placeholder="example@example.com"
                                                className="rounded-none bg-blue-50 focus-visible:ring-0 focus:outline-none"
                                                id="email"
                                            />
                                        </div>
        
                                        <div className="bg-blue-50 rounded flex-col flex border p-2 focus-within:border-blue-500">
                                            <Label htmlFor="password">Password</Label>
                                            <input
                                                ref={passwordRef}
                                                type="password"
                                                placeholder="password"
                                                className="rounded-none bg-transparent focus-visible:ring-0 focus:outline-none"
                                                id="password"
                                            />
                                        </div>

                                        <div className="bg-blue-50 rounded flex-col flex border p-2 focus-within:border-blue-500">
                                            <Label htmlFor="password">Confirm Password</Label>
                                            <input
                                                ref={passwordConfirmRef}
                                                type="password"
                                                placeholder="Re-enter password"
                                                className="rounded-none bg-transparent focus-visible:ring-0 focus:outline-none"
                                                id="password"
                                            />
                                        </div>
        
                                    </CardContent>
                                    <CardFooter className="flex justify-between underline">
                                        <Button onClick={handleSubmit}>Register</Button>
                                        <div className="flex gap-10">
                                            <Link to="/login">
                                                Already have an account? Login
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
    );
};

export default Register;