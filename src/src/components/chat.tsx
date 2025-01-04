import React, { useState } from "react";
import { BotIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";



export function Chat() {
    const [input, setInput] = useState("");
    const [file, setFile] = useState(null);

    const handleSend = () => {
        if (input.trim()) {
            setInput("");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="p-4 border-t border-gray-300 ">
                <div className='flex justify-center items-center mb-2'>
                    <BotIcon className="m-3" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border border-gray-300 p-2 rounded w-full"
                        placeholder="Generate cards"
                    />
                </div>
                <p className='text-muted-foreground m-2'>Upload a pdf, docx, or </p>

                <Input
                    
                    type="file"
                    onChange={handleFileChange}
                    className="w-full "
                />
                <Button className='mt-2 w-full'>Generate cards</Button>
            </div>
        </div>
    );
}
