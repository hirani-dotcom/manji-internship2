"use client";

import { useState, useEffect } from "react";

interface AudioDurationProps {
  audioUrl: string;
}

export default function AudioDuration({ audioUrl }: AudioDurationProps) {
  const [duration, setDuration] = useState<string>("Loading...");

  useEffect(() => {
    if (!audioUrl) return;

    // 1. Create an isolated, hidden audio element in memory
    const audio = new Audio();
    audio.src = audioUrl;
    
    // CRITICAL: Only fetch the header metadata, not the full audio stream
    audio.preload = "metadata"; 

    const handleLoadedMetadata = () => {
      const time = audio.duration;
      if (isNaN(time)) {
        setDuration("Audio");
        return;
      }
      
      // 2. Format the seconds into minutes and seconds
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };

    const handleLoadError = () => {
      setDuration("Audio"); // Fallback if the link fails
    };

    // 3. Attach listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleLoadError);

    // 4. Cleanup memory when the card unmounts or shifts
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleLoadError);
      audio.src = ""; // Force disconnect the network stream
    };
  }, [audioUrl]);

  return <span className="text-xs font-semibold">{duration}</span>;
}
