import { Instagram } from 'lucide-react';

const nav = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#about' },
];

const socials = ['Instagram', 'Behance', 'Pinterest'];

export default function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-bone-500/10 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-display text-2xl tracking-wider2 text-bone-50">
              FRAME <span className="text-bone-500">/</span> 01
            </span>
            <p className="max-w-xs text-sm font-light text-bone-400">
              A cinematic photography portfolio — light, places and moments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone-500">
                Navigate
              </span>
              <ul className="flex flex-col gap-2">
                {nav.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => go(l.href)}
                      className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone-500">
                Social
              </span>
              <ul className="flex flex-col gap-2">
                {socials.map((s) => (
                  <li key={s}>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-bone-300 transition-colors hover:text-bone-50"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-bone-500/10 pt-8 sm:flex-row">
          <span className="font-mono text-[11px] tracking-wider2 text-bone-500">
            © 2026 FRAME / 01
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-500/20 text-bone-400 transition-colors hover:border-bone-100/60 hover:text-white"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
