import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  Bell,
  Globe,
  AlertTriangle,
  LogOut,
  Trash2,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  /* ---------------- ACCOUNT ---------------- */
  const [avatar, setAvatar] = useState(localStorage.getItem("profileAvatar"));

  /* ---------------- NOTIFICATIONS ---------------- */
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [taskReminder, setTaskReminder] = useState(true);

  /* ---------------- LANGUAGE ---------------- */
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  /* ---------------- HANDLERS ---------------- */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileAvatar", reader.result);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "This action is irreversible. Are you sure you want to delete your account?"
    );
    if (!ok) return;

    localStorage.clear();
    navigate("/signup");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8 max-w-6xl">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2426] flex items-center gap-2">
          <User className="text-[#1F6F68]" size={22} /> Settings
        </h1>
        <p className="text-[#6D8B8C] mt-1 text-sm">
          Manage your account preferences
        </p>
      </div>

      {/* ACCOUNT */}
      <Section title="Account" icon={User}>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-[#D3D9D4] flex items-center justify-center text-2xl font-semibold text-[#235857] overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                "AM"
              )}
            </div>

            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#1F6F68] text-white p-2 rounded-full shadow"
            >
              <Camera size={14} />
            </button>

            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <p className="text-xs text-[#6D8B8C]">
            Click the camera icon to change your profile picture
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          <Input label="Name" value="Alex Morgan" disabled />
          <Input label="Email" value="employee@gmail.com" disabled />
          <Input label="Domain" value="Full Stack" disabled />
        </div>

        <button className="mt-5 px-5 py-2 rounded-xl bg-[#1F6F68] text-white text-sm font-medium">
          Change Password
        </button>
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Notifications" icon={Bell}>
        <div className="space-y-3">
          <Checkbox
            title="Email Notifications"
            desc="Receive updates via email"
            checked={emailNotif}
            onChange={setEmailNotif}
          />
          <Checkbox
            title="Push Notifications"
            desc="Get real-time browser notifications"
            checked={pushNotif}
            onChange={setPushNotif}
          />
          <Checkbox
            title="Task Reminders"
            desc="Get reminded about upcoming tasks"
            checked={taskReminder}
            onChange={setTaskReminder}
          />
        </div>
      </Section>

      {/* LANGUAGE */}
      <Section title="Language & Region" icon={Globe}>
        <div className="grid md:grid-cols-2 gap-5">
          <Select
            label="Language"
            value={language}
            onChange={setLanguage}
            options={["English", "Hindi"]}
          />
          <Select
            label="Timezone"
            value={timezone}
            onChange={setTimezone}
            options={["Asia/Kolkata", "UTC"]}
          />
        </div>
      </Section>

      {/* DANGER ZONE */}
      <Section title="Danger Zone" icon={AlertTriangle} danger>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E5533D] text-white text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>

          <button
            onClick={handleDeleteAccount}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-medium"
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </Section>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, icon: Icon, children, danger }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm bg-white border-l-4 ${
        danger ? "border-red-500" : "border-[#1F6F68]"
      }`}
    >
      <h2
        className={`text-base font-semibold mb-5 flex items-center gap-2 ${
          danger ? "text-red-600" : "text-[#1F6F68]"
        }`}
      >
        <Icon size={18} /> {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, value, disabled }) {
  return (
    <div>
      <label className="text-xs text-[#6D8B8C]">{label}</label>
      <input
        value={value}
        disabled={disabled}
        className="mt-1 w-full rounded-xl border px-4 py-2 text-sm bg-gray-100"
      />
    </div>
  );
}

function Checkbox({ title, desc, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F8F8] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-[#1F6F68]"
      />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-[#6D8B8C]">{desc}</p>
      </div>
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs text-[#6D8B8C]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
