import React from "react";
import { 
  FileText, Download, TrendingUp, Filter, 
  ChevronDown, DollarSign, Users, Activity 
} from "lucide-react";

export default function AdminBilling() {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "$128,430", 
      desc: "Gross project income this month", 
      icon: <DollarSign size={24} />,
      color: "from-[#235857] to-[#3B8A7F]" 
    },
    { 
      title: "Active Leaders", 
      value: "24", 
      desc: "Leaders currently managing billing", 
      icon: <Users size={24} />,
      color: "from-[#3B8A7F] to-[#235857]" 
    },
    { 
      title: "Efficiency", 
      value: "94.2%", 
      desc: "Resource allocation accuracy", 
      icon: <TrendingUp size={24} />,
      color: "from-[#235857] to-[#3B8A7F]" 
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-[#0D2426] tracking-tight">
          Billing & Reporting
        </h1>
        <p className="text-[#6D8B8C] font-medium">
          Track project costs, generate secure enterprise reports, and analyze performance metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
             <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color}`} />
             <div className="flex items-start justify-between">
                <div>
                   <p className="text-[11px] font-black text-[#3B8A7F] uppercase tracking-widest mb-1">{stat.title}</p>
                   <h2 className="text-3xl font-black text-[#0D2426]">{stat.value}</h2>
                   <p className="text-xs text-[#6D8B8C] mt-2 font-medium">{stat.desc}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${stat.color} text-white shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                   {stat.icon}
                </div>
             </div>
             <button className="mt-6 w-full py-3 bg-[#235857]/5 text-[#235857] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#235857] hover:text-white transition-all duration-300">
                Download PDF
             </button>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white/50 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-lg flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#235857]/10 flex-1">
          <Filter size={18} className="text-[#3B8A7F]" />
          <input 
            type="text" 
            placeholder="Search reports or project IDs..." 
            className="bg-transparent border-none outline-none text-sm font-bold text-[#0D2426] w-full"
          />
        </div>
        <button className="px-8 py-3.5 bg-[#235857] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#235857]/20 hover:-translate-y-1 transition-all">
          Apply Filters
        </button>
      </div>

      {/* Performance Table */}
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-[#235857]/5 flex items-center justify-between">
          <h3 className="font-black text-[#0D2426] uppercase tracking-widest text-sm flex items-center gap-3">
            <Activity size={18} className="text-[#3B8A7F]" /> Leader Performance Analytics
          </h3>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-[#235857]/10 rounded-xl text-[#235857] hover:bg-[#235857] hover:text-white transition-all">
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#235857]/5">
                <th className="px-8 py-5 text-[10px] font-black text-[#3B8A7F] uppercase tracking-widest">Project Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#3B8A7F] uppercase tracking-widest">Assigned Leader</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#3B8A7F] uppercase tracking-widest">Billing Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-[#3B8A7F] uppercase tracking-widest">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#235857]/5">
              {[
                { name: "Quantum Nexus", leader: "Sarah Chen", status: "Paid", amount: "$12,400" },
                { name: "Alpha Core UI", leader: "Marcus Vogt", status: "Pending", amount: "$8,200" },
                { name: "Secure Mesh", leader: "Elena Rossi", status: "Overdue", amount: "$15,000" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#235857]/[0.02] transition-colors">
                  <td className="px-8 py-6 font-bold text-[#0D2426] text-sm">{row.name}</td>
                  <td className="px-8 py-6 text-[#6D8B8C] font-medium text-sm">{row.leader}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      row.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-[#235857] text-sm">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}