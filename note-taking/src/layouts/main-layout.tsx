import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-background text-foreground overflow-y-auto">
        <div className="p-6 border-b">
          <Header />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
