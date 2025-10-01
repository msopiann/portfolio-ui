"use client";

import { useState } from "react";
import { Desktop } from "@/components/desktop/desktop-ui";
import { Window } from "@/components/desktop/window";
import { Taskbar } from "@/components/taskbar/taskbar-ui";
import { useWindowStore } from "@/lib/stores/useWindowStore";
import SplashScreen from "@/components/splash-screen";

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const [splashDone, setSplashDone] = useState(false);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}

      <div
        className={`transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Desktop />
        {windows.map((window) => (
          <Window key={window.id} window={window} />
        ))}
        <Taskbar />
      </div>
    </main>
  );
}
