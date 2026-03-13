'use client';

import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Track {
  id: number;
  artist: string;
  title: string;
  year: string;
  audioUrl: string;
}

interface TrackCarouselProps {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}

export default function TrackCarousel({
  tracks,
  currentIndex,
  isPlaying,
  isMuted,
  onPrev,
  onNext,
  onPlayPause,
  onMuteToggle,
}: TrackCarouselProps) {
  const currentTrack = tracks[currentIndex];
  
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      {/* Track info carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className="w-full flex-shrink-0 px-8 pb-8"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-khaki/60 text-sm tracking-[0.3em] uppercase mb-2">
                      Track {String(index + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
                    </p>
                    <h2 className="text-bone text-4xl md:text-6xl font-light tracking-tight mb-2">
                      {track.artist}
                    </h2>
                    <p className="text-khaki/80 text-lg md:text-xl">
                      {track.title}
                    </p>
                    <p className="text-khaki/40 text-sm mt-1">
                      {track.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <div className="border-t border-khaki/10 bg-charcoal/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={onPrev}
                className="w-12 h-12 border border-khaki/20 flex items-center justify-center text-khaki/60 hover:text-bone hover:border-khaki/40 transition-all duration-300"
                aria-label="Previous track"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="w-12 h-12 border border-khaki/20 flex items-center justify-center text-khaki/60 hover:text-bone hover:border-khaki/40 transition-all duration-300"
                aria-label="Next track"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Play/Pause */}
            <button
              onClick={onPlayPause}
              className="w-16 h-16 border-2 border-khaki/40 flex items-center justify-center text-bone hover:border-khaki hover:bg-khaki/10 transition-all duration-300"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            
            {/* Volume */}
            <button
              onClick={onMuteToggle}
              className="w-12 h-12 border border-khaki/20 flex items-center justify-center text-khaki/60 hover:text-bone hover:border-khaki/40 transition-all duration-300"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress dots */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {tracks.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 transition-all duration-500 ${
              index === currentIndex 
                ? 'bg-khaki w-8' 
                : 'bg-khaki/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
