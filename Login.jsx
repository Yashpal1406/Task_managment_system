import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP EMPLOYEE LOGIN (hardcoded)
    if (email === "employee@email.com" && password === "employee12@") {
      navigate("/employee");
    } else if (email === "leader@email.com" && password === "leader12@") {
      // Logic for Leader
      navigate("/leader");
    } else if (email === "admin@email.com" && password === "admin12@") {
      // Logic for Admin
      navigate("/admin");
    }else {
      alert("Invalid employee credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2EF] px-6">
      <div className="w-full max-w-6xl bg-white rounded-[36px] shadow-[0_40px_120px_rgba(13,36,38,0.22)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT — BRAND */}
          <div className="bg-gradient-to-br from-[#1E4F4C] via-[#235857] to-[#3B8A7F] px-16 py-14 flex flex-col justify-between">
            <span className="text-xs tracking-widest text-white/50 uppercase">
              Task management system
            </span>

            <div className="mt-10">
              <img
                src="/image/login.png"
                alt="Task planning"
                className="rounded-2xl shadow-xl max-w-[92%]"
              />
            </div>

            <div className="mt-10">
              <h2 className="text-[34px] font-semibold text-white leading-tight">
                Work, organized.
                <br />
                <span className="text-white/65">Focus, uninterrupted.</span>
              </h2>

              <p className="mt-4 text-sm text-white/75 max-w-sm leading-relaxed">
                A calm workspace designed to manage tasks, teams, and progress —
                without unnecessary complexity.
              </p>
            </div>
          </div>

          {/* RIGHT — LOGIN */}
          <div className="px-16 py-14 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-[28px] font-semibold text-[#0D2426]">
                Login
              </h1>
              <p className="mt-1 text-sm text-[#6D8B8C]">
                Sign in to your workspace
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-[#D3D9D4]
                             focus:border-[#3B8A7F] focus:ring-2 focus:ring-[#3B8A7F]/25
                             outline-none transition"
                >
                  <option>Select domain (Admin optional)</option>
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

                <p className="mt-1 text-xs text-[#6D8B8C]">
                  Admin can skip this. Team members must select their domain.
                </p>
              </div>

              <Input placeholder="Secret Key" type="password" />

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-[#235857]
                           text-white font-medium hover:bg-[#2F6F68] transition"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-[#6D8B8C]">
              New here?{" "}
              <Link
                to="/signup"
                className="text-[#235857] font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-[#D3D9D4]
                 focus:border-[#3B8A7F] focus:ring-2 focus:ring-[#3B8A7F]/25
                 outline-none transition"
    />
  );
}
