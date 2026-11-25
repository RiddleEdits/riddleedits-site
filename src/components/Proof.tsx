import { useEffect, useRef } from 'react';
import { Eye, Play, Users } from 'lucide-react';
import { STATS, TESTIMONIALS, creator } from '../data/content';
import { Avatar, Container, SectionHeading } from './ui';

export function Stats() {
  const items = [
    { icon: Users, value: STATS[0].value, label: STATS[0].label },
    { icon: Eye, value: STATS[1].value, label: STATS[1].label },
    { icon: Play, value: STATS[2].value, label: STATS[2].label }
  ];
  return (
    <section aria-label="Numbers" className="relative pb-24 lg:pb-32">
      <Container className="relative">
        {/* Soft blue glows give the frosted glass something to blur */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-4 top-1/2 h-56 w-[45%] -translate-y-1/2 rounded-full bg-blue-300/25 blur-[70px]" />
          <div className="absolute -right-4 top-1/2 h-56 w-[40%] -translate-y-1/2 rounded-full bg-sky-300/25 blur-[70px]" />
        </div>
        <dl className="relative grid overflow-hidden rounded-[32px] border-[3px] border-white bg-[linear-gradient(160deg,rgba(245,249,255,0.72)_0%,rgba(226,238,255,0.6)_100%)] shadow-[0_24px_60px_-28px_rgba(0,102,255,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 sm:grid-cols-3">
          {items.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className={`flex flex-col-reverse gap-3 p-8 transition-colors duration-200 ease-out hover:bg-[rgba(0,102,255,0.035)] sm:p-10 ${i ? 'border-t border-white/80 sm:border-l sm:border-t-0' : ''}`}>
              <dt className="max-w-[220px] text-[14px] leading-snug text-slate-500">{label}</dt>
              <dd className="text-[52px] font-semibold leading-none tracking-[-0.045em] text-slate-950 tabular-nums sm:text-[56px]">{value}</dd>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0066ff] shadow-[0_4px_12px_-4px_rgba(0,102,255,0.35)] ring-1 ring-blue-100">
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function TestimonialCard({ creatorId, quote, hidden }: { creatorId: string; quote: string; hidden?: boolean }) {
  const c = creator(creatorId);
  return (
    <li aria-hidden={hidden} className="w-[76cqw] shrink-0 sm:w-[calc((100cqw-1rem)/2.3)] lg:w-[calc((100cqw-3.5rem)/4.4)]">
      <figure className="group relative flex h-full select-none flex-col justify-between gap-6 rounded-[24px] border-2 border-white bg-[linear-gradient(160deg,rgba(255,255,255,0.92)_0%,rgba(236,244,255,0.88)_100%)] p-6 shadow-[0_18px_40px_-24px_rgba(0,102,255,0.28),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[21px] bg-[rgba(0,102,255,0.06)] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
        <blockquote className="relative text-[16px] font-medium leading-snug tracking-[-0.01em] text-slate-900">“{quote}”</blockquote>
        <figcaption className="relative flex items-center gap-3">
          <Avatar id={c.id} size={36} className="ring-0" />
          <span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={hidden ? -1 : 0}
              draggable={false}
              className="block text-[14px] font-semibold text-slate-900"
            >
              {c.name}
            </a>
            <span className="text-[12.5px] text-slate-500">{c.subs} subscribers</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

const SPEED = 56; // px per second, right to left

/**
 * One row of testimonials that loops right to left.
 * Hover eases it to a stop; drag (with a little momentum), swipe or scroll sideways to move it yourself.
 */
export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const state = useRef({ x: 0, v: -SPEED, paused: false, dragging: false, lastX: 0, lastT: 0, dragV: 0, moved: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const s = state.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.dragging) {
        // Ease the speed toward its target instead of jumping, so pauses and restarts glide.
        const target = s.paused || reduce ? 0 : -SPEED;
        s.v += (target - s.v) * (1 - Math.exp(-dt * 4));
        s.x += s.v * dt;
      }
      const half = el.scrollWidth / 2; // the list is rendered twice
      if (half > 0) s.x = ((s.x % half) - half) % half;
      el.style.transform = `translate3d(${s.x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const s = state.current;
  const onPointerDown = (e: React.PointerEvent) => {
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.dragV = 0;
    s.moved = 0;
    viewport.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!s.dragging) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    s.x += dx;
    s.moved += Math.abs(dx);
    s.dragV = (dx / Math.max(1, now - s.lastT)) * 1000;
    s.lastX = e.clientX;
    s.lastT = now;
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!s.dragging) return;
    s.dragging = false;
    s.v = Math.max(-1500, Math.min(1500, s.dragV)); // fling, then ease back to the normal speed
    viewport.current?.releasePointerCapture?.(e.pointerId);
  };

  const edgeMask = {
    maskImage: 'linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent)'
  };

  return (
    <section aria-label="Testimonials" className="pb-4 pt-2 lg:pt-4">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Hear it from the creators." />

        <div className="relative mt-8">
          {/* Soft blue glows give the frosted cards something to blur */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-1/2 h-48 w-[40%] -translate-y-1/2 rounded-full bg-blue-300/15 blur-[70px]" />
            <div className="absolute right-[8%] top-1/2 h-48 w-[35%] -translate-y-1/2 rounded-full bg-sky-300/15 blur-[70px]" />
          </div>

          <div
            ref={viewport}
            onPointerEnter={() => (s.paused = true)}
            onPointerLeave={() => (s.paused = false)}
            onFocus={() => (s.paused = true)}
            onBlur={() => (s.paused = false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={(e) => {
              if (s.moved > 5) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onWheel={(e) => {
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) s.x -= e.deltaX;
            }}
            style={edgeMask}
            className="@container relative -mb-10 cursor-grab touch-pan-y overflow-hidden pb-14 pt-4 active:cursor-grabbing"
          >
            <ul ref={track} className="flex w-max gap-4 px-2 [backface-visibility:hidden] will-change-transform">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.creatorId} {...t} />
              ))}
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={`${t.creatorId}-copy`} {...t} hidden />
              ))}
            </ul>
          </div>

        </div>
      </Container>
    </section>
  );
}
