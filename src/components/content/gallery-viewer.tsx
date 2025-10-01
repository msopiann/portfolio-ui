"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/data";

export default function GalleryViewer() {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const nextImage = () => setIndex((index + 1) % GALLERY.length);
  const prevImage = () =>
    setIndex((index - 1 + GALLERY.length) % GALLERY.length);

  return (
    <div className="flex h-full w-full flex-col bg-white font-sans text-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-gray-400 bg-[#ece9d8] px-2 py-1 text-xs">
        <button
          onClick={() => setScale(scale + 0.2)}
          className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
        >
          🔍 +
        </button>
        <button
          onClick={() => setScale(scale > 0.4 ? scale - 0.2 : scale)}
          className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
        >
          🔍 -
        </button>

        {GALLERY.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
            >
              ◀ Prev
            </button>
            <button
              onClick={nextImage}
              className="border border-gray-400 bg-[#f0f0f0] px-2 py-0.5 hover:bg-[#dcdcdc]"
            >
              Next ▶
            </button>
          </>
        )}

        <span className="ml-2">
          {index + 1} of {GALLERY.length}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-hidden bg-gray-100">
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={GALLERY[index].src}
            alt={GALLERY[index].alt}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
