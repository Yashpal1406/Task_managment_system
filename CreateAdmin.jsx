import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, User, Calendar, Globe, Rocket, 
  ChevronRight, Sparkles, Fingerprint 
} from "lucide-react";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    leaderName: "",
    Domain: "Frontend",
    deadline: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProject = { 
      id: Date.now(), 
      ...formData, 
      status: "Pending", 
      createdAt: new Date().toISOString() 
    };
    localStorage.setItem("projects", JSON.stringify([...existingProjects, newProject]));
    
    // Optional: Add a subtle vibration or sound effect for "Initialization"
    navigate("/admin"); 
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {/* 1. GOOGLE FONTS IMPORT */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&family=Inter:wght@400;700&display=swap');`}
      </style>

      <div className="max-w-3xl w-full relative">
        
        {/* --- DECORATIVE AMBIENCE --- */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#235857]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#3B8A7F]/10 rounded-full blur-[100px]" />

        {/* HEADER SECTION */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white mb-6 shadow-sm">
            <Sparkles className="text-[#235857]" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#235857] font-['Outfit']">System Command</span>
          </div>
          <h2 className="text-6xl font-black text-[#0F172A] font-['Outfit'] tracking-tight mb-3">
            New <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#235857] to-[#3B8A7F]">Initiative</span>
          </h2>
          <p className="text-gray-400 font-medium font-['Inter']">Establish new project parameters and assign operational authority.</p>
        </div>

        {/* MODERN FORM CARD */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(13,36,38,0.1)] border border-white p-12 relative overflow-hidden group">
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 relative z-10 font-['Inter']">
            
            {/* Project Identity */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-[#235857] tracking-widest font-['Outfit'] opacity-70">
                <Fingerprint size={14} /> Project Name
              </label>
              <input 
                required type="text" 
                className="w-full px-8 py-5 rounded-[1.5rem] border-2 border-transparent bg-white shadow-inner focus:bg-white focus:border-[#235857]/20 outline-none transition-all font-bold text-[#0F172A] placeholder:text-gray-300 shadow-sm" 
                placeholder="Name your mission..."
                value={formData.projectName}
                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              />
            </div>

            {/* Technical Domain */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-[#235857] tracking-widest font-['Outfit'] opacity-70">
                <Globe size={14} /> Operation Domain
              </label>
              <div className="relative">
                <select 
                  className="w-full px-8 py-5 rounded-[1.5rem] border-2 border-transparent bg-white shadow-inner focus:border-[#235857]/20 outline-none transition-all font-bold text-[#0F172A] appearance-none cursor-pointer shadow-sm"
                  value={formData.Domain}
                  onChange={(e) => setFormData({...formData, Domain: e.target.value})}
                >
                  <option value="Frontend">Frontend </option>
                  <option value="Backend">Backend </option>
                  <option value="MernStack">Full Stack</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-[#235857]/30" size={18} />
              </div>
            </div>

            {/* Assigned Leader */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-[#235857] tracking-widest font-['Outfit'] opacity-70">
                <User size={14} /> Leader
              </label>
              <input 
                required type="text" 
                className="w-full px-8 py-5 rounded-[1.5rem] border-2 border-transparent bg-white shadow-inner focus:border-[#235857]/20 outline-none transition-all font-bold text-[#0F172A] placeholder:text-gray-300 shadow-sm" 
                placeholder="Identify Lead..."
                value={formData.leaderName}
                onChange={(e) => setFormData({...formData, leaderName: e.target.value})}
              />
            </div>

            {/* Deadline */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-[#235857] tracking-widest font-['Outfit'] opacity-70">
                <Calendar size={14} /> Deadline
              </label>
              <input 
                required type="date" 
                className="w-full px-8 py-5 rounded-[1.5rem] border-2 border-transparent bg-white shadow-inner focus:border-[#235857]/20 outline-none transition-all font-bold text-[#0F172A] shadow-sm" 
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit"
                className="group relative w-full py-6 rounded-[2rem] bg-[#0F172A] text-white font-['Outfit'] font-black uppercase tracking-[0.4em] text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.4)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#235857] to-[#3B8A7F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-3">
                  Deploy Mission <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer info */}
        <p className="text-center mt-8 text-[10px] font-bold text-[#6D8B8C] uppercase tracking-[0.2em] opacity-50">
          * Lead will be notified via internal encrypted channel
        </p>
      </div>
    </div>
  );
}