"use client";

import { useEffect, useRef, useState } from "react";

export function MarqueeText({
  text,
  duration = 15,
  isPlaying = true,
}: {
  text: string;
  duration?: number;
  isPlaying?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [sizes, setSizes] = useState({ container: 0, text: 0 });

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const measure = () => {
      setSizes({
        container: containerRef.current!.offsetWidth,
        text: textRef.current!.offsetWidth,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden whitespace-nowrap"
    >
      <span
        ref={textRef}
        style={
          {
            "--containerWidth": `${sizes.container}px`,
            "--textWidth": `${sizes.text}px`,
            animation: `marquee ${duration}s linear infinite`,
            animationPlayState: isPlaying ? "running" : "paused",
          } as React.CSSProperties
        }
        className="inline-block"
      >
        {text}
      </span>
    </div>
  );
}
