import { GeneratedName, NameCategory, GeneratorOptions } from '../types';

// --- Word Banks (Massively Expanded) ---

const aestheticPrefixes = [
  // English/Universal
  'the', 'its', 'just', 'real', 'iam', 'dear', 'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'mr', 'ur', 'my',
  'cherry', 'velvet', 'cosmic', 'retro', 'cyber', 'vapor', 'neo', 'pale', 'dark', 'light', 'golden', 'silver', 'crystal',
  // Spanish (Nature/Vibe)
  'soy', 'yosoy', 'tu', 'mi', 'luna', 'alma', 'cielo', 'dulce', 'suave', 'luz', 'cafe', 'flor', 'mar', 'sol', 'brisa',
  'nube', 'lluvia', 'nieve', 'fuego', 'aire', 'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'sombra', 'reflejo',
  'poesia', 'arte', 'tinta', 'papel', 'color', 'tono', 'matiz', 'croma', 'pixel', 'glitch', 'astro', 'estrella',
  'linda', 'bonita', 'chica', 'chico', 'joven', 'viejo', 'retro', 'vintage', 'moderno', 'futuro', 'etereo', 'divino'
];

const aestheticSuffixes = [
  // English/Universal
  'gram', 'vibe', 'diary', 'life', 'style', 'love', 'xo', 'minds', 'mood', 'core', 'films', 'pov', 'cam', 'pic', 'art',
  'soul', 'heart', 'dream', 'wish', 'dust', 'cloud', 'bloom', 'glow', 'verse', 'zone', 'space', 'club', 'cult',
  // Spanish
  'vida', 'amor', 'sol', 'mar', 'mundo', 'conamor', 'bby', 'linda', 'bonita', 'vibra', 'eterno', 'infinito', 'fugaz',
  'azul', 'rosa', 'negro', 'blanco', 'gris', 'rojo', 'verde', 'lila', 'pastel', 'neon', 'mate', 'brillo', 'foco',
  'diario', 'notas', 'letras', 'versos', 'rima', 'prosa', 'texto', 'cita', 'frase', 'dicho', 'hecho', 'real',
  'visual', 'foto', 'imagen', 'vista', 'mirada', 'ojo', 'lente', 'rollo', 'film', 'cine', 'video', 'clip'
];

const businessPrefixes = [
  // General
  'official', 'team', 'weare', 'group', 'club', 'hq', 'pro', 'get', 'try', 'the', 'best', 'top', 'mega', 'ultra',
  // Spanish & Professional
  'somos', 'grupo', 'taller', 'estudio', 'tienda', 'bazar', 'mercado', 'mundo', 'zona', 'dr', 'lic', 'ing', 'arq',
  'abogado', 'profe', 'coach', 'chef', 'guia', 'tips', 'info', 'dato', 'blog', 'vlog', 'web', 'net', 'app',
  'tu_tienda', 'tu_espacio', 'tu_lugar', 'rincon', 'centro', 'punto', 'foco', 'eje', 'base', 'sede', 'casa',
  'agencia', 'firma', 'bureau', 'union', 'red', 'lazo', 'puente', 'nexo', 'link', 'conecta', 'crea', 'hace'
];

const businessSuffixes = [
  // General
  'official', 'biz', 'co', 'inc', 'studio', 'agency', 'hub', 'global', 'app', 'online', 'shop', 'store', 'tech', 'dev',
  // Spanish & Geo & Niche
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'latam', 'digital', 'creativo', 'ventas', 'moda', 'home', 'pe', 'uy', 've',
  'market', 'plaza', 'lounge', 'bar', 'cafe', 'rest', 'food', 'fit', 'gym', 'health', 'salud', 'belleza', 'makeup',
  'hair', 'nails', 'lashes', 'brows', 'skin', 'care', 'spa', 'yoga', 'pilates', 'dance', 'music', 'art', 'design',
  'diseno', 'decor', 'hogar', 'muebles', 'jardin', 'plantas', 'flores', 'eventos', 'bodas', 'fiesta', 'party', 'dj'
];

const funnyPrefixes = [
  // English
  'mr', 'mrs', 'not', 'actually', 'maybe', 'internet', 'just', 'bad', 'sad', 'mad', 'rad',
  // Spanish / Slang
  'el_sr', 'la_sra', 'don', 'doña', 'fan_de', 'odio_a', 'soy_el', 'tu_vecino', 'ese_tal', 'capitan',
  'el_propio', 'la_propia', 'un_tal', 'una_tal', 'aquel', 'aquella', 'casi', 'medio', 'super', 'mega',
  'niño', 'niña', 'chico', 'chica', 'pibe', 'piba', 'tio', 'tia', 'primo', 'prima', 'vecino', 'vecina',
  'jefe', 'jefa', 'rey', 'reina', 'principe', 'princesa', 'lord', 'lady', 'master', 'crack', 'idolo', 'fan'
];

const funnySuffixes = [
  // English
  'fail', 'lol', 'meme', '404', 'plz', 'stop', 'who', 'nope', 'yep', 'ok', 'bye', 'hi',
  // Spanish / Slang
  'dice', 'sabe', 'loco', 'loca', 'feo', 'guapo', 'tonto', 'nomas', 'vip', 'en_paro', 'cansado', 'dormido',
  'comiendo', 'jugando', 'estudiando', 'trabajando', 'pensando', 'soñando', 'viviendo', 'muriendo', 'llorando', 'riendo',
  'feliz', 'triste', 'enojado', 'aburrido', 'ocupado', 'libre', 'solo', 'sola', 'juntos', 'revuelto', 'batido',
  'picante', 'dulce', 'salado', 'agrio', 'amargo', 'frio', 'caliente', 'tibio', 'fresco', 'rancio', 'podrido'
];

// Fallback nouns if input is empty or for randomization
const randomNouns = [
  'panda', 'cactus', 'pixel', 'ninja', 'cafe', 'luna', 'sol', 'mar', 'cielo', 'viaje', 
  'dream', 'star', 'astro', 'coco', 'mango', 'kiwi', 'rosa', 'azul', 'arte', 'gato', 
  'perro', 'oso', 'lobo', 'tigre', 'leon', 'zorro', 'bho', 'pez', 'ave', 'flor',
  'hoja', 'arbol', 'monte', 'rio', 'lago', 'ola', 'sal', 'arena', 'roca', 'piedra',
  'oro', 'plata', 'bronce', 'hierro', 'acero', 'neon', 'laser', 'disco', 'vinyl', 'tape'
];

const randomAdjectives = [
  'happy', 'crazy', 'super', 'mega', 'ultra', 'mini', 'big', 'lit', 'chill', 'cool',
  'feliz', 'loco', 'gran', 'nuevo', 'dulce', 'lindo', 'puro', 'rico', 'suave', 'fuerte',
  'rapido', 'lento', 'alto', 'bajo', 'gordo', 'flaco', 'bueno', 'malo', 'santo', 'diablo'
];

// --- Helper Functions ---

const generateId = () => Math.random().toString(36).substr(2, 9);

const cleanInput = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Character transformation for "Gamer/Hacker" look
const leetSpeak = (text: string): string => {
  const map: Record<string, string> = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': 'z', 't': '7', 'l': '1', 'b': '8' };
  return text.split('').map(c => Math.random() > 0.5 ? (map[c] || c) : c).join('');
};

const doubleVowels = (text: string): string => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return text.split('').map(c => (vowels.includes(c) && Math.random() > 0.7) ? c + c : c).join('');
};

const replaceChars = (text: string): string => {
   // Common Spanish/Aesthetic swaps
   let res = text;
   if (res.includes('c') && Math.random() > 0.5) res = res.replace(/c/g, 'k');
   if (res.includes('qu') && Math.random() > 0.5) res = res.replace(/qu/g, 'k');
   if (res.includes('s') && Math.random() > 0.5) res = res.replace(/s/g, 'z');
   if (res.includes('i') && Math.random() > 0.5) res = res.replace(/i/g, 'y');
   return res;
};

// --- Main Generator ---

export const generateNames = (options: GeneratorOptions): GeneratedName[] => {
  const { keyword, category, includeNumbers, includePeriods, includeUnderscores } = options;
  const base = cleanInput(keyword) || randomNouns[Math.floor(Math.random() * randomNouns.length)];
  const results: GeneratedName[] = [];
  
  // Helper to add a result
  const add = (name: string, cat: NameCategory) => {
    let finalName = name;

    // Post-processing based on toggles
    // Random underscores if enabled (and not already present in specific ways)
    if (includeUnderscores && !finalName.includes('_') && Math.random() > 0.8) {
       const pos = Math.random();
       if (pos < 0.33) finalName = `_${finalName}`;
       else if (pos < 0.66) finalName = `${finalName}_`;
       else finalName = `_${finalName}_`;
    }

    if (includeNumbers && Math.random() > 0.75) {
       // Lucky numbers, birth years, or repeating digits
       const types = [
         Math.floor(Math.random() * 99), // 0-99
         2000 + Math.floor(Math.random() * 25), // Years
         Math.floor(Math.random() * 9) * 111, // 111, 222, etc
         247, 365, 420, 69 // Memetic numbers
       ];
       finalName += types[Math.floor(Math.random() * types.length)];
    }

    results.push({ id: generateId(), name: finalName, category: cat });
  };

  // --- Strategies per Category ---

  // 1. Minimal (Clean, Short, Punctuation heavy)
  if (category === NameCategory.ALL || category === NameCategory.MINIMAL) {
    add(base, NameCategory.MINIMAL); // Plain
    add(`${base}.ig`, NameCategory.MINIMAL);
    add(`iam${base}`, NameCategory.MINIMAL);
    add(`${base}${base}`, NameCategory.MINIMAL); // Doubled
    add(base.split('').join('.'), NameCategory.MINIMAL); // s.o.f.i.a
    
    // Insert random period
    if (base.length > 3) {
      const splitIdx = Math.floor(Math.random() * (base.length - 1)) + 1;
      add(`${base.slice(0, splitIdx)}.${base.slice(splitIdx)}`, NameCategory.MINIMAL);
    }
    
    // Spaced out
    if (includeUnderscores) {
      add(`x_${base}_x`, NameCategory.MINIMAL);
      add(base.split('').join('_'), NameCategory.MINIMAL);
    }
  }

  // 2. Aesthetic (Vibe words, text transformation, soft prefixes)
  if (category === NameCategory.ALL || category === NameCategory.AESTHETIC) {
    // Word combos (Heavy loop to ensure variety)
    for(let i=0; i<3; i++) {
        const pre = aestheticPrefixes[Math.floor(Math.random() * aestheticPrefixes.length)];
        const suf = aestheticSuffixes[Math.floor(Math.random() * aestheticSuffixes.length)];
        
        if(Math.random() > 0.5) add(`${pre}.${base}`, NameCategory.AESTHETIC);
        else add(`${pre}${base}`, NameCategory.AESTHETIC);

        if(Math.random() > 0.5) add(`${base}.${suf}`, NameCategory.AESTHETIC);
        else add(`${base}${suf}`, NameCategory.AESTHETIC);
    }

    // Transformations
    add(doubleVowels(base), NameCategory.AESTHETIC); // sofia -> sofiiia
    add(replaceChars(base), NameCategory.AESTHETIC); // cool -> kool
    add(`its.${base}`, NameCategory.AESTHETIC);
    add(`${base}.pov`, NameCategory.AESTHETIC);
    add(`just.${base}`, NameCategory.AESTHETIC);
  }

  // 3. Business (Official, localized, professional)
  if (category === NameCategory.ALL || category === NameCategory.BUSINESS) {
    for(let i=0; i<3; i++) {
        const pre = businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)];
        const suf = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
        
        add(`${pre}${base}`, NameCategory.BUSINESS);
        add(`${pre}.${base}`, NameCategory.BUSINESS);
        add(`${base}${suf}`, NameCategory.BUSINESS);
        add(`${base}.${suf}`, NameCategory.BUSINESS);
    }
    
    // Domain style
    add(`${base}.com`, NameCategory.BUSINESS);
    add(`www.${base}`, NameCategory.BUSINESS);
    add(`${base}.net`, NameCategory.BUSINESS);
  }

  // 4. Funny (Self-deprecating, memes, Spanish humor)
  if (category === NameCategory.ALL || category === NameCategory.FUNNY) {
    for(let i=0; i<3; i++) {
        const pre = funnyPrefixes[Math.floor(Math.random() * funnyPrefixes.length)];
        const suf = funnySuffixes[Math.floor(Math.random() * funnySuffixes.length)];
        add(`${pre}_${base}`, NameCategory.FUNNY);
        add(`${base}_${suf}`, NameCategory.FUNNY);
    }
    
    add(`yo_soy_${base}`, NameCategory.FUNNY);
    add(`odio_a_${base}`, NameCategory.FUNNY);
    add(`${base}_dice`, NameCategory.FUNNY);
    add(leetSpeak(base), NameCategory.FUNNY); // Apply leet speak here
    add(`xX_${base}_Xx`, NameCategory.FUNNY); // Classic gamer tag
  }

  // 5. Fillers to ensure we have enough results (Up to 30)
  let safetyCount = 0;
  while (results.length < 30 && safetyCount < 50) {
    safetyCount++;
    const adj = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
    const noun = randomNouns[Math.floor(Math.random() * randomNouns.length)];
    
    const r = Math.random();
    if (r < 0.33) add(`${keyword || adj}.${noun}`, NameCategory.ALL);
    else if (r < 0.66) add(`${noun}x${keyword || adj}`, NameCategory.ALL);
    else add(`${adj}${noun}`, NameCategory.ALL);
  }

  // Shuffle and limit
  return results.sort(() => 0.5 - Math.random()).slice(0, 48); // Increased limit to 48 results
};