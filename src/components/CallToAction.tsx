import { CalendarDays, Clock, Video as VideoIcon } from 'lucide-react';
import { VIDEOS, thumb } from '../data/content';
import { Link, useModals } from '../router';
import { Button, Container } from './ui';
import { LogoMark } from './Navbar';

const DETAILS = [
  { icon: Clock, text: '30 minutes' },
  { icon: VideoIcon, text: 'Google Meet, link sent by email' },
  { icon: CalendarDays, text: 'Pick any open slot that suits you' }
];

const TOP = [...VIDEOS].sort((a, b) => b.views - a.views);
// Three rows, each a different order so the same thumbnails don't line up
const ROWS = [0, 3, 5, 2, 6, 1].map((shift) => [...TOP.slice(shift), ...TOP.slice(0, shift)]);

/** Four to six tilted rows of real edits sliding in a loop. Rows start off-screen and are twice as long as needed, so they never run out mid-frame. */
function Wall({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className="absolute left-[-20%] top-1/2 flex w-[140%] -translate-y-1/2 -rotate-[6deg] flex-col items-start gap-4 sm:gap-6">
      {ROWS.map((row, r) => (
        <ul
          key={r}
          className={`animate-marquee flex w-max shrink-0 gap-4 sm:gap-6 ${r > 3 ? 'sm:hidden' : ''}`}
          style={{ animationDuration: `${70 + r * 12}s`, animationDirection: r % 2 ? 'reverse' : 'normal' }}
        >
          {[...row, ...row].map((v, i) => (
            <li key={i} className="aspect-video w-[230px] shrink-0 overflow-hidden rounded-[20px] ring-1 ring-white/20 sm:w-[380px]">
              <img src={thumb(v.id)} alt="" loading="lazy" className={`h-full w-full object-cover ${blurred ? 'scale-105 blur-[3px]' : 'scale-105 blur-[3px] lg:scale-100 lg:blur-none'}`} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Closing section: dark wall of real edits, copy on the left, booking card on the right. Runs into the dark footer. */
export function CallToAction() {
  const { openBookCall } = useModals();
  return (
    <section aria-label="Work with me" className="relative overflow-hidden bg-[#111113] pb-28 pt-32 lg:pb-36 lg:pt-44">
      {/* Wall of real edits: rows start off-screen on the left and are twice as long as needed, so they never run out mid-frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Desktop: the wall is split at a seam. Left of it a blurred copy, right of it the sharp one; both move in sync, and plain clipping keeps it cheap */}
        <div className="absolute inset-0 lg:left-[47%] overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[188.68%]">
            <Wall />
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 hidden w-[47%] overflow-hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-[212.77%]">
            <Wall blurred />
          </div>
        </div>
        {/* Soft dark band over the seam so the switch from blurred to sharp isn't a hard line */}
        <div className="absolute inset-y-0 left-[41%] hidden w-[12%] bg-[linear-gradient(90deg,transparent,rgba(17,17,19,0.85)_45%,rgba(17,17,19,0.85)_55%,transparent)] lg:block" />
        {/* Dark wash: strongest behind the copy, lighter on the right so the edits show */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.94)_0%,rgba(10,10,12,0.84)_34%,rgba(10,10,12,0.46)_60%,rgba(10,10,12,0.26)_100%)]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_60%_50%,transparent_45%,rgba(10,10,12,0.75)_100%)]" />
        {/* Soft dark patch behind the copy so it always reads */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_22%_50%,rgba(10,10,12,0.75)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[#111113]/75 lg:hidden" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px]">
          <div>
            <LogoMark size={56} className="ring-2 ring-white/25" />
            <h2 className="mt-6 text-[clamp(34px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Work <span className="text-white/65">With Me</span>
            </h2>
            <p className="mt-4 max-w-[430px] text-[16px] leading-relaxed text-neutral-300">Let’s hop on a call to talk about your content and how I can help you retain more viewers.</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button onClick={openBookCall}>Book a call</Button>
              <Link href="/case-studies" className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.12]">
                <span>View case studies</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(48,48,52,0.7)_0%,rgba(20,20,23,0.8)_100%)] p-6 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-7">
            <div className="flex items-center gap-3">
              <LogoMark size={44} className="ring-white/20" />
              <div>
                <p className="text-[16px] font-semibold text-white">Intro call with RiddleEdits</p>
                <p className="text-[13px] text-neutral-400">Free · no prep needed</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3.5 border-t border-white/10 pt-6">
              {DETAILS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[14.5px] text-neutral-200">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-neutral-200 ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <button type="button" onClick={openBookCall} className="btn btn-primary mt-7 w-full justify-center">
              <span>See open times</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
