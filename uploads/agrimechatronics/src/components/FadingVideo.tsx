import { useEffect, useRef, CSSProperties } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: CSSProperties;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before ending to start fade out

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const fadeTo = (targetOpacity: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any previous active animation frame
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const initialOpacity = parseFloat(video.style.opacity || "0");
    const change = targetOpacity - initialOpacity;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentOpacity = initialOpacity + change * progress;
      video.style.opacity = currentOpacity.toFixed(3);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset state initially: opacity is 0, looping is manual
    video.style.opacity = "0";
    video.loop = false;
    fadingOutRef.current = false;

    const handleLoadedData = () => {
      video.style.opacity = "0";
      // Explicitly catch play blockages to be robust in standard browser sandbox environments
      video.play().catch((err) => console.log("Auto-play prevented on video:", err));
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (!duration || isNaN(duration) || duration <= 0) return;

      // When the video is approaching the end (duration - lead), start fade to 0
      const remainingTime = duration - currentTime;
      if (!fadingOutRef.current && remainingTime <= FADE_OUT_LEAD && remainingTime > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play()
          .then(() => {
            fadingOutRef.current = false;
            fadeTo(1, FADE_MS);
          })
          .catch((err) => console.log("Play failed on loop restart:", err));
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // If already loaded / playing
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, transition: "none" }} // Ensure NO CSS transition overrides rAF
      muted
      playsInline
      autoPlay
      preload="auto"
    />
  );
}
