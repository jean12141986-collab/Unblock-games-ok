/**
 * Nexus Arcade - Unblocked Games Web Portal
 * Storing each game as an iframe in games.json
 */

// Fallback games dataset if fetch fails or running offline / file://
const DEFAULT_GAMES = [
  {
    id: "neon-tetris",
    title: "Neon Tetris",
    category: "Puzzle",
    description: "Stack falling tetrominoes, clear lines, and pull off cascading line combos before the board fills up.",
    iframeUrl: "./games/tetris.html",
    thumbnail: "./images/arcade_cyber_puzzle_1791844347103.jpg",
    accentColor: "#06b6d4",
    instructions: "Rotate and position falling blocks into solid horizontal rows. Clearing multiple rows triggers combo multipliers and level advancement.",
    controls: [
      { key: "← / →", action: "Shift Left / Right" },
      { key: "↑", action: "Rotate Tetromino" },
      { key: "↓", action: "Soft Drop" },
      { key: "Space", action: "Hard Drop (Instant)" },
      { key: "C / Shift", action: "Hold Piece" },
      { key: "P", action: "Pause Game" }
    ],
    rating: 4.9,
    plays: 48200,
    tags: ["Blocks", "Retro", "Combos", "Classic"],
    featured: true
  },
  {
    id: "cyber-flappy",
    title: "Cyber Flappy",
    category: "Arcade",
    description: "Pilot your neon drone through treacherous energy pillars in this high-intensity reflex challenge.",
    iframeUrl: "./games/flappy.html",
    thumbnail: "./images/arcade_retro_runner_1791844347059.jpg",
    accentColor: "#10b981",
    instructions: "Tap or press Space to pulse your thrusters. Precise timing and steady rhythm are required to navigate the narrow gaps.",
    controls: [
      { key: "Space", action: "Pulse Thruster / Flap" },
      { key: "Left Click", action: "Pulse Thruster / Flap" },
      { key: "Touch", action: "Tap to Fly" }
    ],
    rating: 4.8,
    plays: 62400,
    tags: ["Endless", "Arcade", "One-Button", "Skill"],
    featured: true
  },
  {
    id: "retro-snake",
    title: "Retro Snake",
    category: "Classic",
    description: "Slither through the cyber grid consuming energy orbs and gold cores without biting your own tail.",
    iframeUrl: "./games/snake.html",
    thumbnail: "./images/arcade_hero_banner_1791844346359.jpg",
    accentColor: "#22c55e",
    instructions: "Guide the snake toward red power nodes. Collect glowing yellow super-nodes before they vanish for massive bonus points.",
    controls: [
      { key: "Arrow Keys", action: "Turn Snake" },
      { key: "W / A / S / D", action: "Alternative Steering" },
      { key: "Space", action: "Restart Run" }
    ],
    rating: 4.9,
    plays: 39100,
    tags: ["Grid", "Snake", "Nostalgia", "Retro"],
    featured: false
  },
  {
    id: "cyber-2048",
    title: "Cyber 2048",
    category: "Puzzle",
    description: "Slide and merge equivalent numbered tiles across the 4x4 matrix to unlock the fabled 2048 neon block.",
    iframeUrl: "./games/2048.html",
    thumbnail: "./images/arcade_cyber_puzzle_1791844347103.jpg",
    accentColor: "#ec4899",
    instructions: "Slide in four directions to shift all tiles. Matching tiles collapse into their sum. Plan ahead to avoid grid lockups.",
    controls: [
      { key: "Arrow Keys", action: "Slide Tiles" },
      { key: "Swipe", action: "Mobile Gesture Slide" },
      { key: "Undo Button", action: "Revert Last Move" }
    ],
    rating: 4.9,
    plays: 54300,
    tags: ["Math", "Strategy", "Brain", "Puzzle"],
    featured: true
  },
  {
    id: "galaxy-invaders",
    title: "Galaxy Invaders",
    category: "Action",
    description: "Defend the sector against descending alien armadas, dodge plasma bombs, and wipe out enemy fleets.",
    iframeUrl: "./games/space-invaders.html",
    thumbnail: "./images/arcade_pixel_space_1791844348057.jpg",
    accentColor: "#38bdf8",
    instructions: "Maneuver your starfighter horizontally and fire dual lasers. Clear all invaders in each wave to advance to faster sectors.",
    controls: [
      { key: "← / →", action: "Move Starfighter" },
      { key: "A / D", action: "Alternative Move" },
      { key: "Space", action: "Fire Laser Blaster" }
    ],
    rating: 4.7,
    plays: 31800,
    tags: ["Shooter", "Retro", "Space", "Arcade"],
    featured: true
  },
  {
    id: "cyber-pong",
    title: "Cyber Pong",
    category: "Arcade",
    description: "High-velocity table tennis showdown. Compete head-to-head against intelligent bot AI or a friend.",
    iframeUrl: "./games/pong.html",
    thumbnail: "./images/arcade_hero_banner_1791844346359.jpg",
    accentColor: "#0ea5e9",
    instructions: "Deflect the ball past your opponent paddle. Angle your hits using paddle edges for deceptive spin and extreme speed. First to 7 wins.",
    controls: [
      { key: "Mouse / W, S", action: "Player 1 Paddle" },
      { key: "↑ / ↓", action: "Player 2 Paddle" },
      { key: "Mode Toggle", action: "Switch 1P vs 2P" }
    ],
    rating: 4.6,
    plays: 22400,
    tags: ["2 Player", "Arcade", "Table Tennis", "Versus"],
    featured: false
  },
  {
    id: "neon-breakout",
    title: "Neon Breakout",
    category: "Arcade",
    description: "Smash multi-tiered neon energy bricks with precision ball rebounds and paddle trajectory control.",
    iframeUrl: "./games/breakout.html",
    thumbnail: "./images/arcade_retro_runner_1791844347059.jpg",
    accentColor: "#f43f5e",
    instructions: "Keep the ball airborne by steering your paddle. Destroy all bricks to achieve board clear bonus points.",
    controls: [
      { key: "Mouse Move", action: "Move Paddle" },
      { key: "← / →", action: "Move Paddle" },
      { key: "Space / Click", action: "Launch Ball" }
    ],
    rating: 4.7,
    plays: 28900,
    tags: ["Brick Breaker", "Retro", "Paddle", "Arcade"],
    featured: false
  },
  {
    id: "cyber-runner",
    title: "Cyber Runner",
    category: "Casual",
    description: "Speed across digital badlands, vaulting over spiky barriers and ducking under airborne drones.",
    iframeUrl: "./games/dino.html",
    thumbnail: "./images/arcade_retro_runner_1791844347059.jpg",
    accentColor: "#06b6d4",
    instructions: "Jump over ground cacti and duck under incoming flying hazards. Game velocity escalates steadily over time.",
    controls: [
      { key: "Space / ↑", action: "Jump" },
      { key: "↓", action: "Duck / Crouch" },
      { key: "Click", action: "Jump" }
    ],
    rating: 4.8,
    plays: 44100,
    tags: ["Runner", "Dino", "Endless", "Speed"],
    featured: false
  },
  {
    id: "cyber-sweeper",
    title: "Cyber Sweeper",
    category: "Puzzle",
    description: "Logic-based tactical mine clearance. Use proximity numerical clues to disarm hidden explosives.",
    iframeUrl: "./games/minesweeper.html",
    thumbnail: "./images/arcade_cyber_puzzle_1791844347103.jpg",
    accentColor: "#f59e0b",
    instructions: "Left-click uncovers cells. Numbers reveal adjacent mine counts. Right-click flags suspected mines. Clear all safe cells to win.",
    controls: [
      { key: "Left Click", action: "Reveal Sector" },
      { key: "Right Click", action: "Flag Mine" },
      { key: "Smiley Click", action: "New Board" }
    ],
    rating: 4.6,
    plays: 19500,
    tags: ["Logic", "Mines", "Brain", "Classic"],
    featured: false
  },
  {
    id: "cyber-connect-4",
    title: "Cyber 4 in a Row",
    category: "Strategy",
    description: "Drop discs into vertical columns to form an uninterrupted line of four colored tokens before your rival.",
    iframeUrl: "./games/connect4.html",
    thumbnail: "./images/arcade_hero_banner_1791844346359.jpg",
    accentColor: "#38bdf8",
    instructions: "Click any column to drop your chip. Connect 4 horizontally, vertically, or diagonally. Choose between AI solo play or 2P couch play.",
    controls: [
      { key: "Click Column", action: "Drop Disc" },
      { key: "Mode Button", action: "1P AI vs 2P Pass & Play" }
    ],
    rating: 4.8,
    plays: 26700,
    tags: ["Board", "Connect 4", "Strategy", "Versus"],
    featured: false
  }
];

const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nexus Arcade (Default)',
    title: 'Nexus Arcade - Unblocked Games',
    favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'><polygon points='5 3 19 12 5 21 5 3'/></svg>"
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Portal:Current events - Wikipedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas LMS',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  }
];

// App State
let state = {
  games: [...DEFAULT_GAMES],
  activeGame: null,
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'popular',
  favorites: JSON.parse(localStorage.getItem('nexus_favorites') || '["neon-tetris","cyber-flappy","cyber-2048"]'),
  activeCloak: 'default',
  isPanic: false,
  isJsonModalOpen: false,
  isAddModalOpen: false,
  isCloakModalOpen: false,
  isTheater: false,
  likes: 142,
  hasLiked: false
};

// Load custom games from localStorage
try {
  const saved = localStorage.getItem('nexus_custom_games');
  if (saved) {
    const custom = JSON.parse(saved);
    state.games = [...DEFAULT_GAMES, ...custom];
  }
} catch (e) {}

// Try to fetch games.json dynamically
async function loadGamesJson() {
  try {
    const res = await fetch('./games.json');
    if (res.ok) {
      const data = await res.json();
      const custom = JSON.parse(localStorage.getItem('nexus_custom_games') || '[]');
      state.games = [...data, ...custom];
      render();
    }
  } catch (e) {
    // If fetch fails (e.g. file:// protocol), state already has DEFAULT_GAMES!
  }
}

// Helpers
function saveFavorites() {
  try {
    localStorage.setItem('nexus_favorites', JSON.stringify(state.favorites));
  } catch(e) {}
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(x => x !== id);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  render();
}

function applyCloak(id) {
  state.activeCloak = id;
  const p = CLOAK_PRESETS.find(x => x.id === id) || CLOAK_PRESETS[0];
  document.title = p.title;
  const fav = document.getElementById('favicon-link');
  if (fav) fav.href = p.favicon;
  render();
}

function openBlankTab(game) {
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
      iframe.src = game.iframeUrl;
      doc.body.style.margin = '0';
      doc.body.style.overflow = 'hidden';
      doc.body.appendChild(iframe);
    }
  } catch(e) {
    window.open(game.iframeUrl, '_blank');
  }
}

// Global hotkeys
window.addEventListener('keydown', (e) => {
  if (e.key === '`' || e.key === '~') {
    state.isPanic = !state.isPanic;
    render();
  } else if (e.key === 'Escape' && state.isPanic) {
    state.isPanic = false;
    render();
  }
});

// Render Root
function render() {
  const root = document.getElementById('app');
  if (!root) return;

  // 1. Panic Screen
  if (state.isPanic) {
    root.innerHTML = renderPanicScreen();
    bindPanicEvents();
    return;
  }

  // Filtered games
  let list = state.games.filter(g => {
    if (state.selectedCategory === 'Favorites') {
      if (!state.favorites.includes(g.id)) return false;
    } else if (state.selectedCategory !== 'All') {
      if (g.category.toLowerCase() !== state.selectedCategory.toLowerCase()) return false;
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchesTitle = g.title.toLowerCase().includes(q);
      const matchesCat = g.category.toLowerCase().includes(q);
      const matchesTag = g.tags && g.tags.some(t => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCat && !matchesTag) return false;
    }
    return true;
  });

  if (state.sortBy === 'popular') list.sort((a,b) => (b.plays || 0) - (a.plays || 0));
  else if (state.sortBy === 'rating') list.sort((a,b) => (b.rating || 0) - (a.rating || 0));
  else if (state.sortBy === 'az') list.sort((a,b) => a.title.localeCompare(b.title));

  const featured = state.games.find(g => g.featured) || state.games[0];

  root.innerHTML = `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderHeader()}
      <main class="flex-1">
        ${state.activeGame ? renderGamePlayer(state.activeGame) : renderCatalog(list, featured)}
      </main>
      ${renderFooter()}
      ${state.isJsonModalOpen ? renderJsonModal() : ''}
      ${state.isAddModalOpen ? renderAddModal() : ''}
      ${state.isCloakModalOpen ? renderCloakModal() : ''}
    </div>
  `;

  bindEvents();
}

function renderHeader() {
  return `
    <header class="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <!-- Zone 1: Wordmark -->
        <button id="btnBrand" class="flex items-center gap-2 text-left group">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 font-bold">
            🎮
          </div>
          <span class="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Nexus<span class="text-cyan-400">Arcade</span>
          </span>
        </button>

        <!-- Zone 2: Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button data-cat="All" class="nav-cat whitespace-nowrap transition-colors hover:text-white ${!state.activeGame && state.selectedCategory === 'All' ? 'text-cyan-400 font-semibold' : ''}">
            All Games
          </button>
          <button data-cat="Arcade" class="nav-cat whitespace-nowrap transition-colors hover:text-white ${!state.activeGame && state.selectedCategory === 'Arcade' ? 'text-cyan-400 font-semibold' : ''}">
            Arcade
          </button>
          <button data-cat="Puzzle" class="nav-cat whitespace-nowrap transition-colors hover:text-white ${!state.activeGame && state.selectedCategory === 'Puzzle' ? 'text-cyan-400 font-semibold' : ''}">
            Puzzles
          </button>
          <button data-cat="Favorites" class="nav-cat whitespace-nowrap transition-colors hover:text-white ${!state.activeGame && state.selectedCategory === 'Favorites' ? 'text-pink-400 font-semibold' : ''}">
            Favorites (${state.favorites.length})
          </button>
          <button id="btnOpenJsonNav" class="whitespace-nowrap transition-colors text-slate-400 hover:text-cyan-300 font-mono text-xs flex items-center gap-1">
            <span>{ }</span> games.json
          </button>
        </nav>

        <!-- Zone 3: Actions -->
        <div class="flex items-center gap-2.5 shrink-0">
          <button id="btnOpenCloak" title="Disguise browser tab" class="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5">
            <span>🛡️</span>
            <span class="hidden sm:inline">Tab Cloak</span>
          </button>
          <button id="btnPanic" title="Instant Panic Screen" class="px-2.5 py-1.5 text-xs font-mono font-medium text-amber-400 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-700/50 rounded-lg transition-colors">
            Panic [~]
          </button>
          <button id="btnOpenAdd" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm shadow-cyan-600/30">
            + Add Game
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderCatalog(list, featured) {
  const categories = ['All', 'Arcade', 'Puzzle', 'Action', 'Strategy', 'Classic', 'Casual', 'Favorites'];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      ${state.selectedCategory === 'All' && !state.searchQuery && featured ? `
        <!-- Hero Featured Card -->
        <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
            <div class="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between z-10">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                  <span class="text-cyan-400 font-semibold uppercase tracking-wider">Featured Unblocked Game</span>
                  <span>·</span>
                  <span>${featured.category}</span>
                  <span>·</span>
                  <span class="tabular-nums">${(featured.plays || 0).toLocaleString()} plays</span>
                </div>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">${featured.title}</h1>
                <p class="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">${featured.description}</p>
              </div>
              <div class="mt-8 flex flex-wrap items-center gap-4">
                <button data-play="${featured.id}" class="btn-play-game px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-400/20 flex items-center gap-2">
                  ▶ Play Now
                </button>
                <button id="btnInspectJsonHero" class="px-4 py-3 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors">
                  Inspect JSON Iframe
                </button>
              </div>
            </div>
            <div class="lg:col-span-6 relative min-h-[260px] lg:min-h-full">
              ${featured.thumbnail ? `<img src="${featured.thumbnail}" alt="${featured.title}" class="w-full h-full object-cover lg:absolute inset-0" />` : ''}
              <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Search & Filters -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="relative flex-1 max-w-md">
            <input
              id="searchInput"
              type="text"
              value="${state.searchQuery}"
              placeholder="Search games by title, category, or tag..."
              class="w-full pl-4 pr-16 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            ${state.searchQuery ? `<button id="btnClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white">Clear</button>` : ''}
          </div>

          <div class="flex items-center gap-1.5 text-xs text-slate-400 self-end sm:self-auto">
            <span>Sort:</span>
            <select id="sortSelect" class="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-500">
              <option value="popular" ${state.sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
              <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
              <option value="az" ${state.sortBy === 'az' ? 'selected' : ''}>A to Z</option>
            </select>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
          ${categories.map(cat => `
            <button
              data-cat="${cat}"
              class="cat-tab px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                state.selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }"
            >
              ${cat}${cat === 'Favorites' ? ` (${state.favorites.length})` : ''}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Games Grid -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">
            ${state.selectedCategory} Games
            <span class="text-xs font-normal text-slate-400 tabular-nums">(${list.length} available)</span>
          </h2>
        </div>

        ${list.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${list.map(game => renderCard(game)).join('')}
          </div>
        ` : `
          <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8 space-y-3">
            <div class="text-3xl">🕹️</div>
            <h3 class="text-base font-bold text-white">No games found</h3>
            <p class="text-xs text-slate-400">Try adjusting your query or add a custom iframe game to the database.</p>
            <button id="btnResetFilters" class="px-4 py-1.5 text-xs font-semibold text-cyan-400 hover:underline">Reset Filters</button>
          </div>
        `}
      </div>

      <!-- JSON Database Banner -->
      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 class="text-sm font-bold text-white">JSON Iframe Storage Architecture</h4>
          <p class="text-xs text-slate-400 mt-0.5">
            Every game is stored as an iframe inside <code class="text-cyan-300 font-mono">games.json</code>.
          </p>
        </div>
        <div class="flex items-center gap-2.5">
          <button id="btnBottomAdd" class="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            + Add Custom Game
          </button>
          <button id="btnBottomJson" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors">
            View Raw JSON
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCard(game) {
  const isFav = state.favorites.includes(game.id);
  return `
    <div
      data-card-id="${game.id}"
      class="game-card group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:shadow-cyan-950/30"
    >
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        ${game.thumbnail ? `
          <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onerror="this.style.display='none'" />
        ` : `
          <div class="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
            <span class="text-2xl">🕹️</span>
            <span class="text-xs uppercase mt-1 tracking-wider">${game.category}</span>
          </div>
        `}

        <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/50">
            ▶
          </div>
        </div>

        <button
          data-fav="${game.id}"
          title="${isFav ? 'Remove favorite' : 'Add to favorites'}"
          class="btn-fav absolute top-2.5 right-2.5 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-colors ${isFav ? 'bg-pink-500/90 text-white' : 'bg-slate-950/70 text-slate-400 hover:text-white'}"
        >
          ${isFav ? '❤️' : '🤍'}
        </button>

        ${game.isCustom ? `
          <span class="absolute top-2.5 left-2.5 text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-800/60">Custom</span>
        ` : ''}
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <span class="text-cyan-400">${game.category}</span>
            <span>·</span>
            <span class="tabular-nums">${(game.plays || 0).toLocaleString()} plays</span>
          </div>
          <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">${game.title}</h3>
          <p class="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">${game.description}</p>
        </div>
        <div class="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
            <span>⭐</span>
            <span>${game.rating ? game.rating.toFixed(1) : '5.0'}</span>
          </div>
          <span class="font-mono text-[11px] text-slate-500 truncate max-w-[130px]">iframe: ${game.iframeUrl.replace('./games/', '')}</span>
        </div>
      </div>
    </div>
  `;
}

function renderGamePlayer(game) {
  const isFav = state.favorites.includes(game.id);
  const related = state.games.filter(g => g.id !== game.id).slice(0, 4);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <!-- Player Top Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <button id="btnBackToCatalog" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-900">
          ← Back to Catalog
        </button>

        <div class="flex items-center gap-2">
          <button id="btnBlankTab" class="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5">
            <span>↗</span>
            <span class="hidden sm:inline">Open in Blank Tab</span>
          </button>
          <button id="btnTheaterToggle" class="px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${state.isTheater ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'}">
            ${state.isTheater ? 'Default View' : 'Theater View'}
          </button>
          <button id="btnReloadGame" title="Reload Game" class="p-2 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg">
            🔄
          </button>
          <button id="btnFullscreen" title="Fullscreen" class="p-2 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg">
            ⛶
          </button>
        </div>
      </div>

      <!-- Iframe Player -->
      <div id="playerContainer" class="mx-auto bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative transition-all duration-300 ${state.isTheater ? 'max-w-6xl w-full' : 'max-w-4xl w-full'}">
        <div class="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[480px]">
          <iframe
            id="gameIframe"
            src="${game.iframeUrl}"
            title="${game.title}"
            class="w-full h-full border-0 absolute inset-0 bg-slate-950"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          ></iframe>
        </div>
      </div>

      <!-- Details Bar -->
      <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div class="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
              <span class="text-cyan-400">${game.category}</span>
              <span>·</span>
              <span class="tabular-nums">${(game.plays || 0).toLocaleString()} plays</span>
              <span>·</span>
              <span class="font-mono text-slate-500">iframe: ${game.iframeUrl}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${game.title}</h1>
            <p class="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">${game.description}</p>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <button id="btnPlayerLike" class="px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${state.hasLiked ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-slate-800/80 border-slate-700 text-slate-300'}">
              👍 <span class="tabular-nums">${state.likes}</span>
            </button>
            <button id="btnPlayerFav" class="px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${isFav ? 'bg-pink-500/10 border-pink-500/40 text-pink-400' : 'bg-slate-800/80 border-slate-700 text-slate-300'}">
              ${isFav ? '❤️ Favorited' : '🤍 Favorite'}
            </button>
            <button id="btnPlayerShare" class="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300">
              🔗 Share
            </button>
          </div>
        </div>

        <!-- Instructions & Controls 2-column split -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div>
            <h3 class="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span>📖</span> How to Play
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">${game.instructions || 'Follow the onscreen guide to score points.'}</p>
            ${game.tags && game.tags.length ? `
              <div class="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                <span class="font-semibold text-slate-300">Tags: </span>${game.tags.join(' · ')}
              </div>
            ` : ''}
          </div>

          <div>
            <h3 class="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span>⌨️</span> Controls
            </h3>
            <div class="bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden divide-y divide-slate-800/60">
              ${(game.controls || []).map(c => `
                <div class="flex items-center justify-between px-3.5 py-2 text-xs">
                  <kbd class="px-2 py-0.5 bg-slate-900 border border-slate-700 text-cyan-300 rounded font-mono font-semibold">${c.key}</kbd>
                  <span class="text-slate-300 font-medium">${c.action}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Related Games -->
      <div class="space-y-4 pt-4">
        <h2 class="text-xl font-bold text-white">More Games</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${related.map(r => `
            <div data-play="${r.id}" class="btn-play-game group bg-slate-900/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 p-3 flex items-center gap-3 cursor-pointer transition-all hover:bg-slate-900">
              <div class="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                ${r.thumbnail ? `<img src="${r.thumbnail}" alt="" class="w-full h-full object-cover" />` : ''}
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-sm font-bold text-white group-hover:text-cyan-300 truncate">${r.title}</h4>
                <div class="text-[11px] text-slate-400 truncate">${r.category} · ${(r.plays || 0).toLocaleString()} plays</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="border-t border-slate-800 bg-slate-950 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div>Nexus Arcade · Fast, self-contained unblocked games portal loaded via JSON iframes.</div>
        <div class="flex items-center gap-4">
          <button id="btnFooterCloak" class="hover:text-slate-300">Tab Cloaker</button>
          <span>·</span>
          <button id="btnFooterJson" class="hover:text-slate-300">games.json</button>
          <span>·</span>
          <button id="btnFooterPanic" class="hover:text-amber-400">Panic Key [~]</button>
        </div>
      </div>
    </footer>
  `;
}

function renderPanicScreen() {
  return `
    <div class="fixed inset-0 z-[100] bg-white text-slate-900 font-serif overflow-y-auto selection:bg-blue-100 p-8 sm:p-16">
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between border-b border-slate-200 pb-4 font-sans">
          <div class="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <span>📄</span>
            <span>Google Docs · Saved to Drive</span>
          </div>
          <button id="btnDismissPanic" class="text-xs text-slate-500 hover:text-slate-700 font-sans border border-slate-300 px-3 py-1.5 rounded">
            ← Return to App
          </button>
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-slate-900 pt-4">
          Unit 5: The Industrial Revolution and Technological Diffusion (1750–1900)
        </h1>
        <p class="text-sm font-sans text-slate-500">Last edited 3 minutes ago · Prepared for Independent Study Examination</p>

        <section class="space-y-4 text-base leading-relaxed text-slate-800">
          <h2 class="text-xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-1">
            1. Causes and Initial Catalysts in Great Britain
          </h2>
          <p>
            The transition from agrarian handicraft economies to machine-driven industrial production began in Great Britain during the mid-18th century. Several interconnected factors facilitated this unprecedented economic transformation:
          </p>
          <ul class="list-disc list-inside space-y-2 pl-4">
            <li><strong>Geographic Endowment:</strong> Proximity to abundant accessible coal and iron ore reserves in northern England, alongside navigable rivers and canal networks.</li>
            <li><strong>Agricultural Improvements:</strong> Enclosure movements and crop rotation techniques improved caloric yield and created an urban labor surplus.</li>
            <li><strong>Capital Accumulation:</strong> Commercial wealth accrued via maritime trade networks provided investment liquidity for infrastructure and manufacturing.</li>
          </ul>

          <h2 class="text-xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-1 pt-4">
            2. Technological Innovations
          </h2>
          <p>
            The mechanization of textile spinning and weaving, particularly James Hargreaves' spinning jenny and Richard Arkwright's water frame, dramatically accelerated production speeds. Subsequent adaptations of James Watt's condenser steam engine decoupled manufacturing centers from riparian riverbeds.
          </p>
        </section>

        <div class="pt-10 text-xs font-sans text-slate-400 border-t border-slate-200 flex justify-between items-center">
          <span>Page 1 of 4</span>
          <span>Click "Return to App" or press Escape to resume</span>
        </div>
      </div>
    </div>
  `;
}

function renderJsonModal() {
  const jsonStr = JSON.stringify(state.games, null, 2);
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 class="text-base font-bold text-white">games.json Database</h3>
            <p class="text-xs text-slate-400">Stores all ${state.games.length} games and their iframe configurations</p>
          </div>
          <button id="btnCloseJsonModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 font-mono text-xs">
          <pre id="jsonPreBlock" class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 leading-relaxed overflow-x-auto">${jsonStr}</pre>
        </div>
        <div class="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button id="btnResetDefaultGames" class="text-xs text-slate-400 hover:text-amber-400">Reset to Defaults</button>
          <div class="flex items-center gap-2">
            <button id="btnCopyJson" class="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg">Copy JSON</button>
            <button id="btnDownloadJson" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg">Download games.json</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAddModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 class="text-base font-bold text-white">Add Game to JSON</h3>
            <p class="text-xs text-slate-400">Embed any HTML5 game URL or iframe page</p>
          </div>
          <button id="btnCloseAddModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>

        <form id="addGameForm" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Game Title *</label>
            <input id="inputTitle" type="text" required placeholder="e.g. Neon Drift Racer" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select id="selectCat" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500">
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Strategy">Strategy</option>
                <option value="Classic">Classic</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Iframe URL *</label>
              <input id="inputIframe" type="text" required placeholder="./games/... or https://..." class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea id="inputDesc" rows="2" placeholder="Brief game summary..." class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Main Key</label>
              <input id="inputKey" type="text" placeholder="e.g. Space / Arrows" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Key Action</label>
              <input id="inputAction" type="text" placeholder="e.g. Jump / Slither" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>

          <div class="pt-2 flex justify-end gap-2.5">
            <button type="button" id="btnCancelAdd" class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg">Save Game</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderCloakModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 class="text-base font-bold text-white">Tab Disguise & Cloaker</h3>
            <p class="text-xs text-slate-400">Change browser tab title and favicon in real time</p>
          </div>
          <button id="btnCloseCloakModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>
        <div class="p-6 space-y-3">
          ${CLOAK_PRESETS.map(p => `
            <button
              data-cloak="${p.id}"
              class="btn-select-cloak w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${state.activeCloak === p.id ? 'bg-emerald-950/40 border-emerald-500/80 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'}"
            >
              <div class="flex items-center gap-2.5">
                <img src="${p.favicon}" alt="" class="w-4 h-4 object-contain rounded-sm" onerror="this.style.display='none'" />
                <div>
                  <div class="font-semibold">${p.name}</div>
                  <div class="text-[11px] text-slate-400 truncate max-w-[240px]">${p.title}</div>
                </div>
              </div>
              ${state.activeCloak === p.id ? '<span>✓</span>' : ''}
            </button>
          `).join('')}
        </div>
        <div class="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button id="btnCloseCloakFooter" class="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg">Done</button>
        </div>
      </div>
    </div>
  `;
}

// Event Bindings
function bindEvents() {
  // Brand
  document.getElementById('btnBrand')?.addEventListener('click', () => {
    state.activeGame = null;
    state.selectedCategory = 'All';
    render();
  });

  // Nav categories
  document.querySelectorAll('.nav-cat, .cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeGame = null;
      state.selectedCategory = btn.dataset.cat;
      render();
    });
  });

  // Search input
  const searchInp = document.getElementById('searchInput');
  if (searchInp) {
    searchInp.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      render();
    });
  }
  document.getElementById('btnClearSearch')?.addEventListener('click', () => {
    state.searchQuery = '';
    render();
  });
  document.getElementById('btnResetFilters')?.addEventListener('click', () => {
    state.searchQuery = '';
    state.selectedCategory = 'All';
    render();
  });

  // Sort
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    render();
  });

  // Cards
  document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-fav')) return;
      const id = card.dataset.cardId;
      const g = state.games.find(x => x.id === id);
      if (g) {
        state.activeGame = g;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });

  // Play buttons
  document.querySelectorAll('.btn-play-game').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.play;
      const g = state.games.find(x => x.id === id);
      if (g) {
        state.activeGame = g;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });

  // Favorite buttons
  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
    });
  });

  // Modals Open
  const openJson = () => { state.isJsonModalOpen = true; render(); };
  const openAdd = () => { state.isAddModalOpen = true; render(); };
  const openCloak = () => { state.isCloakModalOpen = true; render(); };

  document.getElementById('btnOpenJsonNav')?.addEventListener('click', openJson);
  document.getElementById('btnInspectJsonHero')?.addEventListener('click', openJson);
  document.getElementById('btnBottomJson')?.addEventListener('click', openJson);
  document.getElementById('btnFooterJson')?.addEventListener('click', openJson);

  document.getElementById('btnOpenAdd')?.addEventListener('click', openAdd);
  document.getElementById('btnBottomAdd')?.addEventListener('click', openAdd);

  document.getElementById('btnOpenCloak')?.addEventListener('click', openCloak);
  document.getElementById('btnFooterCloak')?.addEventListener('click', openCloak);

  document.getElementById('btnPanic')?.addEventListener('click', () => { state.isPanic = true; render(); });
  document.getElementById('btnFooterPanic')?.addEventListener('click', () => { state.isPanic = true; render(); });

  // Player controls
  document.getElementById('btnBackToCatalog')?.addEventListener('click', () => {
    state.activeGame = null;
    render();
  });
  document.getElementById('btnBlankTab')?.addEventListener('click', () => {
    if (state.activeGame) openBlankTab(state.activeGame);
  });
  document.getElementById('btnTheaterToggle')?.addEventListener('click', () => {
    state.isTheater = !state.isTheater;
    render();
  });
  document.getElementById('btnReloadGame')?.addEventListener('click', () => {
    const ifr = document.getElementById('gameIframe');
    if (ifr) ifr.src = ifr.src;
  });
  document.getElementById('btnFullscreen')?.addEventListener('click', () => {
    const c = document.getElementById('playerContainer');
    if (c) {
      if (document.fullscreenElement) document.exitFullscreen();
      else c.requestFullscreen().catch(() => {});
    }
  });
  document.getElementById('btnPlayerFav')?.addEventListener('click', () => {
    if (state.activeGame) toggleFavorite(state.activeGame.id);
  });
  document.getElementById('btnPlayerLike')?.addEventListener('click', () => {
    if (!state.hasLiked) {
      state.likes++;
      state.hasLiked = true;
    } else {
      state.likes--;
      state.hasLiked = false;
    }
    render();
  });
  document.getElementById('btnPlayerShare')?.addEventListener('click', (e) => {
    navigator.clipboard.writeText(window.location.href);
    e.target.innerText = '✓ Copied';
    setTimeout(() => { e.target.innerText = '🔗 Share'; }, 2000);
  });

  // Modal Closures & Forms
  document.getElementById('btnCloseJsonModal')?.addEventListener('click', () => { state.isJsonModalOpen = false; render(); });
  document.getElementById('btnCopyJson')?.addEventListener('click', (e) => {
    navigator.clipboard.writeText(JSON.stringify(state.games, null, 2));
    e.target.innerText = '✓ Copied';
    setTimeout(() => { e.target.innerText = 'Copy JSON'; }, 2000);
  });
  document.getElementById('btnDownloadJson')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.games, null, 2)], { type: 'application/json' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(u);
  });
  document.getElementById('btnResetDefaultGames')?.addEventListener('click', () => {
    localStorage.removeItem('nexus_custom_games');
    state.games = [...DEFAULT_GAMES];
    state.isJsonModalOpen = false;
    render();
  });

  document.getElementById('btnCloseAddModal')?.addEventListener('click', () => { state.isAddModalOpen = false; render(); });
  document.getElementById('btnCancelAdd')?.addEventListener('click', () => { state.isAddModalOpen = false; render(); });

  const addForm = document.getElementById('addGameForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('inputTitle').value.trim();
      const iframeUrl = document.getElementById('inputIframe').value.trim();
      if (!title || !iframeUrl) return;

      const newG = {
        id: 'custom-' + Date.now(),
        title,
        category: document.getElementById('selectCat').value,
        description: document.getElementById('inputDesc').value.trim() || 'Custom game loaded via iframe.',
        iframeUrl,
        instructions: 'Use mouse and keyboard to play.',
        controls: [{
          key: document.getElementById('inputKey').value.trim() || 'Standard Keys',
          action: document.getElementById('inputAction').value.trim() || 'Play'
        }],
        rating: 5.0,
        plays: 1,
        tags: ['Custom'],
        isCustom: true
      };

      state.games.unshift(newG);
      try {
        const customOnly = state.games.filter(g => g.isCustom);
        localStorage.setItem('nexus_custom_games', JSON.stringify(customOnly));
      } catch (err) {}

      state.isAddModalOpen = false;
      state.activeGame = newG;
      render();
    });
  }

  document.getElementById('btnCloseCloakModal')?.addEventListener('click', () => { state.isCloakModalOpen = false; render(); });
  document.getElementById('btnCloseCloakFooter')?.addEventListener('click', () => { state.isCloakModalOpen = false; render(); });
  document.querySelectorAll('.btn-select-cloak').forEach(btn => {
    btn.addEventListener('click', () => {
      applyCloak(btn.dataset.cloak);
    });
  });
}

function bindPanicEvents() {
  document.getElementById('btnDismissPanic')?.addEventListener('click', () => {
    state.isPanic = false;
    render();
  });
}

// Initial Launch
render();
loadGamesJson();
