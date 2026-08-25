import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos } from '@/data/photos';

interface Props {
  id: number | null;
  onClose: () => void;
  onNavigate: (id: number) => void;
}

export default function Lightbox({ id, onClose, onNavigate }: Props) {
  const open = id !== null;
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const index = photos.findIndex((p) => p.id === id);
  const photo = index >= 0 ? photos[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (!open) return;
      setDirection(dir);
      const next = (index + dir + photos.length) % photos.length;
      onNavigate(photos[next].id);
    },
    [index, open, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go, onClose]);

  if (!photo) return null;

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(
    photos.length,
  ).padStart(2, '0')}`;

  return (
    <div
      className={`fixed inset-0 z-[150] flex flex-col bg-ink-950/97 backdrop-blur-xl transition-opacity duration-400 ease-cinematic ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-mono text-[11px] tracking-wider2 text-bone-400">
          {counter}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider2 text-accent">
          {photo.category}
        </span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-500/30 text-bone-100 transition-colors hover:border-bone-100/70 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const dx = e.changedTouches[0].clientX - touchStart;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          setTouchStart(null);
        }}
      >
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone-500/25 text-bone-200 transition-all hover:border-bone-100/70 hover:text-white sm:left-6"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>

        <figure
          key={photo.id}
          className="flex max-h-full max-w-5xl flex-col items-center"
          style={{ animation: 'blurIn 0.6s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[62vh] w-auto rounded-sm object-contain sm:max-h-[72vh]"
          />
          <figcaption className="mt-5 flex flex-col items-center gap-1 text-center sm:mt-7">
            <h3 className="font-display text-2xl text-bone-50 sm:text-4xl">
              {photo.title}
            </h3>
            <p className="max-w-xl px-4 text-sm font-light text-bone-300">
              {photo.description}
            </p>
            <span className="mt-2 font-mono text-[10px] tracking-wider2 text-bone-500">
              © {photo.photographer}
            </span>
          </figcaption>
        </figure>

        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bone-500/25 text-bone-200 transition-all hover:border-bone-100/70 hover:text-white sm:right-6"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="hidden justify-center pb-6 sm:flex">
        <span className="font-mono text-[10px] tracking-wider2 text-bone-500">
          USE ← → TO NAVIGATE · ESC TO CLOSE
        </span>
      </div>
      <span className="sr-only">{direction}</span>
    </div>
  );
}
