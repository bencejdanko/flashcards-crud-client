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

import { Deck } from "@/contexts/pb/types";

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

function UpdateDeckDialog({ children, deckProp, callback }: { children: React.ReactNode, deckProp: Deck, callback?: () => void }) {
    const { updateDeck } = usePocket();
    const { toast } = useToast();

    const deckForm = useForm<z.infer<typeof deckSchema>>({
        resolver: zodResolver(deckSchema),
        defaultValues: {
            name: deckProp.name,
            description: deckProp.description || "",
        },
    });

    async function onDeckFormSubmit(values: z.infer<typeof deckSchema>) {

        if (!deckProp) {
            return;
        }

        const { deck, error } = await updateDeck(
            deckProp.id,
            values.name,
            values.description,
        );

        if (error) {
            toast({
                variant: "destructive",
                title: "Failed to update deck!",
                description: "Something went wrong while updating the deck.",
            });

            return;
        }

        toast({
            variant: "success",
            title: "Deck updated!",
            description: "You've successfully updated " + deck!.name + ".",
        });

        if (callback) {
            callback();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-2">
                <DialogHeader>
                    <DialogTitle>Update your deck</DialogTitle>
                    <DialogDescription>
                        Update your deck with a new name and description.
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
                                    <FormLabel>Name</FormLabel>
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

                        <Button className='my-2' type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { UpdateDeckDialog };
