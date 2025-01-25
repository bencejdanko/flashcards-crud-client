import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";

import { Plus, X } from "lucide-react";

import { Tag } from "@/contexts/pb/types";

import { useState } from "react";

function CreateTagsCombobox() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tag, setTag] = useState("");
    const [open, setOpen] = useState(false);
    const [userTags, setUserTags] = useState<Tag[] | undefined>(undefined);

    function handleSetOpen() {
        if (!userTags) {
            handleFetchTags();
        }

        setOpen(!open);
    }

    async function handleFetchTags() {
        setUserTags([]);
    }

    return (
        <Popover open={open} onOpenChange={handleSetOpen}>
            <PopoverTrigger asChild className="p-2">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between p-5 h-auto"
                >
                    <div className="flex gap-2 flex-wrap">
                        {selectedTags && selectedTags.length > 0
                            ? selectedTags.map((tag) => (
                                <button className="bg-primary text-background p-2 rounded text-xs justify-between flex flex-row gap-2">
                                    {tag}
                                    <button
                                        className="hover:bg-red-500 rounded flex items-center justify-center"
                                        onClick={() => {
                                            setSelectedTags(
                                                selectedTags.filter((
                                                    selectedTag,
                                                ) => selectedTag !==
                                                    tag
                                                ),
                                            );
                                        }}
                                    >
                                        <X />
                                    </button>
                                </button>
                            ))
                            : (
                                <p className="text-muted-foreground font-light">
                                    Which tag best represents this deck?
                                </p>
                            )}
                    </div>
                    <Plus className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput
                        placeholder="Search or create a new tag"
                        className=""
                        onInput={(e) =>
                            setTag(
                                (e.target as HTMLInputElement).value,
                            )}
                    />
                    <CommandList>
                        <CommandEmpty className="wrap">
                            <button
                                className="flex gap-2 items-center px-2 h-10 border-b hover:bg-blue-50 w-full"
                                onClick={() => {
                                    setSelectedTags([
                                        ...selectedTags,
                                        tag,
                                    ]);
                                }}
                            >
                                <Plus
                                    size={20}
                                    className="text-muted-foreground"
                                />
                                <p className="text-muted-foreground">
                                    Add new tag
                                </p>
                                <p>"{tag}"</p>
                            </button>
                        </CommandEmpty>
                        <CommandGroup className="p-0">
                            {tag.length > 0
                                ? (
                                    <button className="flex gap-2 items-center px-2 h-10 border-b hover:bg-blue-50 w-full">
                                        <Plus
                                            size={15}
                                            className="text-muted-foreground"
                                        />
                                        <p className="text-muted-foreground text-sm">
                                            Create new tag
                                        </p>
                                        <p>"{tag}"</p>
                                    </button>
                                )
                                : null}

                            {userTags?.map((tag: Tag) => (
                                <CommandItem
                                    key={tag.id}
                                    value={tag.name}
                                    onSelect={(currentValue) => {
                                        setSelectedTags([
                                            ...selectedTags,
                                            currentValue,
                                        ]);
                                    }}
                                >
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export { CreateTagsCombobox };