export type WindowState = {
  id: string;
  title: string;
  appType: "about" | "projects" | "contact" | "music" | string;
  icon?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  isOpen: boolean;
  createdAt: number;
  payload?: Record<string, unknown>;
};

export type IconConfig = {
  id: string;
  label: string;
  appType: WindowState["appType"];
  icon: string;
  x: number;
  y: number;
};

export type WindowStore = {
  windows: WindowState[];
  maxZ: number;
  openWindow: (config: Partial<WindowState>) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  setWindowPosition: (id: string, x: number, y: number) => void;
  setWindowSize: (id: string, width: number, height: number) => void;
  focusWindow: (id: string) => void;
  getWindows: () => WindowState[];
  resetDesktop: () => void;
};
