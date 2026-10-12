import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Maximize,
  RotateCw,
  ExternalLink,
  Heart,
  ThumbsUp,
  Share2,
  Keyboard,
  Info,
  Check
} from 'lucide-react';

export default function GamePlayer({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  relatedGames,
  onSelectGame
}) {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTheater, setIsTheater] = useState(false);

  // Fullscreen trigger
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  // Reload iframe
  const handleReload = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = currentSrc;
    }
  };

  // Open in stealth blank tab (classic unblocked games technique)
  const handleOpenBlankTab = () => {
    try {
      const win = window.open('about:blank', '_blank');
      if (win) {
        const doc = win.document;
        doc.title = 'Google Docs';
        const link = doc.createElement('link');
        link.rel = 'icon';
        link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
        doc.head.appendChild(link);

        const iframe = doc.createElement('iframe');
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.margin = '0';
        iframe.style.padding = '0';
        iframe.src = window.location.origin + game.iframeUrl;
        doc.body.style.margin = '0';
        doc.body.style.overflow = 'hidden';
        doc.body.appendChild(iframe);
      }
    } catch (e) {
      window.open(game.iframeUrl, '_blank');
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(l => l + 1);
      setHasLiked(true);
    } else {
      setLikes(l => l - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenBlankTab}
            title="Open in stealth about:blank window"
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Open in Blank Tab</span>
          </button>

          <button
            onClick={() => setIsTheater(!isTheater)}
            className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
              isTheater
                ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isTheater ? 'Default Size' : 'Theater View'}
          </button>

          <button
            onClick={handleReload}
            title="Restart / Reload Game"
            className="p-2 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Iframe Player Container */}
      <div
        ref={containerRef}
        className={`mx-auto bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative transition-all duration-300 ${
          isTheater ? 'max-w-6xl w-full' : 'max-w-4xl w-full'
        }`}
      >
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[480px]">
          <iframe
            ref={iframeRef}
            src={game.iframeUrl}
            title={game.title}
            className="w-full h-full border-0 absolute inset-0 bg-slate-950"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </div>
      </div>

      {/* Game Details Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            {/* Metadata without pills */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
              <span className="text-cyan-400">{game.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{(game.plays || 0).toLocaleString()} plays</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">JSON id: {game.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {game.title}
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Social / Engagement Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLike}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                hasLiked
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
              <span className="tabular-nums">{likes}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(game.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                isFavorite
                  ? 'bg-pink-500/10 border-pink-500/40 text-pink-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column: Instructions & Controls Keybinds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Instructions */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>How to Play</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.instructions || 'Follow on-screen instructions to conquer objectives and advance to higher levels.'}
            </p>

            {game.tags && game.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 mr-2">Tags:</span>
                <span className="text-xs text-slate-400">
                  {game.tags.join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* Controls Table */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Keyboard className="w-4 h-4 text-cyan-400" />
              <span>Default Controls</span>
            </div>

            <div className="bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden divide-y divide-slate-800/60">
              {game.controls && game.controls.length > 0 ? (
                game.controls.map((ctrl, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3.5 py-2.5 text-xs">
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 text-cyan-300 rounded font-mono font-semibold">
                      {ctrl.key}
                    </kbd>
                    <span className="text-slate-300 font-medium">{ctrl.action}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-slate-400">Standard mouse click & keyboard navigation.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Games */}
      {relatedGames && relatedGames.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-white">More Games to Play</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedGames.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectGame(rel)}
                className="group bg-slate-900/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 p-3 flex items-center gap-3 cursor-pointer transition-all hover:bg-slate-900"
              >
                <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                  {rel.thumbnail ? (
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cyan-400 text-xs font-bold">
                      {rel.category[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 truncate">
                    {rel.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 truncate">
                    {rel.category} · {(rel.plays || 0).toLocaleString()} plays
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
