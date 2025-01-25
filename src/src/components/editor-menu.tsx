import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

import {  ChevronLeft, Menu, Search, Undo2 } from "lucide-react";

export function EditorMenu() {
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
                    <MenubarTrigger className="border h-full p-0">
                        <div className='hover:bg-green-700 bg-green-600 h-full rounded-l text-center justify-center flex items-center px-2 text-white'>
                            Publish
                        </div>
                        <div className='p-1 hover:bg-gray-300 h-full rounded-r text-center justify-center flex items-center'>
                            <Undo2 size={15} />
                        </div>
                    </MenubarTrigger>
                </MenubarMenu>
            </div>

        </Menubar>
    );
}
