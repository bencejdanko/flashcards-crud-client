import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
    MenubarSeparator
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

import { ChevronLeft, Menu, Plus, Search, Undo2 } from "lucide-react";

// @ts-ignore
import CardsThin from "@/assets/card-icons/flashcards.svg?react";
// @ts-ignore
import Matching from "@/assets/card-icons/matching.svg?react";
// @ts-ignore
import MultipleChoice from "@/assets/card-icons/multiple-choice.svg?react";
// @ts-ignore
import Input from "@/assets/card-icons/input.svg?react";

export function EditorMenu() {
    const questions = [
        {
            title: "flashcard",
            icon: CardsThin,
            disabled: false,
        },

        {
            title: "input",
            icon: Input,
            disabled: false,
        },

        {
            title: "multiple choice",
            icon: MultipleChoice,
            disabled: false,
        },

        {
            title: "matching",
            icon: Matching,
            disabled: true,
        },

        
    ];

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
                        {questions.map((question) => (
                            <MenubarItem disabled={question.disabled}>
                                <div className='flex items-center gap-2 text-sm font-thin'>
                                    <question.icon width={15} height={15} />
                                    {question.title}
                                </div>
                            </MenubarItem>
                        ))}
                        <MenubarSeparator />

                        <MenubarItem>
                            Question
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
        </Menubar>
    );
}
