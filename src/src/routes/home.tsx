import { Link } from "react-router-dom";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Cloud, FileInput, TextCursorInput } from "lucide-react";

import { useEffect, useState } from "react";

import { usePocket } from "@/contexts";
import { AuthModel } from "pocketbase";

function Home() {

  const [user, setUser] = useState<AuthModel>();

  const { getUserModel } = usePocket();

  useEffect(() => {
    const { record, error } = getUserModel();

    if (error) {
      console.error(error);
      return;
    }

    setUser(record);
  });



  return (
    <div className="absolute w-full h-full bg-gradient-to-br from-blue-300 via-transparent to-transparent top-0">
      <div className="absolute w-full h-full bg-gradient-to-bl from-green-300 via-transparent to-transparent top-0">
        <Menubar className="rounded-none shadow-none border-none m-2 justify-between flex bg-transparent">
          <MenubarMenu>
            <div className="flex items-center gap-3">
              <img src="/icon.svg" className="w-10"></img>
              <strong>
                <>flashcards</>
              </strong>
            </div>
          </MenubarMenu>
          {user &&
            (
              <div className="flex gap-4 items-center">
                <div>Logged in as {user.email}</div>

                <MenubarMenu>
                  <Link to={"/dashboard"}>
                    <Button>Go to dashboard</Button>
                  </Link>
                </MenubarMenu>

                <MenubarMenu>
                  <Button onClick={() => {}}>Logout</Button>
                </MenubarMenu>
              </div>
            ) || (
              <p>Sign up now!</p>
            )}
        </Menubar>
        
        {/* Hero */}
        <div className="max-w-2xl text-center mx-auto mt-10">
          <h1 className="scroll-m-20 text-4xl tracking-tight ">
            Create flashcards with natural language and documents.
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Create complex questions with natural language, with analytics.
          </p>

          <div>
          </div>
          <div className="flex items-center mt-20 bg-background rounded-full border focus-within:border-blue-500">
            <Input
              type="email"
              placeholder="Enter your email here"
              className="text-lg bg-background border-none shadow-none focus-visible:ring-0 focus:outline-none m-4"
            />
            <Link to={"login"}>
              <Button className="rounded-full text-lg h-full mr-4">
                Get started for free <ArrowRight />
              </Button>
            </Link>
          </div>

          <div className="mt-4">
            Try Flashcards free, no credit card required. By entering your
            email, you agree to recieve marketing emails from Flashcards.
          </div>
        </div>
        <div className="grid grid-cols-3 m-[10%] gap-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <TextCursorInput className="w-10 h-10 text-primary">
              </TextCursorInput>
              <p className="text-lg font-bold">Textual input</p>
            </div>
            <p className="text-muted-foreground">
              Create questions with just a simple phrase or sentence
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <FileInput className="w-10 h-10 text-primary"></FileInput>
              <p className="text-lg font-bold">Document uploads</p>
            </div>
            <p className="text-muted-foreground">
              Upload lecture notes or slides in PDF format for instant
              reviewable content
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Cloud className="w-10 h-10 text-primary"></Cloud>
              <p className="text-lg font-bold">Saved in the cloud</p>
            </div>
            <p className="text-muted-foreground">
              Your content is saved automatically, and can be exported locally
              as YAML anytime
            </p>
          </div>
        </div>

        <div className="bg-primary h-full text-background rounded-t-3xl">
          <div className="p-10">
            <div className="text-5xl">
              Unmatched productivity
            </div>
            <div className="mt-5">
              Complete efficiency in creating customized learning content for
              your needs.
            </div>
          </div>

          <div className="grid grid-cols-5 p-10 relative gap-10">
            <div className="relative col-span-2 bg-background rounded p-10">
              <div className="absolute w-full h-full bg-grid-pattern border-2 z-10 top-0">
              </div>
              <img
                src="/landing-1.png"
                className="relative z-20 w-full h-auto"
              />
              <div className="relative z-30 text-primary flex justify-between items-end">
                <strong>Auto-saving editor</strong>
                <span className="text-muted-foreground ml-2">
                  Work without interruptions
                </span>
              </div>
            </div>

            <div className="relative h-20 col-span-3 bg-background rounded">
              <div className="absolute w-full h-full bg-grid-pattern h-20 border-2 z-10">
              </div>
              <div className="absolute bottom-0 ml-3 mb-3 z-20 text-primary flex">
                <strong>Keyboard shortcuts.</strong>
                <span className="text-muted-foreground ml-2">
                  Work efficiently
                </span>
              </div>
            </div>

            <div className="relative h-20 col-span-3 bg-background rounded">
              <div className="absolute w-full h-full bg-grid-pattern h-20 border-2 z-10">
              </div>
              <div className="absolute bottom-0 ml-3 mb-3 z-20 text-primary flex">
                <strong>Keyboard shortcuts.</strong>
                <span className="text-muted-foreground ml-2">
                  Work efficiently
                </span>
              </div>
            </div>

            <div className="relative h-20 col-span-2 bg-background rounded ">
              <div className="absolute w-full h-full bg-grid-pattern h-20 border-2 z-10">
              </div>
              <div className="absolute bottom-0 ml-3 mb-3 z-20 text-primary flex">
                <strong>Keyboard shortcuts.</strong>
                <span className="text-muted-foreground ml-2">
                  Work efficiently
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
