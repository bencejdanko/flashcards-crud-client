import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function EditorMenu() {
    return (
        <Menubar className="rounded-none shadow-none border-none m-2 flex justify-between">
            <div className="flex">
                <MenubarMenu>
                    <MenubarTrigger>
                        <strong>flashcards</strong>
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            About Learner
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Account Settings
                        </MenubarItem>
                        <MenubarItem>
                            Sign out
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Landing page
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Export as YAML
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>Decks</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            New deck{" "}
                            <MenubarShortcut>Shift-Ctrl-N</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Help</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Documentation
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Feedback
                        </MenubarItem>
                        <MenubarItem>
                            Support
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </div>

            <MenubarMenu>
                <Link to={"/dashboard"}>
                    <Button>
                        Back to Dashboard
                    </Button>
                </Link>
            </MenubarMenu>
        </Menubar>
    );
}
