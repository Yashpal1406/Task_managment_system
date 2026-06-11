import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FACTS = [
  "Ashu helps teams reduce task chaos by 42%",
  "Teams using AShu ship faster on average",
  "Ashu supports role-based access control",
  "Designed for scalable team collaboration",
  "Ashu improves sprint visibility",
  "Built for engineering and product teams",
  "Supports multi-domain workflows",
  "Secure-by-design architecture",
  "Optimized for enterprise task flows",
  "Clean UI reduces cognitive overload",
  "Ashu improves task ownership clarity",
  "Real-time task insights included",
  "Minimal UI, maximum execution",
  "Built with productivity-first mindset",
  "Helps leaders track execution health",
  "Supports Admin, Leader & Employee roles",
  "Domain-based task segregation",
  "Designed for remote teams",
  "Improves accountability across teams",
  "Reduces context switching",
  "Secure authorization layers",
  "Task clarity boosts delivery speed",
  "Ashu scales with team growth",
  "No unnecessary UI noise",
  "Modern SaaS-grade UX",
  "Supports agile execution",
  "Clear execution pipelines",
  "Ashu adapts to workflows",
  "Helps teams stay on track",
  "Execution-first design",
  "Simple yet powerful structure",
  "Designed for decision makers",
  "Reliable task visibility",
  "Supports complex organizations",
  "Built for long-term usage",
  "Professional-grade UI",
  "Execution clarity at scale",
  "Ashu enhances team alignment",
  "Trusted task management foundation",
];

export default function Landing() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 5) % FACTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleFacts = FACTS.slice(index, index + 6);

  return (
    <div className="min-h-screen bg-[#1F6F68] text-white">
      {/* HEADER */}
      <header className="flex items-center justify-between px-12 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/image/logo.png" alt="logo.png" className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm opacity-80 hover:opacity-100">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-[#0f2f2e] px-5 py-2 rounded-md text-sm font-semibold"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-12 py-20">
        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Manage Tasks
            <br />
            <span className="text-white/60">Like a Pro</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-xl">
            A modern task management platform built for teams that value
            clarity, structure, and execution — without noise.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              to="/signup"
              className="bg-white text-[#0f2f2e] px-6 py-3 rounded-md font-semibold"
            >
              Space
            </Link>
            <Link
              to="/login"
              className="border border-white/30 px-6 py-3 rounded-md"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* RIGHT — LIVE INSIGHTS */}
        <div className="bg-neutral-400 text-[#0f2f2e] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Live Insights · Ashu</h3>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Live
            </span>
          </div>

          <ul className="space-y-3 h-[200px] overflow-hidden">
            {visibleFacts.map((fact, i) => (
              <li
                key={i}
                className="text-sm border-l-4 border-[#0f2f2e] pl-3 animate-fade"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-400 p-8 rounded-2xl border border-[#021512] shadow-sm">
            <h4 className="font-semibold text-lg mb-2 text-[#0D2426]">
              Role-based Access
            </h4>
            <p className="text-[#010404] text-sm leading-relaxed">
              Admin · Leader · Employee level controls for clean responsibility
              boundaries.
            </p>
          </div>

          <div className="bg-neutral-400 p-8 rounded-2xl border border-[#021512] shadow-sm">
            <h4 className="font-semibold text-lg mb-2 text-[#061112]">
              Domain Control
            </h4>
            <p className="text-[#031311] text-sm leading-relaxed">
              Frontend, Backend, DevOps and more — structured by domain.
            </p>
          </div>

          <div className="bg-neutral-400 p-8 rounded-2xl border border-[#021512] shadow-sm">
            <h4 className="font-semibold text-lg mb-2 text-[#0D2426]">
              Secure by Design
            </h4>
            <p className="text-[#020c0b] text-sm leading-relaxed">
              Authorization layers and key validation built into the system.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-white/40 py-6 border-t border-white/10">
        © 2026 Ashu. All rights reserved.
      </footer>
    </div>
  );
}
