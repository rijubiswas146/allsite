import React, { useState, useEffect, useMemo } from 'react';
import {
  CATEGORIES,
  WEBSITES,
  Website,
  CategoryInfo,
} from './data/sites';
import { ModalType } from './types';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { SiteCard } from './components/SiteCard';
import { Modals } from './components/Modals';
import { Footer } from './components/Footer';
import {
  Film,
  Tv,
  BookOpen,
  Radio,
  Sparkles,
  Smartphone,
  Download,
  Gamepad2,
  Layers,
  SearchX,
  RotateCcw,
  Star,
  ChevronRight,
  ArrowUp,
  PlusCircle,
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ash_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set(['site-1', 'site-5', 'site-10']);
    } catch {
      return new Set(['site-1', 'site-5', 'site-10']);
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ash_theme');
      return saved !== 'light';
    } catch {
      return true;
    }
  });

  const [modalType, setModalType] = useState<ModalType>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    }
    try {
      localStorage.setItem('ash_theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('ash_favorites', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setActiveCategory(null);
  };

  // Helper for category icon
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film size={18} className="text-blue-400" />;
      case 'Tv': return <Tv size={18} className="text-purple-400" />;
      case 'BookOpen': return <BookOpen size={18} className="text-emerald-400" />;
      case 'Radio': return <Radio size={18} className="text-amber-400" />;
      case 'Sparkles': return <Sparkles size={18} className="text-pink-400" />;
      case 'Smartphone': return <Smartphone size={18} className="text-cyan-400" />;
      case 'Download': return <Download size={18} className="text-violet-400" />;
      case 'Gamepad2': return <Gamepad2 size={18} className="text-rose-400" />;
      default: return <Layers size={18} className="text-blue-400" />;
    }
  };

  // Filtered websites
  const filteredWebsites = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WEBSITES.filter((site) => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.has(site.id)) return false;
      } else if (activeCategory && site.categorySlug !== activeCategory) {
        return false;
      }

      // Search query filter
      if (q) {
        const matchName = site.name.toLowerCase().includes(q);
        const matchDomain = site.domain.toLowerCase().includes(q);
        const matchCategory = site.category.toLowerCase().includes(q);
        const matchBadge = site.badge ? site.badge.toLowerCase().includes(q) : false;
        return matchName || matchDomain || matchCategory || matchBadge;
      }

      return true;
    });
  }, [searchQuery, activeCategory, favorites]);

  // Group sites by category if browsing all without a search query
  const shouldGroupByCategory = !searchQuery.trim() && activeCategory === null;

  return (
    <div className="min-h-screen flex flex-col bg-[#050508] text-slate-100 bg-grid-lux selection:bg-blue-600 selection:text-white w-full max-w-full min-w-0 overflow-x-hidden">
      {/* 1. Community Announcement Top Banner */}
      <AnnouncementBanner onOpenSupport={() => setModalType('support')} />

      {/* 2. Main Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.size}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenModal={setModalType}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onResetSearch={handleResetSearch}
        categories={CATEGORIES}
        totalSites={WEBSITES.length}
      />

      {/* 3. Hero Section with Quick Chips & Counter */}
      <Hero
        categories={CATEGORIES}
        totalSites={WEBSITES.length}
        favoritesCount={favorites.size}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 4. Main Body: Left Sidebar + Directory Grid */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sticky Sidebar */}
          <Sidebar
            categories={CATEGORIES}
            totalSites={WEBSITES.length}
            favoritesCount={favorites.size}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onOpenModal={setModalType}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            {/* Active Filter Indicator / Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5 font-display">
                  {activeCategory === 'favorites' ? (
                    <>
                      <Star size={20} className="fill-amber-400 text-amber-400" />
                      <span>My Bookmarked Favorites</span>
                    </>
                  ) : activeCategory ? (
                    <>
                      <span>{CATEGORIES.find((c) => c.slug === activeCategory)?.name}</span>
                    </>
                  ) : searchQuery ? (
                    <>
                      <span>Search Results for "{searchQuery}"</span>
                    </>
                  ) : (
                    <>
                      <span>Curated Directory</span>
                    </>
                  )}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {searchQuery
                    ? `Found ${filteredWebsites.length} matching site${filteredWebsites.length === 1 ? '' : 's'}`
                    : activeCategory === 'favorites'
                    ? `You have ${favorites.size} favorited website${favorites.size === 1 ? '' : 's'}`
                    : activeCategory
                    ? CATEGORIES.find((c) => c.slug === activeCategory)?.description
                    : `Showing all ${filteredWebsites.length} vetted websites organized by category`}
                </p>
              </div>

              {(searchQuery || activeCategory) && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredWebsites.length === 0 ? (
              <div className="glass-lux rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <SearchX size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {activeCategory === 'favorites' ? 'No favorites saved yet' : 'No websites found'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {activeCategory === 'favorites'
                    ? 'Click the star icon on any website card in the directory to add it to your personal favorites list.'
                    : `We couldn't find any sites matching "${searchQuery}". Try a different keyword or reset filters.`}
                </p>
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  View All Websites
                </button>
              </div>
            ) : shouldGroupByCategory ? (
              /* Grouped by Category View (Linker Nest layout) */
              <div className="space-y-12">
                {CATEGORIES.map((cat) => {
                  const sitesInCat = WEBSITES.filter((s) => s.categorySlug === cat.slug);
                  if (sitesInCat.length === 0) return null;

                  return (
                    <section key={cat.id} id={`cat-${cat.slug}`} className="scroll-mt-24">
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1 h-6 rounded-full"
                            style={{
                              background: `linear-gradient(180deg, ${cat.accent}, ${cat.accent}33)`,
                              boxShadow: `0 0 10px ${cat.accent}44`,
                            }}
                          />
                          <div className="flex items-center gap-2">
                            {renderCategoryIcon(cat.icon)}
                            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display">
                              {cat.name}
                            </h3>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08]">
                            {sitesInCat.length}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.slug);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>View category</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2.5">
                        {sitesInCat.map((site) => (
                          <SiteCard
                            key={site.id}
                            site={site}
                            isFavorite={favorites.has(site.id)}
                            onToggleFavorite={handleToggleFavorite}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Flat Filtered Grid View */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-2.5">
                {filteredWebsites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    isFavorite={favorites.has(site.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 5. Footer */}
      <Footer
        categories={CATEGORIES}
        onOpenModal={setModalType}
        onSelectCategory={setActiveCategory}
      />

      {/* 6. Modals (Support, Request, About, DMCA, Privacy, Terms) */}
      <Modals
        modalType={modalType}
        onClose={() => setModalType(null)}
        categories={CATEGORIES}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-30 w-10 h-10 rounded-full glass-lux-bright border border-white/20 text-slate-200 hover:text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer touch-manipulation"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
