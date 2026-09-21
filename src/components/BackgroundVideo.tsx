import { useEffect, useRef } from 'react';

const VIDEO_URL = '/robot-hero.mp4';
const SENSITIVITY = 0.8;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video is paused and does not autoplay
    video.pause();

    const handleLoadedMetadata = () => {
      // Start in the first frame or beginning of the video
      if (video.duration && !Number.isNaN(video.duration)) {
        targetTimeRef.current = video.currentTime || 0;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const screenWidth = window.innerWidth || 1;
      const timeOffset = (delta / screenWidth) * SENSITIVITY * video.duration;
      const newTargetTime = Math.min(
        Math.max(0, targetTimeRef.current + timeOffset),
        video.duration
      );

      targetTimeRef.current = newTargetTime;

      // Queue or trigger seek if not currently seeking
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTargetTime;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch scrubbing support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;
      if (e.touches.length > 0) {
        const clientX = e.touches[0].clientX;
        if (prevXRef.current === null) {
          prevXRef.current = clientX;
          return;
        }
        const delta = clientX - prevXRef.current;
        prevXRef.current = clientX;

        const screenWidth = window.innerWidth || 1;
        const timeOffset = (delta / screenWidth) * SENSITIVITY * video.duration;
        const newTargetTime = Math.min(
          Math.max(0, targetTimeRef.current + timeOffset),
          video.duration
        );
        targetTimeRef.current = newTargetTime;

        if (!isSeekingRef.current) {
          isSeekingRef.current = true;
          video.currentTime = newTargetTime;
        }
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    // Drag-and-drop listener to allow uploading local video files dynamically
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('video/')) {
          const objectUrl = URL.createObjectURL(file);
          if (videoRef.current) {
            videoRef.current.src = objectUrl;
            videoRef.current.load();
            videoRef.current.pause();
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    // If targetTime has drifted from currentTime while seeking was happening, queue the next seek
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  return (
    <video
      ref={videoRef}
      id="background-scrub-video"
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '70% center',
      }}
    />
  );
}
