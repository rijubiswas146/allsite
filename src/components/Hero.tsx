import React from 'react';
import { Film, Tv, BookOpen, Radio, Sparkles, Smartphone, Download, Gamepad2, Star, Layers, Compass } from 'lucide-react';
import { CategoryInfo } from '../types';

interface HeroProps {
  categories: CategoryInfo[];
  totalSites: number;
  favoritesCount: number;
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const Hero: React.FC<HeroProps> = ({
  categories,
  totalSites,
  favoritesCount,
  activeCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film size={14} className="shrink-0" />;
      case 'Tv': return <Tv size={14} className="shrink-0" />;
      case 'BookOpen': return <BookOpen size={14} className="shrink-0" />;
      case 'Radio': return <Radio size={14} className="shrink-0" />;
      case 'Sparkles': return <Sparkles size={14} className="shrink-0" />;
      case 'Smartphone': return <Smartphone size={14} className="shrink-0" />;
      case 'Download': return <Download size={14} className="shrink-0" />;
      case 'Gamepad2': return <Gamepad2 size={14} className="shrink-0" />;
      default: return <Compass size={14} className="shrink-0" />;
    }
  };

  return (
    <section className="relative w-full max-w-full min-w-0 pt-4 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1680px] mx-auto w-full min-w-0 relative">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Copy - Centered and Constrained */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-2 w-full">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/[0.06] border border-white/[0.1] text-blue-300 mb-3 sm:mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span>Your internet, organized</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white mb-2.5 sm:mb-4 leading-[1.15] font-display">
            Discover Websites.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Search Smarter.
            </span>
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
            A thoughtfully organized corner of the internet. Explore movies, anime, manga, sports, apps, games, and tools — all in one curated hub.
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto mb-6 sm:mb-8 w-full">
          <div className="glass-lux rounded-xl p-2.5 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">{totalSites}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Curated Sites</div>
          </div>
          <div className="glass-lux rounded-xl p-2.5 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-extrabold text-blue-400 font-mono">{categories.length}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Categories</div>
          </div>
          <div className="glass-lux rounded-xl p-2.5 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Free Access</div>
          </div>
          <div className="glass-lux rounded-xl p-2.5 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-extrabold text-purple-400 font-mono">Verified</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Reviewed Quality</div>
          </div>
        </div>

        {/* Horizontal Category Chips Bar - Safe Horizontal Scrolling Without Blowing Out Parent Width */}
        <div className="w-full max-w-full min-w-0 overflow-x-auto pb-3 no-scrollbar">
          <div className="flex items-center gap-2 justify-start sm:justify-center w-max min-w-full px-1">
            {/* All Websites Chip */}
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className={`category-chip shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === null
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400'
                  : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]'
              }`}
            >
              <Layers size={13} />
              <span>All Sites</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === null ? 'bg-blue-800 text-white' : 'bg-white/[0.1] text-slate-300'
              }`}>
                {totalSites}
              </span>
            </button>

            {/* Favorites Chip */}
            <button
              type="button"
              onClick={() => onSelectCategory('favorites')}
              className={`category-chip shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === 'favorites'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 border border-amber-300 font-bold'
                  : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]'
              }`}
            >
              <Star size={13} className={favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : ''} />
              <span>Favorites</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'favorites' ? 'bg-amber-700 text-white' : 'bg-white/[0.1] text-slate-300'
              }`}>
                {favoritesCount}
              </span>
            </button>

            {/* Dynamic Category Chips */}
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`category-chip shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-800 text-white' : 'bg-white/[0.1] text-slate-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
