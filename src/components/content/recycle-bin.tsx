import React from "react";
import Image from "next/image";

export default function RecycleBin() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-sm text-gray-700">
      <Image
        src="/icons/trash.webp"
        alt="Recycle Bin"
        width={64}
        height={64}
        className="mb-2"
      />
      <p className="font-sans">Recycle Bin is empty.</p>
    </div>
  );
}
