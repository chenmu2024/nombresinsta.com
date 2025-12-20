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

// --- Word Banks (Optimized for 2025 Trends & UX) ---

const aestheticPrefixes = [
  // Short & Clean (High Utility)
  'the', 'its', 'just', 'real', 'iam', 'dear', 'oh', 'hey', 'yo', 'ur', 'my', 'im', 'is', 'be', 'so',
  
  // Coquette / Soft / Dreamy (Trending)
  'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'doll', 'bow', 'lace', 'silk', 'satin', 'pearl',
  'bunny', 'kitty', 'teddy', 'sweet', 'cute', 'lovely', 'cloud', 'mist', 'haze', 'blur', 'faint', 'pale',
  'vanilla', 'peach', 'mint', 'rose', 'milk', 'mocha', 'latte', 'chai', 'matcha', 'boba', 'cream', 'sugar',
  'dreamy', 'sleepy', 'fairy', 'pixie', 'witch', 'magic', 'mystic', 'divine', 'sacred', 'blessed', 'cursed',
  
  // Y2K / Cyber / Edgy
  'cyber', 'vapor', 'neo', 'glitch', 'pixel', 'static', 'noise', 'web', 'net', 'digi', 'data', 'beta',
  'toxic', 'brat', 'savage', 'feral', 'wild', 'mad', 'bad', 'sad', 'rad', 'sick', 'vile', 'grim', 'void',
  'chaos', 'panic', 'manic', 'lost', 'found', 'gone', 'dead', 'alive', 'faded', 'jaded', 'broken', 'whole',
  
  // Nature / Elements
  'lunar', 'solar', 'cosmic', 'astral', 'polar', 'arctic', 'zenith', 'nadir',
  'ocean', 'river', 'lake', 'rain', 'storm', 'snow', 'ice', 'fire', 'wind', 'earth',
  'golden', 'silver', 'crystal', 'ruby', 'jade', 'amber', 'onyx', 'ivory', 'ebony',
  'blooming', 'wilting', 'growing', 'flowing', 'glowing', 'shining',
  
  // Spanish Aesthetic (Emotive & Gendered - Moved Niña/Niño here)
  'soy', 'yosoy', 'tu', 'mi', 'la', 'el', 'una', 'un',
  'niña', 'niño', 'chica', 'chico', 'pibe', 'piba', 'nena', 'nene', // Moved from Funny
  'luna', 'sol', 'mar', 'cielo', 'flor', 'luz', 'paz', 'fe',
  'dulce', 'suave', 'linda', 'bonita', 'chula', 'guapa', 'bella',
  'alma', 'mente', 'vida', 'amor', 'aire', 'brisa', 'nube',
  'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'caos',
  'poesia', 'arte', 'musa', 'ninfa', 'diosa', 'reina', 'dama',
  'eterea', 'fugaz', 'eterna', 'divina', 'santa', 'pura',
  'triste', 'feliz', 'loca', 'rara', 'unica', 'sola', 'mia'
];

const aestheticSuffixes = [
  // Social / Content Creator
  'gram', 'vibe', 'vibes', 'mood', 'diary', 'journal', 'log', 'files', 'folder', 'archive', 'dump',
  'pov', 'cam', 'film', 'films', 'clips', 'cuts', 'edits', 'visuals', 'shots', 'snaps', 'pics', 'lens',
  'life', 'style', 'world', 'wrld', 'land', 'planet', 'zone', 'space', 'room', 'corner', 'spot',
  'blog', 'daily', 'weekly', 'notes', 'pages', 'thoughts', 'minds', 'soul', 'heart',
  
  // Community / Identity
  'club', 'cult', 'gang', 'squad', 'crew', 'team', 'fam', 'house', 'home', 'society', 'union',
  'girl', 'boy', 'kid', 'babe', 'baby', 'doll', 'angel', 'witch', 'fairy', 'queen', 'king', 'prince',
  'lover', 'dreamer', 'thinker', 'maker', 'artist', 'poet', 'muse', 'icon', 'star', 'hero', 'villain',
  
  // Aesthetic Locations/Objects
  'garden', 'park', 'forest', 'jungle', 'desert', 'beach', 'coast', 'bay', 'city', 'town',
  'heaven', 'hell', 'limbo', 'void', 'abyss', 'nexus', 'matrix', 'system',
  'castle', 'palace', 'tower', 'fort', 'base', 'hq', 'lab', 'studio', 'atelier',
  
  // Abstract / Suffixes
  'core', 'wave', 'gaze', 'punk', 'pop', 'bop', 'jam', 'tune', 'beat', 'flow', 'drip',
  'xo', 'xx', 'xxx', 'zzz', 'yyy', 'inc', 'co', 'ltd', 'est', 'hq',
  'mode', 'state', 'mind', 'set', 'kit', 'pack', 'box', 'bag',
  
  // Spanish Suffixes
  'vida', 'amor', 'sol', 'luna', 'mar', 'mundo', 'landia', 'polis',
  'bby', 'bebe', 'mami', 'papi', 'chula', 'linda',
  'oficial', 'real', 'fake', 'fan', 'fans', 'club',
  'verso', 'texto', 'frase', 'cita', 'nota', 'foto', 'video',
  'viaje', 'ruta', 'camino', 'paso', 'huella',
  'mente', 'alma', 'ser', 'estar', 'ver', 'oir',
  'latina', 'latino', 'mex', 'arg', 'esp', 'col', 'cl'
];

const businessPrefixes = [
  // Authority / Professional - Cleaned up "Secure/Safe" terms
  'official', 'weare', 'the', 'team', 'group', 'club', 'hq', 'pro', 'get', 'try', 'use', 'go',
  'top', 'best', 'prime', 'elite', 'alpha', 'mega', 'ultra', 'super', 'hyper', 'meta',
  'global', 'local', 'smart', 'fast', 'easy', 'vip', 'premium',
  'ceo', 'founder', 'owner', 'boss', 'admin', 'lead', 'head', 'chief', 'master',
  'dr', 'prof', 'coach', 'chef', 'ing', 'arq', 'lic', 'abog',
  
  // Spanish Business
  'somos', 'grupo', 'equipo', 'tu', 'su', 'mi', 'nuestro',
  'tienda', 'bazar', 'mercado', 'taller', 'estudio', 'oficina', 'despacho', 'agencia', 'firma',
  'centro', 'punto', 'base', 'sede', 'casa', 'hogar', 'mundo', 'zona', 'area',
  'info', 'dato', 'tips', 'guia', 'blog', 'vlog', 'web', 'net', 'app',
  'hola', 'soy', 'yo_soy', 'el_sr', 'la_sra', 'don', 'doña',
  'ventas', 'renta', 'compra', 'pago', 'envio', 'promo', 'oferta'
];

const businessSuffixes = [
  // Corporate / Entity
  'official', 'biz', 'co', 'inc', 'ltd', 'llc', 'corp', 'group', 'team', 'squad',
  'studio', 'agency', 'lab', 'labs', 'works', 'solutions', 'systems', 'tech', 'dev', 'soft',
  'hub', 'center', 'spot', 'place', 'point', 'base', 'station', 'zone', 'area',
  'shop', 'store', 'market', 'mart', 'outlet', 'boutique', 'bazaar', 'trade',
  'press', 'news', 'media', 'cast', 'tv', 'fm', 'radio', 'daily', 'weekly', 'times', 'post',
  
  // Industry Specific
  'design', 'art', 'creative', 'visuals', 'graphics', 'print', 'ink',
  'food', 'eats', 'kitchen', 'cook', 'chef', 'bakes', 'cakes', 'cafe', 'coffee', 'bar', 'grill',
  'fit', 'fitness', 'gym', 'lift', 'run', 'yoga', 'sport', 'health', 'med', 'care',
  'beauty', 'skin', 'hair', 'nails', 'lash', 'brows', 'glam', 'glow', 'spa', 'cosmetics',
  'home', 'house', 'decor', 'living', 'space', 'build', 'studio',
  'travel', 'trips', 'tours', 'guide', 'go', 'fly', 'stay', 'visit',
  
  // Spanish & Location
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'pe', 've', 'uy', 'cr', 'pa', 'gt',
  'tienda', 'online', 'digital', 'virtual', 'web', 'net',
  'mexico', 'madrid', 'bcn', 'cdmx', 'ba', 'bog', 'lim', 'scl',
  'servicios', 'asociados', 'consultores', 'asesores', 'expertos',
  'moda', 'belleza', 'salud', 'hogar', 'cocina', 'deporte', 'arte'
];

const funnyPrefixes = [
  // Self-Deprecating / Internet Slang
  'not', 'actually', 'maybe', 'just', 'bad', 'sad', 'mad', 'rad',
  'ceo_of', 'president_of', 'inventor_of', 'king_of', 'queen_of', 'god_of',
  'simp_for', 'stan_', 'fan_of_', 'hater_of_', 'victim_of_',
  'mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'capt', 'sir', 'lord', 'lady',
  'lil', 'big', 'yung', 'old', 'smol', 'tol',
  'the_real', 'the_fake', 'the_only', 'your_local', 'internet_',
  
  // Spanish Funny (Removed generic "Niño/Niña", kept Titles/Memes)
  'el_sr', 'la_sra', 'don', 'doña', 'un_tal', 'una_tal',
  'ese_', 'esa_', 'aquel_', 'aquella_',
  'soy_el_', 'soy_la_', 'no_soy_',
  'casi_', 'medio_', 'super_', 'mega_', 're_',
  'el_toxico', 'la_toxica', 'el_brayan', 'la_brittany',
  'tu_ex_', 'tu_crush_', 'tu_vecino_', 'tu_patron_'
];

const funnySuffixes = [
  // Actions / States
  'fail', 'wins', 'plays', 'games', 'gaming', 'tt', 'tv', 'yt',
  'meme', 'memes', 'shitpost', 'posting', 'spam', 'trash', 'junk',
  '404', 'exe', 'png', 'jpg', 'gif', 'mp4', 'pdf', 'zip',
  'lol', 'lmao', 'xd', 'uwu', 'owo', 'omg', 'wtf', 'plz', 'thx', 'bye',
  'stop', 'help', 'nope', 'yep', 'maybe', 'idk', 'idc',
  'who', 'what', 'where', 'when', 'why', 'how',
  
  // Spanish Actions
  'dice', 'sabe', 'piensa', 'cree', 'siente',
  'loco', 'loca', 'feo', 'fea', 'guapo', 'guapa',
  'tonto', 'tonta', 'listo', 'lista', 'genio',
  'triste', 'feliz', 'enojado', 'cansado', 'harto',
  'pobre', 'rico', 'humilde', 'fresa', 'naco',
  'oficial', 'fake', 'real', '100', 'mil',
  'y_sus_amigos', 'y_cia', 'el_regreso', 'la_venganza'
];

// Fallback nouns for randomization (Enhanced Variety)
const randomNouns = [
  // Animals (Short & Iconic)
  'cat', 'dog', 'fox', 'wolf', 'bear', 'lion', 'tiger', 'bat', 'owl', 'crow',
  'gato', 'perro', 'oso', 'lobo', 'zorro', 'buho', 'pato', 'rana', 'pez',
  'panda', 'koala', 'bunny', 'kitty', 'puppy', 'dino', 'dragon',
  
  // Nature (Aesthetic)
  'moon', 'sun', 'star', 'sky', 'cloud', 'rain', 'snow', 'storm', 'wind',
  'luna', 'sol', 'mar', 'rio', 'lago', 'nube', 'flor', 'hoja', 'rosa',
  'rose', 'lily', 'lotus', 'tulip', 'daisy', 'fern', 'moss', 'pine',
  
  // Objects / Concepts
  'book', 'art', 'ink', 'pen', 'code', 'data', 'game', 'song', 'film',
  'libro', 'arte', 'foto', 'cine', 'cafe', 'pan', 'vino', 'luz', 'paz',
  'love', 'hate', 'life', 'death', 'time', 'luck', 'fate', 'soul', 'mind',
  'chaos', 'void', 'abyss', 'nexus', 'pulse', 'echo', 'noise', 'glitch'
];

const randomAdjectives = [
  // English
  'happy', 'sad', 'mad', 'bad', 'good', 'rad', 'lit', 'hot', 'cold',
  'fast', 'slow', 'big', 'lil', 'smol', 'tiny', 'huge', 'epic',
  'lost', 'found', 'gone', 'here', 'near', 'far', 'free', 'wild',
  'soft', 'hard', 'pure', 'dark', 'pale', 'neon', 'real', 'fake',
  
  // Spanish
  'feliz', 'triste', 'loco', 'cuerdo', 'bueno', 'malo', 'rico', 'pobre',
  'gran', 'peque', 'alto', 'bajo', 'nuevo', 'viejo', 'joven',
  'azul', 'rojo', 'verde', 'gris', 'rosa', 'lila', 'negro', 'blanco',
  'libre', 'preso', 'dulce', 'agrio', 'frio', 'tibio', 'fresco'
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
    // FIX: Removed pure 'base' addition to avoid unrealistic single-word suggestions like "@belleza"
    // add(base, NameCategory.MINIMAL); 
    
    add(`iam${base}`, NameCategory.MINIMAL);
    add(`${base}${base}`, NameCategory.MINIMAL); // Doubled
    add(`the${base}`, NameCategory.MINIMAL);
    add(`${base}here`, NameCategory.MINIMAL);
    add(`not${base}`, NameCategory.MINIMAL);
    
    // Period strategies (Very popular for Minimal)
    if (includePeriods) {
        add(`${base}.ig`, NameCategory.MINIMAL);
        add(`${base}.raw`, NameCategory.MINIMAL);
        // Note: The 'add' validation will strip leading dots if generated here
        add(`.${base}`, NameCategory.MINIMAL); 
        add(`${base}.`, NameCategory.MINIMAL);
        add(`its.${base}`, NameCategory.MINIMAL);
        
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
    
    // Vibe phrases (Updated for UX)
    if(includePeriods) {
        add(`pov.${base}`, NameCategory.AESTHETIC);
        add(`${base}.dump`, NameCategory.AESTHETIC);
        add(`just.${base}`, NameCategory.AESTHETIC);
        add(`${base}.files`, NameCategory.AESTHETIC);
        add(`${base}.vibe`, NameCategory.AESTHETIC);
    } else {
        add(`pov${base}`, NameCategory.AESTHETIC);
        add(`${base}dump`, NameCategory.AESTHETIC);
        add(`just${base}`, NameCategory.AESTHETIC);
        add(`${base}vibe`, NameCategory.AESTHETIC);
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
        add(`${base}.mx`, NameCategory.BUSINESS);
        add(`${base}.es`, NameCategory.BUSINESS);
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
    add(`tu_amiga_${base}`, NameCategory.FUNNY);
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