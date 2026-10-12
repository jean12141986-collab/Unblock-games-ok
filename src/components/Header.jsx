import React from 'react';
import { Gamepad2, Shield, Code, Plus, Heart, Search } from 'lucide-react';

export default function Header({
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
  onOpenJsonModal,
  onOpenCloakModal,
  onTriggerPanic,
  activeGame,
  onExitGame,
  favoritesCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExitGame}
            className="flex items-center gap-2 text-left group transition-transform active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Nexus<span className="text-cyan-400">Arcade</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => { onExitGame(); onSelectCategory('All'); }}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              !activeGame && activeCategory === 'All' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => { onExitGame(); onSelectCategory('Arcade'); }}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              !activeGame && activeCategory === 'Arcade' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => { onExitGame(); onSelectCategory('Puzzle'); }}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              !activeGame && activeCategory === 'Puzzle' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Puzzles
          </button>
          <button
            onClick={() => { onExitGame(); onSelectCategory('Favorites'); }}
            className={`whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 ${
              !activeGame && activeCategory === 'Favorites' ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Favorites ({favoritesCount})
          </button>
          <button
            onClick={onOpenJsonModal}
            className="whitespace-nowrap transition-colors text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 font-mono text-xs"
          >
            <Code className="w-3.5 h-3.5" />
            games.json
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCloakModal}
            title="Tab Cloaker & Panic Key settings"
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Tab Cloak</span>
          </button>

          <button
            onClick={onTriggerPanic}
            title="Instant Panic Screen (or press ` ~)"
            className="px-2.5 py-1.5 text-xs font-mono font-medium text-amber-400 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-700/50 rounded-lg transition-colors whitespace-nowrap"
          >
            Panic [~]
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm shadow-cyan-600/30 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Game</span>
          </button>
        </div>
      </div>
    </header>
  );
}
