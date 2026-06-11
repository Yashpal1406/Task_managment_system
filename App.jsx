import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Public Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Employee Layout & Pages */
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import Dashboard from "./pages/employee/Dashboard";
import Tasks from "./pages/employee/Tasks";
import TaskDetails from "./pages/employee/TaskDetails";
import Teams from "./pages/employee/Teams";
import Calendar from "./pages/employee/Calendar";
import Settings from "./pages/employee/Settings";

/* Leader Layout & Pages */
import LeaderLayout from "./pages/leader/LeaderLayout"; 
import LeaderDashboard from "./pages/leader/LeaderDashboard";
import LeaderCalendar from "./pages/leader/LeaderCalendar";
import LeaderSetting from "./pages/leader/LeaderSetting";
const LeaderTasks = () => <div className="p-8">Leader Projects Page (Coming Soon)</div>;


/* Admin Layout and pages */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import CreateAdmin from "./pages/admin/CreateAdmin";
import AdminBilling from "./pages/admin/AdminBilling";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminSetting from "./pages/admin/AdminSetting";

function App() {
  return (
    <BrowserRouter>
    {/* Public Routes */}
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:taskId" element={<TaskDetails />} />
          <Route path="teams" element={<Teams />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Leader Routes (UPDATED BLOCK) */}
        <Route path="/leader" element={<LeaderLayout />}>
          <Route index element={<LeaderDashboard />} />
          
          {/* Navigation targets for Sidebar links */}
          <Route path="tasks" element={<LeaderTasks />} />       
          <Route path="performance" element={<LeaderDashboard />} />
          <Route path="calendar" element={<LeaderCalendar />} />
          <Route path="setting" element={<LeaderSetting />} /> 
           {/* Settings Link */}
          
          {/* Task Detail View for 'Manage' button navigation */}
          <Route path="tasks/:taskId" element={<LeaderTasks />} /> 
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects/>}/>
          <Route path="create" element={<CreateAdmin />} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="setting" element={<AdminSetting />} />
          
        </Route>
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;