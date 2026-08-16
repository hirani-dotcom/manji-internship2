"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useBooks } from "@/app/context/BookContext";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

export default function Footer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

    const params = useParams();
    const { bookId } = params;
    const { selectedBook, recommendedBooks, suggestedBooks } = useBooks();
    const book =
        recommendedBooks.find((b) => b.id === bookId) ||
        suggestedBooks.find((b) => b.id === bookId) ||
        selectedBook.find((b) => b.id === bookId);

    if (!book) {
        return <p className="p-6 text-red-600">Book Not Found.</p>;
    }

     const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

    const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };


    const rewind10 = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    };

    const forward10 = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(
            audio.currentTime + 10,
            audio.duration || audio.currentTime + 10,
        );
    };

    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeUpdateHandler = () => setCurrentTime(audio.currentTime);
    const loadedMetadataHandler = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", timeUpdateHandler);
    audio.addEventListener("loadedmetadata", loadedMetadataHandler);

    return () => {
      audio.removeEventListener("timeupdate", timeUpdateHandler);
      audio.removeEventListener("loadedmetadata", loadedMetadataHandler);
    };
  }, []);

  // Handle progress bar change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
            <div className=" flex flex-col md:flex md:flex-row items-center justify-between px-4 py-3">
                <div className="flex mb-4 md:mb-0">
                    <img src={book.imageLink} className="w-10 mr-4" />
                    <div className="flex flex-col text-sm">
                        <p>{book.title}</p>
                        <p className="text-gray-300">{book.author}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button onClick={rewind10}>
                        <TbRewindBackward10 className="w-8 h-8" />
                    </button>
                    <button onClick={togglePlay}>
                        {isPlaying ? (
                            <FaRegPauseCircle className="w-8 h-8" />
                        ) : (
                            <FaRegPlayCircle className="w-8 h-8" />
                        )}
                    </button>
                    <button onClick={forward10}>
                        <TbRewindForward10 className="w-8 h-8" />
                    </button>
                    <audio ref={audioRef} src={book.audioLink} preload="auto" />
                </div>
                <div className="flex items-center w-full md:w-100 gap-2 mt-4 md:mt-0">
        <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-white"
        />
        <span className="text-sm text-gray-300">{formatTime(duration)}</span>
      </div>
            </div>
        </footer>
    );
}
