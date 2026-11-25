import { useEffect, useRef, type ReactNode } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { BookingScheduler } from './BookingScheduler';

function Modal({ onClose, label, children }: { onClose: () => void; label: string; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);

  // Move focus into the dialog, keep Tab inside it, and give focus back on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('a[href], button, iframe, [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Tabbing out of the YouTube iframe skips our keydown handler, so pull stray focus back in.
    const onFocusIn = (e: FocusEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) {
        panel.current.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-8">
      <div onClick={onClose} aria-hidden="true" className="fixed inset-0 animate-fade bg-slate-950/70 backdrop-blur-sm" />
      <div ref={panel} className="relative my-auto w-full max-w-4xl animate-modal">
        {children}
      </div>
    </div>
  );
}

export function VideoModal({ video, onClose }: { video: { id: string; title: string }; onClose: () => void }) {
  return (
    <Modal onClose={onClose} label={video.title}>
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
          <p className="truncate text-[14px] font-semibold text-slate-900">{video.title}</p>
          <div className="flex shrink-0 gap-1">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
            <button type="button" data-autofocus onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </Modal>
  );
}

export function BookCallModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} label="Book a call">
      <div className="relative">
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
        <BookingScheduler height={640} />
      </div>
    </Modal>
  );
}
