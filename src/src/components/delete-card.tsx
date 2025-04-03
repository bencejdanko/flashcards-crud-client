import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { usePocket } from "@/contexts";
import { useToast } from "@/hooks/use-toast";

import { Card } from "@/contexts/pb/types";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const deleteCardSchema = z.object({
    confirmDelete: z.string().min(1, { message: "This field is required." }),
});

function DeleteCardDialog(
    {
        children,
        cardProp,
        callback,
    }: {
        children: React.ReactNode;
        cardProp: Card;
        callback: () => void;
    },
) {
    const { deleteCard } = usePocket();
    const { toast } = useToast();

    const deleteCardForm = useForm<z.infer<typeof deleteCardSchema>>({
        resolver: zodResolver(deleteCardSchema),
        defaultValues: {
            confirmDelete: "",
        },
    });

    async function onDeleteCardFormSubmit(
        values: z.infer<typeof deleteCardSchema>,
    ) {
        if (values.confirmDelete !== "DELETE") {
            deleteCardForm.setError("confirmDelete", {
                message: "Please type DELETE to confirm.",
            });
            return;
        }

        const { error } = await deleteCard(cardProp.id);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
            return;
        }

        toast({
            variant: "success",
            title: "Card deleted!",
            description: "The card has been successfully deleted.",
        });

        callback();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-2">
                <DialogHeader>
                    <DialogTitle>Delete Deck</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this deck?
                    </DialogDescription>
                </DialogHeader>
                <Form {...deleteCardForm}>
                    <form
                        onSubmit={deleteCardForm.handleSubmit(
                            onDeleteCardFormSubmit,
                        )}
                    >
                        <FormField
                            control={deleteCardForm.control}
                            name="confirmDelete"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="confirmDelete"
                                        className="text-destructive"
                                    >
                                        To delete the deck, type DELETE in the
                                        input.
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
                        <div className="flex justify-end mt-4">
                            <Button
                                className="bg-destructive"
                                type="submit"
                                disabled={!deleteCardForm.formState.isValid}
                            >
                                Delete
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { DeleteCardDialog };