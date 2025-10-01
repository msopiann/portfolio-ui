import Image from "next/image";
import React from "react";
import { ABOUT_ME } from "@/lib/data";

export default function AboutMe() {
  return (
    <div className="win98-border-out flex min-h-full w-full flex-col items-center justify-center bg-[#ece9d8] p-1 font-sans text-sm">
      <div className="flex max-w-full flex-col items-center rounded-sm p-1 text-center">
        <Image
          src={ABOUT_ME.avatar}
          alt={ABOUT_ME.name}
          width={96}
          height={96}
          priority
          className="mb-3 h-24 w-24 rounded-full border-2 border-[#000080] object-cover"
        />

        <h3 className="mb-2 text-lg font-bold text-[#000080]">
          {ABOUT_ME.greeting}
        </h3>
        <p className="mb-4 leading-relaxed text-gray-800">
          {ABOUT_ME.title}. {ABOUT_ME.description}
        </p>

        <div className="w-full text-left">
          <h4 className="mb-1 border-b border-gray-400 font-bold text-[#000080]">
            Quick Facts
          </h4>
          <ul className="list-none space-y-2">
            {ABOUT_ME.quickFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
