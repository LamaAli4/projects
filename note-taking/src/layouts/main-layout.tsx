import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto bg-background text-foreground">
        <Outlet />
      </main>
    </div>
  );
}
