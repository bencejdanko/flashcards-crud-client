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

import { ChevronUp, Copy, Plus } from "lucide-react";

import { usePocket } from "@/contexts/pb";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";

export function DashboardSidebar() {
    const { user, decks, createDeck, logout } = usePocket();

    const navigate = useNavigate();

    const handleCreateDeck = async () => {
        const deck = await createDeck("new deck");
    };

    return (
        <div>
            <Sidebar collapsible="icon">
                <SidebarTrigger />
                <SidebarHeader>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className='text-md'>Create a deck</SidebarGroupLabel>
                        <SidebarGroupAction onClick={handleCreateDeck}>
                            <Plus />
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
                                    <DropdownMenuItem
                                        onClick={() => {
                                            logout()
                                            navigate("/");
                                        }}
                                    >
                                        Sign out
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
