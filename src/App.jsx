import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import JsonViewerModal from './components/JsonViewerModal.jsx';
import AddGameModal from './components/AddGameModal.jsx';
import CloakModal, { CLOAK_PRESETS } from './components/CloakModal.jsx';
import PanicScreen from './components/PanicScreen.jsx';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Sparkles,
  Gamepad2,
  Code,
  Shield,
  Plus,
  Play
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Arcade',
  'Puzzle',
  'Action',
  'Strategy',
  'Classic',
  'Casual',
  'Favorites'
];

export default function App() {
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('nexus_custom_games');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        return [...DEFAULT_GAMES, ...parsed];
      }
    } catch (e) {}
    return DEFAULT_GAMES;
  });

  const [activeGame, setActiveGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'rating' | 'az'
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_favorites');
      return saved ? JSON.parse(saved) : ['neon-tetris', 'cyber-flappy', 'cyber-2048'];
    } catch (e) {
      return ['neon-tetris', 'cyber-flappy'];
    }
  });

  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [activeCloak, setActiveCloak] = useState('default');
  const [isPanicActive, setIsPanicActive] = useState(false);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Tab cloak handler
  const handleApplyCloak = (presetId) => {
    setActiveCloak(presetId);
    const preset = CLOAK_PRESETS.find(p => p.id === presetId) || CLOAK_PRESETS[0];
    document.title = preset.title;
    const faviconEl = document.getElementById('favicon-link');
    if (faviconEl) {
      faviconEl.setAttribute('href', preset.favicon);
    }
  };

  // Keyboard shortcut for Panic Screen (~ or `)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        setIsPanicActive(prev => !prev);
      } else if (e.key === 'Escape' && isPanicActive) {
        setIsPanicActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanicActive]);

  const toggleFavorite = (gameId) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleAddCustomGame = (newGame) => {
    setGames(prev => {
      const updated = [newGame, ...prev];
      try {
        const customOnly = updated.filter(g => g.isCustom);
        localStorage.setItem('nexus_custom_games', JSON.stringify(customOnly));
      } catch (e) {}
      return updated;
    });
    setActiveGame(newGame);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('nexus_custom_games');
    setGames(DEFAULT_GAMES);
    setIsJsonModalOpen(false);
  };

  // Filter & Sort
  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        // Category filter
        if (selectedCategory === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (selectedCategory !== 'All') {
          if (game.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesCategory = game.category.toLowerCase().includes(q);
          const matchesTag = game.tags && game.tags.some(t => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesCategory && !matchesTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.plays || 0) - (a.plays || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, selectedCategory, searchQuery, sortBy, favorites]);

  // Featured game for Hero showcase
  const featuredGame = useMemo(() => {
    return games.find(g => g.featured) || games[0];
  }, [games]);

  // Related games for player screen
  const relatedGames = useMemo(() => {
    if (!activeGame) return [];
    return games
      .filter(g => g.id !== activeGame.id)
      .slice(0, 4);
  }, [games, activeGame]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Panic Decoy Screen */}
      {isPanicActive && (
        <PanicScreen onDismiss={() => setIsPanicActive(false)} />
      )}

      {/* Header */}
      <Header
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveGame(null);
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        activeGame={activeGame}
        onExitGame={() => setActiveGame(null)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeGame ? (
          /* Active Game View */
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={toggleFavorite}
            relatedGames={relatedGames}
            onSelectGame={(g) => setActiveGame(g)}
          />
        ) : (
          /* Catalog Home View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Hero Featured Showcase (when no active search/category filter) */}
            {selectedCategory === 'All' && !searchQuery && featuredGame && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
                  {/* Left Column Text */}
                  <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between z-10">
                    <div>
                      {/* Quiet metadata line without pills */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                        <span className="text-cyan-400 font-semibold uppercase tracking-wider">
                          Featured Unblocked Game
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{featuredGame.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{(featuredGame.plays || 0).toLocaleString()} plays</span>
                      </div>

                      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {featuredGame.title}
                      </h1>

                      <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
                        {featuredGame.description}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setActiveGame(featuredGame)}
                        className="px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-400/20 flex items-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>Play Now</span>
                      </button>

                      <button
                        onClick={() => setIsJsonModalOpen(true)}
                        className="px-4 py-3 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Code className="w-4 h-4 text-cyan-400" />
                        <span>Inspect JSON Iframe</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column Image Banner */}
                  <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full">
                    {featuredGame.thumbnail && (
                      <img
                        src={featuredGame.thumbnail}
                        alt={featuredGame.title}
                        className="w-full h-full object-cover lg:absolute inset-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games by title, category, or tag..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort dropdown & Quick Add */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Top Rated</option>
                      <option value="az">A to Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                {CATEGORIES.map(cat => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                      {cat === 'Favorites' && ` (${favorites.length})`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Games Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedCategory} Games</span>
                  <span className="text-xs font-normal text-slate-400 tabular-nums">
                    ({filteredGames.length} available)
                  </span>
                </h2>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={(g) => setActiveGame(g)}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8 space-y-3">
                  <Gamepad2 className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="text-base font-bold text-white">No games matched</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Try clearing your search query or add a custom iframe game to the database.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="px-4 py-1.5 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Direct JSON Iframe Information Strip */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    JSON Iframe Storage Architecture
                  </h4>
                  <p className="text-xs text-slate-400">
                    All games are loaded dynamically from <code className="text-cyan-300 font-mono">/data/games.json</code> with zero external dependencies.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Game</span>
                </button>
                <button
                  onClick={() => setIsJsonModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
                >
                  View Raw JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Nexus Arcade · Fast, self-contained unblocked games portal loaded via JSON iframes.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Tab Cloaker
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              games.json
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsPanicActive(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Panic Key [~]
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onResetDefaults={handleResetDefaults}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddCustomGame}
      />

      <CloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        activeCloak={activeCloak}
        onApplyCloak={handleApplyCloak}
      />
    </div>
  );
}
