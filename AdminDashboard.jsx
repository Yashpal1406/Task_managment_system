import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, LineElement 
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Briefcase, Clock, Search, LayoutGrid, PieChart, BarChart3 } from 'lucide-react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function AdminDashboard() {
  const [adminProjects, setAdminProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const syncProjects = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("projects") || "[]");
        setAdminProjects(saved);
      } catch (err) {
        setAdminProjects([]);
      }
    };
    syncProjects();
    window.addEventListener("storage", syncProjects);
    return () => window.removeEventListener("storage", syncProjects);
  }, []);

  // 1. GENERATE DYNAMIC CHART DATA
  const chartData = useMemo(() => {
    const statusCounts = { Pending: 0, Active: 0, Completed: 0 };
    const domainCounts = {};

    adminProjects.forEach(p => {
      // Status Stats
      const status = p.status || 'Pending';
      if (statusCounts[status] !== undefined) statusCounts[status]++;

      // Domain Stats (Handling 'Domain' from your Admin form)
      const dom = p.Domain || p.domain || "General";
      domainCounts[dom] = (domainCounts[dom] || 0) + 1;
    });

    return {
      status: {
        labels: ['Pending', 'Active', 'Completed'],
        datasets: [{
          data: [statusCounts.Pending, statusCounts.Active, statusCounts.Completed],
          backgroundColor: ['#D3D9D4', '#3B8A7F', '#235857'],
          borderWidth: 0,
          hoverOffset: 15
        }]
      },
      workload: {
        labels: Object.keys(domainCounts),
        datasets: [{
          label: 'Projects',
          data: Object.values(domainCounts),
          backgroundColor: '#235857',
          borderRadius: 12,
        }]
      }
    };
  }, [adminProjects]);

  return (
    <div className="min-h-screen bg-[#F6F9F9] p-6 lg:p-10 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#0D2426] tracking-tighter">
            Project <span className="text-[#235857]">Analytics</span>
          </h1>
          <p className="text-[#6D8B8C] font-medium">Real-time visualization of administrative directives.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D8B8C]" size={18} />
          <input 
            type="text" placeholder="Search projects..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-[#D7E7E5] outline-none focus:ring-2 ring-[#235857]/20 font-bold shadow-sm"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- GRAPHICAL ANALYTICS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Doughnut Chart: Status Mix */}
        <div className="bg-white p-8 rounded-[3rem] border border-[#D7E7E5] shadow-sm flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 w-full text-[#235857]">
            <PieChart size={20} />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0D2426]">Status Distribution</h3>
          </div>
          <div className="w-full max-w-[180px]">
            <Doughnut 
              data={chartData.status} 
              options={{ cutout: '75%', plugins: { legend: { display: false } } }} 
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {['Pending', 'Active', 'Done'].map((l, i) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: chartData.status.datasets[0].backgroundColor[i] }} />
                <span className="text-[10px] font-black text-[#6D8B8C] uppercase">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Domain Workload */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-[#D7E7E5] shadow-sm">
          <div className="flex items-center gap-2 mb-8 text-[#235857]">
            <BarChart3 size={20} />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0D2426]">Domain Workload</h3>
          </div>
          <div className="h-[200px]">
            <Bar 
              data={chartData.workload} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: { 
                  y: { beginAtZero: true, grid: { display: false }, ticks: { font: { weight: 'bold', size: 10 } } },
                  x: { grid: { display: false }, ticks: { font: { weight: 'bold', size: 10 } } }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {adminProjects.filter(p => p.projectName.toLowerCase().includes(searchQuery.toLowerCase())).map((task) => (
          <div key={task.id} className="group bg-white p-8 rounded-[3rem] border border-[#D7E7E5] hover:shadow-2xl transition-all duration-500 relative">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-[#F3F6F5] rounded-2xl flex items-center justify-center text-[#235857] group-hover:bg-[#235857] group-hover:text-white transition-all">
                  <Briefcase size={22} />
                </div>
                <span className="text-[9px] font-black text-[#235857] bg-[#F3F6F5] px-4 py-2 rounded-full uppercase tracking-widest border border-[#D7E7E5]">
                  {task.Domain || task.domain || "General"}
                </span>
              </div>
              <h4 className="text-2xl font-black text-[#0D2426] mb-1 group-hover:text-[#235857] transition-colors tracking-tight">{task.projectName}</h4>
              <p className="text-sm text-[#6D8B8C] mb-8 font-medium">Directed by <span className="text-[#0D2426] font-bold">{task.leaderName}</span></p>
              <div className="pt-6 border-t border-[#F3F6F5] flex justify-between items-center text-[#6D8B8C]">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#3B8A7F]" />
                  <span className="text-[11px] font-black uppercase">{task.deadline}</span>
                </div>
                <span className="text-[10px] font-black text-[#235857] uppercase tracking-tighter">{task.status}</span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}