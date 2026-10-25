import React, { useState } from 'react';
import { Globe, Star, ExternalLink } from 'lucide-react';
import { Website } from '../types';

interface SiteCardProps {
  site: Website;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = useState(false);

  // Badge color mapping matching original site
  const getBadgeStyle = (badge?: string | null) => {
    if (!badge) return null;
    const b = badge.toUpperCase();
    if (b === 'NEW') {
      return {
        color: '#6ee7b7',
        borderColor: 'rgba(16, 185, 129, 0.4)',
        background: 'rgba(110, 231, 183, 0.12)',
      };
    }
    if (b === 'TRUSTED') {
      return {
        color: '#60a5fa',
        borderColor: 'rgba(59, 130, 246, 0.4)',
        background: 'rgba(96, 165, 250, 0.12)',
      };
    }
    if (b === 'FEATURED' || b === 'TOP') {
      return {
        color: '#f472b6',
        borderColor: 'rgba(236, 72, 153, 0.4)',
        background: 'rgba(244, 114, 182, 0.12)',
      };
    }
    return {
      color: '#cbd5e1',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      background: 'rgba(255, 255, 255, 0.08)',
    };
  };

  const badgeStyle = getBadgeStyle(site.badge);

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${site.name}`}
      className="sc-card group"
      style={
        {
          '--brand-accent': site.accent,
          '--brand-accent-glow': `${site.accent}40`,
        } as React.CSSProperties
      }
    >
      {/* Top Row: Badge & Star Favorite button */}
      <div className="sc-toprow">
        <div>
          {site.badge && badgeStyle && (
            <span className="sc-badge" style={badgeStyle}>
              {site.badge}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(site.id, e);
          }}
          className={`sc-star ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? `Remove ${site.name} from favorites` : `Add ${site.name} to favorites`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star
            size={13}
            className={isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400 hover:text-slate-200'}
            strokeWidth={2.2}
          />
        </button>
      </div>

      {/* Center Row: Brand Logo or Fallback */}
      <div className="sc-center-wrap">
        {site.logo && !imageError ? (
          <img
            src={site.logo}
            alt={`${site.name} logo`}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="sc-logo-img"
          />
        ) : (
          <div className="flex items-center justify-center gap-2 py-1">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-inner"
              style={{
                background: `linear-gradient(135deg, ${site.accent}, #1e293b)`,
              }}
            >
              {site.name.charAt(0).toUpperCase()}
            </span>
            <span className="font-bold text-sm tracking-tight text-slate-200 group-hover:text-white transition-colors">
              {site.name}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Row: Domain & External Link Indicator */}
      <div className="sc-domain">
        <div className="flex items-center gap-1.5 min-w-0">
          <Globe size={11} className="shrink-0 opacity-60 text-slate-400" />
          <span className="truncate">{site.domain}</span>
        </div>
        <ExternalLink
          size={11}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-white"
        />
      </div>
    </a>
  );
};
