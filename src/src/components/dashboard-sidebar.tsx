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

import { usePocket } from "@/contexts";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthModel } from "pocketbase";

import { Calendar } from "@/components/ui/calendar";

export function DashboardSidebar() {

    const { getUserModel, clearAuthStore } = usePocket();

    const [user, setUser] = useState<AuthModel>();

    useEffect(() => {
        const { record, error } = getUserModel();

        if (error) {
            console.error(error);
            return;
        }

        setUser(record);

    })

    const highlightedDays = [
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 20),
    ];

    const modifiers = {
        highlighted: highlightedDays,
    };

    const modifiersStyles = {
        highlighted: {
            backgroundColor: 'orange',
            color: 'white',
        },
    };


    const navigate = useNavigate();

    return (
        <div>
            <Sidebar collapsible="icon" className="pb-5">
                {/* <SidebarTrigger /> */}
                <SidebarHeader>
                </SidebarHeader>

                <Calendar 
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                />

                <SidebarContent>
                    <SidebarGroup>
                        {/* <SidebarGroupLabel className='text-md'>Create a deck</SidebarGroupLabel>
                        <SidebarGroupAction onClick={handleCreateDeck}>
                            <Plus />
                        </SidebarGroupAction>
                        <SidebarGroupContent></SidebarGroupContent> */}
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
                                        Welcome back, <strong>{user ? user.name : "Unable to fetch user"}</strong>
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
                                            clearAuthStore();
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
