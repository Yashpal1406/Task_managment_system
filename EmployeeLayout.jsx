import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function EmployeeLayout() {
  return (
    <div className="flex">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 min-h-screen bg-[#F6F9F9]">
        <Topbar />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
