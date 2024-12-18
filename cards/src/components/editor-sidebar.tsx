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

import { useRef, useEffect } from "react";

export function EditorSidebar() {

    const { user, decks, setDeckModel, getDeckModel } = usePocket();
    const { id } = useParams();
    const currentDeck = decks.find((deck) => deck.id === id);
    const nameValue = useRef<string>("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    const handleChange = (value: string) => {
        console.log("Setting name to", value);
        nameValue.current = value;
    };

    useEffect(() => {
        console.log("Starting syncing process for deck name")

        if (!id) {
            console.error("No deck id provided");
            return;
        }

        // get initial name
        getDeckModel(id).then((model) => {
            nameValue.current = model.name;
            handleChange(nameValue.current);
        })

        intervalRef.current = setInterval(() => {
            getDeckModel(id!).then((model) => {
                let currentName = model.name;
                

                if (currentName === nameValue.current) {
                    console.log("name has not changed");
                    return;
                }

                currentName = nameValue;
                console.log("Saving document...");

                const modifed_model = model;
                modifed_model.name = nameValue.current;
                setDeckModel(id, model).then((result) => {
                    console.log("Name saved");
                }).catch((error) => {
                    console.error("Failed to save name", error);
                });
            });
        }, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    return (
        <div>
            <Sidebar collapsible="icon">
            <SidebarTrigger />
                <SidebarHeader>
                
                <input onChange={(e) => {handleChange(e.target.value)}} type="text" value={nameValue.current} />

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
