import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

import { AlertCircle, ChevronUp, Trash } from "lucide-react";

import YAML from "yaml";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

import { useEffect, useState } from "react";

import { InfoCircledIcon, InputIcon } from "@radix-ui/react-icons";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "react-router-dom";
import { usePocket } from "@/contexts";

import { Deck } from "@/contexts/pb/types";
import { Calendar } from "./ui/calendar";

export function EditorSidebar() {
    const [deckId, setDeckId] = useState<string | undefined>(undefined);
    const [deck, setDeck] = useState<Deck | undefined>(undefined);
    const { deck_id } = useParams();
    const { getDeck } = usePocket();

    const cards = [];

    useEffect(() => {
        if (!deck_id) {
            return;
        }

        async function fetchDeck() {
            const { deck, error } = await getDeck(deck_id!);

            if (error) {
                console.error(error);
                return;
            }

            setDeck(deck);
        }

        setDeckId(deck_id);
        fetchDeck();
    }, [deck_id]);

    return (
        <div>
            <Sidebar collapsible="icon" className="pb-5">
                <Calendar />
                <SidebarContent>
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Add a card</SidebarGroupLabel> */}
                        <SidebarGroupContent className="mb-5 mt-5">
                            <SidebarMenu>
                                <SidebarMenuItem key="name" className="ml-2">
                                    <p className="font-bold text-lg">
                                        {deck?.name}
                                    </p>
                                </SidebarMenuItem>
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
