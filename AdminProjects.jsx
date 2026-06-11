import React, { useState, useEffect } from "react";
import { 
  Briefcase, Plus, CheckCircle2, Clock, ChevronRight, 
  Target, Zap, Trash2, LayoutGrid, Sparkles, Shield,
  Layers, Activity, Calendar, Fingerprint, Globe
} from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(saved);
  }, []);

  const addTask = (projectId) => {
    if (!newTask.trim()) return;
    const updated = projects.map(p => {
      if (p.id === projectId) {
        const tasks = p.tasks || [];
        return { ...p, tasks: [...tasks, { id: Date.now(), text: newTask, completed: false }] };
      }
      return p;
    });
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setNewTask("");
    setSelectedProject(updated.find(p => p.id === projectId));
  };

  const deleteProject = (id) => {
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    localStorage.setItem("projects", JSON.stringify(filtered));
    if (selectedProject?.id === id) setSelectedProject(null);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#235857] selection:text-white p-4 md:p-10">
      
      {/* --- ELITE BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#F8FAFA]">
        {/* Primary Glow */}
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-[#235857]/5 rounded-full blur-[140px] animate-pulse" />
        {/* Accent Glow */}
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-[#3B8A7F]/10 rounded-full blur-[120px]" />
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-[20%] w-32 h-32 border border-[#235857]/10 rounded-full animate-spin-slow" />
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
          
          .animate-spin-slow { animation: spin 20s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

          .neo-glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(25px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 25px 50px -12px rgba(35, 88, 87, 0.1);
          }

          .command-glow {
            box-shadow: 0 0 40px -10px rgba(59, 138, 127, 0.3), inset 0 0 20px rgba(255,255,255,0.02);
          }

          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #3B8A7F; border-radius: 10px; }
        `}
      </style>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto">
        
        {/* TOP BAR: SYSTEM STATUS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="px-4 py-1.5 bg-[#235857] text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-lg shadow-[#235857]/20">
                 System: Active
               </div>
               <div className="flex -space-x-1">
                 {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />)}
               </div>
            </div>
            <h1 className="text-7xl font-black text-[#0F172A] font-['Outfit'] tracking-tight">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#235857] to-[#3B8A7F]">Control</span>
            </h1>
          </div>

          <div className="flex gap-6">
             <div className="neo-glass p-6 rounded-[2.5rem] flex items-center gap-5">
                <div className="w-12 h-12 bg-[#235857]/5 rounded-2xl flex items-center justify-center text-[#235857]">
                  <Globe size={24} className="animate-bounce" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#3B8A7F] uppercase tracking-widest leading-none mb-1">Total Nodes</p>
                  <p className="text-2xl font-black text-[#0F172A] font-['Outfit']">{projects.length}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT: SPATIAL PROJECT TILES (7 Cols) */}
          <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length > 0 ? projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative p-1 transition-all duration-500 rounded-[3.5rem] ${
                  selectedProject?.id === project.id ? "bg-gradient-to-br from-[#235857] to-[#3B8A7F] scale-[1.03] shadow-2xl" : "bg-transparent"
                }`}
              >
                <div className={`h-full w-full p-10 rounded-[3.4rem] transition-all duration-500 ${
                  selectedProject?.id === project.id ? "bg-white" : "neo-glass hover:bg-white/90 hover:-translate-y-2"
                }`}>
                  
                  <div className="flex justify-between items-start mb-12">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:rotate-12 ${
                      selectedProject?.id === project.id ? "bg-[#235857] text-white" : "bg-gray-100 text-[#235857]"
                    }`}>
                      <Briefcase size={26} />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <h3 className="text-3xl font-bold text-[#0F172A] font-['Outfit'] mb-2">{project.projectName}</h3>
                  <p className="text-[11px] font-black text-[#3B8A7F] uppercase tracking-[0.2em] mb-10">{project.Domain || "Core Sector"}</p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3B8A7F]/10 text-[#3B8A7F]">
                        <Activity size={14} />
                      </div>
                      <span className="text-[10px] font-black text-[#0F172A] uppercase">{(project.tasks?.length || 0)} Units</span>
                    </div>
                    <div className="flex -space-x-1.5">
                       {[1,2].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-[#235857]/10" />)}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full h-[450px] neo-glass rounded-[4rem] flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-[#235857]/10">
                <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mb-6">
                  <LayoutGrid size={40} className="text-gray-100" />
                </div>
                <h2 className="text-xl font-black text-[#235857] uppercase tracking-widest">No Projects Found</h2>
                <p className="text-gray-400 text-sm mt-3 max-w-xs">Deployment ready. Awaiting your first directive initialization.</p>
              </div>
            )}
          </div>

          {/* RIGHT: THE "CYBER-NOIR" COMMAND TERMINAL (5 Cols) */}
          <div className="xl:col-span-5 relative">
            {selectedProject ? (
              <div className="sticky top-10 bg-[#0F172A] command-glow rounded-[4rem] p-1 pb-1 overflow-hidden transition-all duration-700">
                <div className="bg-[#0F172A] rounded-[3.8rem] p-12">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between mb-16">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#3B8A7F] animate-ping" />
                        <h2 className="text-xl font-black text-white font-['Outfit'] uppercase tracking-tight">Terminal</h2>
                      </div>
                      <p className="text-[9px] font-bold text-[#3B8A7F] uppercase tracking-[0.3em]">Encrypted Uplink</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                      <Zap size={24} className="text-[#3B8A7F] fill-[#3B8A7F]/20" />
                    </div>
                  </div>

                  {/* Glass Input */}
                  <div className="relative mb-16">
                    <input 
                      type="text" 
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask(selectedProject.id)}
                      placeholder="Enter Command Line..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-[2.2rem] px-10 py-7 text-white text-sm font-semibold outline-none focus:ring-2 ring-[#3B8A7F] focus:bg-white/[0.07] transition-all placeholder:text-white/10"
                    />
                    <button 
                      onClick={() => addTask(selectedProject.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-[#3B8A7F] text-white rounded-[1.4rem] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#3B8A7F]/40"
                    >
                      <Plus size={28} />
                    </button>
                  </div>

                  {/* Command Feed */}
                  <div className="space-y-5 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {selectedProject.tasks?.length > 0 ? (
                      selectedProject.tasks.map((task) => (
                        <div key={task.id} className="group flex items-center justify-between bg-white/[0.03] p-7 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.06]">
                          <div className="flex items-center gap-6">
                            <div className="w-6 h-6 rounded-full border-2 border-[#3B8A7F] flex items-center justify-center">
                               <div className="w-2 h-2 rounded-full bg-[#3B8A7F] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors tracking-wide">{task.text}</span>
                          </div>
                          <Fingerprint size={16} className="text-white/10 group-hover:text-[#3B8A7F]" />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 opacity-10">
                        <Sparkles size={48} className="animate-pulse mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Code</p>
                      </div>
                    )}
                  </div>

                  {/* Terminal Footer */}
                  <div className="mt-16 pt-10 border-t border-white/5 flex justify-between items-center">
                    <div className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#3B8A7F]" />
                       <div className="w-1.5 h-1.5 rounded-full bg-[#3B8A7F]/30" />
                       <div className="w-1.5 h-1.5 rounded-full bg-[#3B8A7F]/10" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase font-mono tracking-tighter">ID: GRPH-X-{selectedProject.id.toString().slice(-4)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-10 h-[700px] neo-glass rounded-[4.5rem] flex flex-col items-center justify-center p-20 text-center group overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#235857]/10 to-transparent" />
                 <div className="w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl mb-12 transition-all duration-1000 group-hover:rotate-[360deg] group-hover:shadow-[#3B8A7F]/20">
                    <Target size={60} className="text-[#235857]/10" />
                 </div>
                 <h3 className="font-['Outfit'] font-black text-[#0F172A] text-3xl mb-4 tracking-tighter uppercase">Initialize Uplink</h3>
                 <p className="text-gray-400 font-medium leading-relaxed max-w-xs">
                   Select a secure project node from the left inventory to open the command console and manage directives.
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}