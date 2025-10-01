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
        const newWindow: WindowState = {
          id,
          title: config.title || "Untitled",
          appType: config.appType || "about",
          icon: config.icon,
          x: config.x ?? 100 + state.windows.length * 30,
          y: config.y ?? 100 + state.windows.length * 30,
          width: config.width ?? 600,
          height: config.height ?? 400,
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
