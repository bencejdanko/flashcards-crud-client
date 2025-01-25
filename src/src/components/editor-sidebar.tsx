import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { AlertCircle, ChevronUp, Copy, Pen, Plus, Trash } from "lucide-react";

import { usePocket } from "@/contexts";

import YAML from "yaml";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

import { useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { InfoCircledIcon, InputIcon, Pencil1Icon } from "@radix-ui/react-icons";

import { RecordModel } from "pocketbase";

import CardsThin from "@/assets/cards-thin.svg?react";
import Mesh from "@/assets/mesh.svg?react";
import Icon from "@/assets/icon.svg?react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEditorTabs } from "@/contexts/editor-tabs";
import { add } from "date-fns";

export function EditorSidebar() {
    


    const [deckId, setDeckId] = useState<string | undefined>(undefined);
    const { id } = useParams();
    const [currentDeck, setCurrentDeck] = useState<RecordModel | undefined>(
        undefined,
    );
    const nameValue = useRef<string>("");
    const nameInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [cards, setCards] = useState<RecordModel[]>([]);

    const { openCard } = useEditorTabs();

    const questions = [
        {
            title: "flashcard",
            action: () => {

                if (!deckId) {
                    console.error("No deck id provided");
                    return;
                }
                
            },
            icon: CardsThin,
            info: "No user input.",
            disabled: false,
        },

        {
            title: "input",
            action: () => {},
            icon: InputIcon,
            info: "User enters into an input box.",
            disabled: false,
        },

        {
            title: "matching",
            action: () => {},
            icon: Mesh,
            info: "Match several terms to eachother.",
            disabled: true,
        },
    ];

    const handleChange = (value: string) => {
        nameValue.current = value;
    };

    return (
        <div>
            <Sidebar collapsible="icon" className='pb-5'>
                <SidebarContent>
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Add a card</SidebarGroupLabel> */}
                        <SidebarGroupContent className="mb-5 mt-5">
                            <SidebarMenu>
                                <SidebarMenuItem key="rename" className="ml-2">
                                    <div className="flex items-center gap-3">
                                        <Input
                                            ref={nameInputRef}
                                            onChange={(e) => {
                                                handleChange(e.target.value);
                                            }}
                                            type="text"
                                            className="overflow-hidden"
                                        />
                                    </div>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>

                        <SidebarGroupLabel>Add a card</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {deckId &&
                                    questions.map((question) => (
                                        <SidebarMenuItem key={question.title}>
                                            <SidebarMenuButton
                                                className="flex justify-between"
                                                disabled={question.disabled}
                                                onClick={() => {
                                                    
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <question.icon width={20} />
                                                    {" "}
                                                    {question.title}
                                                </div>
                                                <TooltipProvider
                                                    delayDuration={100}
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <InfoCircledIcon />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {question.info}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>

                        <SidebarGroupLabel>Cards</SidebarGroupLabel>
                        <SidebarGroupContent className="bg-white rounded border">
                            <SidebarMenu>
                                {cards.map((card) => {
                                    const unknownType =
                                        "Unknown: Unable to process card type.";

                                    if (!card.approved) {
                                        return null;
                                    }
                                    let question = null;
                                    let type: string | null = null;
                                    let QuestionIcon = AlertCircle; // Default icon

                                    try {
                                        const parsed = YAML.parse(
                                            card.document,
                                            card.type,
                                        );
                                        question = parsed.question || null;
                                        type = parsed.type || null;

                                        console.log(parsed)

                                        const matchedQuestion = questions.find(
                                            (q) => q.title === type,
                                        );

                                        console.log(
                                            "Matched question",
                                            matchedQuestion,
                                        );

                                        if (matchedQuestion) {
                                            QuestionIcon = matchedQuestion.icon;
                                        } else {
                                            type = unknownType;
                                        }
                                    } catch (error) {
                                        // Ignore errors and keep question as "null"
                                    }

                                    return (
                                        <SidebarMenuItem key={card.id}>
                                            <SidebarMenuButton
                                                className="flex justify-between"
                                                onClick={() => {}}
                                            >
                                                <div className="flex items-center gap-3 justify-between w-full">
                                                    <span className="truncate flex items-center gap-2 mr-3 ">
                                                        <TooltipProvider
                                                            delayDuration={100}
                                                        >
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <QuestionIcon
                                                                        width={20}
                                                                        className={`flex-shrink-0 ${
                                                                            type ===
                                                                                    unknownType
                                                                                ? "text-red-500"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    {type}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>

                                                        {question}
                                                    </span>
                                                    <Trash
                                                        width={15}
                                                        className="ml-auto flex-shrink-0"
                                                    />
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>

                        <SidebarGroupLabel>Files</SidebarGroupLabel>
                        <SidebarGroupContent className="bg-white rounded border">
                            <SidebarMenu>
                               
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        User email here
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Billing</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}
