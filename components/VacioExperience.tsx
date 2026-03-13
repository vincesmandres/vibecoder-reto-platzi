'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import TrackCarousel from './TrackCarousel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const VacioScene = dynamic(() => import('./VacioScene'), { ssr: false });

const tracks = [
  {
    id: 1,
    artist: 'Amelie Lens',
    title: 'Never The Same',
    year: '2019',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    artist: 'Kobosil',
    title: 'We Grow, You Decline',
    year: '2020',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    artist: 'FJAAK',
    title: 'Massaker',
    year: '2021',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    artist: 'I Hate Models',
    title: 'Warehouse Memories',
    year: '2022',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 5,
    artist: 'Paula Temple',
    title: 'Colonized',
    year: '2018',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

export default function VacioExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(128).fill(0));
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);

  const initAudio = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;
    
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;
  }, []);

  const updateAudioData = useCallback(() => {
    if (!analyserRef.current) {
      animationRef.current = requestAnimationFrame(updateAudioData);
      return;
    }
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    setAudioData(Array.from(dataArray));
    
    animationRef.current = requestAnimationFrame(updateAudioData);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateAudioData);
    return () => cancelAnimationFrame(animationRef.current);
  }, [updateAudioData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentIndex].audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, isPlaying]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    
    initAudio();
    
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      await audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen bg-charcoal overflow-hidden">
      {/* Back navigation */}
      <Link 
        href="/"
        className="absolute top-8 left-8 z-30 flex items-center gap-2 text-khaki/60 hover:text-bone transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-[0.2em] uppercase">Volver</span>
      </Link>
      
      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center">
        <h1 className="text-bone text-sm tracking-[0.5em] uppercase">Vacio</h1>
        <p className="text-khaki/40 text-xs tracking-[0.3em] mt-1">Resonancia Espacial</p>
      </div>
      
      {/* 3D Scene */}
      <VacioScene audioData={audioData} isPlaying={isPlaying} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
      
      {/* Track carousel */}
      <TrackCarousel
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        onMuteToggle={handleMuteToggle}
      />
      
      {/* Hidden audio element */}
      <audio ref={audioRef} crossOrigin="anonymous" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col gap-4">
          {tracks.map((_, index) => (
            <div
              key={index}
              className={`w-px h-8 transition-all duration-500 ${
                index === currentIndex ? 'bg-khaki h-16' : 'bg-khaki/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-khaki/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-khaki/20 hidden md:block" />
    </div>
  );
}
