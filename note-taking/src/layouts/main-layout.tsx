import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col bg-background text-foreground overflow-y-auto">
        <div className="p-6 border-b">
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </main>
    </div>
  );
}
