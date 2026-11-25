import { NICHES, SITE, type Niche } from '../data/content';
import { Link, useModals } from '../router';
import { Button } from './ui';

/** Black squircle "|>" mark used in the footer and closing section. */
export function PlayMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center bg-slate-950 font-mono font-black tracking-tighter text-white ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.29, fontSize: size * 0.4 }}
    >
      |&gt;
    </span>
  );
}

const HEAD = 'text-xs font-bold uppercase tracking-wider text-slate-900';
const ITEM = 'text-[13px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900';
const SOCIAL = 'flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900';

export function Footer() {
  const { openBookCall } = useModals();
  return (
    <footer className="border-t border-slate-200/90 bg-[#f8fbff] text-[14px] text-slate-600">
      <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-14 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-200/80 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="space-y-4">
            <Link href="/" aria-label="RiddleEdits home" className="flex items-center gap-2">
              <PlayMark />
              <span translate="no" className="text-[16px] font-extrabold tracking-tight text-slate-900">
                Riddle<span className="font-semibold text-slate-700">Edits</span>
              </span>
            </Link>
            <p className="max-w-[240px] text-[13px] font-medium text-slate-500">Remote editing for YouTube creators.</p>
            <div className="flex items-center gap-2.5 pt-1">
              <a href={SITE.x} target="_blank" rel="noopener noreferrer" aria-label="RiddleEdits on X" className={SOCIAL}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20Z" />
                </svg>
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="RiddleEdits on Instagram" className={SOCIAL}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Work" className="space-y-3">
            <h2 className={HEAD}>Work</h2>
            <ul className="space-y-2">
              {(Object.keys(NICHES) as Niche[]).map((k) => (
                <li key={k}>
                  <Link href={NICHES[k].path} className={ITEM}>
                    {NICHES[k].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="space-y-3">
            <h2 className={HEAD}>Company</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/case-studies" className={ITEM}>
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className={ITEM}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className={HEAD}>Get in touch</h2>
            <ul className="space-y-3">
              <li>
                <Button size="sm" onClick={openBookCall}>
                  Book a call
                </Button>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={ITEM}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-8 text-[13px] font-medium text-slate-400">© {new Date().getFullYear()} RiddleEdits</p>
      </div>
    </footer>
  );
}
