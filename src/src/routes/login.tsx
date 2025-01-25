import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { usePocket } from "@/contexts";

const loginFormSchema = z.object({
    email: z.string()
        .min(1, { message: "This field is required." })
        .email("This is not a valid email format."),
    password: z.string()
        .min(8, "Your password must be longer than 8 letters.")
        .max(71, "Your password can be up to 71 letters."),
});

export const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { authWithPassword } = usePocket();

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onLoginFormSubmit(values: z.infer<typeof loginFormSchema>) {
        const { record, error } = await authWithPassword(
            values.email,
            values.password,
        );

        if (error) {
            toast({
                variant: "destructive",
                title: "Failed to authenticate!",
                description:
                    "Either your email or password is incorrect. Please re-enter, or reset your password.",
            });
            return;
        } else {
            toast({
                variant: "default",
                title: "Successfully authenticated!",
                description: "Welcome back!",
            });
        }

        navigate("/dashboard");
    }

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
                                    Login
                                </CardTitle>
                                <CardDescription className="text-xl">
                                    Create your deck in seconds.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex gap-4 flex-col">
                                <Form {...loginForm}>
                                    <form
                                        onSubmit={loginForm.handleSubmit(
                                            onLoginFormSubmit,
                                        )}
                                    >
                                        <FormField
                                            control={loginForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="example@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the email you
                                                        used to sign up.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="********"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the password you
                                                        used to sign up.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button className='my-2' type="submit">
                                            Submit
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="flex justify-between underline">
                                <div className="flex gap-10">
                                    <Link to="/register">
                                        Don't have an account? Register
                                    </Link>

                                    <Link to="/register">
                                        Forgot your password?
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

export default Login;
