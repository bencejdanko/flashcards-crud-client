import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronUp } from "lucide-react";

import { usePocket } from "@/contexts";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthModel } from "pocketbase";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

import { User } from "@/contexts/pb/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
    const { getAuthModel, clearAuthStore, toStringUserAvatarUri } = usePocket();

    const [user, setUser] = useState<AuthModel>();

    useEffect(() => {
        const { record, error } = getAuthModel();

        if (error) {
            console.error(error);
            return;
        }

        setUser(record);
    }, []);

    const highlightedDays = [
        new Date(2025, 0, 11),
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 20),
    ];

    const [date, setDate] = useState<Date | undefined>(new Date());

    const modifiers = {
        highlighted: highlightedDays,
    };

    const modifiersStyles = {
        selected: {
            "borderTop": "2px solid #FF4136",
            "borderTopLeftRadius": "0",
            "borderTopRightRadius": "0",
        },
        highlighted: {
            "borderTop": "2px solid #2ECC40",
            "borderTopLeftRadius": "0",
            "borderTopRightRadius": "0",
        },
    };

    const navigate = useNavigate();

    return (
        <div>
            <Sidebar collapsible="icon" className="pb-5">

                <Calendar
                    modifiers={modifiers}
                    // @ts-ignore
                    modifiersStyles={modifiersStyles}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />

                <SidebarContent>
                    <SidebarGroup>
                        <div>
                            <h1>
                                {date
                                    ? format(date, "MMMM do, yyyy")
                                    : "No date selected"}
                            </h1>
                            <hr className="my-2" />
                            <p>No events</p>
                        </div>
                    </SidebarGroup>

                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="flex items-center overflow-hidden">
                                        <div className="flex-shrink-0 mr-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage
                                                    src={user
                                                        ? toStringUserAvatarUri(
                                                            user as User,
                                                        )
                                                        : ""}
                                                    alt={user ? user.name : ""}
                                                />
                                                <AvatarFallback>
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <span className="truncate">
                                            <strong>
                                                {user
                                                    ? user.name
                                                    : "Unable to fetch user"}
                                            </strong>
                                        </span>

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
