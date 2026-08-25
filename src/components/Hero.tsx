import { useEffect, useRef } from 'react';
import { heroImage } from '@/data/photos';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    const onScroll = () => {
      if (prefersReduced) return;
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.setProperty('--py', `${y * 0.4}px`);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // text entrance
    if (titleRef.current && !prefersReduced) {
      const lines = titleRef.current.querySelectorAll('.reveal-inner');
      lines.forEach((el, i) => {
        (el as HTMLElement).style.animation = `blurIn 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.18}s both`;
      });
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToGallery = () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translate3d(0, var(--py, 0), 0)' }}
      >
        <img
          src={heroImage}
          alt="Cinematic mountain landscape"
          className="h-[112%] w-[112%] -translate-x-[5.5%] -translate-y-[5.5%] animate-kenburns object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/30 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/40" />
      </div>

      {/* Counter top-right */}
      <div className="absolute right-6 top-24 z-10 font-mono text-[11px] tracking-wider2 text-bone-400 sm:right-8">
        01 / 30
      </div>

      <div
        ref={titleRef}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <span className="reveal-line mb-6 overflow-hidden">
          <span className="reveal-inner font-mono text-[11px] uppercase tracking-ultra text-bone-300">
            Cinematic Photography
          </span>
        </span>

        <h1 className="font-display text-[clamp(2.8rem,11vw,9rem)] font-medium leading-[0.92] tracking-tight text-bone-50">
          <span className="reveal-line block overflow-hidden">
            <span className="reveal-inner block">CAPTURED</span>
          </span>
          <span className="reveal-line block overflow-hidden">
            <span className="reveal-inner block italic text-bone-200">
              MOMENTS
            </span>
          </span>
        </h1>

        <span className="reveal-line mt-7 overflow-hidden">
          <span className="reveal-inner text-sm font-light tracking-wide text-bone-300 sm:text-base">
            A visual journey through light, places and moments.
          </span>
        </span>

        <button
          onClick={scrollToGallery}
          className="magnetic group mt-12 flex flex-col items-center gap-3 text-[11px] uppercase tracking-wider2 text-bone-200 transition-colors hover:text-white"
        >
          <span>Explore Gallery</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone-500/40 transition-all duration-500 ease-cinematic group-hover:border-bone-100/80">
            <span className="animate-scrollhint">↓</span>
          </span>
        </button>
      </div>

      {/* Scroll indicator bottom */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[10px] tracking-wider2 text-bone-500">
          SCROLL
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-bone-500/60 to-transparent" />
      </div>
    </section>
  );
}
