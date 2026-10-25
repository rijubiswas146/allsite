import React from 'react';
import { ArrowUp, Send, Instagram, Heart, Code2 } from 'lucide-react';
import { ModalType, CategoryInfo } from '../types';

interface FooterProps {
  categories: CategoryInfo[];
  onOpenModal: (type: ModalType) => void;
  onSelectCategory: (category: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onOpenModal,
  onSelectCategory,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-16 sm:mt-24 border-t border-white/[0.08] bg-[#07070b]/90 pt-12 pb-14 text-slate-400">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-0.5 shadow-md">
                <img
                  src="/icon.svg"
                  alt="Linker Nest logo"
                  className="w-full h-full object-contain rounded-[10px]"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                Linker<span className="text-blue-500">Nest</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              A curated web directory for discovering the best entertainment, anime, manga, sports, apps, and games.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://t.me/riju_md"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors text-xs font-semibold"
                title="Telegram Support"
              >
                <Send size={13} className="text-sky-400" />
                <span>Telegram</span>
              </a>
              <a
                href="https://www.instagram.com/coldemotions_/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-500/15 hover:from-purple-500/25 hover:to-pink-500/25 border border-pink-500/30 text-pink-300 hover:text-white flex items-center gap-1.5 transition-colors text-xs font-semibold"
                title="Developer Profile"
              >
                <Instagram size={13} className="text-pink-400" />
                <span>Developer</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenModal('support')}
                className="h-8 px-2.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart size={12} className="fill-rose-400 text-rose-400" />
                <span>Support</span>
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Websites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('favorites')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Favorite Sites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('request')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Submit a Website
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Linker Nest
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h5>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(c.slug);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left truncate block w-full"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Information &amp; Policy
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('dmca')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  DMCA &amp; Copyright Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="https://t.me/riju_md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Telegram Contact</span>
                  <span>↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-500 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Linker Nest. A pure informational location index.
            </span>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <span className="text-slate-400 inline-flex items-center gap-1.5">
              <span>Dev:</span>
              <a
                href="https://www.instagram.com/coldemotions_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-semibold inline-flex items-center gap-1 transition-colors group"
              >
                <Instagram size={12} className="group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
