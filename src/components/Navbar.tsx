import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useModals } from '../router';
import { NICHES, asset, creator, thumb, videosFor, type Niche } from '../data/content';
import { Avatar, Button } from './ui';

const TAB = 'relative rounded-full px-3.5 py-1.5 transition-colors duration-200';
const tabCls = (active: boolean) => `${TAB} ${active ? 'glass-tab font-semibold text-[#0066ff]' : 'text-slate-800 hover:bg-white/40 hover:text-[#0066ff]'}`;

/** Personal logo (riddle.exe avatar) in a rounded square. */
export function LogoMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src={asset('logo.webp')}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
      className={`shrink-0 object-cover shadow-[0_2px_8px_rgba(0,102,255,0.25)] ring-1 ring-black/10 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.3 }}
    />
  );
}

export function Navbar({ path }: { path: string }) {
  const { openBookCall } = useModals();
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setWorkOpen(false);
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWorkOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const openWork = () => {
    window.clearTimeout(closeTimer.current);
    setWorkOpen(true);
  };
  const closeWorkSoon = () => {
    closeTimer.current = window.setTimeout(() => setWorkOpen(false), 200);
  };

  // Soft highlight that follows the cursor. Set as a CSS variable so it doesn't re-render React.
  const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
  };

  return (
    <header
      ref={headerRef}
      onPointerMove={trackPointer}
      className="group/nav glass-bar fixed left-1/2 top-5 z-40 flex h-14 w-[calc(100%-32px)] max-w-[1200px] -translate-x-1/2 items-center justify-between rounded-full px-5 pr-3 ring-1 ring-blue-500/15"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
        style={{ background: 'radial-gradient(220px circle at var(--mx, 50%) 50%, rgba(0,102,255,0.08), transparent 70%)' }}
      />

      <Link href="/" aria-label="RiddleEdits home" className="group relative z-10 flex items-center gap-2.5">
        <span className="transition-transform duration-200 group-hover:scale-105">
          <LogoMark />
        </span>
        <span translate="no" className="text-[17px] font-bold tracking-tight text-slate-950">
          Riddle<span className="text-slate-500">Edits</span>
        </span>
      </Link>

      <nav aria-label="Main" className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1.5 text-[14px] font-medium md:flex">
        <div className="relative -my-2 py-2" onMouseEnter={openWork} onMouseLeave={closeWorkSoon}>
          <button
            type="button"
            aria-expanded={workOpen}
            aria-haspopup="true"
            onClick={() => setWorkOpen((o) => !o)}
            className={`${tabCls(workOpen || path.startsWith('/work'))} flex items-center gap-1.5`}
          >
            Work
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true" className={`transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className={`absolute left-1/2 top-full z-50 -translate-x-1/2 origin-top pt-2.5 transition-[opacity,scale,visibility] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              workOpen ? 'visible scale-100 opacity-100' : 'invisible scale-[0.96] opacity-0'
            }`}
          >
            <div className="glass-bar grid w-[540px] grid-cols-2 gap-2.5 rounded-[24px] p-2.5">
              {(Object.keys(NICHES) as Niche[]).map((key) => {
                const n = NICHES[key];
                const vids = videosFor(key);
                const ids = [...new Set(vids.map((v) => v.creatorId))];
                return (
                  <Link
                    key={key}
                    href={n.path}
                    className="group flex flex-col overflow-hidden rounded-[16px] border border-black/[0.06] bg-white/70 shadow-sm transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50/60"
                  >
                    <span className="relative block aspect-video overflow-hidden bg-slate-900">
                      <img src={thumb(vids[0].id)} alt="" className="h-full w-full object-cover opacity-90 transition-[scale,opacity] duration-300 ease-out group-hover:scale-[1.04] group-hover:opacity-100" />
                      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 flex -space-x-1.5">
                        {ids.map((id) => (
                          <Avatar key={id} id={id} size={20} className="ring-white/50" />
                        ))}
                      </span>
                    </span>
                    <span className="px-3.5 pb-3 pt-2.5">
                      <span className="flex items-center gap-1 text-[13.5px] font-bold text-slate-900 group-hover:text-[#0066ff]">
                        {n.name}
                        <span aria-hidden="true" className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#0066ff]">
                          ›
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-[1.4] text-slate-600">
                        {n.formats.join(', ')} · {ids.map((id) => creator(id).name).join(', ')}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Link href="/case-studies" className={tabCls(path.startsWith('/case-studies'))}>
          Case studies
        </Link>
        <Link href="/contact" className={tabCls(path.startsWith('/contact'))}>
          Contact
        </Link>
      </nav>

      <div className="relative z-10 flex items-center gap-1">
        <Button size="sm" onClick={openBookCall} className="hidden sm:inline-flex">
          Book a call
        </Button>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-white/60 md:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-bar absolute left-0 right-0 top-16 z-50 flex flex-col gap-1 rounded-2xl p-4 md:hidden" style={{ background: 'rgba(255, 255, 255, 0.97)' }}>
          {[
            ['/work/gta', 'GTA work'],
            ['/work/roblox', 'Roblox work'],
            ['/case-studies', 'Case studies'],
            ['/contact', 'Contact']
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 font-semibold ${path.startsWith(href) ? 'text-[#0066ff]' : 'text-slate-900 hover:text-[#0066ff]'}`}
            >
              {label}
              <span aria-hidden="true" className="text-slate-400">
                ›
              </span>
            </Link>
          ))}
          <div className="my-1 h-px bg-slate-200/80" />
          <Button onClick={openBookCall} className="w-full">
            Book a call
          </Button>
        </div>
      )}
    </header>
  );
}
