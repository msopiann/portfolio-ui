"use client";

import React, { useState } from "react";
import { SiGooglechrome } from "@icons-pack/react-simple-icons";
import { PROJECTS } from "@/lib/data";

export default function FakeGoogleHome({
  addTab,
}: {
  addTab: (url: string, title?: string) => void;
}) {
  const [q, setQ] = useState("");

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white">
      <h1 className="mb-6 text-5xl font-bold select-none">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!q.trim()) return;
          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
          addTab(searchUrl, `Google - ${q}`);
          setQ("");
        }}
        className="flex w-full max-w-md flex-col items-center space-y-3"
      >
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects..."
          className="w-full border border-gray-400 px-3 py-2 text-base shadow-inner focus:outline-none"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="border border-gray-400 bg-[#f2f2f2] px-3 py-1 text-sm hover:bg-[#e0e0e0]"
            style={{ boxShadow: "1px 1px #fff inset, -1px -1px #ccc inset" }}
          >
            Google Search
          </button>
          <button
            type="button"
            className="border border-gray-400 bg-[#f2f2f2] px-3 py-1 text-sm hover:bg-[#e0e0e0]"
            style={{ boxShadow: "1px 1px #fff inset, -1px -1px #ccc inset" }}
            onClick={() => {
              if (PROJECTS.length > 0) {
                const randomIndex = Math.floor(Math.random() * PROJECTS.length);
                const randomProject = PROJECTS[randomIndex];
                window.open(randomProject.url, "_blank");
              }
            }}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>

      <div className="mt-8 w-full max-w-md">
        <h3 className="mb-2 text-center text-xs font-bold text-[#000080]">
          My top 4 project (search for show more)
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {PROJECTS.slice(0, 4).map((p) => (
            <div
              key={p.url}
              className="flex w-24 cursor-pointer flex-col items-center justify-center border bg-[#ece9d8] p-2 text-center"
              style={{
                borderColor: "#a0a0a0",
                boxShadow: "inset 1px 1px #fff, inset -1px -1px #808080",
              }}
              onClick={() => window.open(p.url, "_blank")}
            >
              <SiGooglechrome size={20} className="mb-1 text-[#000080]" />
              <span className="w-full truncate text-[10px] font-medium">
                {p.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
