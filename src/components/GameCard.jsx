import React, { useState } from 'react';
import { Star, Play, Heart, Gamepad2 } from 'lucide-react';

export default function GameCard({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:shadow-cyan-950/30"
    >
      {/* Thumbnail Aspect 4:3 with styled fallback container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        {!imgError && game.thumbnail ? (
          <img
            src={game.thumbnail}
            alt={game.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-inner"
              style={{ backgroundColor: `${game.accentColor || '#0284c7'}20` }}
            >
              <Gamepad2 className="w-6 h-6" style={{ color: game.accentColor || '#38bdf8' }} />
            </div>
            <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              {game.category}
            </span>
          </div>
        )}

        {/* Hover overlay with Play CTA */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-colors ${
            isFavorite
              ? 'bg-pink-500/90 text-white shadow-md shadow-pink-500/30'
              : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Custom Game tag if added by user */}
        {game.isCustom && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-medium text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
            Custom
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line without pills */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <span className="text-cyan-400">{game.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{(game.plays || 0).toLocaleString()} plays</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{game.rating ? game.rating.toFixed(1) : '5.0'}</span>
          </div>

          <span className="font-mono text-[11px] text-slate-500 truncate max-w-[140px]">
            iframe: {game.iframeUrl.replace('/games/', '')}
          </span>
        </div>
      </div>
    </div>
  );
}
