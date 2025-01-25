import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

import { Search } from "lucide-react";
import { CreateDeckDialog, PaginatingDecksTable } from "@/components";

function Dashboard() {

    return (
        <div className="w-full">
            {/* <DashboardMenu /> */}

            <div className="m-5">
                <p className="text-3xl">
                    Dashboard
                </p>

                <p className="text-muted-foreground">Decks</p>
            </div>
            <div className="flex">
                <div
                    className="w-[300px] m-5 flex gap-5 bg-secondary rounded p-3 text-muted-foreground text-sm items-center focus-within:ring-2 focus-within:blue-500"
                    onClick={() =>
                        document.getElementById("search-input")?.focus()}
                >
                    <Search size={15} />
                    <input
                        id="search-input"
                        className="bg-transparent border-none focus:outline-none text-muted-foreground"
                        placeholder="Search in decks"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Sort by</p>
                    <Select defaultValue="last">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="last">
                                    last modified
                                </SelectItem>
                                <SelectItem value="created">
                                    last created
                                </SelectItem>
                                <SelectItem value="alphabetical">
                                    alphabetical
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="w-full m-5 gap-5">
                <CreateDeckDialog>
                    <button className="border border-primary rounded p-5 hover:border-blue-500 hover:bg-secondary">
                        <div className="flex items-center text-left gap-10 w-[300px]">
                            <Plus />
                            <div>
                                <p>Empty deck</p>
                                <p className="text-sm text-muted-foreground">
                                    Start from scratch
                                </p>
                            </div>
                        </div>
                    </button>
                </CreateDeckDialog>
            </div>

            <div className="m-5">
                <PaginatingDecksTable limit={5} />
            </div>
        </div>
    );
}

export default Dashboard;
