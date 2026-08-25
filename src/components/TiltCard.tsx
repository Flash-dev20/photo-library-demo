import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * Wraps content in a 3D perspective container that tilts toward the
 * pointer on hover. Falls back to a flat element on touch / reduced motion.
 */
export default function TiltCard({ children, className, max = 8, scale = 1.02 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const wrap = inner.current;
    if (!el || !wrap) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrap.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      wrap.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={className} style={{ perspective: '1200px' }}>
      <div
        ref={inner}
        className="relative h-full w-full will-change-transform"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        {children}
      </div>
    </div>
  );
}
