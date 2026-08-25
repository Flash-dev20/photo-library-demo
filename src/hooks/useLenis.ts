import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    let raf = 0;
    let lenis: any = null;
    let cancelled = false;

    (async () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReduced) return;
      const Lenis = (await import('lenis')).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);
}
