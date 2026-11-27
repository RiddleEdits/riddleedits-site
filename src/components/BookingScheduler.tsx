import { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { SITE, asset } from '../data/content';

/** Free Google Calendar booking page: every booking gets a Google Meet link and email confirmations. */
const EMBED_URL = `${SITE.booking}?gv=true`;

export function BookingScheduler({ height = 680 }: { height?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex min-w-[220px] flex-1 items-center gap-3">
          <img src={asset('logo.webp')} alt="" width={36} height={36} className="h-9 w-9 rounded-xl object-cover" />
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Intro call · 30 min</p>
            <p className="text-[12.5px] text-slate-500">Google Meet link sent when you book</p>
          </div>
        </div>
        <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
          Open in new tab <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="relative" style={{ height }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin" />
            <span className="sr-only">Loading calendar</span>
          </div>
        )}
        <iframe
          src={EMBED_URL}
          title="Book an intro call"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="relative h-full w-full border-0"
        />
      </div>
    </div>
  );
}
