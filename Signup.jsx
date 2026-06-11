import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="h-screen bg-[#eef2ef] flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1f5f5b] to-[#163f3c] p-8 text-white">
          {/* HEADER */}
          <p className="text-xs tracking-widest opacity-70">
            TASK MANAGEMENT SYSTEM
          </p>

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="bg-white/10 rounded-xl border border-white/20 p-4 w-full max-w-sm">
              <img
                src="/image/signup.png"
                alt="Workspace"
                className="h-40 mx-auto object-contain"
              />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-xl font-semibold leading-snug">
              Build your workspace
            </h2>

            <p className="text-sm opacity-85 mt-2 leading-relaxed max-w-sm">
              Define roles, organize domains, and manage execution with clarity
              — designed for structured teams.
            </p>
          </div>

          {/* FOOTER META */}
          <div className="text-xs opacity-70 flex gap-6">
            <span>Role-based</span>
            <span>Domain-wise</span>
            <span>Secure</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Set up your workspace access
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-[#1f5f5b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-[#1f5f5b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-[#1f5f5b]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <select className="mt-1 w-full rounded-lg border px-4 py-2.5 bg-white focus:ring-2 focus:ring-[#1f5f5b]">
                  <option>Select role</option>
                  <option>Employee</option>
                  <option>Team Leader</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Domain
                </label>
                <select className="mt-1 w-full rounded-lg border px-4 py-2.5 bg-white focus:ring-2 focus:ring-[#1f5f5b]">
                  <option>Select domain</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Full Stack</option>
                  <option>Mobile</option>
                  <option>DevOps</option>
                  <option>UI/UX</option>
                  <option>QA / Testing</option>
                  <option>Data Science</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Secret key
              </label>
              <input
                type="text"
                placeholder="Enter secret key"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-[#1f5f5b]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for authorized roles only
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1f5f5b] hover:bg-[#174b48] text-white py-2.5 rounded-lg font-medium transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1f5f5b] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
