import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page.jsx";
import { Dashboard, Editor, Home, Login, Register } from "./routes/";

import { PocketProvider } from "./contexts/pb.js";
import { EditorTabsProvider } from "./contexts/editor-tabs.js";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardSidebar, EditorSidebar } from "@/components/";

function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <EditorTabsProvider>
        <SidebarProvider>
          <EditorSidebar />
          <main className="flex grow">
            {children}
          </main>
        </SidebarProvider>
      </EditorTabsProvider>
    </div>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex grow">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/editor/:id",
    element: (
      <div>
        <EditorLayout>
          <Editor />
        </EditorLayout>
      </div>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PocketProvider>
      <RouterProvider router={router} />
    </PocketProvider>
  </StrictMode>,
);
