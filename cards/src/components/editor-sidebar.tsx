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
    SidebarTrigger
} from "@/components/ui/sidebar";

import { ChevronUp, Copy, Plus } from "lucide-react";

import { usePocket } from "@/contexts/pb";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useParams } from "react-router-dom";

export function EditorSidebar() {
    const { user, decks } = usePocket();

    const { id } = useParams();

    const currentDeck = decks.find((deck) => deck.id === id);

    return (
        <div>
            <Sidebar collapsible="icon">
            <SidebarTrigger />
                <SidebarHeader>
                <SidebarMenuItem>

                </SidebarMenuItem>
                C
                <span className="sr-only"> {currentDeck?.name}</span>

                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <Plus />{" "}
                            <span className="sr-only">Add Project</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent></SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        {user?.email}
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
