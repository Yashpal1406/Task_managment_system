import { useState } from "react";
import { Outlet } from "react-router-dom";
import LeaderSidebar from "../../components/LeaderSidebar"; 
import LeaderTopbar from "../../components/LeaderTopbar";

export default function LeaderLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F9F9]">
      {/* 1. SIDEBAR - Now uses 'fixed' to stay pinned while scrolling */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#EAF4F3] transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <LeaderSidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* 2. MAIN CONTENT AREA - Added 'md:ml-64' to prevent overlapping the fixed sidebar */}
      <div className="flex flex-col md:ml-64 min-h-screen">
        <LeaderTopbar onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* 3. SCROLLABLE CONTENT */}
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet /> 
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}