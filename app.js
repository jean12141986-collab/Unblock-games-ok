/**
 * Ch1llZ3ne / Chill Zone - Unblocked Entertainment Hub
 * Games, Movies, TV Shows, Anime & Proxies loaded via iframe JSON catalog
 * Stored as pure JavaScript, runs directly on GitHub Pages and static servers
 */

// Fallback datasets
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

const DEFAULT_MEDIA = [
  {
    id: "movie-spiderman-spiderverse",
    title: "Spider-Man: Into the Spider-Verse",
    type: "movie",
    category: "Animation / Action",
    year: 2018,
    rating: 8.4,
    duration: "1h 57m",
    poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    description: "Teen Miles Morales becomes the new Spider-Man and joins five other spider-heroes from alternate universes to stop a reality-shattering threat.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/g4Hbz2jLxvQ",
    servers: [
      { name: "Server 1 (Trailer / Preview)", url: "https://www.youtube-nocookie.com/embed/g4Hbz2jLxvQ" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/movie/324857" },
      { name: "Server 3 (SuperEmbed)", url: "https://multiembed.mov/?video_id=324857&tmdb=1" }
    ],
    featured: true
  },
  {
    id: "movie-interstellar",
    title: "Interstellar",
    type: "movie",
    category: "Sci-Fi / Drama",
    year: 2014,
    rating: 8.7,
    duration: "2h 49m",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces catastrophic famine.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/zSWdZVtXT7E",
    servers: [
      { name: "Server 1 (Trailer / Preview)", url: "https://www.youtube-nocookie.com/embed/zSWdZVtXT7E" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/movie/157336" },
      { name: "Server 3 (SuperEmbed)", url: "https://multiembed.mov/?video_id=157336&tmdb=1" }
    ],
    featured: true
  },
  {
    id: "movie-tears-of-steel",
    title: "Tears of Steel (Open Movie)",
    type: "movie",
    category: "Sci-Fi / Action",
    year: 2012,
    rating: 7.3,
    duration: "12m",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Tears_of_Steel_poster.jpg/440px-Tears_of_Steel_poster.jpg",
    description: "In a dystopian future Amsterdam, scientists and freedom fighters battle rogue AI biomechanical automatons to protect mankind.",
    iframeUrl: "https://archive.org/embed/Tears-of-Steel",
    servers: [
      { name: "Server 1 (Archive Full Stream)", url: "https://archive.org/embed/Tears-of-Steel" },
      { name: "Server 2 (YouTube Stream)", url: "https://www.youtube-nocookie.com/embed/R6MlUcmOul8" }
    ],
    featured: false
  },
  {
    id: "movie-big-buck-bunny",
    title: "Big Buck Bunny (Full Movie)",
    type: "movie",
    category: "Animation / Comedy",
    year: 2008,
    rating: 7.8,
    duration: "10m",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/440px-Big_buck_bunny_poster_big.jpg",
    description: "A large and peaceful rabbit exacts humorous, clever vengeance upon bully rodents in the forest.",
    iframeUrl: "https://archive.org/embed/BigBuckBunny_124",
    servers: [
      { name: "Server 1 (Archive 4K Stream)", url: "https://archive.org/embed/BigBuckBunny_124" },
      { name: "Server 2 (YouTube Stream)", url: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ" }
    ],
    featured: false
  },
  {
    id: "movie-sintel",
    title: "Sintel: The Dragon Quest",
    type: "movie",
    category: "Fantasy / Adventure",
    year: 2010,
    rating: 7.7,
    duration: "15m",
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sintel_poster.jpg/440px-Sintel_poster.jpg",
    description: "A determined girl befriends and protects a baby dragon, setting out on a dangerous journey across the world when it is captured.",
    iframeUrl: "https://archive.org/embed/Sintel",
    servers: [
      { name: "Server 1 (Archive Full Stream)", url: "https://archive.org/embed/Sintel" },
      { name: "Server 2 (YouTube Stream)", url: "https://www.youtube-nocookie.com/embed/eRsGyueVLvQ" }
    ],
    featured: false
  },
  {
    id: "movie-dark-knight",
    title: "The Dark Knight",
    type: "movie",
    category: "Action / Crime",
    year: 2008,
    rating: 9.0,
    duration: "2h 32m",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/EXeTwQWrcwY",
    servers: [
      { name: "Server 1 (Trailer / Preview)", url: "https://www.youtube-nocookie.com/embed/EXeTwQWrcwY" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/movie/155" },
      { name: "Server 3 (SuperEmbed)", url: "https://multiembed.mov/?video_id=155&tmdb=1" }
    ],
    featured: false
  },
  {
    id: "tv-arcane",
    title: "Arcane: League of Legends",
    type: "tv",
    category: "Animation / Action",
    year: 2021,
    rating: 9.0,
    duration: "9 Episodes",
    poster: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn397rDit3YR4.jpg",
    description: "In the sister cities of Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/fXmAurh012s",
    episodes: [
      { season: 1, episode: 1, title: "Welcome to the Playground", url: "https://vidsrc.to/embed/tv/94605/1/1" },
      { season: 1, episode: 2, title: "Some Mysteries Are Better Left Unsolved", url: "https://vidsrc.to/embed/tv/94605/1/2" },
      { season: 1, episode: 3, title: "The Base Violence Necessary for Change", url: "https://vidsrc.to/embed/tv/94605/1/3" },
      { season: 1, episode: 4, title: "Happy Progress Day!", url: "https://vidsrc.to/embed/tv/94605/1/4" }
    ],
    servers: [
      { name: "Server 1 (Official Preview)", url: "https://www.youtube-nocookie.com/embed/fXmAurh012s" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/tv/94605" },
      { name: "Server 3 (SuperEmbed)", url: "https://multiembed.mov/?video_id=94605&tmdb=1" }
    ],
    featured: true
  },
  {
    id: "tv-adventure-time",
    title: "Adventure Time",
    type: "tv",
    category: "Animation / Adventure",
    year: 2010,
    rating: 8.6,
    duration: "10 Seasons",
    poster: "https://image.tmdb.org/t/p/w500/qk3eQjNsmF3Pj71d7dE54Jt8c3C.jpg",
    description: "A boy named Finn and his shape-shifting dog Jake embark on whimsical, surreal quests across the vibrant Land of Ooo.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/Vpnm_J0n4eI",
    episodes: [
      { season: 1, episode: 1, title: "Slumber Party Panic", url: "https://vidsrc.to/embed/tv/15260/1/1" },
      { season: 1, episode: 2, title: "Trouble in Lumpy Space", url: "https://vidsrc.to/embed/tv/15260/1/2" },
      { season: 1, episode: 3, title: "Prisoners of Love", url: "https://vidsrc.to/embed/tv/15260/1/3" }
    ],
    servers: [
      { name: "Server 1 (Preview)", url: "https://www.youtube-nocookie.com/embed/Vpnm_J0n4eI" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/tv/15260" }
    ],
    featured: false
  },
  {
    id: "anime-attack-on-titan",
    title: "Attack on Titan",
    type: "anime",
    category: "Anime / Dark Fantasy",
    year: 2013,
    rating: 9.1,
    duration: "4 Seasons",
    poster: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    description: "After human civilization is besieged behind colossal walls by man-eating titans, Eren Jaeger enlists in the Scout Regiment to reclaim humanity's freedom.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/MGRm4IzK1SQ",
    episodes: [
      { season: 1, episode: 1, title: "To You, in 2000 Years", url: "https://vidsrc.to/embed/tv/1429/1/1" },
      { season: 1, episode: 2, title: "That Day: The Fall of Shiganshina", url: "https://vidsrc.to/embed/tv/1429/1/2" },
      { season: 1, episode: 3, title: "A Dim Light Amid Despair", url: "https://vidsrc.to/embed/tv/1429/1/3" }
    ],
    servers: [
      { name: "Server 1 (Trailer / Preview)", url: "https://www.youtube-nocookie.com/embed/MGRm4IzK1SQ" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/tv/1429" }
    ],
    featured: true
  },
  {
    id: "anime-demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    type: "anime",
    category: "Anime / Supernatural",
    year: 2019,
    rating: 8.7,
    duration: "4 Seasons",
    poster: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH69hmVTuMwBRJwQI.jpg",
    description: "A kindhearted boy becomes a demon slayer after his family is slaughtered and his younger sister is turned into a demon.",
    iframeUrl: "https://www.youtube-nocookie.com/embed/VQGCKyvzIM4",
    episodes: [
      { season: 1, episode: 1, title: "Cruelty", url: "https://vidsrc.to/embed/tv/85937/1/1" },
      { season: 1, episode: 2, title: "Trainer Sakonji Urokodaki", url: "https://vidsrc.to/embed/tv/85937/1/2" },
      { season: 1, episode: 3, title: "Sabito and Makomo", url: "https://vidsrc.to/embed/tv/85937/1/3" }
    ],
    servers: [
      { name: "Server 1 (Trailer / Preview)", url: "https://www.youtube-nocookie.com/embed/VQGCKyvzIM4" },
      { name: "Server 2 (VidSrc Stream)", url: "https://vidsrc.to/embed/tv/85937" }
    ],
    featured: false
  }
];

const DEFAULT_PROXIES = [
  {
    name: "Ultraviolet Web Node",
    type: "UV Stealth Proxy",
    description: "High speed proxy engine for bypassing school firewalls and network filters.",
    url: "https://uv.student-portal.site/",
    speed: "Fast",
    status: "Online"
  },
  {
    name: "Rammerhead Browser",
    type: "Sandbox Browser",
    description: "Full remote browser session supporting tabs, WebSockets, and media streaming.",
    url: "https://browser.rammerhead.org/",
    speed: "Ultra",
    status: "Online"
  },
  {
    name: "CroxyProxy Streamer",
    type: "SSL Web Proxy",
    description: "Free unblocked SSL proxy optimized for video playback and web navigation.",
    url: "https://www.croxyproxy.com/",
    speed: "Fast",
    status: "Online"
  },
  {
    name: "Interstellar Proxy",
    type: "Modern Mirror",
    description: "Built-in tab cloak, games catalog, and private search proxy.",
    url: "https://gointerstellar.app/",
    speed: "Ultra",
    status: "Online"
  }
];

const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Ch1llZ3ne (Default)',
    title: 'Ch1llZ3ne - Games, Movies & TV',
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

// Master Application State
let state = {
  currentTab: 'movies', // 'games' | 'movies' | 'tv' | 'anime' | 'proxies'
  games: [...DEFAULT_GAMES],
  media: [...DEFAULT_MEDIA],
  proxies: [...DEFAULT_PROXIES],
  activeItem: null, // active playing game or media
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'popular',
  favorites: JSON.parse(localStorage.getItem('chill_favorites') || '["movie-spiderman-spiderverse","neon-tetris","tv-arcane"]'),
  activeCloak: 'default',
  isPanic: false,
  isTheater: false,
  isLightsOff: false,
  activeServerUrl: '',
  isJsonModalOpen: false,
  isAddModalOpen: false,
  isCloakModalOpen: false,
  likes: 184,
  hasLiked: false
};

// Load custom user additions from localStorage
try {
  const customG = JSON.parse(localStorage.getItem('chill_custom_games') || '[]');
  const customM = JSON.parse(localStorage.getItem('chill_custom_media') || '[]');
  state.games = [...DEFAULT_GAMES, ...customG];
  state.media = [...DEFAULT_MEDIA, ...customM];
} catch (e) {}

// Async load from json files
async function loadData() {
  try {
    const [resG, resM] = await Promise.all([
      fetch('./games.json').catch(() => null),
      fetch('./media.json').catch(() => null)
    ]);
    if (resG && resG.ok) {
      const gData = await resG.json();
      const customG = JSON.parse(localStorage.getItem('chill_custom_games') || '[]');
      state.games = [...gData, ...customG];
    }
    if (resM && resM.ok) {
      const mData = await resM.json();
      const customM = JSON.parse(localStorage.getItem('chill_custom_media') || '[]');
      state.media = [...mData, ...customM];
    }
    render();
  } catch (e) {}
}

function saveFavorites() {
  try {
    localStorage.setItem('chill_favorites', JSON.stringify(state.favorites));
  } catch (e) {}
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

function openBlankTab(url) {
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
      iframe.src = url;
      doc.body.style.margin = '0';
      doc.body.style.overflow = 'hidden';
      doc.body.appendChild(iframe);
    }
  } catch (e) {
    window.open(url, '_blank');
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

// Primary Render Engine
function render() {
  const root = document.getElementById('app');
  if (!root) return;

  if (state.isPanic) {
    root.innerHTML = renderPanicScreen();
    bindPanicEvents();
    return;
  }

  // Active playing view
  if (state.activeItem) {
    root.innerHTML = `
      <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${state.isLightsOff ? 'opacity-90' : ''}">
        ${renderHeader()}
        <main class="flex-1">
          ${state.activeItem.type ? renderMediaStreamPlayer(state.activeItem) : renderGamePlayer(state.activeItem)}
        </main>
        ${renderFooter()}
        ${state.isJsonModalOpen ? renderJsonModal() : ''}
        ${state.isAddModalOpen ? renderAddModal() : ''}
        ${state.isCloakModalOpen ? renderCloakModal() : ''}
      </div>
    `;
    bindEvents();
    return;
  }

  // Browse views
  let contentHtml = '';
  if (state.currentTab === 'proxies') {
    contentHtml = renderProxiesSection();
  } else if (state.currentTab === 'games') {
    contentHtml = renderGamesCatalog();
  } else {
    // Movies / TV / Anime
    contentHtml = renderMediaCatalog();
  }

  root.innerHTML = `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderHeader()}
      <main class="flex-1">
        ${contentHtml}
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
  const tabs = [
    { id: 'movies', label: '🎬 Mov!es' },
    { id: 'tv', label: '📺 TV Shows' },
    { id: 'anime', label: '⛩️ Anim3' },
    { id: 'games', label: '🎮 Gam3s' },
    { id: 'proxies', label: '🌐 Proxies' }
  ];

  return `
    <header class="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <!-- Logo -->
        <button id="btnBrandHome" class="flex items-center gap-2.5 text-left group">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold shadow-lg shadow-cyan-500/20">
            ❄️
          </div>
          <span class="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Ch1ll<span class="text-cyan-400">Z3ne</span>
          </span>
        </button>

        <!-- Main Media Nav Links -->
        <nav class="hidden md:flex items-center gap-2 text-xs font-semibold">
          ${tabs.map(t => `
            <button
              data-tab="${t.id}"
              class="nav-tab-btn px-3 py-1.5 rounded-lg transition-all ${
                state.currentTab === t.id && !state.activeItem
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }"
            >
              ${t.label}
            </button>
          `).join('')}
        </nav>

        <!-- Utilities -->
        <div class="flex items-center gap-2 shrink-0">
          <button id="btnOpenJsonNav" title="View JSON endpoints" class="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded-lg">
            <span>{ }</span> JSON
          </button>
          <button id="btnOpenCloak" title="Disguise browser tab" class="px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg flex items-center gap-1.5">
            <span>🛡️</span>
            <span class="hidden sm:inline">Cloak</span>
          </button>
          <button id="btnPanic" title="Instant Panic Screen" class="px-2.5 py-1.5 text-xs font-mono font-medium text-amber-400 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-700/50 rounded-lg">
            Panic [~]
          </button>
          <button id="btnOpenAdd" class="px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-400/30">
            + Add
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderMediaCatalog() {
  const currentType = state.currentTab; // 'movies', 'tv', 'anime'
  const filterType = currentType === 'movies' ? 'movie' : (currentType === 'tv' ? 'tv' : 'anime');
  
  let list = state.media.filter(m => m.type === filterType);

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(m => m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
  }

  const featured = list.find(m => m.featured) || list[0];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Media Hero Banner -->
      ${!state.searchQuery && featured ? `
        <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[360px]">
            <div class="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between z-10">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                  <span class="text-cyan-400 uppercase tracking-wider font-bold">Featured ${currentType.toUpperCase()}</span>
                  <span>·</span>
                  <span>${featured.year}</span>
                  <span>·</span>
                  <span class="text-amber-400 font-semibold">★ ${featured.rating}</span>
                  <span>·</span>
                  <span>${featured.duration}</span>
                </div>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">${featured.title}</h1>
                <p class="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">${featured.description}</p>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-3">
                <button data-media-play="${featured.id}" class="btn-play-media px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-400/20 flex items-center gap-2">
                  ▶ Watch Stream
                </button>
                <button data-fav="${featured.id}" class="btn-fav px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl">
                  ${state.favorites.includes(featured.id) ? '❤️ Favorited' : '🤍 Add to Watchlist'}
                </button>
              </div>
            </div>

            <div class="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
              <img src="${featured.banner || featured.poster}" alt="" class="w-full h-full object-cover lg:absolute inset-0" onerror="this.src='${featured.poster}'" />
              <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div class="relative flex-1 max-w-md">
          <input
            id="searchInput"
            type="text"
            value="${state.searchQuery}"
            placeholder="Search ${currentType} by title or genre..."
            class="w-full pl-4 pr-16 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          ${state.searchQuery ? `<button id="btnClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white">Clear</button>` : ''}
        </div>

        <div class="text-xs text-slate-400">
          <span>Showing <strong>${list.length}</strong> titles in ${currentType}</span>
        </div>
      </div>

      <!-- Poster Grid (3:4 aspect ratio) -->
      <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          ${list.map(item => `
            <div
              data-media-id="${item.id}"
              class="media-card group relative bg-slate-900 rounded-xl border border-slate-800 hover:border-cyan-500/60 overflow-hidden cursor-pointer flex flex-col transition-all hover:shadow-xl hover:shadow-cyan-950/40"
            >
              <div class="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src="${item.poster}"
                  alt="${item.title}"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onerror="this.src='./images/arcade_cyber_puzzle_1791844347103.jpg'"
                />
                <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div class="w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-400/50">
                    ▶
                  </div>
                </div>
                <div class="absolute top-2 right-2 bg-slate-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-400">
                  ★ ${item.rating}
                </div>
              </div>

              <div class="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    ${item.title}
                  </h3>
                  <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <span>${item.year}</span>
                    <span>·</span>
                    <span class="truncate">${item.category.split('/')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderMediaStreamPlayer(media) {
  const currentUrl = state.activeServerUrl || media.iframeUrl;
  const isFav = state.favorites.includes(media.id);
  const related = state.media.filter(m => m.id !== media.id && m.type === media.type).slice(0, 5);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- Player Nav -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <button id="btnBackCatalog" class="text-sm font-semibold text-slate-400 hover:text-white py-1.5 px-3 rounded-lg hover:bg-slate-900">
          ← Back to Catalog
        </button>

        <div class="flex items-center gap-2">
          <button id="btnLightsToggle" class="px-3 py-1.5 text-xs font-medium border rounded-lg ${state.isLightsOff ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300'}">
            💡 ${state.isLightsOff ? 'Lights On' : 'Lights Off'}
          </button>
          <button id="btnTheaterToggle" class="px-3 py-1.5 text-xs font-medium border rounded-lg ${state.isTheater ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'}">
            ${state.isTheater ? 'Default Size' : 'Theater View'}
          </button>
          <button id="btnBlankTabMedia" class="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
            ↗ Blank Tab
          </button>
          <button id="btnFullscreenPlayer" class="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
            ⛶
          </button>
        </div>
      </div>

      <!-- Iframe Video Stream Container -->
      <div id="mediaPlayerContainer" class="mx-auto bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative transition-all duration-300 ${state.isTheater ? 'max-w-6xl w-full' : 'max-w-4xl w-full'}">
        <div class="relative aspect-[16/9] w-full min-h-[440px] bg-black">
          <iframe
            id="streamIframe"
            src="${currentUrl}"
            title="${media.title}"
            class="w-full h-full border-0 absolute inset-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Stream Servers Switcher -->
      <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span>📡 Stream Servers:</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${(media.servers || []).map((srv, idx) => `
            <button
              data-server-url="${srv.url}"
              class="btn-switch-server px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
                currentUrl === srv.url
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }"
            >
              ${srv.name}
            </button>
          `).join('')}
          <button id="btnCustomServerUrl" class="px-3 py-1.5 text-xs rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white">
            + Custom Embed URL
          </button>
        </div>
      </div>

      <!-- TV Episodes Selector (for TV and Anime) -->
      ${media.episodes && media.episodes.length > 0 ? `
        <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📺</span> Select Episode
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            ${media.episodes.map(ep => `
              <button
                data-ep-url="${ep.url}"
                class="btn-select-ep p-2.5 rounded-lg border text-left text-xs transition-colors ${
                  currentUrl === ep.url
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }"
              >
                <div class="font-bold text-white">S${ep.season} : E${ep.episode}</div>
                <div class="text-[11px] text-slate-400 truncate mt-0.5">${ep.title}</div>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Media Synopsis & Metadata -->
      <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div class="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
              <span class="text-cyan-400">${media.category}</span>
              <span>·</span>
              <span>${media.year}</span>
              <span>·</span>
              <span class="text-amber-400 font-bold">★ ${media.rating}</span>
              <span>·</span>
              <span>${media.duration}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${media.title}</h1>
            <p class="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">${media.description}</p>
          </div>

          <div class="flex items-center gap-2.5 shrink-0">
            <button data-fav="${media.id}" class="btn-fav px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300">
              ${isFav ? '❤️ In Watchlist' : '🤍 Add to Watchlist'}
            </button>
            <button id="btnShareMedia" class="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300">
              🔗 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderGamesCatalog() {
  let list = state.games;
  if (state.selectedCategory !== 'All') {
    list = list.filter(g => g.category.toLowerCase() === state.selectedCategory.toLowerCase());
  }
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(g => g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q) || (g.tags && g.tags.some(t => t.toLowerCase().includes(q))));
  }

  const categories = ['All', 'Arcade', 'Puzzle', 'Action', 'Strategy', 'Classic', 'Casual'];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Search & Categories -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="relative flex-1 max-w-md">
            <input
              id="searchInput"
              type="text"
              value="${state.searchQuery}"
              placeholder="Search unblocked games..."
              class="w-full pl-4 pr-16 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            ${state.searchQuery ? `<button id="btnClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white">Clear</button>` : ''}
          </div>
        </div>

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
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${list.map(game => `
          <div
            data-game-id="${game.id}"
            class="game-card group relative bg-slate-900 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:shadow-cyan-950/30"
          >
            <div class="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onerror="this.src='./images/arcade_cyber_puzzle_1791844347103.jpg'" />
              <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/50">
                  ▶
                </div>
              </div>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
                  <span class="text-cyan-400">${game.category}</span>
                  <span>·</span>
                  <span class="tabular-nums">${(game.plays || 0).toLocaleString()} plays</span>
                </div>
                <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">${game.title}</h3>
                <p class="text-xs text-slate-400 mt-1.5 line-clamp-2">${game.description}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderGamePlayer(game) {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div class="flex items-center justify-between">
        <button id="btnBackCatalog" class="text-sm font-semibold text-slate-400 hover:text-white py-1.5 px-3 rounded-lg hover:bg-slate-900">
          ← Back to Catalog
        </button>
        <div class="flex items-center gap-2">
          <button id="btnBlankTabGame" class="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
            ↗ Blank Tab
          </button>
          <button id="btnFullscreenPlayer" class="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
            ⛶
          </button>
        </div>
      </div>

      <div id="mediaPlayerContainer" class="mx-auto bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative max-w-4xl w-full">
        <div class="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[480px]">
          <iframe
            src="${game.iframeUrl}"
            title="${game.title}"
            class="w-full h-full border-0 absolute inset-0 bg-slate-950"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          ></iframe>
        </div>
      </div>

      <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h1 class="text-2xl font-bold text-white">${game.title}</h1>
        <p class="text-sm text-slate-300 mt-2">${game.description}</p>
      </div>
    </div>
  `;
}

function renderProxiesSection() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-2xl font-extrabold text-white">Working Unblock Proxies & Mirrors</h1>
        <p class="text-xs text-slate-400 mt-1">Direct web node gateways to browse websites and bypass school network restrictions.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${state.proxies.map(p => `
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-colors">
            <div>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-white">${p.name}</h3>
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">${p.status}</span>
              </div>
              <div class="text-xs text-cyan-400 font-semibold mt-1">${p.type} · Speed: ${p.speed}</div>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">${p.description}</p>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5">
                Launch Proxy ↗
              </a>
              <button onclick="window.openBlankTab('${p.url}')" class="px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg">
                Open Stealth Tab
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="border-t border-slate-800 bg-slate-950 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div>Ch1llZ3ne · Unblocked Games, Movies, TV Shows & Proxies portal.</div>
        <div class="flex items-center gap-4">
          <button id="btnFooterCloak" class="hover:text-slate-300">Tab Cloaker</button>
          <span>·</span>
          <button id="btnFooterJson" class="hover:text-slate-300">JSON Database</button>
          <span>·</span>
          <button id="btnFooterPanic" class="hover:text-amber-400">Panic [~]</button>
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
            The transition from agrarian handicraft economies to machine-driven industrial production began in Great Britain during the mid-18th century. Several interconnected factors facilitated this unprecedented economic transformation.
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
  const combined = {
    games: state.games,
    media: state.media,
    proxies: state.proxies
  };
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 class="text-base font-bold text-white">Ch1llZ3ne JSON Databases</h3>
            <p class="text-xs text-slate-400">media.json & games.json iframe configurations</p>
          </div>
          <button id="btnCloseJsonModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 font-mono text-xs">
          <pre class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-cyan-300 leading-relaxed overflow-x-auto">${JSON.stringify(combined, null, 2)}</pre>
        </div>
        <div class="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end gap-2">
          <button id="btnCopyJson" class="px-4 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg">Copy JSON</button>
          <button id="btnCloseJsonFooter" class="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  `;
}

function renderAddModal() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <h3 class="text-base font-bold text-white">Add Custom Movie, Show, or Game</h3>
          <button id="btnCloseAddModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>

        <form id="addMediaForm" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Type</label>
            <select id="selectAddType" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500">
              <option value="movie">Movie</option>
              <option value="tv">TV Show</option>
              <option value="anime">Anime</option>
              <option value="game">Game</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
            <input id="inputAddTitle" type="text" required placeholder="e.g. Deadpool & Wolverine" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Iframe Stream / Game URL *</label>
            <input id="inputAddUrl" type="text" required placeholder="https://vidsrc.to/embed/... or https://..." class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Poster Image URL (Optional)</label>
            <input id="inputAddPoster" type="text" placeholder="https://..." class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Genre / Category</label>
            <input id="inputAddCat" type="text" placeholder="Action / Sci-Fi" class="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div class="pt-2 flex justify-end gap-2.5">
            <button type="button" id="btnCancelAdd" class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">Cancel</button>
            <button type="submit" class="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg">Save to Library</button>
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
            <p class="text-xs text-slate-400">Change browser tab title and favicon</p>
          </div>
          <button id="btnCloseCloakModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">✕</button>
        </div>
        <div class="p-6 space-y-3">
          ${CLOAK_PRESETS.map(p => `
            <button
              data-cloak="${p.id}"
              class="btn-select-cloak w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${state.activeCloak === p.id ? 'bg-cyan-950/40 border-cyan-500/80 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'}"
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
  document.getElementById('btnBrandHome')?.addEventListener('click', () => {
    state.activeItem = null;
    state.activeServerUrl = '';
    render();
  });

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentTab = btn.dataset.tab;
      state.activeItem = null;
      state.activeServerUrl = '';
      state.searchQuery = '';
      render();
    });
  });

  const sInp = document.getElementById('searchInput');
  if (sInp) {
    sInp.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      render();
    });
  }
  document.getElementById('btnClearSearch')?.addEventListener('click', () => {
    state.searchQuery = '';
    render();
  });

  document.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedCategory = btn.dataset.cat;
      render();
    });
  });

  // Media cards click
  document.querySelectorAll('.media-card, .btn-play-media').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.mediaId || el.dataset.mediaPlay;
      const item = state.media.find(m => m.id === id);
      if (item) {
        state.activeItem = item;
        state.activeServerUrl = item.iframeUrl;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });

  // Game cards click
  document.querySelectorAll('.game-card').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.gameId;
      const g = state.games.find(x => x.id === id);
      if (g) {
        state.activeItem = g;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });

  // Back to catalog
  document.getElementById('btnBackCatalog')?.addEventListener('click', () => {
    state.activeItem = null;
    state.activeServerUrl = '';
    render();
  });

  // Servers switcher
  document.querySelectorAll('.btn-switch-server').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeServerUrl = btn.dataset.serverUrl;
      const ifr = document.getElementById('streamIframe');
      if (ifr) ifr.src = state.activeServerUrl;
      render();
    });
  });

  // Episode switcher
  document.querySelectorAll('.btn-select-ep').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeServerUrl = btn.dataset.epUrl;
      const ifr = document.getElementById('streamIframe');
      if (ifr) ifr.src = state.activeServerUrl;
      render();
    });
  });

  // Custom server URL prompt
  document.getElementById('btnCustomServerUrl')?.addEventListener('click', () => {
    const custom = prompt('Enter custom video or embed URL:');
    if (custom && custom.trim()) {
      state.activeServerUrl = custom.trim();
      const ifr = document.getElementById('streamIframe');
      if (ifr) ifr.src = state.activeServerUrl;
      render();
    }
  });

  // Player utilities
  document.getElementById('btnLightsToggle')?.addEventListener('click', () => {
    state.isLightsOff = !state.isLightsOff;
    render();
  });
  document.getElementById('btnTheaterToggle')?.addEventListener('click', () => {
    state.isTheater = !state.isTheater;
    render();
  });
  document.getElementById('btnBlankTabMedia')?.addEventListener('click', () => {
    if (state.activeItem) openBlankTab(state.activeServerUrl || state.activeItem.iframeUrl);
  });
  document.getElementById('btnBlankTabGame')?.addEventListener('click', () => {
    if (state.activeItem) openBlankTab(state.activeItem.iframeUrl);
  });
  document.getElementById('btnFullscreenPlayer')?.addEventListener('click', () => {
    const c = document.getElementById('mediaPlayerContainer');
    if (c) {
      if (document.fullscreenElement) document.exitFullscreen();
      else c.requestFullscreen().catch(() => {});
    }
  });

  // Favorites
  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
    });
  });

  // Modals
  const openJ = () => { state.isJsonModalOpen = true; render(); };
  const openA = () => { state.isAddModalOpen = true; render(); };
  const openC = () => { state.isCloakModalOpen = true; render(); };

  document.getElementById('btnOpenJsonNav')?.addEventListener('click', openJ);
  document.getElementById('btnFooterJson')?.addEventListener('click', openJ);
  document.getElementById('btnOpenAdd')?.addEventListener('click', openA);
  document.getElementById('btnOpenCloak')?.addEventListener('click', openC);
  document.getElementById('btnFooterCloak')?.addEventListener('click', openC);

  document.getElementById('btnPanic')?.addEventListener('click', () => { state.isPanic = true; render(); });
  document.getElementById('btnFooterPanic')?.addEventListener('click', () => { state.isPanic = true; render(); });

  document.getElementById('btnCloseJsonModal')?.addEventListener('click', () => { state.isJsonModalOpen = false; render(); });
  document.getElementById('btnCloseJsonFooter')?.addEventListener('click', () => { state.isJsonModalOpen = false; render(); });
  document.getElementById('btnCopyJson')?.addEventListener('click', (e) => {
    navigator.clipboard.writeText(JSON.stringify({ games: state.games, media: state.media }, null, 2));
    e.target.innerText = '✓ Copied';
    setTimeout(() => { e.target.innerText = 'Copy JSON'; }, 2000);
  });

  document.getElementById('btnCloseAddModal')?.addEventListener('click', () => { state.isAddModalOpen = false; render(); });
  document.getElementById('btnCancelAdd')?.addEventListener('click', () => { state.isAddModalOpen = false; render(); });

  const addForm = document.getElementById('addMediaForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const addType = document.getElementById('selectAddType').value;
      const title = document.getElementById('inputAddTitle').value.trim();
      const url = document.getElementById('inputAddUrl').value.trim();
      const poster = document.getElementById('inputAddPoster').value.trim() || './images/arcade_cyber_puzzle_1791844347103.jpg';
      const cat = document.getElementById('inputAddCat').value.trim() || 'Entertainment';

      if (!title || !url) return;

      if (addType === 'game') {
        const newG = {
          id: 'custom-' + Date.now(),
          title,
          category: cat,
          description: 'Custom added unblocked game.',
          iframeUrl: url,
          thumbnail: poster,
          plays: 1,
          rating: 5.0,
          isCustom: true
        };
        state.games.unshift(newG);
        try {
          const customOnly = state.games.filter(g => g.isCustom);
          localStorage.setItem('chill_custom_games', JSON.stringify(customOnly));
        } catch(err) {}
        state.activeItem = newG;
      } else {
        const newM = {
          id: 'custom-' + Date.now(),
          title,
          type: addType,
          category: cat,
          year: new Date().getFullYear(),
          rating: 9.0,
          duration: 'Feature',
          poster: poster,
          description: 'Custom added movie/show stream.',
          iframeUrl: url,
          servers: [{ name: 'Server 1 (Default)', url: url }],
          isCustom: true
        };
        state.media.unshift(newM);
        try {
          const customOnly = state.media.filter(m => m.isCustom);
          localStorage.setItem('chill_custom_media', JSON.stringify(customOnly));
        } catch(err) {}
        state.activeItem = newM;
        state.activeServerUrl = url;
      }

      state.isAddModalOpen = false;
      render();
    });
  }

  document.getElementById('btnCloseCloakModal')?.addEventListener('click', () => { state.isCloakModalOpen = false; render(); });
  document.getElementById('btnCloseCloakFooter')?.addEventListener('click', () => { state.isCloakModalOpen = false; render(); });
  document.querySelectorAll('.btn-select-cloak').forEach(btn => {
    btn.addEventListener('click', () => applyCloak(btn.dataset.cloak));
  });
}

function bindPanicEvents() {
  document.getElementById('btnDismissPanic')?.addEventListener('click', () => {
    state.isPanic = false;
    render();
  });
}

window.openBlankTab = openBlankTab;

render();
loadData();
