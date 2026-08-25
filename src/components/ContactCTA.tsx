import { Instagram } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 to-ink-950" />
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            'radial-gradient(circle, #d4b483 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="font-mono text-[11px] uppercase tracking-ultra text-bone-400">
          Get in touch
        </span>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,9vw,6rem)] font-medium leading-[0.95] text-bone-50">
          HAVE A STORY
          <br />
          <span className="italic">TO TELL?</span>
        </h2>
        <p className="mt-6 max-w-md text-base font-light text-bone-300">
          Let's turn moments into something worth remembering.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="magnetic group relative overflow-hidden rounded-full bg-bone-50 px-8 py-4 text-[12px] uppercase tracking-wider2 text-ink-950 transition-colors">
            <span className="relative z-10">Start a Project</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-400 ease-cinematic group-hover:translate-x-0" />
            <span className="absolute inset-0 z-0 -translate-x-full bg-accent transition-transform duration-400 ease-cinematic group-hover:translate-x-0" />
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="magnetic group flex items-center justify-center gap-2 rounded-full border border-bone-500/30 px-8 py-4 text-[12px] uppercase tracking-wider2 text-bone-100 transition-colors hover:border-bone-100/70 hover:text-white"
          >
            <Instagram size={15} />
            View Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
