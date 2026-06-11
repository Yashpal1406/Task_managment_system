import { useState } from "react";

const teamsData = [
  {
    id: 1,
    name: "Frontend Development Team",
    leader: "Sarah Johnson",
    membersCount: 4,
    projects: 2,
    activeTasks: 3,
    progress: 25,
    members: [
      {
        name: "Sarah Johnson",
        role: "Team Leader",
        email: "leader@gmail.com",
        initials: "SJ",
        tasks: 0,
        completed: 0,
      },
      {
        name: "Alex Morgan",
        role: "Employee",
        email: "employee@gmail.com",
        initials: "AM",
        tasks: 4,
        completed: 1,
      },
      {
        name: "Mike Chen",
        role: "Employee",
        email: "mike.chen@graphura.com",
        initials: "MC",
        tasks: 6,
        completed: 3,
      },
      {
        name: "Priya Sharma",
        role: "Employee",
        email: "priya@graphura.com",
        initials: "PS",
        tasks: 2,
        completed: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Full Stack Development Team",
    leader: "Sarah Johnson",
    membersCount: 3,
    projects: 1,
    activeTasks: 2,
    progress: 0,
    members: [],
  },
];

export default function Teams() {
  const [openTeam, setOpenTeam] = useState(null);

  return (
    <div className="min-h-screen bg-[#D3D9D4]/40 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#0D2426] mb-2">My Teams</h1>
      <p className="text-[#6D8B8C] mb-8">
        View teams you are part of and their members.
      </p>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {teamsData.map((team) => {
          const isOpen = openTeam === team.id;

          return (
            <div
              key={team.id}
              className={`bg-white rounded-2xl shadow-md transition
                ${isOpen ? "border-2 border-[#235857]" : ""}`}
            >
              {/* Team Card Header */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-[#0D2426]">
                    {team.name}
                  </h2>

                  <button
                    onClick={() => setOpenTeam(isOpen ? null : team.id)}
                    className="h-9 w-9 rounded-full bg-[#D3D9D4] flex items-center justify-center text-[#0D2426]"
                  >
                    {isOpen ? "▲" : "▼"}
                  </button>
                </div>

                <p className="text-sm text-[#235857] mt-2">
                  Leader: {team.leader}
                </p>

                <div className="flex gap-4 text-sm text-[#3B8A7F] mt-4">
                  <span>{team.membersCount} Members</span>
                  <span>• {team.projects} Projects</span>
                  <span>• {team.activeTasks} Active Tasks</span>
                </div>

                {/* Team Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-[#6D8B8C]">
                      Team Progress
                    </span>
                    <span className="font-semibold text-[#235857]">
                      {team.progress}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#D3D9D4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#235857] to-[#8CBDB3]"
                      style={{ width: `${team.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isOpen && (
                <div className="border-t border-[#D3D9D4] px-6 py-6 bg-[#F3F6F5]">
                  <h3 className="text-lg font-semibold text-[#235857] mb-4">
                    Team Members
                  </h3>

                  {team.members.length === 0 ? (
                    <p className="text-sm text-[#6D8B8C]">
                      No members available.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {team.members.map((member) => {
                        const percent =
                          member.tasks === 0
                            ? 0
                            : Math.round(
                                (member.completed / member.tasks) * 100
                              );

                        return (
                          <div
                            key={member.email}
                            className="bg-white rounded-xl p-4 shadow-sm"
                          >
                            <div className="flex gap-4">
                              <div className="h-12 w-12 rounded-full bg-[#3B8A7F] flex items-center justify-center text-white font-semibold">
                                {member.initials}
                              </div>

                              <div className="flex-1">
                                <p className="font-semibold text-[#0D2426]">
                                  {member.name}
                                </p>
                                <p className="text-sm text-[#6D8B8C]">
                                  {member.role}
                                </p>
                                <p className="text-sm text-[#6D8B8C]">
                                  {member.email}
                                </p>

                                <div className="flex justify-between text-sm mt-3 text-[#235857]">
                                  <span>Tasks: {member.tasks}</span>
                                  <span>Completed: {member.completed}</span>
                                </div>

                                <div className="mt-2">
                                  <div className="h-2 bg-[#D3D9D4] rounded-full">
                                    <div
                                      className="h-full bg-gradient-to-r from-[#235857] to-[#8CBDB3] rounded-full"
                                      style={{
                                        width: `${percent}%`,
                                      }}
                                    />
                                  </div>
                                  <p className="text-right text-sm text-[#3B8A7F] mt-1">
                                    {percent}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
