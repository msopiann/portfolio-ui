"use client";

import { useEffect, useState } from "react";
import { Desktop } from "@/components/desktop/desktop-ui";
import { Window } from "@/components/desktop/window";
import { Taskbar } from "@/components/taskbar/taskbar-ui";
import { useWindowStore } from "@/lib/stores/useWindowStore";
import SplashScreen from "@/components/splash-screen";
import MobileHintDialog from "@/components/mobile-hint-dialog";

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const [splashDone, setSplashDone] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  useEffect(() => {
    if (splashDone && window.innerWidth < 768) {
      const seen = sessionStorage.getItem("mobileHintSeen");
      if (!seen) {
        setShowMobileHint(true);
        sessionStorage.setItem("mobileHintSeen", "true");
      }
    }
  }, [splashDone]);

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

      {showMobileHint && (
        <MobileHintDialog onClose={() => setShowMobileHint(false)} />
      )}
    </main>
  );
}
