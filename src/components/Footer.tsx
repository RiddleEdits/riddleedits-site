import { NICHES, SITE, type Niche } from '../data/content';
import { Link, useModals } from '../router';
import { Button } from './ui';
import { LogoMark } from './Navbar';

/** Same personal logo as the navbar; kept under this name for existing imports. */
export const PlayMark = LogoMark;

const HEAD = 'text-xs font-bold uppercase tracking-wider text-white';
const ITEM = 'text-[13px] font-medium text-neutral-400 transition-colors duration-200 hover:text-white';
const SOCIAL = 'flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-colors duration-200 hover:border-white/40 hover:text-white';

export function Footer() {
  const { openBookCall } = useModals();
  return (
    <footer className="border-t border-white/[0.06] bg-[#111113] text-[14px] text-neutral-400">
      <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-14 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.08] pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="space-y-4">
            <Link href="/" aria-label="RiddleEdits home" className="flex items-center gap-2">
              <PlayMark />
              <span translate="no" className="text-[17px] font-bold tracking-tight text-white">
                Riddle<span className="text-neutral-400">Edits</span>
              </span>
            </Link>
            <p className="max-w-[240px] text-[13px] font-medium text-neutral-400">Remote editing for YouTube creators.</p>
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
        <p className="pt-8 text-[13px] font-medium text-neutral-500">© {new Date().getFullYear()} RiddleEdits</p>
      </div>
    </footer>
  );
}
