import { useEffect, useRef, useState } from 'react';

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration = prefersReduced ? 200 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setTimeout(() => setLeaving(true), 220);
        setTimeout(onDone, 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950 transition-transform duration-700 ease-cinematic ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-1 items-center justify-center">
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl tracking-wider2 text-bone-50 sm:text-7xl">
            <span className="blur-in">FRAME</span>
            <span className="text-bone-500"> / </span>
            <span className="blur-in">01</span>
          </h1>
        </div>
      </div>
      <div className="flex w-full max-w-[min(620px,86vw)] flex-col gap-3 px-6 pb-12">
        <div className="h-px w-full overflow-hidden bg-bone-500/20">
          <div
            className="h-full bg-bone-100 transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] tracking-wider2 text-bone-400">
          <span>Loading frames</span>
          <span>{String(progress).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
