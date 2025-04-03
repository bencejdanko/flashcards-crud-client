import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

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
import { Deck, Tag } from "@/contexts/pb/types";
import { Textarea } from "./ui/textarea";

import { AddTagsCombobox } from "./add-tags";
import { Button } from "./ui/button";

import { TextEditor } from "./text-editor";

const createDeckSchema = z.object({
    document: z.string().min(1, { message: "This field is required." }),
});

const FLASHCARD_TYPE = "flashcard";

function CreateFlashcardDialog({
    children,
    deck,
    callback,
    isOpen,
    setIsOpen,

}: { 
    children: React.ReactNode; 
    deck: Deck; 
    callback?: () => void;
    isOpen?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;

}) {
    const { createTag, createCardTag, createCard } = usePocket();
    const { toast } = useToast();
    const [tags, setTags] = React.useState<Tag[]>([]);

    async function onCreateFlashcardFormSubmit(
        values: z.infer<typeof createDeckSchema>,
    ) {
        const { card, error } = await createCard(
            deck.id,
            FLASHCARD_TYPE,
            values.document,
        );

        if (error) {
            toast({
                variant: "destructive",
                title: "Error creating flashcard",
                description:
                    "Something went wrong while creating your flashcard.",
            });
            return;
        }

        console.log("Entered tags: ", tags);

        if (false) {
            for (const tag of []) {
                const { tag: createdTag, error: tagError } = await createTag(
                    tag,
                );

                if (tagError) {
                    toast({
                        variant: "destructive",
                        title: "Error creating tag",
                        description:
                            `Something went wrong while creating the tag ${tag}`,
                    });
                    return;
                }

                const { error: cardTagError } = await createCardTag(
                    card!.id,
                    createdTag!.id,
                );

                if (cardTagError) {
                    toast({
                        variant: "destructive",
                        title: "Error creating card tag",
                        description:
                            "Something went wrong while connecting the tag with the deck.",
                    });
                    return;
                }
            }
        }

        toast({
            variant: "success",
            title: "Flashcard created!",
            description: "You've successfully created a new flashcard.",
        });

        if (callback) {
            callback();
        }
    }

    const createFlashcardForm = useForm<z.infer<typeof createDeckSchema>>({
        resolver: zodResolver(createDeckSchema),
        defaultValues: {
            document: "",
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-2">
                <DialogHeader>
                    <DialogTitle>Create Flashcard</DialogTitle>
                    <DialogDescription>
                        Create a new flashcard
                    </DialogDescription>
                </DialogHeader>
                <Form {...createFlashcardForm}>
                    <form
                        onSubmit={createFlashcardForm.handleSubmit(
                            onCreateFlashcardFormSubmit,
                        )}
                    >
                        <FormField
                            control={createFlashcardForm.control}
                            name="document"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="document">
                                        Document
                                    </FormLabel>
                                    <FormControl>
                                        <TextEditor value={``} onChange={()=>{}} />
                                    </FormControl>

                                    <FormDescription>
                                        The document should be in YAML format.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AddTagsCombobox tags={tags} setTags={setTags} />

                        <div className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                className="bg-green-500"
                            >Create flashcard</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export { CreateFlashcardDialog };