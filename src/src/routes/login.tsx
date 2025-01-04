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

export const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();


    const { user, login, logout } = usePocket();

    if (user) {
        return <div>
            Already logged in as: {JSON.stringify(user)}
            <Button onClick={logout}>Logout</Button>
        </div>;
    }

    const handleSubmit = async (event: any) => {

        if (!emailRef.current?.value || !passwordRef.current?.value) {
            return;
        }

        await login(emailRef.current.value, passwordRef.current.value,);

        navigate("/dashboard");

    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Create your deck in seconds.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Input
                        ref={emailRef}
                        type="email"
                        placeholder="example@example.com"
                        className="mb-2"
                    />
                    <Input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                        className="mb-2"
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSubmit}>Login</Button>
                    <Link to="/register">Don't have an account? Register</Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;