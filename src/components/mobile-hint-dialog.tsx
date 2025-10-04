"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface MobileHintDialogProps {
  onClose: () => void;
}

export default function MobileHintDialog({ onClose }: MobileHintDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div
        ref={dialogRef}
        className="win98-border-out w-[85%] max-w-xs bg-[#c0c0c0] font-[Tahoma,Arial] text-sm"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-[#000080] px-2 py-1 text-white">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/info.webp"
              alt="Info icon"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="text-[13px] font-bold">Information</span>
          </div>
          <button
            onClick={onClose}
            className="ml-2 flex h-4 w-4 items-center justify-center border border-black bg-[#c0c0c0] text-xs leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Message Box */}
        <div className="win98-border-in bg-white p-4 text-center">
          <p className="mb-4">
            📱 To open a window, <b>double-tap</b> a desktop shortcut.
          </p>
          <button
            onClick={onClose}
            className="win98-button px-4 py-1 font-bold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
