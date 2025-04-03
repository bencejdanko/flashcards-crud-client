import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Bot, Plus, Search } from "lucide-react";

import { CreateDeckDialog, PaginatingDecksTable } from "@/components";

import { DashboardMenu } from "@/components";

import { useState } from "react";

function Dashboard() {
    const [filter, setFilter] = useState("last_modified");
    const [search, setSearch] = useState("");

    return (
        <div className="w-full h-full flex flex-col">
            <DashboardMenu />

            <div className="m-5">
                <p className="text-3xl">
                    Dashboard
                </p>

                <p className="text-muted-foreground">Decks</p>
            </div>
            <div className="flex gap-5 ml-5">
                <div
                    className="w-[300px] flex gap-5 bg-secondary rounded p-3 text-muted-foreground text-sm items-center focus-within:ring-2 focus-within:blue-500"
                    onClick={() =>
                        document.getElementById("search-input")?.focus()}
                >
                    <Search size={15} />
                    <input
                        id="search-input"
                        className="bg-transparent border-none focus:outline-none text-muted-foreground"
                        placeholder="Search in decks"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">Sort by</p>
                    <Select defaultValue={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="last_modified">
                                    last modified
                                </SelectItem>
                                <SelectItem value="last_created">
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

            <div className="w-full m-5 gap-5 flex">
                <CreateDeckDialog>
                    <button className="border border-primary rounded p-5 hover:border-blue-500 hover:bg-secondary">
                        <div className="flex items-center text-left gap-10 w-[300px] h-[60px]">
                            <Plus size={25} />
                            <div>
                                <p>Empty deck</p>
                                <p className="text-sm text-muted-foreground">
                                    Start from scratch
                                </p>
                            </div>
                        </div>
                    </button>
                </CreateDeckDialog>

                <button className="border border-primary rounded p-5 hover:border-blue-500 hover:bg-secondary">
                    <div className="flex items-center text-left gap-10 w-[300px] h-[60px]">
                        <Bot size={25} className="flex-shrink-0" />
                        <div>
                            <p>Create a deck with AI</p>
                            <p className="text-sm text-muted-foreground">
                                Query for online research, upload a document, or
                                provide a youtube link to get started
                            </p>
                        </div>
                    </div>
                </button>
            </div>

            <div className="m-5 flex-grow">
                <PaginatingDecksTable
                    limit={5}
                    filter={filter}
                    search={search.length > 0 ? search : undefined}
                />
            </div>
        </div>
    );
}

export default Dashboard;
