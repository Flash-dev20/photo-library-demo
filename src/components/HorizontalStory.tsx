import { useEffect, useRef } from 'react';
import { stories } from '@/data/photos';

export default function HorizontalStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        const maxX = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-p * maxX}px, 0, 0)`;

        // parallax + scale on each card image
        const cards = track.querySelectorAll<HTMLElement>('.story-img');
        cards.forEach((c) => {
          const cr = c.getBoundingClientRect();
          const center = (cr.left + cr.right) / 2;
          const dist = (center - window.innerWidth / 2) / window.innerWidth;
          const scale = 1.08 - Math.abs(dist) * 0.06;
          const blur = Math.min(3, Math.abs(dist) * 4);
          c.style.transform = `scale(${scale}) translateX(${dist * -18}px)`;
          c.style.filter = `blur(${blur}px)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative h-[260vh] w-full"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <header className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 sm:left-10">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone-400">
            Chapter
          </span>
          <h2 className="mt-2 font-display text-5xl font-medium leading-none text-bone-50 sm:text-7xl">
            THE
            <br />
            JOURNEY
          </h2>
        </header>

        <div
          ref={trackRef}
          className="flex h-full will-change-transform items-center gap-6 pl-[42vw] pr-[8vw] sm:gap-10 sm:pl-[34vw]"
        >
          {stories.map((s, i) => (
            <StoryCard key={i} story={s} index={i} />
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-wider2 text-bone-500 sm:block">
          SCROLL TO TRAVEL →
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  story,
  index,
}: {
  story: { photo: any; caption: string };
  index: number;
}) {
  return (
    <figure className="group relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-sm bg-ink-800 sm:h-[72vh] sm:w-[44vw] lg:w-[36vw]">
      <img
        src={story.photo.image}
        alt={story.caption}
        loading="lazy"
        className="story-img photo-img h-full w-full object-cover transition-[filter] duration-700 group-hover:!blur-0"
        style={{ transform: 'scale(1.08)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <span className="font-mono text-[10px] tracking-wider2 text-bone-400">
          {String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
        </span>
        <p className="mt-2 font-display text-2xl italic text-bone-50 sm:text-3xl">
          {story.caption}
        </p>
      </figcaption>
    </figure>
  );
}
