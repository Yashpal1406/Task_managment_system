import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

export default function TaskDetails() {
  const { taskId } = useParams();

  /* ---------------- STATE ---------------- */
  const [status, setStatus] = useState("In Progress");
  const [attachments, setAttachments] = useState([]);
  const [comment, setComment] = useState("");
  const [activities, setActivities] = useState([]);

  const fileInputRef = useRef(null);

  /* ----------- MOCK PEOPLE DATA ----------- */
  const assignedTo = {
    name: "Alex Morgan",
    initials: "AM",
    role: "Assigned By (Manager)",
  };

  const collaborators = [
    { name: "John Carter", initials: "JC" },
    { name: "Priya Sharma", initials: "PS" },
    { name: "Rahul Verma", initials: "RV" },
  ];

  const tags = ["#WebDev", "#CalendarPage", "#HighPriority"];

  /* ---------------- HANDLERS ---------------- */
  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setActivities((prev) => [...prev, { id: Date.now(), text: comment, time }]);

    setComment("");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-[#D3D9D4]/30 p-8">
      {/* Breadcrumb */}
      <p className="text-sm text-[#6D8B8C] mb-4">
        Projects &gt; Web Application Development &gt; Task #{taskId}
      </p>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#0D2426] mb-4">
            Design User Interface Mockups
          </h1>

          <div className="flex gap-3">
            {["Not Started", "In Progress", "Completed"].map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`px-5 py-2 rounded-full text-sm font-medium
                  ${
                    status === item
                      ? "bg-[#235857] text-white"
                      : "bg-white border border-[#D3D9D4]"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#235857]">
            <h2 className="text-lg font-semibold text-[#235857] mb-3">
              Description
            </h2>
            <p className="text-[#0D0D0D]/80">
              Create detailed UI mockups for dashboard and user profile pages.
              Include all states and ensure responsive design.
            </p>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#3B8A7F]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#235857]">
                Attachments
              </h2>
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 rounded-lg bg-[#235857] text-white text-sm"
              >
                + Add New
              </button>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileAdd}
                className="hidden"
              />
            </div>

            {attachments.length === 0 ? (
              <p className="text-sm text-[#6D8B8C]">
                No attachments yet. Click “Add New” to upload files.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {attachments.map((file, i) => (
                  <li
                    key={i}
                    className="flex justify-between border border-[#D3D9D4] rounded-lg px-3 py-2"
                  >
                    <span>{file.name}</span>
                    <span className="text-[#6D8B8C]">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#8CBDB3]">
            <h2 className="text-lg font-semibold text-[#235857] mb-6">
              Activity
            </h2>

            {activities.length === 0 && (
              <p className="text-sm text-[#6D8B8C] mb-4">
                No recent activity on this task.
              </p>
            )}

            <div className="space-y-5 mb-6">
              {activities.map((a) => (
                <div key={a.id} className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#8CBDB3] flex items-center justify-center font-semibold">
                    AM
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#235857]">
                      You <span className="text-[#6D8B8C] ml-2">{a.time}</span>
                    </p>
                    <div className="mt-1 bg-[#D3D9D4]/40 rounded-xl px-4 py-3 text-sm">
                      {a.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Write a comment or update..."
                className="flex-1 rounded-full border border-[#D3D9D4] px-5 py-3 text-sm"
              />
              <button
                onClick={handleAddComment}
                className="h-12 w-12 rounded-full bg-[#235857] text-white"
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          {/* Time Remaining */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <p className="text-sm font-semibold text-[#235857] mb-2">
              TIME REMAINING
            </p>
            <p className="text-3xl font-bold text-[#0D2426]">13d : 16h</p>
            <p className="text-sm text-[#6D8B8C]">Due Jan 30, 8:50 AM</p>
          </div>

          {/* People */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-[#235857] mb-4">
              PEOPLE
            </h3>

            <p className="text-xs text-[#6D8B8C] mb-2">ASSIGNED TO</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#8CBDB3] flex items-center justify-center font-semibold">
                {assignedTo.initials}
              </div>
              <div>
                <p className="font-medium">{assignedTo.name}</p>
                <p className="text-xs text-[#6D8B8C]">{assignedTo.role}</p>
              </div>
            </div>

            <p className="text-xs text-[#6D8B8C] mb-2">COLLABORATORS</p>
            <div className="flex -space-x-2">
              {collaborators.map((c) => (
                <div
                  key={c.name}
                  title={c.name}
                  className="h-9 w-9 rounded-full bg-[#3B8A7F] text-white flex items-center justify-center text-sm border-2 border-white"
                >
                  {c.initials}
                </div>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-[#235857] mb-4">
              PROPERTIES
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[#6D8B8C]">CREATED</p>
                <p className="font-medium">Jan 8, 2026</p>
              </div>
              <div>
                <p className="text-[#6D8B8C]">EST. HOURS</p>
                <p className="font-medium">12 Hours</p>
              </div>
              <div>
                <p className="text-[#6D8B8C]">PROJECT</p>
                <p className="font-medium text-[#235857]">
                  E-Commerce Platform Redesign
                </p>
              </div>
              <div>
                <p className="text-[#6D8B8C]">DOMAIN</p>
                <p className="font-medium">Not specified</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-[#235857] mb-4">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-lg bg-[#D3D9D4]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
