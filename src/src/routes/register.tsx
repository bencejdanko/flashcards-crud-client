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

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { usePocket } from "@/contexts";

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const registerFormSchema = z.object({
    email: z.string()
        .min(1, { message: "This field is required." })
        .email("This is not a valid email format."),
    name: z.string()
        .min(1, { message: "This field is required." }),
    password: z.string()
        .min(8, "Your password must be longer than 8 letters.")
        .max(71, "Your password can be up to 71 letters."),
    passwordConfirm: z.string()
        .min(8, "Your password must be longer than 8 letters.")
        .max(71, "Your password can be up to 71 letters."),
});

export const Register = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { createUser } = usePocket();

    const registerForm = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: "",
        },
    });

    async function onRegisterFormSubmit(
        values: z.infer<typeof registerFormSchema>,
    ) {
        const { error } = await createUser(
            values.email,
            values.name,
            values.password,
            values.passwordConfirm,
        );

        if (error) {
            toast({
                variant: "destructive",
                title:
                    "Failed to register! Please try again, or use a different email.",
                description: error.message,
            });
            return;
        } else {
            toast({
                variant: "default",
                title: "Successfully registered!",
                description: "You can now login.",
            });
            navigate("/login");
        }
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
                                    Register
                                </CardTitle>
                                <CardDescription className="text-xl">
                                    Create your deck in seconds.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex gap-4 flex-col">
                                <Form {...registerForm}>
                                    <form
                                        onSubmit={registerForm.handleSubmit(
                                            onRegisterFormSubmit,
                                        )}
                                    >
                                        <FormField
                                            control={registerForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email here"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the email you
                                                        will use to login.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Display Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter your name here"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is how others will see your name. You can change this later.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password here"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the password you
                                                        will use to login.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="passwordConfirm"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password here"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Please confirm your
                                                        password.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button className='my-2' type="submit">
                                            Register
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>

                            <CardFooter className="flex justify-between underline">
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
