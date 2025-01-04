import { Link } from "react-router-dom";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <Menubar className="rounded-none shadow-none border-none m-2 justify-between flex">
        <MenubarMenu>
          <strong>
            <em>flashcards</em>
          </strong>
        </MenubarMenu>
        <MenubarMenu>
          <Link to={"/dashboard"}>
            <Button>Go to dashboard</Button>
          </Link>
        </MenubarMenu>
      </Menubar>
      {/* Hero */}
      <div className="max-w-2xl text-center mx-auto mt-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Flashcards
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          Create flashcards with simple yaml.
        </p>
      </div>
      <div className="mt-10 relative max-w-5xl mx-auto">
        <div
          className="relative max-w-[1024px] w-full rounded-xl overflow-hidden"
          style={{ paddingTop: "46.875%" }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl">
            <div className="flex flex-col">
              <Link to={"/login"}>
                Login
              </Link>

              <Link to={"/register"}>
                register
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
          <div className="w-48 h-48 rounded-lg bg-secondary" />
        </div>
        <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
          <div className="w-48 h-48 rounded-full bg-secondary" />
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

export default Home;
