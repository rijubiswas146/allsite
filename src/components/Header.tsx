import React, { useRef, useEffect, useState } from 'react';
import {
  Search,
  X,
  Star,
  Sun,
  Moon,
  Send,
  PlusCircle,
  Menu,
  Film,
  Tv,
  BookOpen,
  Radio,
  Sparkles,
  Smartphone,
  Download,
  Gamepad2,
  Layers,
  Heart,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ModalType, CategoryInfo } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onOpenModal: (type: ModalType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onResetSearch: () => void;
  categories: CategoryInfo[];
  totalSites: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  favoritesCount,
  activeCategory,
  onSelectCategory,
  onOpenModal,
  isDark,
  onToggleTheme,
  onResetSearch,
  categories,
  totalSites,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
        }
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film size={15} />;
      case 'Tv': return <Tv size={15} />;
      case 'BookOpen': return <BookOpen size={15} />;
      case 'Radio': return <Radio size={15} />;
      case 'Sparkles': return <Sparkles size={15} />;
      case 'Smartphone': return <Smartphone size={15} />;
      case 'Download': return <Download size={15} />;
      case 'Gamepad2': return <Gamepad2 size={15} />;
      default: return <Layers size={15} />;
    }
  };

  return (
    <>
      <header className="site-header sticky top-0 z-40 bg-[#0a0a0f]/92 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
        <div className="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button
              type="button"
              onClick={() => {
                onResetSearch();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 select-none cursor-pointer group text-left touch-manipulation"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <img
                  src="/icon.svg"
                  alt="Linker Nest logo"
                  className="w-full h-full object-contain rounded-[9px]"
                />
              </div>
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-white flex items-center font-display">
                Linker<span className="text-blue-500">Nest</span>
              </span>
            </button>

            {/* Desktop / Laptop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCategory === null && !searchQuery
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Directory
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('favorites')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'favorites'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Star size={12} className={favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : ''} />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-500/25 text-amber-300 rounded-full text-[10px] font-bold">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('request')}
                className="px-3 py-1.5 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle size={12} />
                <span>Suggest Site</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('about')}
                className="px-3 py-1.5 rounded-lg hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>
          </div>

          {/* Search Bar - Responsive on Mobile & Laptops */}
          <div className="flex-1 max-w-md sm:max-w-lg lg:max-w-xl mx-1 sm:mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <Search size={14} className="sm:w-[15px] sm:h-[15px]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search websites, categories..."
                className="w-full pl-8 sm:pl-10 pr-9 sm:pr-12 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] text-slate-100 placeholder-slate-400 border border-white/[0.12] focus:border-blue-500/60 rounded-xl outline-none transition-all duration-150 shadow-inner"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              ) : (
                <div className="hidden md:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.08] border border-white/[0.12] rounded">
                    /
                  </kbd>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Telegram Link (hidden on tiny screens) */}
            <a
              href="https://t.me/riju_md"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 rounded-xl transition-all duration-150 active:scale-95"
              title="Join Linker Nest Telegram"
            >
              <Send size={13} />
              <span>Telegram</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer touch-manipulation"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-blue-300" />}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-200 hover:text-white transition-all cursor-pointer touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              title="Menu"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#0d0e14] border-l border-white/[0.1] p-5 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 p-0.5">
                    <img src="/icon.svg" alt="logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-extrabold text-base text-white font-display">
                    Linker<span className="text-blue-500">Nest</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-1 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    activeCategory === null
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-200 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers size={15} />
                    <span>All Websites</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">{totalSites}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('favorites');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    activeCategory === 'favorites'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-200 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span>My Favorites</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    {favoritesCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenModal('request');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/[0.06]"
                >
                  <PlusCircle size={15} className="text-blue-400" />
                  <span>Suggest or Request Site</span>
                </button>
              </div>

              {/* Categories Section */}
              <div className="mb-6">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-1">
                  Browse by Category
                </div>
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(c.slug);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                        activeCategory === c.slug
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{getCategoryIcon(c.icon)}</span>
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Community and Support Links */}
              <div className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-1">
                  Community &amp; Support
                </div>
                <a
                  href="https://t.me/riju_md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Send size={14} />
                    <span>Telegram Admin</span>
                  </div>
                  <ChevronRight size={13} />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onOpenModal('support');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="fill-rose-400 text-rose-400" />
                    <span>Support Community</span>
                  </div>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => {
                  onOpenModal('about');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-white"
              >
                About
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onOpenModal('dmca');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-white"
              >
                DMCA
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onOpenModal('privacy');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-white"
              >
                Privacy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
