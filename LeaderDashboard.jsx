import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Essential for button functionality
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement 
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Plus, Users, Briefcase, CheckCircle, Clock, 
  AlertCircle, Filter, TrendingUp, Search, X 
} from 'lucide-react';
import { TASKS } from "../../data/tasksdata"; 
import { number } from "framer-motion";

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement
);

export default function LeaderDashboard() {
  const navigate = useNavigate();
  
  // 1. Initialize as empty array to prevent .map() errors
  const [adminProjects, setAdminProjects] = useState([]);
  

  useEffect(() => {
    const syncProjects = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("projects") || "[]");
        setAdminProjects(saved);
      } catch (err) {
        console.error("Failed to parse projects:", err);
        setAdminProjects([]);
      }
    };

    syncProjects();
    window.addEventListener("storage", syncProjects);
    return () => window.removeEventListener("storage", syncProjects);
  }, []);

  // 2. Format data safely (Handling both "Domain" and "domain" casing)
  const allTasks = useMemo(() => {
    return adminProjects.map(p => ({
      id: p.id || Math.random,
      title: p.projectName || "Untitled Project",
      leader: p.leaderName || "Unassigned",
      status: p.status || 'Pending',
      due: p.deadline || "No Date",
      domain: p.Domain || p.domain || "General" 
    }));
  }, [adminProjects]);

  
  
  /* ---------- 1. STATE & LOGIC ---------- */
  const [filterDomain, setFilterDomain] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // FIXED: Technical Domains as requested
  const technicalDomains = ["All", "Frontend", "Backend", "MernStack", "UI/UX Design", "QA Testing"];

  // Mapping existing projects to Technical Domains for display logic
  const Tasks = useMemo(() => [
    ...TASKS.pending.map(t => ({ ...t, status: 'Pending', statusColor: 'bg-red-50 text-red-600', domain: 'Frontend' })),
    ...TASKS.inProgress.map(t => ({ ...t, status: 'Ongoing', statusColor: 'bg-blue-50 text-blue-700', domain: 'MernStack' })),
    ...TASKS.completed.map(t => ({ ...t, status: 'Completed', statusColor: 'bg-green-50 text-green-700', domain: 'Backend' }))
  ], []);

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      const matchesDomain = filterDomain === "All" || task.domain === filterDomain;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [filterDomain, searchQuery, allTasks]);

  /* ---------- 2. HANDLERS ---------- */
  
  // Action: Navigate to Project Page
  const handleManageClick = () => {
    // Navigates to the Project page as requested
    navigate(`/leader/tasks`); 
    // If you want to go to a specific task details page: navigate(`/leader/tasks/${taskId}`);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    // Logic to save task would go here
    setIsModalOpen(false);
    alert("Task has been successfully assigned to the team!");
  };

  const healthData = {
    labels: ['Completed', 'Active', 'Pending'],
    datasets: [{
      data: [TASKS.completed.length, TASKS.inProgress.length, TASKS.pending.length],
      backgroundColor: ['#3B8A7F', '#235857', '#D3D9D4'],
      hoverOffset: 4,
      borderWidth: 0,
    }]
  };

  return (
    
    
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#D7E7E5]">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0D2426] tracking-tight">Executive Dashboard</h1>
          <p className="text-[#6D8B8C] font-medium mt-1">Hello Leader, managing {filteredTasks.length} active assignments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-[#235857] hover:bg-[#1a4342] text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#235857]/20 active:scale-95"
        >
          <Plus size={20} /> Assign New Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredTasks.map((task) => (
    <div key={task.id} className="group bg-white p-8 rounded-[3rem] border border-[#D7E7E5] hover:shadow-[0_30px_60px_-15px_rgba(35,88,87,0.2)] transition-all duration-500 relative overflow-hidden">
      
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F3F6F5] to-transparent rounded-bl-[5rem] -z-10" />

      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-[#235857] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <Briefcase size={22} />
        </div>
        <span className="text-[10px] font-black text-[#235857] bg-[#F3F6F5] px-4 py-2 rounded-full uppercase tracking-widest border border-[#D7E7E5]">
          {task.domain}
        </span>
      </div>

      <h4 className="text-2xl font-black text-[#0D2426] mb-2 leading-tight group-hover:text-[#235857] transition-colors">
        {task.title}
      </h4>
      
      <p className="text-sm text-[#6D8B8C] mb-8 font-medium">
        Lead: <span className="text-[#0D2426] font-bold">{task.leader}</span>
      </p>

      <div className="pt-6 border-t border-[#F3F6F5] flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#6D8B8C]">
          <Clock size={16} className="text-[#3B8A7F]" />
          <span className="text-[11px] font-black">{task.due}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#3B8A7F] animate-pulse" />
          <span className="text-[10px] font-black text-[#235857] uppercase tracking-tighter">{task.status}</span>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase size={20}/>} title="Total Projects" value="08" color="text-[#235857]" bg="bg-[#EAF4F3]" />
        <StatCard icon={<CheckCircle size={20}/>} title="Completion" value="84%" color="text-[#3B8A7F]" bg="bg-[#F0F7F6]" />
        <StatCard icon={<TrendingUp size={20}/>} title="Velocity" value="4.2d" color="text-[#235857]" bg="bg-[#EAF4F3]" />
        <StatCard icon={<AlertCircle size={20}/>} title="Alerts" value="03" color="text-red-600" bg="bg-red-50" />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] border border-[#D7E7E5] shadow-sm overflow-hidden">
          <h3 className="font-bold text-[#0D2426] flex items-center gap-2 mb-6">
            <Users size={18} className="text-[#3B8A7F]" /> Team Workload
          </h3>
          <div className="h-64">
            <Bar 
              data={{
                labels: ['Sarah', 'James', 'Elena', 'Robert', 'Mina'],
                datasets: [{ 
                  label: 'Tasks', 
                  data: [12, 19, 11, 15, 8], 
                  backgroundColor: '#235857',
                  borderRadius: 8
                }]
              }} 
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#D7E7E5] shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-[#0D2426] w-full mb-6">Project Health</h3>
          <div className="w-full max-w-[200px] relative">
            <Doughnut data={healthData} options={{ cutout: '75%' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-[#235857]">84%</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-[#D7E7E5] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-[#F3F6F5] flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <h2 className="text-xl font-bold text-[#0D2426] whitespace-nowrap">Project Oversight</h2>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D8B8C]" />
              <input 
                type="text" 
                placeholder="Search assignments..." 
                className="w-full pl-10 pr-4 py-2 bg-[#F6F9F9] border-none rounded-xl text-sm outline-none focus:ring-2 ring-[#235857]/10"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Filter size={16} className="text-[#3B8A7F]" />
            <select 
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="bg-[#F3F6F5] border-none text-[#235857] text-sm font-bold rounded-xl p-3 outline-none cursor-pointer flex-1"
            >
              {technicalDomains.map(d => (
                <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F9FBFA] text-[#6D8B8C] text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-5">Task Details</th>
                <th className="px-8 py-5">Domain</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Deadline</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F6F5]">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#F3F6F5]/40 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-bold text-[#0D2426] group-hover:text-[#235857] transition-colors">{task.title}</p>
                    <p className="text-xs text-[#6D8B8C]">ID: #TSK-{task.id}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-[#3B8A7F] bg-[#3B8A7F]/10 px-3 py-1 rounded-lg">
                      {task.domain}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${task.statusColor}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#6D8B8C]">
                      <Clock size={14} /> {task.due}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleManageClick(task.id)}
                      className="bg-white text-[#235857] hover:bg-[#235857] hover:text-white px-5 py-2 rounded-xl text-xs font-bold transition-all border border-[#235857]/20 shadow-sm"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- CREATE TASK MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0D2426]/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
            
            <h2 className="text-2xl font-black text-[#0D2426] mb-8">New Team Assignment</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreateTask}>
              <div className="col-span-full">
                <label className="text-[10px] font-black uppercase text-[#3B8A7F] ml-1">Task Title</label>
                <input required type="text" placeholder="e.g. Optimize API Latency" className="w-full mt-1 p-4 bg-[#F6F9F9] rounded-2xl border-none outline-none focus:ring-2 ring-[#235857] font-medium" />
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-[#3B8A7F] ml-1">Strategic Domain</label>
                <select className="w-full mt-1 p-4 bg-[#F6F9F9] rounded-2xl border-none outline-none focus:ring-2 ring-[#235857] font-medium">
                  {technicalDomains.filter(d => d !== "All").map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#3B8A7F] ml-1">Deadline</label>
                <input required type="date" className="w-full mt-1 p-4 bg-[#F6F9F9] rounded-2xl border-none outline-none focus:ring-2 ring-[#235857]" />
              </div>

              <div className="col-span-full">
                <label className="text-[10px] font-black uppercase text-[#3B8A7F] ml-1">Briefing Instructions</label>
                <textarea placeholder="Outline the technical requirements..." className="w-full mt-1 p-4 bg-[#F6F9F9] rounded-2xl border-none outline-none focus:ring-2 ring-[#235857] h-32 resize-none" />
              </div>

              <div className="col-span-full flex gap-4 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold bg-[#F3F6F5] text-[#6D8B8C] hover:bg-gray-200 transition-colors">Discard</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl font-bold bg-[#235857] text-white hover:shadow-lg transition-all">Distribute Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, color, bg }) {
  return (
    <div className="p-6 rounded-[2rem] border border-[#D7E7E5] shadow-sm flex items-center gap-4 bg-white transition-transform hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-[#6D8B8C] tracking-widest">{title}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
      </div>
    </div>
  );
}