import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePocket } from "@/contexts";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const deckSchema = z.object({
    name: z.string().min(1, { message: "This field is required." }),
    description: z.string().optional(),
});

function CreateDeckDialog( { children }: { children: React.ReactNode }) {
    const { createDeck } = usePocket();
    const { toast } = useToast();
    const navigate = useNavigate();

    const deckForm = useForm<z.infer<typeof deckSchema>>({
        resolver: zodResolver(deckSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onDeckFormSubmit(values: z.infer<typeof deckSchema>) {
        const { deck, error } = await createDeck(
            values.name,
            values.description,
        );

        if (error) {
            toast({
                variant: "destructive",
                title: "Failed to create deck!",
                description: "Something went wrong while creating the deck.",
            });

            return;
        }

        toast({
            variant: "success",
            title: "Deck created!",
            description: "You've successfully created " + deck!.name + ".",
        });

        navigate(`/editor/${deck!.id}`);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-2">
                <DialogHeader>
                    <DialogTitle>Create a deck</DialogTitle>
                    <DialogDescription>
                        Add your deck name here, and any Tags to associate with
                        it. Click create when you're ready.
                    </DialogDescription>
                </DialogHeader>

                <Form {...deckForm}>
                    <form
                        onSubmit={deckForm.handleSubmit(onDeckFormSubmit)}
                    >
                        <FormField
                            control={deckForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (Required)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Create a descriptive name of your deck.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={deckForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Give a brief description of your deck.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='my-2 bg-green-500' type="submit" disabled={!deckForm.formState.isValid}>Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { CreateDeckDialog };
