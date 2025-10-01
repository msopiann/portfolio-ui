"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, Wifi, Usb } from "lucide-react";

export function SystemTray({ currentTime }: { currentTime: string }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div className="flex items-center gap-2 px-2">
      <button className="hover:opacity-70" title="Volume">
        <Volume2 size={16} />
      </button>

      <button className="hover:opacity-70" title="Network Connection">
        <Wifi size={16} />
      </button>

      <button className="hover:opacity-70" title="Safely Remove Hardware">
        <Usb size={16} />
      </button>

      <div className="relative" ref={calendarRef}>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="win98-border-in flex h-7 items-center px-2"
          title="Click to view calendar"
        >
          <span className="font-mono text-xs">{currentTime}</span>
        </button>

        {showCalendar && (
          <div className="win98-border-out absolute right-0 bottom-full mb-1 w-48 bg-[#c0c0c0] p-2 text-xs">
            <p className="mb-1 font-bold">
              {monthNames[month]} {year}
            </p>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="font-bold">
                  {d}
                </span>
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                <span
                  key={d}
                  className={`${
                    d === 1 ? `col-start-${firstDay + 1}` : ""
                  } cursor-pointer hover:bg-[#000080] hover:text-white ${
                    d === now.getDate()
                      ? "bg-[#000080] font-bold text-white"
                      : ""
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
