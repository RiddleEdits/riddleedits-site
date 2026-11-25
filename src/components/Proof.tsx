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
        <dl className="relative grid overflow-hidden rounded-[32px] border-[5px] border-white bg-[linear-gradient(160deg,rgba(245,249,255,0.72)_0%,rgba(226,238,255,0.6)_100%)] shadow-[0_24px_60px_-28px_rgba(0,102,255,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 sm:grid-cols-3">
          {items.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className={`flex flex-col-reverse gap-3 p-8 transition-colors duration-200 ease-out hover:bg-[rgba(0,102,255,0.06)] sm:p-10 ${i ? 'border-t border-white/80 sm:border-l sm:border-t-0' : ''}`}>
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

export function Testimonials() {
  return (
    <section aria-label="Testimonials" className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Hear it from the creators." />
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => {
            const c = creator(t.creatorId);
            return (
              <li key={t.creatorId} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <figure className="card flex h-full flex-col justify-between gap-6 p-6">
                  <blockquote className="text-[16px] font-medium leading-snug tracking-[-0.01em] text-slate-900">“{t.quote}”</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar id={c.id} size={36} className="ring-0" />
                    <span>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="block text-[14px] font-semibold text-slate-900 hover:text-[#0066ff]">
                        {c.name}
                      </a>
                      <span className="text-[12.5px] text-slate-500">{c.subs} subscribers</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
