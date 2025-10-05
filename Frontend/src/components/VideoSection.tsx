import { useRef, useEffect, useState } from "react";

interface VideoSectionProps {
  className?: string;
}

export const VideoSection = ({ className = "" }: VideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start playing video with sound when it comes into view
            if (videoRef.current && !isPlaying) {
              videoRef.current.muted = false; // Unmute when visible
              videoRef.current.play().catch(console.error);
              setIsPlaying(true);
            }
          } else {
            setIsVisible(false);
            // Pause and mute video when it goes out of view
            if (videoRef.current && isPlaying) {
              videoRef.current.muted = true; // Mute when not visible
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the video is visible
        rootMargin: "0px 0px -100px 0px" // Start animation slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${className}`}
    >
      {/* Video Container with smooth effects */}
      <div 
        className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-1000 ease-out ${
          isVisible 
            ? 'transform translate-y-0 opacity-100 scale-100' 
            : 'transform translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/RecursX Intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause indicator */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-green-400' : 'bg-gray-400'
          }`} />
        </div>
      </div>

      {/* Smooth scroll indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2">
        <div className={`w-4 h-6 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
