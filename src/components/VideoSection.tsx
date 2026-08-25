import { useEffect, useRef, useState } from 'react';

// A reliable, publicly hosted atmospheric stock video (Coverr — free, no auth).
const VIDEO_SRC =
  'https://cdn.coverr.co/videos/coverr-driving-through-the-mountains-1080p/1080p.mp4';
const POSTER =
  'https://images.pexels.com/photos/34514431/pexels-photo-34514431.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setFailed(true));
    const onErr = () => setFailed(true);
    v.addEventListener('error', onErr);
    return () => v.removeEventListener('error', onErr);
  }, []);

  return (
    <section className="relative flex h-[90vh] min-h-[520px] w-full items-center justify-center overflow-hidden">
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER}
          preload="metadata"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      {(failed || !videoRef.current) && (
        <img
          src={POSTER}
          alt="Atmospheric still"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-ink-950/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-ultra text-bone-300">
          Cinematic Reel
        </span>
        <h2 className="mt-5 font-display text-[clamp(2.4rem,8vw,6rem)] font-medium leading-[0.95] text-bone-50">
          MOMENTS IN
          <br />
          <span className="italic">MOTION</span>
        </h2>
        <p className="mt-5 max-w-md text-sm font-light text-bone-300">
          A moving postcard from the road — light, distance and the quiet
          hum of travel.
        </p>
        <button
          onClick={() => {
            const v = videoRef.current;
            if (v) {
              if (v.paused) v.play();
              else v.pause();
            }
          }}
          className="magnetic mt-9 rounded-full border border-bone-100/40 px-6 py-3 text-[11px] uppercase tracking-wider2 text-bone-100 transition-colors hover:border-bone-100 hover:text-white"
        >
          Play / Pause
        </button>
      </div>

      {/* Local-video hint (commented for future swap) */}
      {/*
        To use your own clip, drop an MP4 in /public and replace VIDEO_SRC
        with "/your-file.mp4". The poster image fallback will cover any
        autoplay or load failure gracefully.
      */}
    </section>
  );
}
