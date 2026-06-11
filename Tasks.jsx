import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TASKS = {
  pending: [
    {
      id: "1768496356996",
      title: "Implement Shopping Cart Functionality",
      project: "E-Commerce Platform Redesign",
      description:
        "Build cart management with add, remove, and update quantity features.",
      due: "Jan 30, 2026",
      status: "Pending",
    },
  ],
  inProgress: [
    {
      id: "1768496356997",
      title: "Design User Authentication Flow",
      project: "E-Commerce Platform Redesign",
      description:
        "Create login, signup, and password reset UI components with validation.",
      due: "Jan 23, 2026",
      status: "In Progress",
    },
    {
      id: "1768496356998",
      title: "Build Task List Component",
      project: "Task Management Dashboard",
      description:
        "Create reusable task list component with drag-and-drop functionality.",
      due: "Feb 5, 2026",
      status: "In Progress",
    },
  ],
  completed: [
    {
      id: "1768496356999",
      title: "Design User Interface Mockups",
      project: "Web Application Development",
      description:
        "Create detailed UI mockups for dashboard and user profile pages.",
      due: "Jan 22, 2026",
      status: "Completed",
    },
  ],
};

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(TASKS);

  const handleStatusChange = (section, id, value) => {
    setTasks((prev) => ({
      ...prev,
      [section]: prev[section].map((task) =>
        task.id === id ? { ...task, status: value } : task
      ),
    }));
  };

  const Section = ({ title, color, sectionKey }) => (
    <div className="mb-10">
      <div
        className="rounded-xl p-6 shadow-lg"
        style={{ borderLeft: `6px solid ${color}`, background: "#FFFFFF" }}
      >
        <h2 className="text-xl font-semibold mb-6" style={{ color: "#235857" }}>
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks[sectionKey].map((task) => (
            <div
              key={task.id}
              className="rounded-xl border border-[#D3D9D4] bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[#0D0D0D] text-lg">
                  {task.title}
                </h3>

                <span
                  className="px-3 py-1 text-xs rounded-full font-medium"
                  style={{
                    background:
                      task.status === "Completed"
                        ? "#8CBDB3"
                        : task.status === "In Progress"
                        ? "#3B8A7F"
                        : "#D3D9D4",
                    color: "#0D2426",
                  }}
                >
                  {task.status}
                </span>
              </div>

              <p className="text-sm mt-2 text-[#6D8B8C] font-medium">
                {task.project}
              </p>

              <p className="text-sm mt-3 text-[#0D0D0D]/80">
                {task.description}
              </p>

              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-[#6D8B8C]">Due: {task.due}</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/employee/tasks/${task.id}`)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ background: "#235857" }}
                  >
                    View Details
                  </button>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(sectionKey, task.id, e.target.value)
                    }
                    className="rounded-lg border border-[#D3D9D4] px-3 py-2 text-sm focus:outline-none"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-[#D3D9D4]/30 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-[#0D2426]">Task Overview</h1>
      <p className="text-[#6D8B8C] mb-8">
        View and manage tasks assigned to you.
      </p>

      <Section title="Pending Tasks" color="#235857" sectionKey="pending" />
      <Section title="In Progress" color="#3B8A7F" sectionKey="inProgress" />
      <Section title="Completed" color="#8CBDB3" sectionKey="completed" />
    </div>
  );
}
