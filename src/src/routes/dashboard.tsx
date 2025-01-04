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

import { Link } from "react-router-dom";

import { usePocket } from "@/contexts/pb";

function Dashboard() {
    const { user, decks, deleteDeck } = usePocket();

    return (
        <div>
            <DashboardMenu />
            <div className="flex flex-wrap">
                {decks.map((deck) => (
                    <Card className="m-2 w-[150px] h-[200px] flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                {deck.name}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Edit
                                                size={15}
                                                className="ml-2"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Rename</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
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
                                            <p>This action cannot be undone. You are permanently deleting deck <strong>{deck.name}</strong>.</p>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction 
                                            className="bg-red-500"
                                            onClick={() => deleteDeck(deck.id)}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
