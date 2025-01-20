import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Copy, Delete, Download, Edit, PlayIcon, Trash } from "lucide-react";
import { DashboardMenu } from "@/components";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Link } from "react-router-dom";

import { usePocket } from "@/contexts/pb";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function Dashboard() {
    const { pb, user, decks, deleteDeck, createDeck } = usePocket();

    const handleCreateDeck = async () => {
        const deck = await createDeck("new deck");
    };

    if (decks.length === 0) {
        return (
            <div className="w-full">
                <DashboardMenu />
                <div className="flex justify-center items-center h-full w-full flex-col gap-3">
                    <p className="text-muted-foreground text-xl">
                        No decks found.
                    </p>
                    <Button
                        onClick={handleCreateDeck}
                        className="bg-secondary text-primary hover:text-background"
                    >
                        <Plus /> New deck
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <DashboardMenu />

            <div className="m-5">
                <p className="text-3xl">
                    Dashboard
                </p>

                <p className="text-muted-foreground">Decks</p>
            </div>
            <div className="flex">
                <div
                    className="w-[300px] m-5 flex gap-5 bg-secondary rounded p-3 text-muted-foreground text-sm items-center focus-within:ring-2 focus-within:blue-500"
                    onClick={() =>
                        document.getElementById("search-input")?.focus()}
                >
                    <Search size={15} />
                    <input
                        id="search-input"
                        className="bg-transparent border-none focus:outline-none text-muted-foreground"
                        placeholder="Search in decks"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Sort by</p>
                    <Select defaultValue="last">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="last">
                                    last modified
                                </SelectItem>
                                <SelectItem value="created">
                                    last created
                                </SelectItem>
                                <SelectItem value="alphabetical">
                                    alphabetical
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="w-full m-5 gap-5">
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="border border-primary rounded p-5 hover:border-blue-500 hover:bg-secondary">
                            <div className="flex items-center text-left gap-10 w-[300px]">
                                <Plus />
                                <div>
                                    <p>Empty deck</p>
                                    <p className="text-sm text-muted-foreground">
                                        Start from scratch
                                    </p>
                                </div>
                            </div>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a deck</DialogTitle>
                            <DialogDescription>
                                Add your deck name here, and any Tags to
                                associate with it. Click create when you're
                                ready.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="bg-secondary rounded flex-col flex border p-2 focus-within:border-blue-500">
                            <Label htmlFor="email">Name</Label>
                            <input
                                type="email"
                                placeholder="New Deck"
                                className="rounded-none bg-muted focus-visible:ring-0 focus:outline-none"
                                id="email"
                            />
                        </div>

                        <div className="bg-secondary rounded border p-2 h-[100px]">
                            <Label htmlFor="tags">Tags</Label>
                        </div>

                        <div className="">
                            <Label>Create a tag</Label>
                            <hr className="m-4" />
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    placeholder="Tag name"
                                    className="rounded-none  focus-visible:ring-0 focus:outline-none"
                                    id="email"
                                />
                                <button>add</button>
                            </div>
                        </div>

                        <div className="border shadow-sm h-200 flex flex-wrap gap-4">
                            <div className="w-50 h-50 border shadow-sm m-4 p-2 flex items-center gap-2 text-sm bg-secondary">
                                <Plus width={20} />
                                DATA 220
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap m-5 gap-5">
                {decks.map((deck) => (
                    <div className="relative w-[150px] h-[200px] border rounded-xl shadow-lg">
                        <div className="rounded-xl absolute inset-0 bg-gradient-to-bl from-green-100 via-transparent to-transparent z-10">
                        </div>
                        <div className="rounded-xl relative w-[150px] h-[200px] flex flex-col justify-between bg-gradient-to-br from-blue-100 via-transparent to-transparent z-10">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {deck.name}
                                </CardTitle>
                                <CardDescription>
                                    {deck.cards ? deck.cards.length : "0"} cards
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="flex justify-between">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to={`/editor/${deck.id}`}>
                                                <PlayIcon
                                                    size={15}
                                                />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Copy
                                                size={15}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Make a copy</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Download
                                                size={15}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Download</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Trash
                                            size={15}
                                        />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <p>
                                                    This action cannot be
                                                    undone. You are permanently
                                                    deleting deck{" "}
                                                    <strong>{deck.name}
                                                    </strong>.
                                                </p>
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-500"
                                                onClick={() =>
                                                    deleteDeck(deck.id)}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
