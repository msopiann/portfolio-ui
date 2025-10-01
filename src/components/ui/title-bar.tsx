import Image from "next/image";

interface TitleBarProps {
  title: string;
  icon?: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export function TitleBar({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  return (
    <div className="flex h-7 cursor-move items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1 select-none">
      <div className="flex items-center gap-1">
        {icon && <Image src={icon} alt={title} width={16} height={16} />}
        <span className="ml-1 text-xs font-bold text-white">{title}</span>
      </div>
      <div className="flex gap-[2px]">
        <button
          onClick={onMinimize}
          className="win98-button flex h-5 w-5 items-center justify-center text-[10px] font-bold"
          aria-label="Minimize"
        >
          _
        </button>
        <button
          onClick={onMaximize}
          className="win98-button flex h-5 w-5 items-center justify-center text-[10px] font-bold"
          aria-label="Maximize"
        >
          🗖
        </button>
        <button
          onClick={onClose}
          className="win98-button flex h-5 w-5 items-center justify-center text-[10px] font-bold"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
