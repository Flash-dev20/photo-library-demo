import { useEffect, useRef } from 'react';
import { featured } from '@/data/photos';
import { useInView } from '@/hooks/useInView';
import TiltCard from '@/components/TiltCard';

export default function FeaturedGallery() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const items = featured;

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-12 flex flex-col gap-3 sm:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone-400">
            Selected Work
          </span>
          <h2 className="font-display text-4xl font-medium leading-tight text-bone-50 sm:text-6xl">
            Featured Frames
          </h2>
        </header>

        <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
          <FeaturedCard item={items[0]} className="sm:col-span-7 sm:row-span-2 aspect-[4/5] sm:aspect-auto" inView={inView} delay={0} />
          <FeaturedCard item={items[1]} className="sm:col-span-5 aspect-[4/3]" inView={inView} delay={120} />
          <FeaturedCard item={items[2]} className="sm:col-span-5 aspect-[4/3]" inView={inView} delay={220} />
          <FeaturedCard item={items[3]} className="sm:col-span-12 aspect-[16/9]" inView={inView} delay={300} big />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  item,
  className,
  inView,
  delay,
  big,
}: {
  item: { photo: any; label: string };
  className?: string;
  inView: boolean;
  delay: number;
  big?: boolean;
}) {
  const imgWrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView && imgWrap.current) {
      imgWrap.current.classList.add('clip-reveal');
      imgWrap.current.style.animationDelay = `${delay}ms`;
    }
  }, [inView, delay]);

  return (
    <TiltCard className={`block ${className ?? ''}`} max={5} scale={1.01}>
      <a
        href="#gallery"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="sheen group relative block h-full w-full overflow-hidden rounded-sm bg-ink-800"
      >
        <div ref={imgWrap} className="h-full w-full">
          <img
            src={item.photo.image}
            alt={item.photo.title}
            loading="lazy"
            className="photo-img h-full w-full object-cover grayscale-[0.45] brightness-[0.85] group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone-300">
            {item.label}
          </span>
          <h3
            className={`mt-2 font-display ${big ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'} font-medium text-bone-50 transition-transform duration-500 ease-cinematic group-hover:-translate-y-1`}
          >
            {item.photo.title}
          </h3>
        </div>
        <span className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] tracking-wider2 text-bone-200/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {String(item.photo.id).padStart(2, '0')}
        </span>
      </a>
    </TiltCard>
  );
}
