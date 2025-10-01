"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { MarqueeText } from "../ui/marquee";
import { TRACKS } from "@/lib/data";

function formatTime(time: number): string {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat] = useState(false);
  const [shuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      if (shuffle) return Math.floor(Math.random() * TRACKS.length);
      if (prev === TRACKS.length - 1) return repeat ? 0 : prev;
      return prev + 1;
    });
  }, [shuffle, repeat]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width),
    );
    setVolume(percent);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", nextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", nextTrack);
    };
  }, [nextTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Play interrupted:", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Play interrupted:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex h-full w-full flex-col bg-[#2c2c2c] font-mono text-[#00ff00]">
      <div className="flex flex-col items-center justify-between overflow-hidden bg-[#1a1a1a] px-2 py-1 text-xs">
        <MarqueeText
          text={TRACKS[currentTrackIndex].title}
          isPlaying={isPlaying}
        />
      </div>

      <div
        className="relative mx-2 my-1 mb-3 h-2 cursor-pointer space-y-2 bg-[#444]"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-[#00ff00]"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />

        <span className="flex items-center justify-center text-center text-xs">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="mt-4 mb-2 flex justify-center gap-1 space-x-2">
        <button className="btn" onClick={prevTrack}>
          ⏮
        </button>
        <button className="btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="btn" onClick={nextTrack}>
          ⏭
        </button>
      </div>

      <div className="flex items-center gap-2 px-2 text-[10px]">
        <span>Vol</span>
        <div
          className="h-2 flex-1 cursor-pointer bg-[#444]"
          onClick={handleVolume}
        >
          <div
            className="h-full bg-[#00ff00]"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto border-t border-[#444] bg-[#111] text-xs text-[#ddd]">
        {TRACKS.map((track, i) => (
          <div
            key={track.src}
            className={`cursor-pointer px-2 py-1 ${
              i === currentTrackIndex
                ? "bg-[#00ff00] text-black"
                : "hover:bg-[#333]"
            }`}
            onClick={() => {
              setCurrentTrackIndex(i);
              setIsPlaying(true);
            }}
          >
            {i + 1}. {track.title}
          </div>
        ))}
      </div>

      <audio ref={audioRef} src={TRACKS[currentTrackIndex].src} />
    </div>
  );
}
