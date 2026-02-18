"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Using a pleasant, royalty-free acoustic track
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.3); // Start with lower volume
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio object
        if (!audioRef.current) {
            audioRef.current = new Audio(MUSIC_URL);
            audioRef.current.loop = true;
            audioRef.current.volume = volume;
        }

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                // Handle potential autoplay restrictions
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Autoplay prevented:", error);
                        setIsPlaying(false);
                        // Add a one-time interaction listener to start music
                        const handleInteraction = () => {
                            setIsPlaying(true);
                            document.removeEventListener("click", handleInteraction);
                            document.removeEventListener("keydown", handleInteraction);
                        };
                        document.addEventListener("click", handleInteraction);
                        document.addEventListener("keydown", handleInteraction);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);
    const handleVolumeChange = (vals: number[]) => setVolume(vals[0]);

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 z-50 flex items-center transition-all duration-300 ease-in-out font-sans",
                isHovered || isPlaying ? "opacity-100" : "opacity-90"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-zinc-200 transaction-all duration-300",
                isHovered ? "pr-4" : "pr-2"
            )}>

                {/* Main Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "rounded-full h-10 w-10 shrink-0 transition-colors",
                        isPlaying ? "bg-primary-green/10 text-primary-green hover:bg-primary-green/20" : "hover:bg-zinc-100 text-zinc-600"
                    )}
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause background music" : "Play background music"}
                >
                    {isPlaying ? (
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-green"></span>
                        </span>
                        // <Music className="h-5 w-5 animate-pulse" />
                    ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                    )}
                </Button>

                {/* Expanded Controls (visible on hover or when playing) */}
                <div
                    className={cn(
                        "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
                        isHovered ? "w-48 opacity-100" : "w-0 opacity-0"
                    )}
                >
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-700 whitespace-nowrap">
                            {isPlaying ? "Now Playing" : "Paused"}
                        </span>
                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                            Pleasant Vibes
                        </span>
                    </div>

                    <div className="h-8 w-px bg-zinc-200 mx-1" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-zinc-500 hover:text-zinc-800"
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    <Slider
                        defaultValue={[0.3]}
                        value={[volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-20"
                    />
                </div>
            </div>
        </div>
    );
}
