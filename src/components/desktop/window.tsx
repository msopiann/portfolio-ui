"use client";

import { useRef } from "react";
import { TitleBar } from "@/components/ui/title-bar";
import { useWindowStore } from "@/lib/stores/useWindowStore";
import type { WindowState } from "@/types/window";
import { WindowContent } from "./window-content";
import { useInteractable } from "@/lib/hooks/useInteractable";

interface WindowProps {
  window: WindowState;
}

export function Window({ window }: WindowProps) {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    setWindowPosition,
    setWindowSize,
    focusWindow,
  } = useWindowStore();

  useInteractable({
    ref: windowRef,
    windowId: window.id,
    x: window.x,
    y: window.y,
    setWindowPosition,
    setWindowSize,
  });

  const taskbarHeight =
    typeof window !== "undefined"
      ? document.getElementById("taskbar")?.offsetHeight || 40
      : 40;

  const style = window.maximized
    ? {
        left: 0,
        top: 0,
        width: "100%",
        height: `calc(100% - ${taskbarHeight}px)`,
      }
    : {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
      };

  return (
    <div
      ref={windowRef}
      className={`win98-border-out absolute flex flex-col bg-[#c0c0c0] ${window.minimized ? "hidden" : "block"}`}
      style={{ ...style, zIndex: window.z }}
      onMouseDown={() => focusWindow(window.id)}
    >
      <TitleBar
        title={window.title}
        icon={window.icon}
        onMinimize={() => minimizeWindow(window.id)}
        onMaximize={() => maximizeWindow(window.id)}
        onClose={() => closeWindow(window.id)}
      />

      <div className="win98-border-in m-1 flex-1 overflow-auto bg-white">
        <WindowContent appType={window.appType} payload={window.payload} />
      </div>
    </div>
  );
}
