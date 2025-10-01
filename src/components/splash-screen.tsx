"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [skip, setSkip] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const alreadyDone = sessionStorage.getItem("splashDone");
    if (alreadyDone) {
      setSkip(true);
      onFinish?.();
      return;
    }
  }, [onFinish]);

  useEffect(() => {
    if (skip) return;

    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 1), 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          sessionStorage.setItem("splashDone", "true");
          onFinish?.();
        }, 600);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, skip, onFinish]);

  if (skip) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#5a7edc] bg-cover bg-center text-center font-[Tahoma,Arial] text-sm leading-relaxed text-white transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundImage: "url('/update-background.jpg')" }}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/logo.webp"
          alt="Windows Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
          className="mb-5"
        />
        <span>
          <span>Installing Windows Updates... </span>
          <span>{progress}</span>%
          <br />
          <span className="animate-pulse">
            Do not turn off or unplug your computer.
          </span>
        </span>
      </div>
    </div>
  );
}
