import React from 'react';
import {
  Film,
  Tv,
  BookOpen,
  Radio,
  Sparkles,
  Smartphone,
  Download,
  Gamepad2,
  Star,
  Layers,
  Send,
  MessageCircle,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { CategoryInfo, ModalType } from '../types';

interface SidebarProps {
  categories: CategoryInfo[];
  totalSites: number;
  favoritesCount: number;
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onOpenModal: (type: ModalType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  totalSites,
  favoritesCount,
  activeCategory,
  onSelectCategory,
  onOpenModal,
}) => {
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
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col gap-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pb-6">
      {/* Categories Navigation Card */}
      <div className="glass-lux rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
            Categories
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">
            {totalSites} Sites
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {/* All Sites */}
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeCategory === null
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers size={15} className={activeCategory === null ? 'text-blue-400' : 'text-slate-400'} />
              <span>All Websites</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{totalSites}</span>
          </button>

          {/* Favorites */}
          <button
            type="button"
            onClick={() => onSelectCategory('favorites')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeCategory === 'favorites'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star
                size={15}
                className={favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}
              />
              <span>My Favorites</span>
            </div>
            <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
              favoritesCount > 0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-500'
            }`}>
              {favoritesCount}
            </span>
          </button>

          <div className="my-1.5 border-t border-white/[0.06]" />

          {/* Category List */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{cat.name}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{cat.count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Suggest Website Quick Action */}
      <button
        type="button"
        onClick={() => onOpenModal('request')}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/20 transition-all cursor-pointer active:scale-98"
      >
        <PlusCircle size={15} />
        <span>Suggest a Website</span>
      </button>

      {/* Community Card */}
      <div className="glass-lux rounded-2xl p-4 sm:p-5">
        <h4 className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-3 px-1">
          Join Community
        </h4>
        <div className="flex flex-col gap-2">
          <a
            href="https://t.me/riju_md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Send size={14} className="text-sky-400" />
              <span>Telegram Group</span>
            </div>
            <ExternalLink size={12} className="text-slate-500 group-hover:text-white" />
          </a>

          <a
            href="https://www.instagram.com/coldemotions_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold transition-colors group"
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={14} className="text-pink-400" />
              <span>Instagram</span>
            </div>
            <ExternalLink size={12} className="text-slate-500 group-hover:text-white" />
          </a>
        </div>
      </div>
    </aside>
  );
};
