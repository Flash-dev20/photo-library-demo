import { useEffect, useRef } from 'react';
import { quoteBg } from '@/data/photos';
import { useInView } from '@/hooks/useInView';

export default function QuoteSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;
    const onScroll = () => {
      const el = bgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${p * -40}px, 0) scale(1.12)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[460px] items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src={quoteBg}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-ink-950/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      <blockquote
        className={`relative z-10 max-w-4xl px-6 text-center transition-all duration-1000 ease-cinematic ${
          inView ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`}
      >
        <p className="font-display text-3xl italic leading-snug text-bone-50 sm:text-5xl lg:text-6xl">
          “Photography is the art of making memories tangible.”
        </p>
        <footer className="mt-7 font-mono text-[11px] uppercase tracking-wider2 text-bone-400">
          — FRAME / 01
        </footer>
      </blockquote>
    </section>
  );
}
