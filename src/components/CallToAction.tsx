import { Play } from 'lucide-react';
import { SITE, VIDEOS, compact, thumb } from '../data/content';
import { useModals } from '../router';
import { Button } from './ui';
import { PlayMark } from './Footer';

// Thumbnails floating around the card: [videoId, top, left, rotate, width, opacity]. Desktop only.
const FLOATERS: [string, string, string, number, number, number][] = [
  ['rJdJbEmO-ko', '24%', '9%', -6, 220, 0.9],
  ['zHvWvIpMsZA', '68%', '23%', 5, 210, 0.9],
  ['ul-omdsGBMI', '22%', '87%', 6, 216, 0.88],
  ['hbrOQRLRL_E', '70%', '79%', -4, 210, 0.9],
  ['WBtalXv3Qgc', '86%', '10%', 3, 190, 0.75],
  [SITE.showreelId, '13%', '31%', -3, 180, 0.7],
  ['rJdJbEmO-ko', '11%', '69%', 4, 185, 0.7],
  ['zHvWvIpMsZA', '55%', '93%', -5, 190, 0.75],
  ['ul-omdsGBMI', '53%', '4%', -3, 180, 0.7],
  ['hbrOQRLRL_E', '90%', '64%', 2, 180, 0.65],
  ['WBtalXv3Qgc', '91%', '38%', -2, 174, 0.6]
];

export function CallToAction() {
  const { openBookCall, openVideo } = useModals();

  return (
    <section aria-label="Work with me" className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4f9ff] via-[#eaf3fe] to-[#f8fbff] py-20 sm:min-h-[700px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[30%] h-[550px] w-[550px] rounded-full bg-blue-300/25 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[550px] w-[550px] rounded-full bg-sky-300/25 blur-[100px]" />
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <path d="M-100 400 C 300 200, 700 650, 1100 350 C 1300 200, 1500 380, 1600 300" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="2" />
          <path d="M-50 500 C 350 300, 800 750, 1200 450 C 1400 300, 1550 420, 1650 380" stroke="#0066ff" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="absolute inset-0 hidden sm:block">
        {FLOATERS.map(([id, top, left, rotate, width, opacity], i) => {
          const video = VIDEOS.find((v) => v.id === id);
          const title = video?.title ?? 'Showreel';
          return (
            <div
              key={i}
              className={`absolute ${i > 6 ? 'hidden lg:block' : ''}`}
              style={{ top, left, width, opacity, zIndex: 10 - Math.floor(i / 2) }}
            >
              <div
                className="animate-float will-change-transform"
                style={{ animation: `float-${'abc'[i % 3]} ${5.5 + (i % 4) * 1.2}s ease-in-out ${(i % 5) * 0.7}s infinite alternate` }}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => openVideo(id, title)}
                  className="group relative block w-full cursor-pointer transition-[scale,opacity] duration-300 ease-out hover:z-40 hover:scale-110"
                  style={{ rotate: `${rotate}deg` }}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-[16px] border border-white/70 shadow-[0_16px_35px_rgba(0,102,255,0.14)] transition-shadow duration-300 group-hover:shadow-[0_20px_45px_rgba(0,102,255,0.25)]">
                    <img src={thumb(id)} alt="" loading="lazy" className="h-full w-full object-cover" />
                    {video && (
                      <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                        <Play className="h-2.5 w-2.5 shrink-0 fill-white" />
                        {compact(video.views)}
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-20 w-full max-w-[560px] px-6">
        <div className="rounded-[32px] border border-white bg-white/85 p-8 text-center shadow-[0_20px_60px_rgba(0,102,255,0.12)] ring-1 ring-blue-900/5 backdrop-blur-2xl sm:p-12">
          <PlayMark size={56} className="mx-auto mb-6 shadow-md" />
          <h2 className="text-[36px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[44px]">
            Work <span className="text-[#0066ff]">With Me</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[380px] text-[15px] font-medium leading-relaxed text-slate-600 sm:text-[16px]">
            Book an intro call. I take on a few new creators at a time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button onClick={openBookCall}>Book a call</Button>
            <Button variant="secondary" href="/case-studies">
              View case studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
