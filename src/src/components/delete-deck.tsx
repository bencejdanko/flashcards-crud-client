import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

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

import { Deck } from "@/contexts/pb/types";

const deleteDeckSchema = z.object({
    name: z.string().min(1, { message: "This field is required." }),
});

function DeleteDeckDialog(
    { children, deckProp, callback }: { children: React.ReactNode; deckProp: Deck; callback: () => void },
) {
    const { deleteDeck } = usePocket();
    const { toast } = useToast();
    const navigate = useNavigate();

    const deleteDeckForm = useForm<z.infer<typeof deleteDeckSchema>>({
        resolver: zodResolver(deleteDeckSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onDeleteDeckFormSubmit(
        values: z.infer<typeof deleteDeckSchema>,
    ) {
        if (values.name !== deckProp.name) {
            deleteDeckForm.setError("name", {
                message: "The deck name does not match.",
            });
            return;
        }

        const { error } = await deleteDeck(
            deckProp.id,
        );

        if (error) {
            toast({
                variant: "destructive",
                title: "Failed to delete deck!",
                description: "Something went wrong while deleting the deck.",
            });
            return;
        }

        toast({
            variant: "success",
            title: "Deck deleted!",
            description: "You've successfully deleted " + deckProp.name + ".",
        });

        callback();
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-2">
                <DialogHeader>
                    <DialogTitle>Delete Deck</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this deck?
                    </DialogDescription>
                </DialogHeader>
                <Form {...deleteDeckForm}>
                    <form
                        onSubmit={deleteDeckForm.handleSubmit(
                            onDeleteDeckFormSubmit,
                        )}
                    >
                        <FormField
                            control={deleteDeckForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name" className='text-destructive'>
                                        To delete the deck, retype the name of
                                        the deck, <br />"{deckProp.name}"
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This action cannot be undone!
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='my-2 bg-destructive' type="submit" disabled={!deleteDeckForm.formState.isValid}>
                            Delete
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { DeleteDeckDialog };