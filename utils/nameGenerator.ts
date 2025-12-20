import { GeneratedName, NameCategory, GeneratorOptions } from '../types';

// --- Helper: Clean Input (Handle Spanish Accents) ---
const cleanInput = (input: string): string => {
  return input
    .toLowerCase()
    .normalize("NFD") // Decompose chars (e.g., ñ -> n + ~)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]/g, ''); // Keep only alphanumeric
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Word Banks (World-Class Depth for 2025) ---

const aestheticPrefixes = [
  // Short & Clean (High Utility)
  'the', 'its', 'just', 'real', 'iam', 'dear', 'oh', 'hey', 'yo', 'ur', 'my', 'im', 'is', 'be', 'so',
  'only', 'simply', 'truly', 'daily', 'ever', 'never', 'always', 'still', 'keep', 'own', 'our', 'all',
  
  // Coquette / Soft / Dreamy / Colors
  'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'doll', 'bow', 'lace', 'silk', 'satin', 'pearl',
  'bunny', 'kitty', 'teddy', 'sweet', 'cute', 'lovely', 'cloud', 'mist', 'haze', 'blur', 'faint', 'pale',
  'vanilla', 'peach', 'mint', 'rose', 'milk', 'mocha', 'latte', 'chai', 'matcha', 'boba', 'cream', 'sugar',
  'sage', 'beige', 'noir', 'blanc', 'luxe', 'velvet', 'linen', 'cotton', 'fleur', 'cherry', 'berry',
  'dreamy', 'sleepy', 'fairy', 'pixie', 'witch', 'magic', 'mystic', 'divine', 'sacred', 'blessed', 'cursed',
  'glossy', 'shiny', 'icy', 'rosy', 'golden', 'silver', 'bronze', 'copper', 'glass', 'crystal',
  'velour', 'chiffon', 'bloom', 'petal', 'flora', 'fauna', 'lush', 'warm', 'cozy', 'cold', 'dizzy',
  'violet', 'indigo', 'azure', 'teal', 'coral', 'ivory', 'ebony', 'amber', 'jade', 'ruby', 'opal',
  
  // Y2K / Cyber / Edgy / Gaming
  'cyber', 'vapor', 'neo', 'glitch', 'pixel', 'static', 'noise', 'web', 'net', 'digi', 'data', 'beta',
  'toxic', 'brat', 'savage', 'feral', 'wild', 'mad', 'bad', 'sad', 'rad', 'sick', 'vile', 'grim', 'void',
  'chaos', 'panic', 'manic', 'lost', 'found', 'gone', 'dead', 'alive', 'faded', 'jaded', 'broken', 'whole',
  'meta', 'hyper', 'ultra', 'mega', 'giga', 'nano', 'tech', 'mech', 'bot', 'user', 'admin', 'root',
  'sys', 'alt', 'ctrl', 'shift', 'esc', 'cmd', 'fn', 'log', 'exe', 'bin', 'hex', 'code', 'node',
  'vortex', 'nexus', 'matrix', 'cipher', 'crypto', 'dark', 'deep', 'null', 'void', 'zero', 'one',
  
  // Nature / Elements / Cosmos / Astrology
  'lunar', 'solar', 'cosmic', 'astral', 'polar', 'arctic', 'zenith', 'nadir', 'nova', 'halo', 'eclipse',
  'ocean', 'river', 'lake', 'rain', 'storm', 'snow', 'ice', 'fire', 'wind', 'earth', 'tide', 'wave',
  'golden', 'silver', 'crystal', 'ruby', 'jade', 'amber', 'onyx', 'ivory', 'ebony', 'gold', 'opal',
  'blooming', 'wilting', 'growing', 'flowing', 'glowing', 'shining', 'rising', 'falling',
  'north', 'south', 'east', 'west', 'upper', 'under', 'inner', 'outer',
  'mars', 'venus', 'pluto', 'saturn', 'jupiter', 'mercury', 'moon', 'sun', 'star',
  'karma', 'aura', 'soul', 'spirit', 'fate', 'destiny', 'omen', 'oracle', 'tarot', 'zodiac',
  
  // Spanish Aesthetic (Emotive & Poetic - Cleaned for Usernames)
  'soy', 'yosoy', 'tu', 'mi', 'la', 'el', 'una', 'un',
  'nina', 'nino', 'chica', 'chico', 'pibe', 'piba', 'nena', 'nene', 'mujer', 'hombre',
  'luna', 'sol', 'mar', 'cielo', 'flor', 'luz', 'paz', 'fe', 'sal', 'arena', 'bruma',
  'dulce', 'suave', 'linda', 'bonita', 'chula', 'guapa', 'bella', 'hermosa', 'divina',
  'alma', 'mente', 'vida', 'amor', 'aire', 'brisa', 'nube', 'raiz', 'hoja',
  'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'caos', 'fuego', 'hielo',
  'poesia', 'arte', 'musa', 'ninfa', 'diosa', 'reina', 'dama', 'princesa',
  'eterea', 'fugaz', 'eterna', 'santa', 'pura', 'oscura', 'clara', 'aurea',
  'triste', 'feliz', 'loca', 'rara', 'unica', 'sola', 'mia', 'nuestra',
  'el_rincon_de', 'mundo_', 'espacio_', 'zona_', 'diario_de', 'notas_de',
  'sueño', 'suspiro', 'destello', 'ocaso', 'rocio', 'encanto', 'secreto',
  'simplemente', 'yo_soy', 'mundo', 'universo', 'galaxia', 'planeta'
];

const aestheticSuffixes = [
  // Social / Content Creator / Diaries
  'gram', 'vibe', 'vibes', 'mood', 'diary', 'journal', 'log', 'files', 'folder', 'archive', 'dump',
  'pov', 'cam', 'film', 'films', 'clips', 'cuts', 'edits', 'visuals', 'shots', 'snaps', 'pics', 'lens',
  'life', 'style', 'world', 'wrld', 'land', 'planet', 'zone', 'space', 'room', 'corner', 'spot',
  'blog', 'daily', 'weekly', 'notes', 'pages', 'thoughts', 'minds', 'soul', 'heart', 'spirit',
  'feed', 'reel', 'story', 'post', 'view', 'scene', 'frame', 'focus', 'vision', 'capture',
  
  // Community / Identity
  'club', 'cult', 'gang', 'squad', 'crew', 'team', 'fam', 'house', 'home', 'society', 'union',
  'girl', 'boy', 'kid', 'babe', 'baby', 'doll', 'angel', 'witch', 'fairy', 'queen', 'king', 'prince',
  'lover', 'dreamer', 'thinker', 'maker', 'artist', 'poet', 'muse', 'icon', 'star', 'hero', 'villain',
  'fan', 'stan', 'enthusiast', 'addict', 'junkie', 'geek', 'nerd', 'pro', 'wiz', 'gen', 'pal',
  
  // Aesthetic Locations/Objects
  'garden', 'park', 'forest', 'jungle', 'desert', 'beach', 'coast', 'bay', 'city', 'town', 'village',
  'heaven', 'hell', 'limbo', 'void', 'abyss', 'nexus', 'matrix', 'system', 'server', 'portal',
  'castle', 'palace', 'tower', 'fort', 'base', 'hq', 'lab', 'studio', 'atelier', 'loft',
  'plaza', 'market', 'store', 'shop', 'cafe', 'bar', 'hotel', 'motel', 'inn',
  
  // Abstract / Suffixes
  'core', 'wave', 'gaze', 'punk', 'pop', 'bop', 'jam', 'tune', 'beat', 'flow', 'drip',
  'xo', 'xx', 'xxx', 'zzz', 'yyy', 'inc', 'co', 'ltd', 'est', 'hq', 'id', 'os', 'is', 'ia', 'io',
  'mode', 'state', 'mind', 'set', 'kit', 'pack', 'box', 'bag', 'case', 'type',
  'era', 'szn', 'season', 'days', 'nights', 'hours', 'times', 'years', 'moment',
  
  // Spanish Suffixes
  'vida', 'amor', 'sol', 'luna', 'mar', 'mundo', 'landia', 'polis',
  'bby', 'bebe', 'mami', 'papi', 'chula', 'linda', 'guapo',
  'oficial', 'real', 'fake', 'fan', 'fans', 'club',
  'verso', 'texto', 'frase', 'cita', 'nota', 'foto', 'video', 'grafia',
  'viaje', 'ruta', 'camino', 'paso', 'huella', 'destino', 'mapa',
  'mente', 'alma', 'ser', 'estar', 'ver', 'oir', 'sentir', 'vivir',
  'latina', 'latino', 'mex', 'arg', 'esp', 'col', 'cl', 'pe', 'uy', 'ven',
  'chismes', 'secretos', 'confesiones', 'tiendita', 'bazar', 'cosas'
];

const businessPrefixes = [
  // Authority / Professional
  'official', 'weare', 'the', 'team', 'group', 'club', 'hq', 'pro', 'get', 'try', 'use', 'go',
  'top', 'best', 'prime', 'elite', 'alpha', 'mega', 'ultra', 'super', 'hyper', 'meta', 'next',
  'global', 'local', 'smart', 'fast', 'easy', 'vip', 'premium', 'select', 'first', 'star',
  'ceo', 'founder', 'owner', 'boss', 'admin', 'lead', 'head', 'chief', 'master', 'director',
  'dr', 'prof', 'coach', 'chef', 'ing', 'arq', 'lic', 'abog', 'vet', 'doc',
  'your', 'our', 'my', 'open', 'new', 'now', 'all', 'just', 'only', 'daily',
  'hello', 'hi', 'meet', 'ask', 'join', 'visit', 'follow', 'buy', 'shop',
  
  // Spanish Business
  'somos', 'grupo', 'equipo', 'tu', 'su', 'mi', 'nuestro', 'vuestro',
  'tienda', 'bazar', 'mercado', 'taller', 'estudio', 'oficina', 'despacho', 'agencia', 'firma',
  'centro', 'punto', 'base', 'sede', 'casa', 'hogar', 'mundo', 'zona', 'area', 'espacio',
  'info', 'dato', 'tips', 'guia', 'blog', 'vlog', 'web', 'net', 'app', 'link', 'sitio',
  'hola', 'soy', 'yo_soy', 'el_sr', 'la_sra', 'don', 'doña', 'doctor', 'licenciado',
  'ventas', 'renta', 'compra', 'pago', 'envio', 'promo', 'oferta', 'outlet', 'remate',
  'inversiones', 'servicios', 'soluciones', 'proyectos', 'obras', 'seguros', 'bienes'
];

const businessSuffixes = [
  // Corporate / Entity
  'official', 'biz', 'co', 'inc', 'ltd', 'llc', 'corp', 'group', 'team', 'squad',
  'studio', 'studios', 'agency', 'lab', 'labs', 'works', 'solutions', 'systems', 'tech', 'dev', 'soft',
  'hub', 'center', 'spot', 'place', 'point', 'base', 'station', 'zone', 'area', 'space',
  'shop', 'store', 'market', 'mart', 'outlet', 'boutique', 'bazaar', 'trade', 'supply',
  'press', 'news', 'media', 'cast', 'tv', 'fm', 'radio', 'daily', 'weekly', 'times', 'post',
  'ventures', 'partners', 'associates', 'consulting', 'global', 'intl', 'capital', 'holdings',
  'creative', 'digital', 'social', 'network', 'connect',
  
  // Industry Specific
  'design', 'art', 'creative', 'visuals', 'graphics', 'print', 'ink', 'brand', 'marketing',
  'food', 'eats', 'kitchen', 'cook', 'chef', 'bakes', 'cakes', 'cafe', 'coffee', 'bar', 'grill', 'bistro',
  'fit', 'fitness', 'gym', 'lift', 'run', 'yoga', 'sport', 'health', 'med', 'care', 'wellness',
  'beauty', 'skin', 'hair', 'nails', 'lash', 'brows', 'glam', 'glow', 'spa', 'cosmetics', 'makeup',
  'home', 'house', 'decor', 'living', 'space', 'build', 'realty', 'estate', 'properties', 'arch',
  'travel', 'trips', 'tours', 'guide', 'go', 'fly', 'stay', 'visit', 'explore', 'adventures',
  'fashion', 'style', 'wear', 'apparel', 'clothing', 'closet', 'wardrobe', 'outfit', 'looks',
  
  // Spanish & Location
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'pe', 've', 'uy', 'cr', 'pa', 'gt',
  'tienda', 'online', 'digital', 'virtual', 'web', 'net', 'app', 'com',
  'mexico', 'madrid', 'bcn', 'cdmx', 'ba', 'bog', 'lim', 'scl', 'mty', 'gdl',
  'servicios', 'asociados', 'consultores', 'asesores', 'expertos', 'profesional',
  'moda', 'belleza', 'salud', 'hogar', 'cocina', 'deporte', 'arte', 'viajes',
  'abogados', 'medicos', 'dentista', 'arquitectos', 'ingenieros', 'contadores',
  'mx_oficial', 'es_oficial', 'arg_oficial'
];

const funnyPrefixes = [
  // Self-Deprecating / Internet Slang
  'not', 'actually', 'maybe', 'just', 'bad', 'sad', 'mad', 'rad', 'ok',
  'ceo_of', 'president_of', 'inventor_of', 'king_of', 'queen_of', 'god_of', 'boss_of', 'fan_of',
  'simp_for', 'stan_', 'fan_of_', 'hater_of_', 'victim_of_', 'friend_of_', 'enemy_of_',
  'mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'capt', 'sir', 'lord', 'lady', 'baron', 'duke',
  'lil', 'big', 'yung', 'old', 'smol', 'tol', 'fat', 'thin', 'tall', 'short',
  'the_real', 'the_fake', 'the_only', 'your_local', 'internet_', 'cyber_', 'virtual_',
  'pls_', 'dont_', 'cant_', 'wont_', 'im_', 'its_', 'who_is_',
  
  // Spanish Funny
  'el_sr', 'la_sra', 'don', 'doña', 'un_tal', 'una_tal',
  'ese_', 'esa_', 'aquel_', 'aquella_', 'aqui_', 'alli_',
  'soy_el_', 'soy_la_', 'no_soy_', 'falso_', 'verdadero_',
  'casi_', 'medio_', 'super_', 'mega_', 're_', 'ultra_', 'archi_',
  'el_toxico', 'la_toxica', 'el_brayan', 'la_brittany', 'el_kev',
  'tu_ex_', 'tu_crush_', 'tu_vecino_', 'tu_patron_', 'tu_tio_', 'tu_tia_', 'tu_novio_',
  'el_mismo', 'la_misma', 'el_propio', 'la_propia', 'el_unico',
  'senor_', 'senora_', 'joven_', 'viejo_'
];

const funnySuffixes = [
  // Actions / States / Memes
  'fail', 'wins', 'plays', 'games', 'gaming', 'tt', 'tv', 'yt', 'live', 'stream',
  'meme', 'memes', 'shitpost', 'posting', 'spam', 'trash', 'junk', 'stuff', 'things',
  '404', 'exe', 'png', 'jpg', 'gif', 'mp4', 'pdf', 'zip', 'txt', 'mov', 'wav',
  'lol', 'lmao', 'xd', 'uwu', 'owo', 'omg', 'wtf', 'plz', 'thx', 'bye', 'brb', 'afk',
  'stop', 'help', 'nope', 'yep', 'maybe', 'idk', 'idc', 'tbh', 'imo', 'irl',
  'who', 'what', 'where', 'when', 'why', 'how',
  'bot', 'npc', 'main', 'alt', 'backup', 'spam', 'afk', 'brb', 'vip', 'mvp',
  
  // Spanish Actions
  'dice', 'sabe', 'piensa', 'cree', 'siente', 'habla', 'mira', 'oye', 've',
  'loco', 'loca', 'feo', 'fea', 'guapo', 'guapa', 'raro', 'rara', 'chistoso',
  'tonto', 'tonta', 'listo', 'lista', 'genio', 'pro', 'noob', 'manco',
  'triste', 'feliz', 'enojado', 'cansado', 'harto', 'muerto', 'vivo', 'aburrido',
  'pobre', 'rico', 'humilde', 'fresa', 'naco', 'cholo', 'buchon',
  'oficial', 'fake', 'real', '100', 'mil', '2000', '3000',
  'y_sus_amigos', 'y_cia', 'el_regreso', 'la_venganza', 'en_hd', 'en_4k',
  'dice_que_no', 'no_sabe', 'no_quiere', 'se_fue'
];

// --- Specialized Noun Banks for Smart Fallback ---

// 1. Tech / Business / Abstract (For Business & Minimal)
const techNouns = [
  'code', 'data', 'pixel', 'node', 'link', 'ctrl', 'byte', 'bit',
  'cloud', 'grid', 'stack', 'host', 'core', 'root', 'user', 'admin',
  'net', 'web', 'site', 'app', 'soft', 'ware', 'tech', 'mech',
  'apex', 'vertex', 'nexus', 'flux', 'flow', 'spark', 'pulse',
  'axis', 'orbit', 'prism', 'logic', 'theory', 'method', 'idea',
  'alpha', 'beta', 'gamma', 'delta', 'omega', 'prime', 'meta',
  'base', 'case', 'deck', 'dock', 'port', 'gate', 'key', 'lock',
  'scope', 'scale', 'range', 'level', 'phase', 'stage', 'step',
  'signal', 'input', 'output', 'script', 'hash', 'tag', 'token'
];

// 2. Nature / Elements (For Aesthetic)
const natureNouns = [
  'moon', 'sun', 'star', 'sky', 'cloud', 'rain', 'snow', 'storm', 'wind', 'fog',
  'rose', 'lily', 'lotus', 'tulip', 'daisy', 'fern', 'moss', 'pine', 'palm', 'leaf',
  'ocean', 'sea', 'river', 'lake', 'pond', 'wave', 'tide', 'surf', 'reef', 'bay',
  'mountain', 'hill', 'peak', 'cliff', 'rock', 'stone', 'gem', 'dust', 'sand',
  'light', 'dark', 'shadow', 'shade', 'gloom', 'shine', 'glow', 'beam', 'ray',
  'luna', 'sol', 'mar', 'rio', 'nube', 'flor', 'hoja', 'rosa', 'monte', 'luz',
  'astro', 'comet', 'planet', 'galaxy', 'nebula', 'cosmos', 'orbit', 'meteor'
];

// 3. Creative / Urban / Lifestyle (For Minimal & Aesthetic)
const creativeNouns = [
  'art', 'ink', 'pen', 'draw', 'paint', 'film', 'cam', 'pic', 'shot',
  'song', 'tune', 'beat', 'note', 'tone', 'sound', 'noise', 'voice',
  'word', 'text', 'line', 'verse', 'rhyme', 'poet', 'muse', 'story',
  'city', 'town', 'road', 'street', 'lane', 'path', 'way', 'map',
  'vibe', 'mood', 'soul', 'mind', 'heart', 'spirit', 'aura', 'zen',
  'book', 'page', 'paper', 'read', 'write', 'type', 'print', 'copy',
  'vinyl', 'retro', 'disco', 'jazz', 'blues', 'indie', 'folk', 'pop'
];

// 4. Gaming / Esports
const gamingNouns = [
  'play', 'game', 'win', 'loss', 'gg', 'ez', 'wp', 'gl', 'hf',
  'zone', 'lvl', 'xp', 'hp', 'mp', 'buff', 'nerf', 'mod', 'bot',
  'raid', 'quest', 'loot', 'drop', 'skin', 'item', 'gear', 'spec',
  'pro', 'noob', 'carry', 'tank', 'dps', 'heal', 'supp', 'main',
  'frag', 'kill', 'death', 'respawn', 'lag', 'ping', 'fps', 'fov',
  'clan', 'guild', 'team', 'squad', 'party', 'lobby', 'server', 'map'
];

// 5. Fashion / Beauty
const fashionNouns = [
  'look', 'fit', 'wear', 'style', 'mode', 'vogue', 'chic', 'glam',
  'lux', 'luxe', 'gold', 'silk', 'lace', 'denim', 'linen', 'wool',
  'bag', 'shoe', 'boot', 'heel', 'dress', 'shirt', 'coat', 'vest',
  'ring', 'gem', 'jewel', 'stud', 'cuff', 'link', 'chain', 'band',
  'face', 'lip', 'eye', 'lash', 'brow', 'skin', 'glow', 'mask',
  'scent', 'perfume', 'aroma', 'note', 'tone', 'shade', 'hue', 'tint'
];

// 6. Fitness / Wellness
const fitnessNouns = [
  'fit', 'gym', 'lift', 'run', 'flex', 'pump', 'gains', 'rep', 'set', 'wod',
  'yoga', 'zen', 'flow', 'mat', 'pose', 'om', 'soul', 'body', 'mind',
  'strong', 'power', 'fast', 'speed', 'rush', 'core', 'abs', 'glute',
  'active', 'move', 'sport', 'train', 'coach', 'health', 'vital', 'pulse'
];

// 7. Food / Drink
const foodNouns = [
  'cook', 'chef', 'eat', 'yum', 'tasty', 'bite', 'dish', 'meal', 'snack',
  'bowl', 'plate', 'spoon', 'fork', 'knife', 'spice', 'herb', 'salt',
  'sweet', 'sour', 'cake', 'pie', 'bun', 'bread', 'toast', 'jam',
  'coffee', 'brew', 'bean', 'mug', 'cup', 'tea', 'chai', 'latte', 'mocha'
];

// 8. Travel / Adventure
const travelNouns = [
  'trip', 'fly', 'jet', 'map', 'road', 'way', 'path', 'tour', 'visit',
  'roam', 'wander', 'view', 'sight', 'spot', 'place', 'world', 'globe',
  'north', 'south', 'east', 'west', 'air', 'sea', 'land', 'coast',
  'hike', 'camp', 'trek', 'wild', 'free', 'escape', 'away', 'here'
];

// 9. Music / Audio (NEW)
const musicNouns = [
  'melody', 'tune', 'song', 'lyric', 'chord', 'bass', 'beat', 'rhythm',
  'hymn', 'aria', 'opus', 'note', 'clef', 'solo', 'duet', 'band', 'gig',
  'vinyl', 'track', 'album', 'sound', 'audio', 'wave', 'echo', 'reverb',
  'musica', 'ritmo', 'nota', 'acorde', 'sonido', 'voz', 'canto', 'melodia',
  'verso', 'coro', 'pista', 'disco', 'radio', 'stereo', 'mix', 'remix'
];

// 10. Dark / Goth / Alternative (NEW)
const gothNouns = [
  'goth', 'dark', 'void', 'abyss', 'shadow', 'gloom', 'crypt', 'grave',
  'skull', 'bone', 'blood', 'fang', 'vamp', 'bat', 'raven', 'crow',
  'witch', 'hex', 'curse', 'omen', 'ghost', 'spirit', 'demon', 'devil',
  'hell', 'hades', 'chaos', 'ruin', 'dust', 'ash', 'noir', 'grim',
  'oscuro', 'sombra', 'noche', 'luna', 'sangre', 'cuervo', 'bruja', 'muerte',
  'tumba', 'dolor', 'miedo', 'terror', 'vacio', 'niebla', 'frio'
];

// 11. Art / Design (NEW)
const artNouns = [
  'sketch', 'draw', 'paint', 'ink', 'brush', 'canvas', 'palette', 'hue',
  'gallery', 'frame', 'sculpt', 'mural', 'print', 'design', 'vector',
  'lienzo', 'trazo', 'papel', 'color', 'museo', 'obra', 'foto', 'foco',
  'prisma', 'visual', 'grafico', 'boceto', 'tinta', 'pincel'
];

// 12. Animals (For Funny / General)
const animalNouns = [
  'cat', 'dog', 'fox', 'wolf', 'bear', 'lion', 'tiger', 'bat', 'owl', 'crow',
  'panda', 'koala', 'bunny', 'kitty', 'puppy', 'dino', 'dragon', 'shark', 'whale',
  'gato', 'perro', 'oso', 'lobo', 'zorro', 'buho', 'pato', 'rana', 'pez', 'ave',
  'frog', 'duck', 'goose', 'swan', 'deer', 'elk', 'moose', 'seal', 'otter'
];

// 13. Short Abstract Syllables (For "Brandable" Business Names)
const shortAbstractNouns = [
  'nov', 'lum', 'sol', 'viv', 'aer', 'urb', 'gen', 'ven', 'vis', 'vox',
  'zen', 'axo', 'omi', 'una', 'iso', 'eco', 'neo', 'pro', 'max', 'min',
  'vel', 'var', 'vol', 'vit', 'val', 'vic', 'von', 'van', 'vim', 'vip',
  'io', 'ia', 'os', 'us', 'ex', 'ix', 'ax', 'ox', 'ux', 'az', 'iz'
];

const randomAdjectives = [
  // English
  'happy', 'sad', 'mad', 'bad', 'good', 'rad', 'lit', 'hot', 'cold',
  'fast', 'slow', 'big', 'lil', 'smol', 'tiny', 'huge', 'epic',
  'lost', 'found', 'gone', 'here', 'near', 'far', 'free', 'wild',
  'soft', 'hard', 'pure', 'dark', 'pale', 'neon', 'real', 'fake',
  'calm', 'quiet', 'loud', 'busy', 'lazy', 'cozy', 'warm', 'cool',
  'brave', 'bold', 'bright', 'sharp', 'keen', 'wise', 'dim', 'dull',
  'rich', 'poor', 'cheap', 'posh', 'chic', 'glam', 'luxe', 'fine',
  'dizzy', 'fuzzy', 'hazy', 'misty', 'dusty', 'rusty', 'shiny',
  
  // Spanish
  'feliz', 'triste', 'loco', 'cuerdo', 'bueno', 'malo', 'rico', 'pobre',
  'gran', 'peque', 'alto', 'bajo', 'nuevo', 'viejo', 'joven',
  'azul', 'rojo', 'verde', 'gris', 'rosa', 'lila', 'negro', 'blanco',
  'libre', 'preso', 'dulce', 'agrio', 'frio', 'tibio', 'fresco',
  'suave', 'duro', 'puro', 'raro', 'lindo', 'feo', 'santo',
  'fuerte', 'debil', 'claro', 'oscuro', 'rapido', 'lento', 'facil',
  'guapo', 'bello', 'mono', 'chulo', 'fino', 'divino', 'eterno',
  'audaz', 'voraz', 'fugaz', 'tenaz', 'capaz', 'leal', 'real',
  'solar', 'lunar', 'polar', 'vital', 'fatal', 'total', 'final',
  'magica', 'mistica', 'salvaje', 'cruel', 'letla', 'atroz'
];

// --- Character Manipulation ---

const leetSpeak = (text: string): string => {
  const map: Record<string, string> = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'l': '1', 'b': '8' };
  return text.split('').map(c => Math.random() > 0.6 ? (map[c] || c) : c).join('');
};

const doubleVowels = (text: string): string => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  // Duplicate the last vowel or a random one
  return text.split('').map(c => (vowels.includes(c) && Math.random() > 0.8) ? c + c : c).join('');
};

const replaceChars = (text: string): string => {
   let res = text;
   if (res.includes('c') && Math.random() > 0.5) res = res.replace(/c/g, 'k');
   if (res.includes('qu') && Math.random() > 0.5) res = res.replace(/qu/g, 'k');
   if (res.includes('s') && Math.random() > 0.5) res = res.replace(/s/g, 'z');
   if (res.includes('i') && Math.random() > 0.5) res = res.replace(/i/g, 'y');
   if (res.includes('ph') && Math.random() > 0.5) res = res.replace(/ph/g, 'f');
   return res;
};

// --- Main Generator ---

export const generateNames = (options: GeneratorOptions): GeneratedName[] => {
  const { keyword, category, platform, includeNumbers, includePeriods, includeUnderscores } = options;
  
  const cleanKeyword = cleanInput(keyword);
  
  // --- SMART FALLBACK LOGIC ---
  // If no keyword is provided, pick a random base word based on the category.
  // This ensures "Surprise Me" or empty searches yield contextually relevant results.
  let baseList: string[] = [];
  
  if (cleanKeyword) {
    baseList = [cleanKeyword];
  } else {
    // Context-aware selection
    switch (category) {
      case NameCategory.BUSINESS:
        baseList = [...techNouns, ...shortAbstractNouns, ...fashionNouns, ...foodNouns, ...fitnessNouns, ...artNouns];
        break;
      case NameCategory.AESTHETIC:
        baseList = [...natureNouns, ...creativeNouns, ...fashionNouns, ...travelNouns, ...musicNouns, ...gothNouns, ...artNouns];
        break;
      case NameCategory.MINIMAL:
        baseList = [...techNouns, ...creativeNouns, ...shortAbstractNouns, ...artNouns];
        break;
      case NameCategory.FUNNY:
        baseList = [...animalNouns, ...techNouns, ...gamingNouns, ...foodNouns]; // Tech/Internet humor
        break;
      default: // ALL
        baseList = [
          ...techNouns, ...natureNouns, ...creativeNouns, ...animalNouns, 
          ...gamingNouns, ...fashionNouns, ...fitnessNouns, ...foodNouns, 
          ...travelNouns, ...musicNouns, ...gothNouns, ...artNouns
        ];
        break;
    }
  }

  // Helper to get a base word (either the keyword or a random one from the list)
  const getBase = () => {
     if (cleanKeyword) return cleanKeyword;
     return baseList[Math.floor(Math.random() * baseList.length)];
  };
  
  const results: GeneratedName[] = [];
  const generatedSet = new Set<string>(); // Prevent duplicates in the same batch
  
  // Platform Constraints
  const maxLength = platform === 'twitter' ? 15 : 30;
  
  // Helper to add a result safely
  const add = (name: string, cat: NameCategory) => {
    let finalName = name;

    // Post-processing: Underscores (Platform Logic)
    // TikTok loves underscores/dots, Youtube handles avoid them usually but possible
    // FIX: Do NOT add random underscores to BUSINESS names to keep them clean/official
    if (includeUnderscores && cat !== NameCategory.BUSINESS && !finalName.includes('_') && Math.random() > 0.7) {
       const pos = Math.random();
       if (pos < 0.33) finalName = `_${finalName}`;
       else if (pos < 0.66) finalName = `${finalName}_`;
       else finalName = `_${finalName}_`;
    }

    // Post-processing: Numbers
    if (includeNumbers && Math.random() > 0.7) {
       const types = [
         Math.floor(Math.random() * 99), // 0-99
         2025, 2024, 24, 25, // Current/Next years
         Math.floor(Math.random() * 9) * 111, // 111, 222
         777, 444, 333, // Angel numbers
         247, 365, 420, 69 // Internet culture
       ];
       finalName += types[Math.floor(Math.random() * types.length)];
    }
    
    // --- CRITICAL VALIDATION ---
    // 1. Remove consecutive dots (Instagram/TikTok invalid)
    finalName = finalName.replace(/\.{2,}/g, '.');
    
    // 2. Remove consecutive underscores (Fixes "Double Underscore" issue)
    finalName = finalName.replace(/_+/g, '_');

    // 3. Remove Leading/Trailing Dots (Strictly invalid on IG)
    finalName = finalName.replace(/^\.+|\.+$/g, '');

    // 4. Remove Trailing Underscores (Often cleaner, unless strictly desired)
    // We allow leading underscores as they are a common aesthetic choice, but trailing can be messy.
    finalName = finalName.replace(/_+$/, '');

    // 5. Strict Platform Length Enforcement
    if (finalName.length > maxLength) {
        // If too long, try to trim cleanly
        finalName = finalName.substring(0, maxLength);
        // Don't leave a trailing underscore or dot after trim
        finalName = finalName.replace(/[._]$/, '');
    }

    // 6. Ensure name isn't empty after cleaning
    if (finalName.length < 1) return;

    if (!generatedSet.has(finalName)) {
      generatedSet.add(finalName);
      results.push({ id: generateId(), name: finalName, category: cat });
    }
  };

  // --- Strategies per Category ---

  // 1. Minimal (Clean, Short, Punctuation heavy)
  if (category === NameCategory.ALL || category === NameCategory.MINIMAL) {
    const b = getBase();
    
    add(`iam${b}`, NameCategory.MINIMAL);
    add(`${b}${b}`, NameCategory.MINIMAL); // Doubled
    add(`the${b}`, NameCategory.MINIMAL);
    add(`${b}here`, NameCategory.MINIMAL);
    add(`not${b}`, NameCategory.MINIMAL);
    add(`only${b}`, NameCategory.MINIMAL);
    
    // Period strategies (Very popular for Minimal)
    if (includePeriods) {
        add(`${b}.ig`, NameCategory.MINIMAL);
        add(`${b}.raw`, NameCategory.MINIMAL);
        // Note: The 'add' validation will strip leading dots if generated here
        add(`.${b}`, NameCategory.MINIMAL); 
        add(`${b}.`, NameCategory.MINIMAL);
        add(`its.${b}`, NameCategory.MINIMAL);
        
        // Split with period (e.g. car.los)
        if (b.length > 3) {
          const splitIdx = Math.floor(Math.random() * (b.length - 2)) + 1;
          add(`${b.slice(0, splitIdx)}.${b.slice(splitIdx)}`, NameCategory.MINIMAL);
        }
    }
    
    // Underscore minimal strategies
    if (includeUnderscores) {
      add(`x_${b}_x`, NameCategory.MINIMAL);
      add(b.split('').join('_'), NameCategory.MINIMAL); // c_a_r_l_o_s
    }
  }

  // 2. Aesthetic (Vibe words, text transformation, soft prefixes)
  if (category === NameCategory.ALL || category === NameCategory.AESTHETIC) {
    // Generate more aesthetic options (loop 5 times for variety)
    for(let i=0; i<5; i++) {
        const b = getBase();
        const pre = aestheticPrefixes[Math.floor(Math.random() * aestheticPrefixes.length)];
        const suf = aestheticSuffixes[Math.floor(Math.random() * aestheticSuffixes.length)];
        
        // Prefix oriented
        if(includePeriods && Math.random() > 0.6) add(`${pre}.${b}`, NameCategory.AESTHETIC);
        else add(`${pre}${b}`, NameCategory.AESTHETIC);

        // Suffix oriented
        if(includePeriods && Math.random() > 0.6) add(`${b}.${suf}`, NameCategory.AESTHETIC);
        else add(`${b}${suf}`, NameCategory.AESTHETIC);
        
        // Sandwich (rare but cool)
        if(Math.random() > 0.8) add(`${pre}.${b}.${suf}`, NameCategory.AESTHETIC);
    }

    const bTrans = getBase();
    // Transformations
    add(doubleVowels(bTrans), NameCategory.AESTHETIC);
    add(replaceChars(bTrans), NameCategory.AESTHETIC);
    
    // Vibe phrases
    if(includePeriods) {
        add(`pov.${bTrans}`, NameCategory.AESTHETIC);
        add(`${bTrans}.dump`, NameCategory.AESTHETIC);
        add(`just.${bTrans}`, NameCategory.AESTHETIC);
        add(`${bTrans}.files`, NameCategory.AESTHETIC);
        add(`${bTrans}.vibe`, NameCategory.AESTHETIC);
    } else {
        add(`pov${bTrans}`, NameCategory.AESTHETIC);
        add(`${bTrans}dump`, NameCategory.AESTHETIC);
        add(`just${bTrans}`, NameCategory.AESTHETIC);
        add(`${bTrans}vibe`, NameCategory.AESTHETIC);
    }
  }

  // 3. Business (Official, localized, professional)
  if (category === NameCategory.ALL || category === NameCategory.BUSINESS) {
    for(let i=0; i<4; i++) {
        const b = getBase();
        const pre = businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)];
        const suf = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
        
        add(`${pre}${b}`, NameCategory.BUSINESS);
        if(includePeriods) add(`${pre}.${b}`, NameCategory.BUSINESS);
        else if(includeUnderscores) add(`${pre}_${b}`, NameCategory.BUSINESS);
        
        add(`${b}${suf}`, NameCategory.BUSINESS);
        if(includePeriods) add(`${b}.${suf}`, NameCategory.BUSINESS);
        else if(includeUnderscores) add(`${b}_${suf}`, NameCategory.BUSINESS);
    }
    
    // Domain style
    const bDom = getBase();
    if(includePeriods) {
        add(`${bDom}.com`, NameCategory.BUSINESS);
        add(`www.${bDom}`, NameCategory.BUSINESS);
        add(`${bDom}.net`, NameCategory.BUSINESS);
        add(`${bDom}.app`, NameCategory.BUSINESS);
        add(`${bDom}.mx`, NameCategory.BUSINESS);
        add(`${bDom}.es`, NameCategory.BUSINESS);
    }
  }

  // 4. Funny (Self-deprecating, memes, Spanish humor)
  if (category === NameCategory.ALL || category === NameCategory.FUNNY) {
    for(let i=0; i<4; i++) {
        const b = getBase();
        const pre = funnyPrefixes[Math.floor(Math.random() * funnyPrefixes.length)];
        const suf = funnySuffixes[Math.floor(Math.random() * funnySuffixes.length)];
        
        // Funny usually uses underscores more
        if(Math.random() > 0.3) add(`${pre}_${b}`, NameCategory.FUNNY);
        else add(`${pre}${b}`, NameCategory.FUNNY);
        
        if(Math.random() > 0.3) add(`${b}_${suf}`, NameCategory.FUNNY);
        else add(`${b}${suf}`, NameCategory.FUNNY);
    }
    
    const bFun = getBase();
    add(`yo_soy_${bFun}`, NameCategory.FUNNY);
    add(`odio_a_${bFun}`, NameCategory.FUNNY);
    add(`${bFun}_dice`, NameCategory.FUNNY);
    add(`${bFun}_sabe`, NameCategory.FUNNY);
    add(leetSpeak(bFun), NameCategory.FUNNY);
    add(`xX_${bFun}_Xx`, NameCategory.FUNNY);
    add(`i_hate_${bFun}`, NameCategory.FUNNY);
    add(`tu_amiga_${bFun}`, NameCategory.FUNNY);
  }

  // 5. Fillers to ensure we have enough results (Up to ~60)
  let safetyCount = 0;
  while (results.length < 60 && safetyCount < 100) {
    safetyCount++;
    const adj = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
    // Smart fallback for filler noun
    const noun = baseList[Math.floor(Math.random() * baseList.length)];
    
    const r = Math.random();
    // Mix keyword with randoms
    const target = (keyword && Math.random() > 0.5) ? cleanKeyword : noun;
    
    if (r < 0.33 && includePeriods) add(`${target}.${adj}`, NameCategory.ALL);
    else if (r < 0.66) add(`${adj}${target}`, NameCategory.ALL);
    else add(`${target}${adj}`, NameCategory.ALL);
  }

  // Shuffle and limit to 60 for "comprehensive" feel without lag
  return results.sort(() => 0.5 - Math.random()).slice(0, 60);
};