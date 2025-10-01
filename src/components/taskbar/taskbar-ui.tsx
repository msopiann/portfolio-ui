"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/stores/useWindowStore";
import { formatTime } from "@/lib/utils";
import type { WindowState } from "@/types/window";
import Image from "next/image";
import { Power, RotateCw } from "lucide-react";

import { DESKTOP_ICONS } from "@/lib/data";
import { SystemTray } from "./system-tray";

export function Taskbar() {
  const windows = useWindowStore((state) => state.windows);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const resetDesktop = useWindowStore((state) => state.resetDesktop);
  const openWindow = useWindowStore((state) => state.openWindow);

  const [currentTime, setCurrentTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(formatTime());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWindowClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      minimizeWindow(windowId);
    }
  };

  const handleShortcutClick = (iconId: string) => {
    const existingWindow = windows.find((w) => w.appType === iconId);
    if (existingWindow) {
      handleWindowClick(existingWindow.id, existingWindow.minimized);
    } else {
      const icon = DESKTOP_ICONS.find((i) => i.id === iconId);
      if (icon) {
        openWindow({
          title: icon.label,
          appType: icon.id,
          icon: icon.icon,
          width: 600,
          height: 400,
        });
      }
    }
    setStartMenuOpen(false);
  };

  return (
    <div
      id="taskbar"
      className="fixed right-0 bottom-0 left-0 z-[9999] flex h-12 items-center gap-1 border-t-2 border-white bg-[#c0c0c0] px-1 sm:h-10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="win98-button flex h-8 items-center gap-2 px-3 text-sm font-bold"
        >
          <div className="flex h-5 w-5 items-center justify-center">
            <Image
              src="/icons/windows.webp"
              alt="Windows Icon"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <span>Start</span>
        </button>

        {startMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setStartMenuOpen(false)}
            />
            <div className="win98-border-out absolute bottom-full left-0 z-[9999] mb-1 w-56 bg-[#c0c0c0]">
              <div className="space-y-1 p-1">
                {DESKTOP_ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    onClick={() => handleShortcutClick(icon.id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#000080] hover:text-white"
                  >
                    <Image
                      src={icon.icon}
                      alt={icon.label}
                      width={16}
                      height={16}
                    />
                    <span>{icon.label}</span>
                  </button>
                ))}

                <hr className="my-1 border-t border-gray-400" />

                <button
                  onClick={() => {
                    resetDesktop();
                    setStartMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#000080] hover:text-white"
                >
                  <RotateCw size={14} />
                  <span>Reset Desktop</span>
                </button>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("splashDone");
                    location.reload();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#000080] hover:text-white"
                >
                  <Power size={14} />
                  <span>Reboot Desktop</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="h-8 w-[2px] border-r border-white bg-[#808080]" />

      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((window: WindowState) => (
          <button
            key={window.id}
            onClick={() => handleWindowClick(window.id, window.minimized)}
            className={`win98-button h-8 max-w-[200px] truncate px-3 text-sm font-bold ${
              window.minimized ? "" : "bg-[#dfdfdf]"
            }`}
          >
            <div className="flex items-center gap-2">
              {window.icon && (
                <div className="h-4 w-4">
                  <Image
                    src={window.icon}
                    alt={window.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    priority
                  />
                </div>
              )}
              <span>{window.title}</span>
            </div>
          </button>
        ))}
      </div>

      <SystemTray currentTime={mounted ? currentTime : "00:00"} />
    </div>
  );
}
