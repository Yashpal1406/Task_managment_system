import { useState } from "react";

/* 🔹 Central calendar events (later reused by Dashboard) */
const events = [
  {
    date: "2026-01-23",
    title: "Design User Authentication Flow",
  },
  {
    date: "2026-02-05",
    title: "Build Task List Component",
  },
];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "en-US",
    { month: "long" }
  );

  const getEventsForDate = (dateStr) =>
    events.filter((e) => e.date === dateStr);

  const prevMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {monthName} {currentYear}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ◀
          </button>
          <button
            onClick={nextMonth}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Week Days */}
        <div className="grid grid-cols-7 text-sm text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2">
          {[...Array(firstDay)].map((_, i) => (
            <div key={i} />
          ))}

          {[...Array(daysInMonth)].map((_, day) => {
            const date = new Date(currentYear, currentMonth, day + 1);
            const dateStr = date.toISOString().split("T")[0];
            const isToday = date.toDateString() === new Date().toDateString();
            const hasEvents = getEventsForDate(dateStr).length > 0;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-14 rounded-xl border text-sm flex flex-col items-center justify-center relative
                  ${
                    isToday
                      ? "border-teal-600 text-teal-700 font-semibold"
                      : "border-gray-200 text-gray-700"
                  }
                  hover:bg-teal-50`}
              >
                {day + 1}

                {hasEvents && (
                  <span className="absolute bottom-1 w-2 h-2 rounded-full bg-teal-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event List */}
      {selectedDate && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">
            Events on{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>

          {getEventsForDate(selectedDate).length === 0 ? (
            <p className="text-sm text-gray-500">No events</p>
          ) : (
            <ul className="space-y-2">
              {getEventsForDate(selectedDate).map((e, i) => (
                <li
                  key={i}
                  className="text-sm px-4 py-2 rounded-lg bg-teal-50 text-teal-700"
                >
                  {e.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
