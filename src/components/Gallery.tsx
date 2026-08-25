import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, photos, type Category } from '@/data/photos';
import TiltCard from '@/components/TiltCard';
import { useInView } from '@/hooks/useInView';

interface Props {
  onOpen: (id: number) => void;
}

export default function Gallery({ onOpen }: Props) {
  const [active, setActive] = useState<'ALL' | Category>('ALL');
  const [phase, setPhase] = useState<'out' | 'in'>('in');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  const filtered = useMemo(
    () =>
      active === 'ALL' ? photos : photos.filter((p) => p.category === active),
    [active],
  );

  // Animate out, swap, animate in — staggered.
  useEffect(() => {
    setPhase('out');
    const t1 = setTimeout(() => setPhase('in'), 380);
    return () => clearTimeout(t1);
  }, [active]);

  return (
    <section id="gallery" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone-400">
              The Collection
            </span>
            <h2 className="font-display text-4xl font-medium leading-tight text-bone-50 sm:text-6xl">
              The Gallery
            </h2>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setActive(c)}
                  className={`relative text-[11px] uppercase tracking-wider2 transition-colors duration-300 ${
                    active === c
                      ? 'text-bone-50'
                      : 'text-bone-500 hover:text-bone-200'
                  }`}
                >
                  {c}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-bone-100 transition-all duration-400 ease-cinematic ${
                      active === c ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </header>

        <div
          ref={ref}
          className="columns-1 gap-4 sm:columns-2 lg:columns-3 sm:gap-5 [&>*]:mb-4 sm:[&>*]:mb-5"
        >
          {filtered.map((p, i) => (
            <GalleryCard
              key={`${active}-${p.id}`}
              photo={p}
              index={i}
              phase={phase}
              inView={inView}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  photo,
  index,
  phase,
  inView,
  onOpen,
}: {
  photo: (typeof photos)[number];
  index: number;
  phase: 'out' | 'in';
  inView: boolean;
  onOpen: (id: number) => void;
}) {
  const delay = Math.min(index * 60, 720);

  return (
    <TiltCard
      className="group block w-full break-inside-avoid"
      max={6}
      scale={1.015}
    >
      <button
        onClick={() => onOpen(photo.id)}
        className="sheen relative block w-full overflow-hidden rounded-sm bg-ink-800 text-left"
        style={{
          opacity: phase === 'in' && inView ? 1 : 0,
          transform:
            phase === 'in'
              ? 'translateY(0) scale(1)'
              : 'translateY(28px) scale(0.97)',
          filter: phase === 'in' ? 'blur(0)' : 'blur(6px)',
          transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 600ms ease ${delay}ms`,
        }}
      >
        <div className="relative overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            loading="lazy"
            className="photo-img w-full object-cover grayscale-[0.55] brightness-[0.82] group-hover:scale-[1.07] group-hover:grayscale-0 group-hover:brightness-100"
          />
          {/* Vignette + bottom gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] transition-opacity duration-500 group-hover:opacity-0" />

          {/* Top-right number badge */}
          <span className="absolute right-3 top-3 font-mono text-[10px] tracking-wider2 text-bone-200/0 transition-all duration-500 group-hover:text-bone-200/80">
            {String(photo.id).padStart(2, '0')}
          </span>

          {/* Sliding caption */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
            <div className="overflow-hidden">
              <div className="translate-y-full transition-transform duration-500 ease-cinematic group-hover:translate-y-0">
                <span className="font-mono text-[9px] uppercase tracking-wider2 text-accent">
                  {photo.category}
                </span>
                <h3 className="mt-1 font-display text-xl text-bone-50">
                  {photo.title}
                </h3>
              </div>
            </div>
            <span className="h-8 w-8 shrink-0 translate-y-2 rounded-full border border-bone-100/30 text-bone-100 opacity-0 transition-all duration-500 ease-cinematic group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
        </div>
      </button>
    </TiltCard>
  );
}
