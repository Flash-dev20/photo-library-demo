import { useEffect, useRef, useState } from 'react';
import { aboutPortrait } from '@/data/photos';
import { useInView } from '@/hooks/useInView';

const stats = [
  { value: 120, suffix: '+', label: 'Stories' },
  { value: 30, suffix: '+', label: 'Locations' },
  { value: 500, suffix: '+', label: 'Frames' },
  { value: 8, suffix: '', label: 'Years Exploring' },
];

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={aboutPortrait}
              alt="The photographer"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale transition-all duration-[1200ms] ease-cinematic hover:grayscale-0"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-bone-500/10" />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone-400">
            About
          </span>
          <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-bone-50 sm:text-6xl">
            THE EYE BEHIND
            <br />
            <span className="italic">THE FRAME</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-bone-300">
            Every photograph begins with a moment worth remembering. I capture
            landscapes, people, architecture and the small details that often
            go unnoticed — chasing light that won't come again.
          </p>

          <div
            ref={ref}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <Stat key={s.label} {...s} start={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setN(value);
      return;
    }
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, value]);

  return (
    <div className="flex flex-col gap-1 border-t border-bone-500/15 pt-5">
      <span className="font-display text-4xl text-bone-50 sm:text-5xl">
        {n}
        {suffix}
      </span>
      <span className="text-[11px] uppercase tracking-wider2 text-bone-400">
        {label}
      </span>
    </div>
  );
}
