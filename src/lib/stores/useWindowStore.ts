import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WindowState, WindowStore } from "@/types/window";

const generateId = () =>
  `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      maxZ: 1,

      openWindow: (config) => {
        const state = get();

        const existing = state.windows.find(
          (w) => w.appType === config.appType,
        );

        if (existing) {
          set({
            windows: state.windows.map((w) =>
              w.id === existing.id
                ? {
                    ...w,
                    minimized: false,
                    isOpen: true,
                    z: state.maxZ + 1,
                  }
                : w,
            ),
            maxZ: state.maxZ + 1,
          });
          return existing.id;
        }

        const id = generateId();

        const screenWidth =
          typeof window !== "undefined" ? window.innerWidth : 1024;
        const screenHeight =
          typeof window !== "undefined" ? window.innerHeight : 768;

        const marginX = screenWidth < 768 ? 20 : 100;
        const marginY = screenHeight < 768 ? 20 : 100;

        const newWindow: WindowState = {
          id,
          title: config.title || "Untitled",
          appType: config.appType || "about",
          icon: config.icon,
          x:
            config.x ??
            Math.min(marginX + state.windows.length * 30, screenWidth - 320),
          y:
            config.y ??
            Math.min(marginY + state.windows.length * 30, screenHeight - 240),
          width: Math.min(config.width ?? 600, screenWidth - 40),
          height: Math.min(config.height ?? 400, screenHeight - 80),
          z: state.maxZ + 1,
          minimized: false,
          maximized: false,
          isOpen: true,
          createdAt: Date.now(),
          payload: config.payload,
        };

        set({
          windows: [...state.windows, newWindow],
          maxZ: state.maxZ + 1,
        });

        return id;
      },

      closeWindow: (id) => {
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id),
        }));
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: true } : w,
          ),
        }));
      },

      restoreWindow: (id) => {
        const state = get();
        set({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, minimized: false, maximized: false, z: state.maxZ + 1 }
              : w,
          ),
          maxZ: state.maxZ + 1,
        });
      },

      maximizeWindow: (id) => {
        const state = get();
        set({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, maximized: !w.maximized, z: state.maxZ + 1 }
              : w,
          ),
          maxZ: state.maxZ + 1,
        });
      },

      setWindowPosition: (id, x, y) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
        }));
      },

      setWindowSize: (id, width, height) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, width, height } : w,
          ),
        }));
      },

      focusWindow: (id) => {
        const state = get();
        set({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, z: state.maxZ + 1 } : w,
          ),
          maxZ: state.maxZ + 1,
        });
      },

      getWindows: () => get().windows,

      resetDesktop: () => {
        set({ windows: [], maxZ: 1 });
      },
    }),
    {
      name: "desktop_state_v1",
      version: 1,
      partialize: (state) => ({
        windows: state.windows,
        maxZ: state.maxZ,
      }),
    },
  ),
);
