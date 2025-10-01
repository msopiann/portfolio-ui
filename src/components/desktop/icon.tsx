import type { IconConfig } from "@/types/window";
import Image from "next/image";

interface IconProps {
  config: IconConfig;
  onDoubleClick: () => void;
}

export function Icon({ config, onDoubleClick }: IconProps) {
  const isImage =
    config.icon.endsWith(".png") ||
    config.icon.endsWith(".jpg") ||
    config.icon.endsWith(".webp") ||
    config.icon.endsWith(".svg") ||
    config.icon.endsWith(".gif");

  const isGif = config.icon.toLowerCase().endsWith(".gif");
  return (
    <button
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => e.preventDefault()}
      className="flex cursor-pointer flex-col items-center gap-1 rounded-sm p-2 transition-colors hover:bg-[rgba(0,0,170,0.3)] focus:bg-[rgba(0,0,170,0.5)] focus:outline-none"
      style={{
        position: "absolute",
        left: `${config.x}px`,
        top: `${config.y}px`,
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center">
        {isImage ? (
          <Image
            src={config.icon}
            alt={config.label}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            unoptimized={isGif}
            priority
            className="h-12 w-12 object-contain"
          />
        ) : (
          <span className="text-4xl">{config.icon}</span>
        )}
      </div>
      <span className="max-w-[80px] text-center text-xs leading-tight font-bold text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
        {config.label}
      </span>
    </button>
  );
}
