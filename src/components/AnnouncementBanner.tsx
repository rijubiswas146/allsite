import React from 'react';
import { Heart, Send } from 'lucide-react';

interface AnnouncementBannerProps {
  onOpenSupport: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onOpenSupport }) => {
  return (
    <aside
      aria-label="Community announcement"
      className="w-full relative z-30 overflow-hidden bg-[#0c0d12] border-b border-white/[0.09] text-white transition-colors"
      style={{ minHeight: '38px' }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 py-1.5 min-h-[38px] flex items-center justify-between sm:justify-center gap-2 sm:gap-4 min-w-0">
        <p className="truncate text-xs sm:text-sm font-medium text-slate-200 leading-normal flex items-center gap-1.5 min-w-0">
          <span className="hidden sm:inline">We're facing a hard time keeping Linker Nest alive — </span>
          <span className="sm:hidden">Facing hard times — </span>
          <span className="text-white font-semibold">please support our community</span>
        </p>

        <button
          type="button"
          onClick={onOpenSupport}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/[0.1] hover:bg-white/[0.2] text-white border border-white/20 hover:border-white/40 transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
        >
          <Heart size={12} className="text-rose-400 fill-rose-400" />
          <span>Support</span>
        </button>

        <a
          href="https://t.me/riju_md"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
        >
          <Send size={11} />
          <span>Telegram</span>
        </a>
      </div>
    </aside>
  );
};
