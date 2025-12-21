import { GeneratedName, NameCategory, GeneratorOptions } from '../types';

// --- Helper: Clean Input ---
const cleanInput = (input: string): string => {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- 1. SMART SYNONYMS DATABASE ---
// Mapping common keywords to related aesthetic/popular terms
const SYNONYMS: Record<string, string[]> = {
  // Emotions/Vibes
  'feliz': ['happy', 'joy', 'smile', 'lucky', 'sunny', 'fun'],
  'happy': ['feliz', 'joy', 'smile', 'lucky', 'sunny', 'vibe'],
  'sad': ['triste', 'blue', 'grey', 'mood', 'alone', 'broken'],
  'triste': ['sad', 'blue', 'grey', 'mood', 'alone', 'melancholy'],
  'love': ['amor', 'heart', 'luv', 'xoxo', 'soul', 'bae', 'crush'],
  'amor': ['love', 'heart', 'corazon', 'latido', 'passion', 'ternura'],
  'life': ['vida', 'live', 'world', 'days', 'diary', 'daily'],
  'vida': ['life', 'vivir', 'mundo', 'diario', 'alma', 'vital'],
  
  // Beauty & Fashion (Expanded)
  'belleza': ['beauty', 'glow', 'glam', 'skin', 'pretty', 'linda', 'muse', 'diva', 'face', 'aura'],
  'beauty': ['belleza', 'glow', 'glam', 'cosmetic', 'pretty', 'lovely', 'muse'],
  'makeup': ['mua', 'face', 'look', 'glam', 'paint', 'shade', 'tint', 'blush'],
  'maquillaje': ['makeup', 'mua', 'look', 'color', 'arte', 'face'],
  'skin': ['piel', 'derma', 'glow', 'care', 'soft', 'face'],
  'piel': ['skin', 'face', 'care', 'derma', 'suave', 'glow'],
  'hair': ['pelo', 'cabello', 'style', 'cut', 'waves', 'curls'],
  'pelo': ['hair', 'melena', 'rizos', 'look', 'style'],
  
  // Categories
  'viaje': ['travel', 'trip', 'wander', 'tour', 'fly', 'map', 'ruta', 'world'],
  'travel': ['viaje', 'trip', 'wander', 'world', 'nomad', 'go', 'journey'],
  'moda': ['fashion', 'style', 'look', 'outfit', 'wear', 'chic', 'vogue', 'trend'],
  'fashion': ['moda', 'style', 'look', 'trend', 'classy', 'glam', 'runway'],
  'game': ['play', 'gamer', 'win', 'quest', 'level', 'pixel', 'arcade'],
  'gamer': ['play', 'game', 'win', 'pro', 'noob', 'gg', 'player'],
  'juego': ['play', 'game', 'fun', 'win', 'zone'],
  'arte': ['art', 'draw', 'sketch', 'paint', 'ink', 'color', 'visual'],
  'art': ['arte', 'design', 'visual', 'creative', 'muse', 'gallery'],
  'music': ['musica', 'song', 'tune', 'beat', 'sound', 'audio', 'vibe'],
  'musica': ['music', 'cancion', 'ritmo', 'sonido', 'voz', 'melodia'],
  'foto': ['photo', 'pic', 'cam', 'shot', 'lens', 'focus', 'frame'],
  'photo': ['foto', 'pic', 'image', 'visual', 'capture', 'studio'],
  'tech': ['code', 'data', 'dev', 'soft', 'app', 'web', 'cyber'],
  'book': ['libro', 'read', 'page', 'story', 'novel', 'words'],
  'libro': ['book', 'leer', 'hoja', 'cuento', 'texto', 'letras'],
  'food': ['comida', 'eat', 'yum', 'chef', 'cook', 'tasty', 'bites'],
  'comida': ['food', 'rico', 'sabor', 'delish', 'cocina', 'gusto'],
  'fit': ['gym', 'run', 'strong', 'power', 'health', 'body', 'train'],
  'gym': ['fit', 'lift', 'sport', 'train', 'muscle', 'active'],
  
  // Colors/Nature
  'luna': ['moon', 'night', 'lunar', 'cielo', 'star', 'cosmos'],
  'moon': ['luna', 'night', 'orbit', 'sky', 'glow', 'phase'],
  'sol': ['sun', 'sunny', 'shine', 'light', 'day', 'ray'],
  'sun': ['sol', 'sunny', 'shine', 'ray', 'bright', 'golden'],
  'mar': ['sea', 'ocean', 'wave', 'blue', 'agua', 'tide'],
  'sea': ['mar', 'ocean', 'beach', 'coast', 'water', 'salt'],
  'flor': ['flower', 'bloom', 'rose', 'garden', 'nature', 'petal'],
  'flower': ['flor', 'bloom', 'petal', 'rose', 'lily', 'botanic']
};

// --- Word Banks (Refined for Spanish Context) ---
const aestheticPrefixes = [
  // English (Global Aesthetic)
  'the', 'its', 'just', 'real', 'iam', 'dear', 'oh', 'hey', 'yo', 'ur', 'my', 'im', 'is', 'be', 'so',
  'only', 'simply', 'truly', 'daily', 'ever', 'never', 'still', 'keep', 'own', 'our', 'all',
  'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'doll', 'bow', 'lace', 'silk',
  'bunny', 'kitty', 'sweet', 'cute', 'lovely', 'cloud', 'mist', 'pale',
  'vanilla', 'peach', 'mint', 'rose', 'milk', 'mocha', 'latte', 'chai',
  'sage', 'beige', 'noir', 'blanc', 'luxe', 'velvet',
  'dreamy', 'fairy', 'magic', 'mystic', 'divine',
  'glossy', 'shiny', 'icy', 'rosy', 'golden', 'silver', 'glass', 'crystal',
  'lunar', 'solar', 'cosmic', 'astral', 'nova', 'halo',
  
  // Spanish (Natural & Aesthetic)
  'soy', 'yosoy', 'tu', 'mi', 'la', 'el', 'una', 'un',
  'luna', 'sol', 'mar', 'cielo', 'flor', 'luz', 'paz', 'sal', 'arena', 'bruma',
  'dulce', 'suave', 'linda', 'bonita', 'chula', 'guapa', 'bella', 'hermosa', 'divina',
  'alma', 'mente', 'vida', 'amor', 'aire', 'brisa', 'nube',
  'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'fuego', 'hielo',
  'zona', 'mundo', 'espacio', 'rincon', 'diario', 'nota', 'carta',
  'puro', 'eterno', 'nuevo', 'simple', 'real'
];

const aestheticSuffixes = [
  // English
  'gram', 'vibe', 'vibes', 'mood', 'diary', 'journal', 'log', 'files', 'folder', 'archive', 'dump',
  'pov', 'cam', 'film', 'films', 'clips', 'cuts', 'edits', 'visuals', 'shots', 'snaps', 'pics', 'lens',
  'life', 'style', 'world', 'wrld', 'land', 'planet', 'zone', 'space', 'room', 'corner', 'spot',
  'blog', 'daily', 'weekly', 'notes', 'pages', 'thoughts', 'minds', 'soul', 'heart', 'spirit',
  'club', 'cult', 'gang', 'squad', 'crew', 'team', 'fam', 'house', 'home', 'society', 'union',
  'girl', 'boy', 'kid', 'babe', 'baby', 'doll', 'angel', 'witch', 'fairy', 'queen', 'king', 'prince',
  'fan', 'stan', 'enthusiast', 'addict', 'lover', 'geek', 'pro',
  'core', 'wave', 'gaze', 'punk', 'pop', 'bop', 'jam', 'tune', 'beat', 'flow', 'drip',
  'xo', 'xx', 'xxx', 'inc', 'co', 'hq', 'id', 'os', 'is', 'ia', 'io',
  
  // Spanish
  'vida', 'amor', 'sol', 'luna', 'mar', 'mundo', 'landia',
  'bby', 'bebe', 'mami', 'papi', 'chula', 'linda', 'guapo',
  'real', 'fan', 'fans', 'club', 'blog',
  'verso', 'texto', 'frase', 'cita', 'nota', 'foto', 'video', 'grafia',
  'viaje', 'ruta', 'camino', 'destino', 'mapa',
  'mx', 'es', 'arg', 'latino', 'latina'
];

const businessPrefixes = [
  'official', 'weare', 'the', 'team', 'group', 'club', 'hq', 'pro', 'get', 'try', 'use', 'go',
  'top', 'best', 'prime', 'elite', 'alpha', 'mega', 'ultra', 'super', 'hyper', 'meta', 'next',
  'global', 'local', 'smart', 'fast', 'easy', 'vip', 'premium', 'select', 'first', 'star',
  'ceo', 'founder', 'owner', 'boss', 'admin', 'lead', 'head', 'chief', 'master', 'director',
  'dr', 'prof', 'coach', 'chef', 'ing', 'arq', 'lic', 'abog', 'vet', 'doc',
  'your', 'our', 'my', 'open', 'new', 'now', 'all', 'just', 'only', 'daily',
  'somos', 'grupo', 'equipo', 'tu', 'su', 'mi', 'nuestro', 'vuestro',
  'tienda', 'bazar', 'mercado', 'taller', 'estudio', 'oficina', 'despacho', 'agencia', 'firma',
  'centro', 'punto', 'base', 'sede', 'casa', 'hogar', 'mundo', 'zona', 'area', 'espacio',
  'info', 'dato', 'tips', 'guia', 'blog', 'vlog', 'web', 'net', 'app', 'link', 'sitio',
  'hola', 'soy', 'yo_soy', 'el_sr', 'la_sra', 'don', 'doña', 'doctor', 'licenciado'
];

const businessSuffixes = [
  'official', 'biz', 'co', 'inc', 'ltd', 'llc', 'corp', 'group', 'team', 'squad',
  'studio', 'studios', 'agency', 'lab', 'labs', 'works', 'solutions', 'systems', 'tech', 'dev', 'soft',
  'hub', 'center', 'spot', 'place', 'point', 'base', 'station', 'zone', 'area', 'space',
  'shop', 'store', 'market', 'mart', 'outlet', 'boutique', 'bazaar', 'trade', 'supply',
  'press', 'news', 'media', 'cast', 'tv', 'fm', 'radio', 'daily', 'weekly', 'times', 'post',
  'design', 'art', 'creative', 'visuals', 'graphics', 'print', 'ink', 'brand', 'marketing',
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'pe', 've', 'uy', 'cr', 'pa', 'gt',
  'tienda', 'online', 'digital', 'virtual', 'web', 'net', 'app', 'com',
  'mexico', 'madrid', 'bcn', 'cdmx', 'ba', 'bog', 'lim', 'scl', 'mty', 'gdl',
  'servicios', 'asociados', 'consultores', 'asesores', 'expertos', 'profesional', 'negocios'
];

// Removed negative adjectives like "feo", "tonto", "noob"
const funnyPrefixes = [
  'not', 'actually', 'maybe', 'just', 'bad', 'sad', 'mad', 'rad', 'ok',
  'ceo_of', 'president_of', 'inventor_of', 'king_of', 'queen_of', 'god_of', 'boss_of', 'fan_of',
  'simp_for', 'stan_', 'fan_of_', 'friend_of_',
  'mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'capt', 'sir', 'lord', 'lady', 'baron', 'duke',
  'lil', 'big', 'yung', 'old', 'smol', 'tol', 'fat', 'thin', 'tall', 'short',
  'the_real', 'the_fake', 'the_only', 'your_local', 'internet_', 'cyber_', 'virtual_',
  'el_sr', 'la_sra', 'don', 'doña', 'un_tal', 'una_tal',
  'ese_', 'esa_', 'aquel_', 'aquella_', 'aqui_', 'alli_',
  'soy_el_', 'soy_la_', 'no_soy_', 'falso_', 'verdadero_',
  'casi_', 'medio_', 'super_', 'mega_', 're_', 'ultra_', 'archi_',
  'el_toxico', 'la_toxica', 'el_brayan', 'la_brittany', 'el_kev',
  'tu_ex_', 'tu_crush_', 'tu_vecino_', 'tu_patron_', 'tu_tio_', 'tu_tia_', 'tu_novio_'
];

// Removed negative adjectives and added more "Internet culture" terms
const funnySuffixes = [
  'fail', 'wins', 'plays', 'games', 'gaming', 'tt', 'tv', 'yt', 'live', 'stream',
  'meme', 'memes', 'shitpost', 'posting', 'spam', 'trash', 'junk', 'stuff', 'things',
  'lol', 'lmao', 'xd', 'uwu', 'owo', 'omg', 'wtf', 'plz', 'thx', 'brb', 'afk',
  'dice', 'sabe', 'piensa', 'cree', 'siente', 'habla', 'mira', 'oye', 've',
  'loco', 'loca', 'guapo', 'guapa', 'raro', 'rara', 'chistoso',
  'listo', 'lista', 'genio', 'pro', 'god', 'master',
  'fake', '100', 'mil', '2000', '3000',
  'y_sus_amigos', 'y_cia', 'el_regreso', 'la_venganza', 'en_hd', 'en_4k',
  'oficial', 'real', 'verse', 'verso', 'zone'
];

const gamerSuffixes = ['404', 'exe', 'png', 'jpg', 'gif', 'mp4', 'zip', 'bin', 'hex', 'bot', 'npc', 'main', 'alt', 'smurf', 'buff', 'nerf', 'op', 'gg', 'ez'];

// --- Fallback Nouns ---
const fallbackNouns = [
  'nova', 'zen', 'sky', 'moon', 'star', 'vibe', 'glow', 'echo', 'flux', 'aura', 
  'soul', 'muse', 'mind', 'wave', 'flow', 'dust', 'mist', 'haze', 'neon'
];

const randomAdjectives = [
  'happy', 'sad', 'mad', 'rad', 'lit', 'soft', 'hard', 'pure', 'dark', 'pale', 'neon', 'real', 'fake',
  'feliz', 'triste', 'loco', 'rico', 'gran', 'alto', 'bajo', 'azul', 'rojo', 'verde', 'libre', 'dulce'
];

// --- Transformations ---
const leetSpeak = (text: string): string => {
  const map: Record<string, string> = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'l': '1', 'b': '8' };
  return text.split('').map(c => Math.random() > 0.6 ? (map[c] || c) : c).join('');
};

const doubleVowels = (text: string): string => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return text.split('').map(c => (vowels.includes(c) && Math.random() > 0.8) ? c + c : c).join('');
};

// --- Main Generator ---

export const generateNames = (options: GeneratorOptions): GeneratedName[] => {
  const { keyword, category, platform, includeNumbers, includePeriods, includeUnderscores, lengthPreference, customPrefix, customSuffix } = options;
  
  // --- 2. MULTI-WORD ANALYSIS ---
  const rawInput = keyword.trim();
  const hasSpace = rawInput.includes(' ');
  // Split by space, then clean each part
  const wordParts = rawInput.split(/\s+/).map(p => cleanInput(p)).filter(p => p.length > 0);
  
  // The primary clean keyword (joined if multi-word)
  const cleanKeyword = wordParts.join(''); 
  const cleanCustomPrefix = customPrefix ? cleanInput(customPrefix) : '';
  const cleanCustomSuffix = customSuffix ? cleanInput(customSuffix) : '';
  
  // --- 3. SYNONYM EXPANSION ---
  let keywordPool: string[] = [];
  
  if (cleanKeyword) {
    keywordPool.push(cleanKeyword);
    
    // Check if the input or its parts have synonyms
    // Case A: Exact match (e.g., input "viaje")
    if (SYNONYMS[cleanKeyword]) {
        keywordPool.push(...SYNONYMS[cleanKeyword]);
    }
    // Case B: English/Spanish mix check (e.g., input "viajes" -> clean "viajes" might not match "viaje")
    // Simple lemmatization attempt: remove 's'
    if (cleanKeyword.endsWith('s')) {
        const singular = cleanKeyword.slice(0, -1);
        if (SYNONYMS[singular]) keywordPool.push(...SYNONYMS[singular]);
    }
    
    // Case C: Multi-word checks (e.g., "viaje astral" -> check "viaje")
    wordParts.forEach(part => {
        if (SYNONYMS[part]) {
            // If found, we want to combine the synonym with the other parts
            // e.g. "viaje astral" -> synonym "trip" -> "tripastral"
            const synonym = SYNONYMS[part][Math.floor(Math.random() * SYNONYMS[part].length)];
            const newParts = wordParts.map(p => p === part ? synonym : p);
            keywordPool.push(newParts.join(''));
        }
    });
  } else {
    // Fallback if empty
    keywordPool = fallbackNouns;
  }

  // Deduplicate pool
  keywordPool = [...new Set(keywordPool)];

  // Helper to pick a base word for this iteration
  const getBase = () => {
     // PRIORITY TO USER KEYWORD: Only 10% chance to pick a synonym if available (was 40%)
     // This addresses the user feedback about "belleza" being the desired term.
     if (cleanKeyword && keywordPool.length > 1 && Math.random() < 0.1) {
         return keywordPool[Math.floor(Math.random() * keywordPool.length)];
     }
     return cleanKeyword || keywordPool[Math.floor(Math.random() * keywordPool.length)];
  };
  
  const results: GeneratedName[] = [];
  const generatedSet = new Set<string>();
  const maxLength = platform === 'twitter' ? 15 : 30;
  
  const add = (name: string, cat: NameCategory) => {
    let finalName = name;

    // Custom Prefix/Suffix Logic
    if (cleanCustomPrefix) {
        const joiner = (cleanCustomPrefix.endsWith('.') || cleanCustomPrefix.endsWith('_') || finalName.startsWith('.') || finalName.startsWith('_')) ? '' : ''; 
        finalName = `${cleanCustomPrefix}${joiner}${finalName}`;
    }
    if (cleanCustomSuffix) {
        const joiner = (cleanCustomSuffix.startsWith('.') || cleanCustomSuffix.startsWith('_') || finalName.endsWith('.') || finalName.endsWith('_')) ? '' : '';
        finalName = `${finalName}${joiner}${cleanCustomSuffix}`;
    }

    // Random Underscores (if enabled)
    if (includeUnderscores && cat !== NameCategory.BUSINESS && !finalName.includes('_') && Math.random() > 0.85) {
       const pos = Math.random();
       if (pos < 0.33) finalName = `_${finalName}`;
       else if (pos < 0.66) finalName = `${finalName}_`;
    }

    // Random Numbers (if enabled)
    if (includeNumbers && Math.random() > 0.8) {
       const types = [
         Math.floor(Math.random() * 99), 
         2025, 24, 25, 
         777, 444, 111,
         247, 365
       ];
       finalName += types[Math.floor(Math.random() * types.length)];
    }
    
    // Cleaning
    finalName = finalName.replace(/\.{2,}/g, '.').replace(/_+/g, '_').replace(/^\.+|\.+$/g, '').replace(/_+$/, '');

    // Length Check
    if (finalName.length > maxLength) finalName = finalName.substring(0, maxLength).replace(/[._]$/, '');
    if (finalName.length < 1) return;

    // Length Filter
    if (lengthPreference !== 'any') {
        const len = finalName.length;
        if (lengthPreference === 'short' && len > 10) return;
        if (lengthPreference === 'medium' && (len <= 10 || len > 15)) return;
        if (lengthPreference === 'long' && len <= 15) return;
    }

    if (!generatedSet.has(finalName)) {
      generatedSet.add(finalName);
      results.push({ id: generateId(), name: finalName, category: cat });
    }
  };

  // --- GENERATION LOOP ---
  
  // 1. Explicit Multi-Word Strategies (High Priority)
  // If user typed "super star", we explicitly want "super.star", "super_star", etc.
  if (hasSpace && wordParts.length > 1) {
      const p1 = wordParts[0];
      const p2 = wordParts.slice(1).join(''); // Join remaining parts
      
      if (includePeriods) add(`${p1}.${p2}`, category === NameCategory.ALL ? NameCategory.MINIMAL : category);
      if (includeUnderscores) add(`${p1}_${p2}`, category === NameCategory.ALL ? NameCategory.FUNNY : category);
      
      // CamelCase simulation (visual only, since lowercased later, but good for base logic)
      add(`${p1}${p2}`, category === NameCategory.ALL ? NameCategory.MINIMAL : category);
      
      // Surrounded
      if (includeUnderscores) add(`x_${p1}_${p2}_x`, NameCategory.FUNNY);
      if (includePeriods) add(`its.${p1}.${p2}`, NameCategory.AESTHETIC);
  }

  // 2. Standard Strategies (using getBase() which might swap synonyms)
  
  if (category === NameCategory.ALL || category === NameCategory.MINIMAL) {
    const b = getBase();
    add(`iam${b}`, NameCategory.MINIMAL);
    add(`${b}${b}`, NameCategory.MINIMAL); 
    add(`the${b}`, NameCategory.MINIMAL);
    add(`not${b}`, NameCategory.MINIMAL);
    add(`only${b}`, NameCategory.MINIMAL);
    
    if (includePeriods) {
        add(`${b}.ig`, NameCategory.MINIMAL);
        add(`${b}.raw`, NameCategory.MINIMAL);
        add(`.${b}`, NameCategory.MINIMAL); 
        add(`its.${b}`, NameCategory.MINIMAL);
        
        // Artificial Split (for single words) e.g. "mo.on"
        if (!hasSpace && b.length > 4) {
          const splitIdx = Math.floor(b.length / 2);
          add(`${b.slice(0, splitIdx)}.${b.slice(splitIdx)}`, NameCategory.MINIMAL);
        }
    }
    if (includeUnderscores) {
      add(`x_${b}_x`, NameCategory.MINIMAL);
    }
  }

  if (category === NameCategory.ALL || category === NameCategory.AESTHETIC) {
    for(let i=0; i<5; i++) {
        const b = getBase();
        const pre = aestheticPrefixes[Math.floor(Math.random() * aestheticPrefixes.length)];
        const suf = aestheticSuffixes[Math.floor(Math.random() * aestheticSuffixes.length)];
        
        if(includePeriods && Math.random() > 0.6) add(`${pre}.${b}`, NameCategory.AESTHETIC);
        else add(`${pre}${b}`, NameCategory.AESTHETIC);

        if(includePeriods && Math.random() > 0.6) add(`${b}.${suf}`, NameCategory.AESTHETIC);
        else add(`${b}${suf}`, NameCategory.AESTHETIC);
        
        if(Math.random() > 0.85 && b.length < 8) add(`${pre}.${b}.${suf}`, NameCategory.AESTHETIC);
    }
    const bTrans = getBase();
    add(doubleVowels(bTrans), NameCategory.AESTHETIC);
  }

  if (category === NameCategory.ALL || category === NameCategory.BUSINESS) {
    for(let i=0; i<4; i++) {
        const b = getBase();
        const pre = businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)];
        const suf = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
        add(`${pre}${b}`, NameCategory.BUSINESS);
        add(`${b}${suf}`, NameCategory.BUSINESS);
        if(includePeriods) {
             add(`${pre}.${b}`, NameCategory.BUSINESS);
             add(`${b}.${suf}`, NameCategory.BUSINESS);
        } else if(includeUnderscores) {
             add(`${pre}_${b}`, NameCategory.BUSINESS);
             add(`${b}_${suf}`, NameCategory.BUSINESS);
        }
    }
    const bDom = getBase();
    if(includePeriods) {
        add(`${bDom}.com`, NameCategory.BUSINESS);
        add(`${bDom}.mx`, NameCategory.BUSINESS);
        add(`${bDom}.es`, NameCategory.BUSINESS);
    }
  }

  if (category === NameCategory.ALL || category === NameCategory.FUNNY) {
    for(let i=0; i<4; i++) {
        const b = getBase();
        const pre = funnyPrefixes[Math.floor(Math.random() * funnyPrefixes.length)];
        const suf = funnySuffixes[Math.floor(Math.random() * funnySuffixes.length)];
        
        if(Math.random() > 0.3) add(`${pre}_${b}`, NameCategory.FUNNY);
        else add(`${pre}${b}`, NameCategory.FUNNY);
        
        if(Math.random() > 0.3) add(`${b}_${suf}`, NameCategory.FUNNY);
        else add(`${b}${suf}`, NameCategory.FUNNY);

        if (category === NameCategory.FUNNY && Math.random() > 0.6) {
           const techSuf = gamerSuffixes[Math.floor(Math.random() * gamerSuffixes.length)];
           add(`${b}.${techSuf}`, NameCategory.FUNNY);
        }
    }
    const bFun = getBase();
    if (category === NameCategory.FUNNY) {
        add(leetSpeak(bFun), NameCategory.FUNNY);
        add(`xX_${bFun}_Xx`, NameCategory.FUNNY);
    }
  }

  // Fillers - REMOVED random filling if the user has a keyword.
  // We only use fillers if the input was empty to begin with.
  if (keywordPool.length === 0 || (!cleanKeyword && results.length < 60)) {
      let safetyCount = 0;
      while (results.length < 60 && safetyCount < 200) {
        safetyCount++;
        const adj = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
        const noun = fallbackNouns[Math.floor(Math.random() * fallbackNouns.length)];
        
        const r = Math.random();
        if (r < 0.33 && includePeriods) add(`${noun}.${adj}`, NameCategory.ALL);
        else if (r < 0.66) add(`${adj}${noun}`, NameCategory.ALL);
        else add(`${noun}${adj}`, NameCategory.ALL);
      }
  }

  return results.sort(() => 0.5 - Math.random()).slice(0, 60);
};