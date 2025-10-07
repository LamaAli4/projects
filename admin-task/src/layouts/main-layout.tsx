import Header from "@/components/header/components/header-section";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-6 pt-30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
