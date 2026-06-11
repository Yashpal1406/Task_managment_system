import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, PlusSquare, LogOut, Bell, 
  Sparkles, ShieldCheck, ChevronRight, Briefcase, 
  PenIcon, Search, Zap, 
  EyeIcon,
  SettingsIcon
} from "lucide-react";

import logoImg from "/image/logo.png";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const handleLogout = () => {
    navigate("/login"); 
  };

  const navItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Projects", path: "/admin/projects", icon: <Briefcase size={18} /> },
    { name: "Create project", path: "/admin/create", icon: <PlusSquare size={18} /> },
    { name: "Billing", path: "/admin/billing", icon: <PenIcon size={18} /> },
    { name: "Calendar", path: "/admin/calendar", icon: <EyeIcon size={18} /> },
    { name: "Setting", path: "/admin/setting", icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F5F5] font-sans selection:bg-[#3B8A7F] selection:text-white">
      
      {/* --- MESH BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#F0F5F5]">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#235857]/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-[#3B8A7F]/15 rounded-full blur-[120px]" />
      </div>

      {/* --- LIGHTER TEAL SIDEBAR --- */}
      <aside className="w-72 bg-[#1A4547] fixed h-screen flex flex-col z-50 shadow-[10px_0_40px_rgba(0,0,0,0.15)]">
        <div className="p-10 flex flex-col items-center gap-5 border-b border-white/10">
          <div className="relative group">
            <div className="absolute -inset-2 bg-[#3B8A7F] rounded-[1.8rem] blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700" />
            <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-[1.8rem] border border-white/20 group-hover:scale-105 transition-transform duration-500">
              <img src={logoImg} alt="Graphura" className="w-40 h-12 object-contain" />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mt-1 text-[9px] font-bold text-[#4DA699] tracking-widest uppercase">
              <ShieldCheck size={10} className="animate-pulse" /> Secure Admin
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                  isActive 
                  ? "bg-[#235857] text-white shadow-lg shadow-black/10 border-l-4 border-[#4DA699]" 
                  : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-4 z-10">
                  <span className={`transition-all duration-500 ${isActive ? "text-[#4DA699]" : "group-hover:text-white"}`}>
                    {item.icon}
                  </span>
                  <span className="font-bold text-[13px] tracking-tight">{item.name}</span>
                </div>
                <ChevronRight size={14} className={`z-10 transition-all duration-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="ml-72 flex-1 min-h-screen relative z-10">
        
        <header className="h-24 bg-white/40 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-12 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] font-black text-[#3B8A7F] uppercase tracking-[0.3em] mb-1">Operational Environment</p>
              <h3 className="font-bold text-[#0D2426] text-lg tracking-tight">
                HQ / {navItems.find(i => i.path === location.pathname)?.name || "Dashboard"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="text-[#6D8B8C] hover:text-[#235857] transition-colors">
              <Search size={20} />
            </button>

            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-3.5 rounded-2xl transition-all duration-500 relative border ${
                  isNotifOpen 
                  ? "bg-[#235857] text-white border-[#235857]" 
                  : "bg-white text-[#235857] border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>

            <div className="flex items-center gap-5 pl-8 border-l border-gray-200">
              <div className="text-right hidden xl:block">
                <p className="text-sm font-black text-[#0D2426] tracking-tight">Alexander Hunt</p>
                <p className="text-[9px] font-bold text-[#3B8A7F] uppercase tracking-widest">Verified Admin</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-tr from-[#235857] to-[#3B8A7F] rounded-2xl flex items-center justify-center font-black text-white shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer">
                AH
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Outlet />
        </div>
      </main>
    </div>
  );
}