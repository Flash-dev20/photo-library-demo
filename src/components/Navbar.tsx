import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
          scrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go('#hero');
            }}
            className="font-display text-xl tracking-wider2 text-bone-50"
          >
            FRAME <span className="text-bone-500">/</span> 01
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="group relative text-[12px] uppercase tracking-wider2 text-bone-300 transition-colors hover:text-bone-50"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone-100 transition-all duration-400 ease-cinematic group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => go('#contact')}
              className="magnetic group flex items-center gap-2 rounded-full border border-bone-500/30 px-5 py-2.5 text-[12px] uppercase tracking-wider2 text-bone-100 transition-colors hover:border-bone-100/60 hover:text-white"
            >
              Let's Create
              <span className="transition-transform duration-400 ease-cinematic group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center text-bone-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-ink-950/98 backdrop-blur-xl transition-all duration-500 ease-cinematic md:hidden ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              go(l.href);
            }}
            className="font-display text-4xl tracking-wider2 text-bone-100 transition-all duration-500 ease-cinematic"
            style={{
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transitionDelay: `${i * 60 + 80}ms`,
            }}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={() => go('#contact')}
          className="mt-4 rounded-full border border-bone-500/40 px-6 py-3 text-sm uppercase tracking-wider2 text-bone-100"
        >
          Let's Create →
        </button>
      </div>
    </>
  );
}
