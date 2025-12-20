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

// --- Word Banks (The Most Comprehensive Collection - V3) ---

const aestheticPrefixes = [
  // English/Universal Vibe
  'the', 'its', 'just', 'real', 'iam', 'dear', 'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'mr', 'ur', 'my', 'oh', 'hey', 'yo',
  'cherry', 'velvet', 'cosmic', 'retro', 'cyber', 'vapor', 'neo', 'pale', 'dark', 'light', 'golden', 'silver', 'crystal', 'silk', 'satin',
  'vanilla', 'peach', 'mint', 'lavender', 'rose', 'milk', 'mocha', 'latte', 'chai', 'matcha', 'boba', 'fairy', 'pixie', 'witch',
  'dreamy', 'sleepy', 'awake', 'tired', 'lovely', 'lonely', 'broken', 'whole', 'empty', 'full', 'secret', 'hidden', 'lost', 'found', 'gone',
  'wild', 'free', 'young', 'old', 'new', 'mystic', 'astral', 'lunar', 'solar', 'polar', 'zenith', 'nadir', 'blooming', 'wilting', 'fading',
  'glowing', 'shining', 'indie', 'alt', 'grunge', 'punk', 'goth', 'emo', 'rock', 'muse', 'myth', 'legend', 'saga', 'fable', 'tale',
  'nordic', 'celtic', 'latin', 'greek', 'roman', 'coquette', 'demure', 'mindful', 'cutesy', 'vintage', 'classic', 'modern', 'future',
  'crimson', 'scarlet', 'azure', 'teal', 'indigo', 'violet', 'ivory', 'ebony', 'amber', 'jade', 'emerald', 'ruby', 'sapphire', 'pearl',
  'cloudy', 'stormy', 'rainy', 'sunny', 'windy', 'foggy', 'misty', 'icy', 'fiery', 'dusty', 'sandy', 'muddy',
  'glitch', 'pixel', 'static', 'noise', 'signal', 'radio', 'stereo', 'mono', 'analog', 'digital', 'virtual', 'meta',
  'sacred', 'divine', 'holy', 'cursed', 'blessed', 'fallen', 'risen', 'hollow', 'void', 'abyss', 'nexus',
  'glossy', 'matte', 'sheer', 'nude', 'raw', 'rare', 'epic', 'iconic', 'vivid', 'lucid', 'blur', 'fuzz',
  'happy', 'sad', 'mad', 'bad', 'good', 'chill', 'cool', 'hot', 'cold', 'warm', 'wet', 'dry',

  // Spanish Poetic/Nature/Emotional
  'soy', 'yosoy', 'tu', 'mi', 'luna', 'alma', 'cielo', 'dulce', 'suave', 'luz', 'cafe', 'flor', 'mar', 'sol', 'brisa', 'aire',
  'nube', 'lluvia', 'nieve', 'fuego', 'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'sombra', 'reflejo', 'espejo',
  'poesia', 'arte', 'tinta', 'papel', 'color', 'tono', 'matiz', 'croma', 'astro', 'estrella', 'cometa', 'galax', 'nebula',
  'linda', 'bonita', 'chica', 'chico', 'joven', 'viejo', 'retro', 'vintage', 'moderno', 'futuro', 'etereo', 'divino', 'santo',
  'efimero', 'eterno', 'fugaz', 'brillo', 'destello', 'rayo', 'trueno', 'calma', 'paz', 'zen', 'caos', 'ruido', 'silencio',
  'suspiro', 'deseo', 'sueño', 'musa', 'ninfa', 'venus', 'marte', 'saturno', 'pluton', 'orion', 'sirius', 'vega', 'altair',
  'dorado', 'plata', 'blanco', 'negro', 'rosa', 'azul', 'rojo', 'lila', 'verde', 'gris', 'cian', 'ambar', 'coral', 'jade',
  'rio', 'monte', 'bosque', 'selva', 'duna', 'hoja', 'raiz', 'semilla', 'fruto', 'petalo', 'espina',
  'amor', 'odio', 'vida', 'muerte', 'tiempo', 'espacio', 'mente', 'cuerpo', 'espiritu',
  'hola', 'adios', 'chao', 'beso', 'abrazo', 'sonrisa', 'lagrima', 'mirada', 'voz',
  'carmesí', 'celeste', 'turquesa', 'violeta', 'marfil', 'ebano', 'ambar', 'esmeralda',
  'nublado', 'tormenta', 'lluvioso', 'soleado', 'ventoso', 'niebla', 'bruma', 'helado', 'ardiente',
  'sagrado', 'divino', 'santo', 'maldito', 'bendito', 'caido', 'vacio', 'abismo',
  'querida', 'querido', 'dulce', 'amargo', 'picante', 'salado', 'fresco', 'rancio', 'seco', 'mojado'
];

const aestheticSuffixes = [
  // English/Universal
  'gram', 'vibe', 'diary', 'life', 'style', 'love', 'xo', 'minds', 'mood', 'core', 'films', 'pov', 'cam', 'pic', 'art', 'work',
  'soul', 'heart', 'dream', 'wish', 'dust', 'cloud', 'bloom', 'glow', 'verse', 'zone', 'space', 'club', 'cult', 'gang', 'squad',
  'boys', 'girls', 'kids', 'baby', 'doll', 'babe', 'honey', 'pie', 'cake', 'tea', 'juice', 'soda', 'water', 'ice', 'snow',
  'journal', 'log', 'notes', 'pages', 'world', 'land', 'realm', 'kingdom', 'empire', 'league', 'union', 'alliance', 'crew', 'team', 'family',
  'house', 'home', 'place', 'spot', 'corner', 'room', 'studio', 'lab', 'workshop', 'factory', 'garden', 'park', 'forest', 'jungle', 'desert',
  'ocean', 'sea', 'river', 'lake', 'pond', 'sky', 'star', 'moon', 'sun', 'nightmare', 'vision', 'illusion', 'fantasy',
  'magic', 'spell', 'curse', 'charm', 'hex', 'spirit', 'ghost', 'angel', 'demon', 'witch', 'wizard', 'fairy', 'elf', 'dragon',
  'king', 'queen', 'prince', 'princess', 'royal', 'god', 'goddess', 'deity', 'hero', 'villain', 'files', 'archives', 'records',
  'society', 'collective', 'agency', 'bureau', 'firm', 'co', 'inc', 'ltd', 'corp', 'sys', 'net', 'web', 'link', 'hub',
  'nook', 'den', 'cave', 'haven', 'sanctuary', 'temple', 'shrine', 'altar', 'monument', 'ruin', 'relic', 'artifact',
  'wave', 'signal', 'freq', 'hertz', 'bit', 'byte', 'pixel', 'glitch', 'patch', 'fix', 'mod', 'hack', 'code',
  'editz', 'visuals', 'aesthetics', 'graphy', 'ph', 'shots', 'snaps', 'flicks', 'clips', 'reels', 'tiktoks',
  'core', 'wave', 'gaze', 'punk', 'pop', 'bop', 'jam', 'tune', 'beat', 'flow', 'drip', 'hype', 'clout',

  // Spanish
  'vida', 'amor', 'sol', 'mar', 'mundo', 'conamor', 'bby', 'linda', 'bonita', 'vibra', 'eterno', 'infinito', 'fugaz',
  'azul', 'rosa', 'negro', 'blanco', 'gris', 'rojo', 'verde', 'lila', 'pastel', 'neon', 'mate', 'brillo', 'foco',
  'diario', 'notas', 'letras', 'versos', 'rima', 'prosa', 'texto', 'cita', 'frase', 'dicho', 'hecho', 'real',
  'visual', 'foto', 'imagen', 'vista', 'mirada', 'ojo', 'lente', 'rollo', 'film', 'cine', 'video', 'clip', 'rec',
  'mente', 'pensar', 'crear', 'hacer', 'ser', 'estar', 'ir', 'ver', 'oir', 'sentir', 'amar', 'vivir',
  'viaje', 'ruta', 'camino', 'sendero', 'calle', 'avenida', 'plaza', 'parque', 'jardin', 'patio',
  'casa', 'hogar', 'piso', 'cuarto', 'sala', 'techo', 'suelo', 'pared', 'puerta', 'ventana',
  'noche', 'dia', 'tarde', 'mañana', 'hora', 'minuto', 'segundo', 'momento', 'instante',
  'chica', 'chico', 'mujer', 'hombre', 'niña', 'niño', 'amiga', 'amigo',
  'club', 'grupo', 'banda', 'equipo', 'clan', 'tribu', 'gremio', 'secta', 'logia',
  'zona', 'area', 'base', 'campo', 'fuerte', 'torre', 'castillo', 'palacio',
  'nube', 'cielo', 'astro', 'cosmos', 'vacio', 'nada', 'todo',
  'latina', 'latino', 'mex', 'arg', 'esp', 'col', 'ven', 'cl', 'pe', 'uy',
  'flow', 'mami', 'papi', 'nena', 'nene', 'bebe', 'reina', 'rey'
];

const businessPrefixes = [
  // General/Professional
  'official', 'team', 'weare', 'group', 'club', 'hq', 'pro', 'get', 'try', 'the', 'best', 'top', 'mega', 'ultra', 'hyper', 'super',
  'alpha', 'beta', 'omega', 'prime', 'elite', 'master', 'expert', 'guru', 'ninja', 'wizard', 'hero', 'champ', 'king', 'queen',
  'global', 'local', 'smart', 'fast', 'easy', 'safe', 'secure', 'trust', 'vip', 'premium',
  'ceo', 'founder', 'owner', 'boss', 'admin', 'mod', 'manager', 'director', 'lead', 'head', 'chief',
  'daily', 'weekly', 'monthly', 'yearly', 'annual', 'today', 'now', 'forever', 'always', 'never',

  // Spanish & Role Specific
  'somos', 'grupo', 'taller', 'estudio', 'tienda', 'bazar', 'mercado', 'mundo', 'zona', 'dr', 'lic', 'ing', 'arq',
  'abogado', 'profe', 'coach', 'chef', 'guia', 'tips', 'info', 'dato', 'blog', 'vlog', 'web', 'net', 'app', 'bot',
  'tu_tienda', 'tu_espacio', 'tu_lugar', 'rincon', 'centro', 'punto', 'foco', 'eje', 'base', 'sede', 'casa', 'hogar',
  'agencia', 'firma', 'bureau', 'union', 'red', 'lazo', 'puente', 'nexo', 'link', 'conecta', 'crea', 'hace', 'vende',
  'academia', 'instituto', 'escuela', 'curso', 'clase', 'tutor', 'mentor', 'asesor', 'consultor', 'gestor', 'manager',
  'consultora', 'asesoria', 'gestoria', 'bufete', 'clinica', 'hospital', 'farmacia', 'laboratorio', 'almacen', 'super',
  'restaurante', 'bar', 'cafe', 'bistro', 'pub', 'hotel', 'hostal', 'resort', 'villa', 'inmobiliaria', 'propiedades', 'fincas',
  'seguros', 'finanzas', 'banco', 'ahorro', 'credito', 'marketing', 'publicidad', 'media', 'prensa', 'noticias',
  'impuso', 'crece', 'compra', 'invierte', 'ahorra', 'viaja', 'come', 'bebe', 'vive',
  'dueno', 'jefe', 'admin', 'mod', 'dire', 'presi', 'socio', 'colega',
  'ventas', 'renta', 'alquiler', 'traspaso', 'ofertas', 'promos', 'outlet',
  'psico', 'fisio', 'nutri', 'derma', 'gine', 'pedia', 'odonto', 'oftalmo'
];

const businessSuffixes = [
  // General/Tech/Web
  'official', 'biz', 'co', 'inc', 'ltd', 'studio', 'agency', 'hub', 'global', 'app', 'online', 'shop', 'store', 'tech', 'dev', 'io', 'ai', 'nft', 'crypto',
  'solutions', 'systems', 'media', 'digital', 'creative', 'labs', 'works', 'press', 'news', 'daily', 'weekly', 'times', 'post',
  'consulting', 'management', 'capital', 'ventures', 'holdings', 'investments', 'assets', 'logistics', 'transport', 'shipping', 'delivery', 'express',
  'imports', 'exports', 'trade', 'commerce', 'sales', 'market', 'outlet', 'boutique', 'design', 'connect', 'network', 'link',
  'soft', 'hard', 'sys', 'data', 'code', 'stack', 'cloud', 'host', 'server', 'net',
  'fix', 'help', 'care', 'support', 'assist', 'guide', 'learn', 'teach', 'train', 'coach',
  'city', 'town', 'village', 'state', 'country', 'world', 'planet', 'universe',

  // Spanish Geo & Niches
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'latam', 'peru', 'ven', 'ecu', 'bol', 'uy', 'py', 'cr', 'pan', 'dom', 'gt', 'hn', 'sv', 'ni',
  'ventas', 'compra', 'outlet', 'promo', 'oferta', 'ganga', 'lujo', 'premium', 'vip', 'exclusivo',
  'asociados', 'socios', 'partners', 'aliados', 'servicios', 'soluciones', 'sistemas', 'grupo', 'equipo',
  
  // Beauty/Fashion
  'moda', 'style', 'look', 'outfit', 'wear', 'closet', 'boutique', 'showroom', 'makeup', 'beauty', 'skin', 'hair', 'nails', 'lashes', 'brows', 'spa',
  'belleza', 'estetica', 'salon', 'barber', 'tattoo', 'ink', 'piercing', 'joyas', 'accesorios', 'shoes', 'calzado', 'bolsos',
  'cejas', 'pestañas', 'uñas', 'piel', 'cabello', 'pelo', 'corte', 'tinte', 'color', 'mechas', 'balayage',
  
  // Food/Health
  'food', 'eats', 'bites', 'kitchen', 'cocina', 'recetas', 'sabor', 'gourmet', 'deli', 'bakery', 'pasteles', 'postres', 'dulces', 'snacks',
  'fit', 'fitness', 'gym', 'training', 'entreno', 'crossfit', 'yoga', 'pilates', 'run', 'bike', 'sport', 'deporte', 'salud', 'nutri', 'diet', 'keto', 'vegan',
  'burger', 'pizza', 'sushi', 'tacos', 'wings', 'bbq', 'grill', 'cafe', 'coffee', 'bar', 'drinks', 'cocktails', 'cerveza', 'vino',
  'organico', 'natural', 'fresco', 'casero', 'artesanal', 'bio', 'eco', 'green', 'verde',
  
  // Home/Events
  'home', 'casa', 'deco', 'design', 'interior', 'muebles', 'jardin', 'plantas', 'flores', 'eventos', 'bodas', 'fiesta', 'party', 'dj', 'music',
  'travel', 'viajes', 'tours', 'trips', 'turismo', 'vuelos', 'hoteles', 'destinos', 'aventura', 'expedicion',
  'boda', 'xv', 'bautizo', 'cumple', 'fiesta', 'show', 'envivo', 'live'
];

const funnyPrefixes = [
  // English
  'mr', 'mrs', 'not', 'actually', 'maybe', 'internet', 'just', 'bad', 'sad', 'mad', 'rad', 'ok', 'lil', 'big',
  'the_famous', 'the_only', 'your_local', 'future', 'expert', 'master', 'king', 'queen', 'lord', 'lady', 'captain',
  'simp', 'stan', 'fan', 'hater', 'bot', 'npc', 'main', 'alt', 'smurf', 'noob', 'pro', 'god', 'dog', 'cat',
  'ceo_of', 'president_of', 'inventor_of', 'fan_club_', 'official_', 'real_', 'fake_',
  'based', 'cringe', 'cursed', 'blessed', 'wholesome', 'toxic', 'salty', 'spicy', 'sweet', 'sour',

  // Spanish / Slang / Titles
  'el_sr', 'la_sra', 'don', 'doña', 'fan_de', 'odio_a', 'soy_el', 'tu_vecino', 'ese_tal', 'capitan', 'comandante', 'general',
  'el_propio', 'la_propia', 'un_tal', 'una_tal', 'aquel', 'aquella', 'casi', 'medio', 'super', 'mega', 're', 'muy',
  'niño', 'niña', 'chico', 'chica', 'pibe', 'piba', 'tio', 'tia', 'primo', 'prima', 'vecino', 'vecina', 'amigo', 'enemigo',
  'jefe', 'jefa', 'rey', 'reina', 'principe', 'princesa', 'lord', 'lady', 'master', 'crack', 'idolo', 'fan', 'hater',
  'senor', 'senora', 'joven', 'abuelo', 'abuela', 'perro', 'gato', 'pollo', 'pato',
  'el_famoso', 'la_famosa', 'el_unico', 'la_unica', 'tu_peor_pesadilla', 'tu_mejor_amigo', 'tu_ex', 'tu_crush',
  'casi_guapo', 'casi_rico', 'casi_famoso', 'casi_listo', 'futuro_rico', 'futuro_famoso', 'futuro_meme',
  'experto_en', 'maestro_de', 'adicto_a', 'amante_de', 'el_verdadero', 'la_verdadera',
  'no_soy', 'soy_yo', 'un_tipo_normal', 'una_chica_normal', 'alguien', 'nadie', 'el_mismisimo', 'la_mismisima',
  'el_brayan', 'la_brittany', 'don_comedia', 'licenciado', 'ingeniero',
  'team_', 'clan_', 'gremio_', 'secta_', 'club_de_', 'fans_de_',
  'el_toxico', 'la_toxica', 'el_bebe', 'la_bebe', 'el_patron', 'la_patrona'
];

const funnySuffixes = [
  // English
  'fail', 'lol', 'meme', '404', 'plz', 'stop', 'who', 'nope', 'yep', 'ok', 'bye', 'hi', 'wtf', 'omg', 'uwu', 'owo', 'xd',
  'gaming', 'plays', 'streams', 'tv', 'live', 'clips', 'vids', 'shorts', 'reels', 'tiktok', 'gram',
  'core', 'wave', 'check', 'reveal', 'leaks', 'spoilers', 'rants', 'thoughts', 'moods', 'vibes',
  'energy', 'spirit', 'ghost', 'demon', 'angel', 'god', 'legend', 'myth', 'icon', 'star',
  
  // Spanish States/Actions
  'dice', 'sabe', 'loco', 'loca', 'feo', 'guapo', 'tonto', 'listo', 'nomas', 'vip', 'en_paro', 'cansado', 'dormido', 'despierto',
  'comiendo', 'jugando', 'estudiando', 'trabajando', 'pensando', 'soñando', 'viviendo', 'muriendo', 'llorando', 'riendo', 'gritando',
  'feliz', 'triste', 'enojado', 'aburrido', 'ocupado', 'libre', 'solo', 'sola', 'juntos', 'revuelto', 'batido',
  'picante', 'dulce', 'salado', 'agrio', 'amargo', 'frio', 'caliente', 'tibio', 'fresco', 'rancio', 'podrido',
  'toxico', 'toxica', 'drama', 'queen', 'king', 'bebe', 'bb', 'mutante', 'alien', 'zombie', 'robot', 'fantasma',
  'sin_dinero', 'sin_filtro', 'sin_suerte', 'con_sueno', 'con_hambre', 'con_sed', 'con_frio', 'con_calor',
  'habla', 'piensa', 'siente', 'baila', 'canta', 'corre', 'salta', 'duerme', 'come', 'bebe',
  'oficial', 'fake', 'parody', 'tribute', 'fanpage', 'y_sus_amigos', 'y_compañia', 'y_asociados',
  'en_calzoncillos', 'en_pijama', 'en_chanclas', 'borracho', 'sobrio', 'genio', 'burro',
  'posting', 'shitposting', 'memes', 'humor', 'risas', 'fails', 'wins', 'bloopers',
  'y_que', 'y_punto', 'y_ya', 'y_adios', 'el_regreso', 'la_venganza',
  'verse', 'mundo', 'landia', 'polis', 'ciudad', 'pueblo', 'villa',
  'flow', 'drip', 'style', 'swag', 'flex', 'hype', 'clout', 'gang'
];

// Fallback nouns for randomization
const randomNouns = [
  // Animals
  'panda', 'cactus', 'gato', 'perro', 'oso', 'lobo', 'tigre', 'leon', 'zorro', 'buho', 'pez', 'ave', 'aguila', 'halcon', 'dragon',
  'conejo', 'ciervo', 'koala', 'sloth', 'mono', 'pato', 'cisne', 'tibu', 'delfin', 'ballena', 'pulpo', 'medusa', 'coral',
  'hamster', 'loro', 'tucan', 'iguana', 'rana', 'sapo', 'vibora', 'serpiente', 'cabra', 'oveja', 'vaca', 'toro',
  'mapache', 'nutria', 'erizo', 'foca', 'pingüino', 'jirafa', 'zebra', 'elefante', 'rino', 'hipo',
  'kitten', 'puppy', 'bunny', 'bear', 'wolf', 'tiger', 'lion', 'fox', 'owl', 'fish', 'bird', 'eagle', 'hawk', 'dragon',
  
  // Nature
  'luna', 'sol', 'mar', 'cielo', 'rio', 'monte', 'lago', 'ola', 'sal', 'arena', 'roca', 'piedra', 'volcan', 'rayo',
  'hoja', 'arbol', 'pino', 'palma', 'flor', 'rosa', 'lirio', 'loto', 'raiz', 'semilla', 'fruta', 'coco', 'mango', 'kiwi',
  'playa', 'montaña', 'campo', 'desierto', 'selva', 'bosque', 'jardin', 'huerto', 'parque', 'valle', 'cueva', 'cascada',
  'nube', 'niebla', 'trueno', 'viento', 'fuego', 'ceniza', 'humo', 'chispa', 'llama',
  'moon', 'sun', 'sea', 'sky', 'river', 'mount', 'lake', 'wave', 'salt', 'sand', 'rock', 'stone', 'volcano', 'ray',
  
  // Objects/Tech
  'pixel', 'glitch', 'data', 'code', 'wifi', 'disco', 'vinyl', 'tape', 'radio', 'tv', 'camara', 'lente', 'foco', 'libro',
  'taza', 'vaso', 'mesa', 'silla', 'sofa', 'cama', 'reloj', 'gafas', 'bolso', 'zapato', 'llave', 'mapa',
  'movil', 'celu', 'compu', 'tablet', 'pantalla', 'teclado', 'mouse', 'cable', 'bateria', 'cargador', 'audifonos',
  'guitarra', 'piano', 'bombo', 'flauta', 'violin', 'bajo', 'micro', 'altavoz', 'consola', 'mando',
  'robot', 'cyborg', 'drone', 'laser', 'radar', 'sonar', 'motor', 'chip', 'bot', 'server',
  'pincel', 'lienzo', 'tinta', 'papel', 'lapiz', 'pluma', 'goma', 'regla',
  
  // Abstract
  'viaje', 'sueño', 'idea', 'plan', 'meta', 'fin', 'inicio', 'norte', 'sur', 'este', 'oeste', 'ruta', 'camino',
  'oro', 'plata', 'bronce', 'hierro', 'acero', 'cobre', 'neon', 'laser', 'plasma', 'aura', 'karma', 'zen',
  'amor', 'paz', 'fe', 'esperanza', 'suerte', 'exito', 'fama', 'dinero', 'poder', 'gloria',
  'tiempo', 'espacio', 'luz', 'oscuridad', 'sombra', 'color', 'forma', 'fondo', 'ritmo', 'sonido',
  'caos', 'orden', 'ley', 'justicia', 'verdad', 'mentira', 'secreto', 'misterio',
  'vibe', 'mood', 'flow', 'style', 'swag', 'drip', 'hype', 'clout', 'flex', 'gang',
  
  // Food
  'taco', 'pizza', 'sushi', 'burger', 'pan', 'queso', 'vino', 'cerveza', 'agua', 'jugo',
  'cafe', 'te', 'mate', 'leche', 'choco', 'dulce', 'sal', 'pimienta', 'limon', 'chile',
  'fruta', 'verdura', 'carne', 'pollo', 'arroz', 'pasta', 'sopa', 'ensalada', 'helado', 'pastel',
  'matcha', 'boba', 'mochi', 'ramen', 'curry', 'arepa', 'empanada', 'asado', 'tapas', 'paella',
  'cookie', 'candy', 'sugar', 'spice', 'honey', 'jam', 'jelly', 'bean', 'nut', 'berry',

  // Zodiac (ES/EN)
  'aries', 'tauro', 'geminis', 'cancer', 'leo', 'virgo', 'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis',
  'taurus', 'gemini', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  
  // Fandom/Pop Culture
  'army', 'blink', 'once', 'stay', 'swiftie', 'stan', 'fan', 'idol', 'bias', 'uwu', 'owo',
  'otaku', 'gamer', 'geek', 'nerd', 'weeb', 'simp', 'chad', 'karen', 'boomer', 'zoomer'
];

const randomAdjectives = [
  // English
  'happy', 'crazy', 'super', 'mega', 'ultra', 'mini', 'big', 'lit', 'chill', 'cool', 'bad', 'good', 'sad', 'mad',
  'top', 'hit', 'hot', 'random', 'fail', 'win', 'basic', 'extra', 'pro', 'noob', 'raw', 'wild',
  'shy', 'bold', 'brave', 'calm', 'lost', 'found', 'glad', 'warm', 'cold', 'icy', 'wet', 'dry',
  'soft', 'hard', 'smooth', 'rough', 'fast', 'slow', 'loud', 'quiet', 'bright', 'dark',
  'real', 'fake', 'true', 'false', 'high', 'low', 'up', 'down', 'left', 'right',
  'savage', 'toxic', 'sweet', 'salty', 'bitter', 'sour', 'spicy', 'mild', 'fresh', 'stale',
  'clean', 'dirty', 'rich', 'poor', 'cheap', 'expensive', 'free', 'paid', 'easy', 'hard',
  
  // Spanish
  'feliz', 'loco', 'gran', 'nuevo', 'viejo', 'dulce', 'lindo', 'puro', 'rico', 'suave', 'fuerte', 'bravo', 'digno',
  'rapido', 'lento', 'alto', 'bajo', 'gordo', 'flaco', 'bueno', 'malo', 'santo', 'diablo', 'divino', 'human',
  'azul', 'rojo', 'negro', 'blanco', 'gris', 'verde', 'rosa', 'lila', 'cián', 'ocre', 'jade', 'rubi', 'ambar',
  'chido', 'padre', 'bacano', 'chimba', 'chevere', 'guay', 'mola', 'piola', 'facha', 'zarpado', 'brutal', 'genial',
  'triste', 'enojado', 'cansado', 'harto', 'listo', 'tonto', 'feo', 'guapo', 'hermoso', 'horrible', 'raro', 'normal',
  'grande', 'pequeño', 'mediano', 'enorme', 'diminuto', 'ancho', 'estrecho', 'largo', 'corto',
  'duro', 'blando', 'seco', 'mojado', 'frio', 'caliente', 'tibio', 'helado', 'limpio', 'sucio',
  'fugaz', 'eterno', 'libre', 'salvaje', 'amargo', 'picante', 'agrio', 'soso',
  'parce', 'chamo', 'weon', 'pibe', 'tio', 'primo', 'compa', 'bro', 'sis', 'bestie', 'mate',
  'urbano', 'calle', 'barrio', 'real', 'leal', 'fiel', 'infiel', 'toxico', 'sano'
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
  
  // Clean input and provide a fallback if empty
  const cleanKeyword = cleanInput(keyword);
  const base = cleanKeyword || randomNouns[Math.floor(Math.random() * randomNouns.length)];
  
  const results: GeneratedName[] = [];
  const generatedSet = new Set<string>(); // Prevent duplicates in the same batch
  
  // Platform Constraints
  const maxLength = platform === 'twitter' ? 15 : 30;
  
  // Helper to add a result safely
  const add = (name: string, cat: NameCategory) => {
    let finalName = name;

    // Post-processing: Underscores (Platform Logic)
    // TikTok loves underscores/dots, Youtube handles avoid them usually but possible
    if (includeUnderscores && !finalName.includes('_') && Math.random() > 0.7) {
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

    // Strict Platform Limit Enforcement
    if (finalName.length > maxLength) {
        // If too long, try to trim cleanly
        finalName = finalName.substring(0, maxLength);
        // Don't leave a trailing underscore or dot
        finalName = finalName.replace(/[._]$/, '');
    }

    if (!generatedSet.has(finalName)) {
      generatedSet.add(finalName);
      results.push({ id: generateId(), name: finalName, category: cat });
    }
  };

  // --- Strategies per Category ---

  // 1. Minimal (Clean, Short, Punctuation heavy)
  if (category === NameCategory.ALL || category === NameCategory.MINIMAL) {
    add(base, NameCategory.MINIMAL);
    add(`iam${base}`, NameCategory.MINIMAL);
    add(`${base}${base}`, NameCategory.MINIMAL); // Doubled
    add(`the${base}`, NameCategory.MINIMAL);
    add(`${base}here`, NameCategory.MINIMAL);
    
    // Period strategies
    if (includePeriods) {
        add(`${base}.ig`, NameCategory.MINIMAL);
        add(`${base}.raw`, NameCategory.MINIMAL);
        add(`.${base}`, NameCategory.MINIMAL);
        add(`${base}.`, NameCategory.MINIMAL);
        
        // Split with period (e.g. car.los)
        if (base.length > 3) {
          const splitIdx = Math.floor(Math.random() * (base.length - 2)) + 1;
          add(`${base.slice(0, splitIdx)}.${base.slice(splitIdx)}`, NameCategory.MINIMAL);
        }
    }
    
    // Underscore minimal strategies
    if (includeUnderscores) {
      add(`x_${base}_x`, NameCategory.MINIMAL);
      add(base.split('').join('_'), NameCategory.MINIMAL); // c_a_r_l_o_s
    }
  }

  // 2. Aesthetic (Vibe words, text transformation, soft prefixes)
  if (category === NameCategory.ALL || category === NameCategory.AESTHETIC) {
    // Generate more aesthetic options (loop 5 times for variety)
    for(let i=0; i<5; i++) {
        const pre = aestheticPrefixes[Math.floor(Math.random() * aestheticPrefixes.length)];
        const suf = aestheticSuffixes[Math.floor(Math.random() * aestheticSuffixes.length)];
        
        // Prefix oriented
        if(includePeriods && Math.random() > 0.6) add(`${pre}.${base}`, NameCategory.AESTHETIC);
        else add(`${pre}${base}`, NameCategory.AESTHETIC);

        // Suffix oriented
        if(includePeriods && Math.random() > 0.6) add(`${base}.${suf}`, NameCategory.AESTHETIC);
        else add(`${base}${suf}`, NameCategory.AESTHETIC);
        
        // Sandwich (rare but cool)
        if(Math.random() > 0.8) add(`${pre}.${base}.${suf}`, NameCategory.AESTHETIC);
    }

    // Transformations
    add(doubleVowels(base), NameCategory.AESTHETIC);
    add(replaceChars(base), NameCategory.AESTHETIC);
    
    // Vibe phrases
    if(includePeriods) {
        add(`its.${base}`, NameCategory.AESTHETIC);
        add(`${base}.pov`, NameCategory.AESTHETIC);
        add(`just.${base}`, NameCategory.AESTHETIC);
        add(`${base}.files`, NameCategory.AESTHETIC);
    } else {
        add(`its${base}`, NameCategory.AESTHETIC);
        add(`${base}pov`, NameCategory.AESTHETIC);
        add(`just${base}`, NameCategory.AESTHETIC);
    }
  }

  // 3. Business (Official, localized, professional)
  if (category === NameCategory.ALL || category === NameCategory.BUSINESS) {
    for(let i=0; i<4; i++) {
        const pre = businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)];
        const suf = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
        
        add(`${pre}${base}`, NameCategory.BUSINESS);
        if(includePeriods) add(`${pre}.${base}`, NameCategory.BUSINESS);
        else if(includeUnderscores) add(`${pre}_${base}`, NameCategory.BUSINESS);
        
        add(`${base}${suf}`, NameCategory.BUSINESS);
        if(includePeriods) add(`${base}.${suf}`, NameCategory.BUSINESS);
        else if(includeUnderscores) add(`${base}_${suf}`, NameCategory.BUSINESS);
    }
    
    // Domain style
    if(includePeriods) {
        add(`${base}.com`, NameCategory.BUSINESS);
        add(`www.${base}`, NameCategory.BUSINESS);
        add(`${base}.net`, NameCategory.BUSINESS);
        add(`${base}.app`, NameCategory.BUSINESS);
    }
  }

  // 4. Funny (Self-deprecating, memes, Spanish humor)
  if (category === NameCategory.ALL || category === NameCategory.FUNNY) {
    for(let i=0; i<4; i++) {
        const pre = funnyPrefixes[Math.floor(Math.random() * funnyPrefixes.length)];
        const suf = funnySuffixes[Math.floor(Math.random() * funnySuffixes.length)];
        
        // Funny usually uses underscores more
        if(Math.random() > 0.3) add(`${pre}_${base}`, NameCategory.FUNNY);
        else add(`${pre}${base}`, NameCategory.FUNNY);
        
        if(Math.random() > 0.3) add(`${base}_${suf}`, NameCategory.FUNNY);
        else add(`${base}${suf}`, NameCategory.FUNNY);
    }
    
    add(`yo_soy_${base}`, NameCategory.FUNNY);
    add(`odio_a_${base}`, NameCategory.FUNNY);
    add(`${base}_dice`, NameCategory.FUNNY);
    add(`${base}_sabe`, NameCategory.FUNNY);
    add(leetSpeak(base), NameCategory.FUNNY);
    add(`xX_${base}_Xx`, NameCategory.FUNNY);
    add(`i_hate_${base}`, NameCategory.FUNNY);
  }

  // 5. Fillers to ensure we have enough results (Up to ~60)
  let safetyCount = 0;
  while (results.length < 60 && safetyCount < 100) {
    safetyCount++;
    const adj = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
    const noun = randomNouns[Math.floor(Math.random() * randomNouns.length)];
    
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