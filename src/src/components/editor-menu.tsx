import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

import { ChevronLeft, Menu, Plus, Search, Undo2 } from "lucide-react";

import { CreateFlashcardDialog } from "./create-flashcard";

import { useEffect, useState } from "react";

import { Deck, Question } from "@/contexts/pb/types";
import { usePocket } from "@/contexts";

export function EditorMenu(
    { deck, createCardCallback }: {
        deck: Deck;
        createCardCallback: () => void;
    },
) {
    const { questions } = usePocket();

    const [activeDialog, setActiveDialog] = useState<any | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (question: Question) => {
        switch (question.type) {
            case "Flashcard":
                setActiveDialog({ component: CreateFlashcardDialog });
                setIsDialogOpen(true);
                break;
            default:
                setActiveDialog({ component: CreateFlashcardDialog });
                setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setActiveDialog(null);
    };

    return (
        <Menubar className="rounded-none shadow-none border-none m-2 flex justify-between h-8 ">
            <div className="flex items-center gap-2 h-full">
                <MenubarMenu>
                    <MenubarTrigger className="border h-full pl-1">
                        <Link
                            to={"/dashboard"}
                            className="flex items-center gap-1"
                        >
                            <ChevronLeft size={20} />
                            Back to Dashboard
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="border h-full aspect-square p-1">
                        <Menu size={15} />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem disabled={true}>
                            Import Project YAML
                        </MenubarItem>
                        <MenubarItem disabled={true}>
                            Download Project YAML
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="border h-full p-1">
                        <Search size={15} />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem disabled={true}>
                            Search
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="border h-full p-0 flex items-center gap-1">
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center p-1 rounded text-white">
                            <Plus size={15} />
                        </div>
                    </MenubarTrigger>
                    <MenubarContent>
                        <div className="flex flex-col gap-1 w-full">
                            {questions?.map((question) => {
                                return (
                                    <MenubarItem
                                        key={question.type}
                                        onClick={() => {
                                            handleOpenDialog(question);
                                        }}
                                    >
                                        <div className="flex items-center gap-2 text-sm font-thin w-full hover:bg-secondary">
                                            <question.icon
                                                width={15}
                                                height={15}
                                            />
                                            {question.type}
                                        </div>
                                    </MenubarItem>
                                );
                            })}
                        </div>
                        <MenubarSeparator />

                        <MenubarItem>
                            Create with AI
                        </MenubarItem>

                        <MenubarItem>
                            File
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="border h-full p-0">
                        <div className="hover:bg-green-700 bg-green-600 h-full rounded-l text-center justify-center flex items-center px-2 text-white">
                            Publish
                        </div>
                        <div className="p-1 hover:bg-gray-300 h-full rounded-r text-center justify-center flex items-center">
                            <Undo2 size={15} />
                        </div>
                    </MenubarTrigger>
                </MenubarMenu>
            </div>

            {isDialogOpen && activeDialog && (
                <activeDialog.component
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    deck={deck}
                    key={activeDialog.title}
                    callback={() => {
                        createCardCallback();
                        handleCloseDialog();
                    }}
                >
                </activeDialog.component>
            )}
        </Menubar>
    );
}
