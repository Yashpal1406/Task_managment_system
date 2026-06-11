import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TASKS } from "../../data/tasksdata";

/* ---------- helpers ---------- */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/* ---------- stats ---------- */
function getStats(tasks) {
  return [
    {
      title: "Total Tasks",
      value:
        tasks.pending.length + tasks.inProgress.length + tasks.completed.length,
    },
    { title: "In Progress", value: tasks.inProgress.length },
    { title: "Completed", value: tasks.completed.length },
    { title: "Overdue", value: 0 },
  ];
}

/* ---------- upcoming deadlines (derived) ---------- */
function getUpcomingDeadlines(limit = 3) {
  const today = new Date();

  return [...TASKS.pending, ...TASKS.inProgress]
    .map((task) => ({
      id: task.id,
      title: task.title,
      project: task.project,
      date: new Date(task.due),
      time: "8:50 AM",
    }))
    .filter((d) => d.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, limit);
}

/* ---------- component ---------- */
export default function Dashboard() {
  const greeting = useMemo(getGreeting, []);
  const navigate = useNavigate();
  const stats = getStats(TASKS);
  const deadlines = getUpcomingDeadlines();

  return (
    <div className="space-y-12">
      {/* ================= GREETING ================= */}
      <section className="rounded-3xl p-8 bg-gradient-to-r from-[#235857] to-[#3B8A7F] text-white shadow-sm">
        <h1 className="text-3xl font-bold">
          {greeting}, <span className="text-[#D3D9D4]">Alex</span>
        </h1>
        <p className="mt-2 text-[#D3D9D4]">
          You have {TASKS.inProgress.length} tasks in progress today.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3D9D4]"
          >
            <p className="text-sm text-[#6D8B8C]">{s.title}</p>
            <p className="mt-2 text-3xl font-bold text-[#0D2426]">{s.value}</p>
          </div>
        ))}
      </section>

      {/* ================= TASK BOARD ================= */}
      <section>
        <h2 className="text-xl font-semibold text-[#0D2426] mb-4">
          Task Board
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BoardColumn title="Pending">
            {TASKS.pending.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => navigate("/employee/tasks")}
              />
            ))}
          </BoardColumn>

          <BoardColumn title="In Progress">
            {TASKS.inProgress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => navigate("/employee/tasks")}
              />
            ))}
          </BoardColumn>

          <BoardColumn title="Completed">
            {TASKS.completed.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completed
                onClick={() => navigate("/employee/tasks")}
              />
            ))}
          </BoardColumn>
        </div>
      </section>

      {/* ================= UPCOMING DEADLINES ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#0D2426] flex items-center gap-2">
            <span className="w-1 h-6 bg-[#235857] rounded-full" />
            Upcoming Deadlines
          </h2>

          <button
            onClick={() => navigate("/employee/calendar")}
            className="text-sm px-4 py-2 rounded-lg bg-[#D3D9D4]/60 text-[#235857]"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {deadlines.map((d) => (
            <div
              key={d.id}
              className="flex bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* DATE */}
              <div className="w-24 flex flex-col items-center justify-center bg-[#235857] text-white">
                <span className="text-xs font-semibold">
                  {d.date
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase()}
                </span>
                <span className="text-2xl font-bold">{d.date.getDate()}</span>
              </div>

              {/* CONTENT */}
              <div className="flex-1 px-6 py-4">
                <p className="font-semibold text-[#0D2426]">{d.title}</p>
                <p className="text-sm text-[#6D8B8C] mt-1">
                  {d.time} • {d.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- sub components ---------- */

function BoardColumn({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#D3D9D4]">
      <h3 className="text-sm font-semibold text-[#235857] mb-3">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TaskCard({ task, completed, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-[#D3D9D4] p-4 shadow-sm bg-white hover:bg-[#F3F6F5] transition"
    >
      <span className="inline-block mb-2 text-xs px-3 py-1 rounded-full bg-[#D3D9D4]/60 text-[#235857]">
        {task.project}
      </span>

      <p
        className={`font-medium ${
          completed ? "line-through text-[#6D8B8C]" : "text-[#0D2426]"
        }`}
      >
        {task.title}
      </p>

      <div className="mt-3 text-xs text-[#6D8B8C] flex justify-between">
        <span>AM</span>
        <span>{task.due}</span>
      </div>
    </div>
  );
}
