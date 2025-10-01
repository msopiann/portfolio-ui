import { Icon } from "./icon";
import { useWindowStore } from "@/lib/stores/useWindowStore";
import type { IconConfig } from "@/types/window";
import { DESKTOP_ICONS } from "@/lib/data";

export function Desktop() {
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleIconDoubleClick = (icon: IconConfig) => {
    openWindow({
      title: icon.label,
      appType: icon.appType,
      icon: icon.icon,
      width: 600,
      height: 400,
    });
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      {DESKTOP_ICONS.map((icon) => (
        <Icon
          key={icon.id}
          config={icon}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        />
      ))}
    </div>
  );
}
