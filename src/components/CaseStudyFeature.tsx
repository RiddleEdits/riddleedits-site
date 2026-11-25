import { CASE_STUDIES, caseStats, creator } from '../data/content';
import { useModals } from '../router';
import { Avatar, Button, Container, VideoThumb } from './ui';

/** Homepage case study: one creator, one video, three numbers. */
export function CaseStudyFeature() {
  const { openVideo } = useModals();
  const study = CASE_STUDIES[0];
  const c = creator(study.creatorId);
  const { vids } = caseStats(study);

  return (
    <section aria-labelledby="case-study-title" className="pb-24 lg:pb-32">
      <Container>
        <article className="card grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-12">
          <div>
            <div className="flex items-center gap-3">
              <Avatar id={c.id} size={40} className="ring-0" />
              <p className="text-[13.5px] leading-tight">
                <span className="block font-semibold text-slate-900">{c.name}</span>
                <span className="text-slate-500">{c.subs} subscribers · GTA case study</span>
              </p>
            </div>

            <h2 id="case-study-title" className="mt-6 text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-950 sm:text-[36px] text-balance">
              From hours of GTA footage to videos people finish
            </h2>
            <p className="mt-4 max-w-[440px] text-[15.5px] leading-relaxed text-slate-600">
              Raw sessions with friends run for hours. I find the story, build the stakes and cut everything that doesn’t move it forward.
            </p>

            {study.months && (
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                {study.months.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse gap-1">
                    <dt className="text-[12.5px] text-slate-500">{m.label}</dt>
                    <dd className="text-[22px] font-semibold leading-tight tracking-tight text-slate-950 tabular-nums">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-2 text-[12px] text-slate-400">Channel views per month</p>

            <Button variant="secondary" href={`/case-studies#${study.slug}`} className="mt-8">
              View case study
            </Button>
          </div>

          <VideoThumb video={vids[0]} onOpen={openVideo} showViews={false} rounded="rounded-[20px]" className="shadow-[0_30px_60px_-30px_rgba(15,40,100,0.45)]" />
        </article>
      </Container>
    </section>
  );
}
