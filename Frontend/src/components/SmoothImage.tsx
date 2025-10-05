import { useRef, useEffect, useState } from "react";

interface SmoothVideoProps {
  src: string;
  className?: string;
}

export const SmoothVideo = ({ src, className = "" }: SmoothVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start playing video when it comes into view
            if (videoRef.current && !isPlaying) {
              videoRef.current.play().catch(console.error);
              setIsPlaying(true);
            }
          } else {
            setIsVisible(false);
            // Pause video when it goes out of view
            if (videoRef.current && isPlaying) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the video is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before fully visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        className={`relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] transition-all duration-1000 ease-out ${
          isVisible 
            ? 'transform translate-y-0 opacity-100 scale-100' 
            : 'transform translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Video Element - Direct placement without background */}
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          muted
          loop
          playsInline
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
