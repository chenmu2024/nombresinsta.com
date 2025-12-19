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

// --- Word Banks (Massively Expanded for "The Most Comprehensive Generator") ---

const aestheticPrefixes = [
  // English/Universal Vibe
  'the', 'its', 'just', 'real', 'iam', 'dear', 'soft', 'pure', 'honey', 'baby', 'angel', 'lil', 'miss', 'mr', 'ur', 'my', 'oh', 'hey', 'yo',
  'cherry', 'velvet', 'cosmic', 'retro', 'cyber', 'vapor', 'neo', 'pale', 'dark', 'light', 'golden', 'silver', 'crystal', 'silk', 'satin',
  'vanilla', 'peach', 'mint', 'lavender', 'rose', 'milk', 'mocha', 'latte', 'chai', 'matcha', 'boba', 'fairy', 'pixie', 'witch',
  
  // Spanish Poetic/Nature
  'soy', 'yosoy', 'tu', 'mi', 'luna', 'alma', 'cielo', 'dulce', 'suave', 'luz', 'cafe', 'flor', 'mar', 'sol', 'brisa', 'aire',
  'nube', 'lluvia', 'nieve', 'fuego', 'magia', 'aura', 'vibra', 'onda', 'ritmo', 'eco', 'sombra', 'reflejo', 'espejo',
  'poesia', 'arte', 'tinta', 'papel', 'color', 'tono', 'matiz', 'croma', 'astro', 'estrella', 'cometa', 'galax', 'nebula',
  'linda', 'bonita', 'chica', 'chico', 'joven', 'viejo', 'retro', 'vintage', 'moderno', 'futuro', 'etereo', 'divino', 'santo',
  'efimero', 'eterno', 'fugaz', 'brillo', 'destello', 'rayo', 'trueno', 'calma', 'paz', 'zen', 'caos', 'ruido', 'silencio',
  'suspiro', 'deseo', 'sueño', 'musa', 'ninfa', 'venus', 'marte', 'saturno', 'pluton', 'orion', 'sirius', 'vega', 'altair'
];

const aestheticSuffixes = [
  // English/Universal
  'gram', 'vibe', 'diary', 'life', 'style', 'love', 'xo', 'minds', 'mood', 'core', 'films', 'pov', 'cam', 'pic', 'art', 'work',
  'soul', 'heart', 'dream', 'wish', 'dust', 'cloud', 'bloom', 'glow', 'verse', 'zone', 'space', 'club', 'cult', 'gang', 'squad',
  'boys', 'girls', 'kids', 'baby', 'doll', 'babe', 'honey', 'pie', 'cake', 'tea', 'juice', 'soda', 'water', 'ice', 'snow',
  
  // Spanish
  'vida', 'amor', 'sol', 'mar', 'mundo', 'conamor', 'bby', 'linda', 'bonita', 'vibra', 'eterno', 'infinito', 'fugaz',
  'azul', 'rosa', 'negro', 'blanco', 'gris', 'rojo', 'verde', 'lila', 'pastel', 'neon', 'mate', 'brillo', 'foco',
  'diario', 'notas', 'letras', 'versos', 'rima', 'prosa', 'texto', 'cita', 'frase', 'dicho', 'hecho', 'real',
  'visual', 'foto', 'imagen', 'vista', 'mirada', 'ojo', 'lente', 'rollo', 'film', 'cine', 'video', 'clip', 'rec',
  'mente', 'pensar', 'crear', 'hacer', 'ser', 'estar', 'ir', 'ver', 'oir', 'sentir', 'amar', 'vivir'
];

const businessPrefixes = [
  // General/Professional
  'official', 'team', 'weare', 'group', 'club', 'hq', 'pro', 'get', 'try', 'the', 'best', 'top', 'mega', 'ultra', 'hyper', 'super',
  'alpha', 'beta', 'omega', 'prime', 'elite', 'master', 'expert', 'guru', 'ninja', 'wizard', 'hero', 'champ', 'king', 'queen',
  
  // Spanish & Role Specific
  'somos', 'grupo', 'taller', 'estudio', 'tienda', 'bazar', 'mercado', 'mundo', 'zona', 'dr', 'lic', 'ing', 'arq',
  'abogado', 'profe', 'coach', 'chef', 'guia', 'tips', 'info', 'dato', 'blog', 'vlog', 'web', 'net', 'app', 'bot',
  'tu_tienda', 'tu_espacio', 'tu_lugar', 'rincon', 'centro', 'punto', 'foco', 'eje', 'base', 'sede', 'casa', 'hogar',
  'agencia', 'firma', 'bureau', 'union', 'red', 'lazo', 'puente', 'nexo', 'link', 'conecta', 'crea', 'hace', 'vende',
  'academia', 'instituto', 'escuela', 'curso', 'clase', 'tutor', 'mentor', 'asesor', 'consultor', 'gestor', 'manager'
];

const businessSuffixes = [
  // General/Tech/Web
  'official', 'biz', 'co', 'inc', 'ltd', 'studio', 'agency', 'hub', 'global', 'app', 'online', 'shop', 'store', 'tech', 'dev', 'io', 'ai', 'nft', 'crypto',
  'solutions', 'systems', 'media', 'digital', 'creative', 'labs', 'works', 'press', 'news', 'daily', 'weekly', 'times', 'post',
  
  // Spanish Geo & Niches
  'oficial', 'mx', 'es', 'arg', 'cl', 'col', 'latam', 'peru', 'ven', 'ecu', 'bol', 'uy', 'py', 'cr', 'pan', 'dom',
  'ventas', 'compra', 'outlet', 'promo', 'oferta', 'ganga', 'lujo', 'premium', 'vip', 'exclusivo',
  
  // Beauty/Fashion
  'moda', 'style', 'look', 'outfit', 'wear', 'closet', 'boutique', 'showroom', 'makeup', 'beauty', 'skin', 'hair', 'nails', 'lashes', 'brows', 'spa',
  'belleza', 'estetica', 'salon', 'barber', 'tattoo', 'ink', 'piercing', 'joyas', 'accesorios',
  
  // Food/Health
  'food', 'eats', 'bites', 'kitchen', 'cocina', 'recetas', 'sabor', 'gourmet', 'deli', 'bakery', 'pasteles', 'postres', 'dulces', 'snacks',
  'fit', 'fitness', 'gym', 'training', 'entreno', 'crossfit', 'yoga', 'pilates', 'run', 'bike', 'sport', 'deporte', 'salud', 'nutri', 'diet', 'keto', 'vegan',
  
  // Home/Events
  'home', 'casa', 'deco', 'design', 'interior', 'muebles', 'jardin', 'plantas', 'flores', 'eventos', 'bodas', 'fiesta', 'party', 'dj', 'music'
];

const funnyPrefixes = [
  // English
  'mr', 'mrs', 'not', 'actually', 'maybe', 'internet', 'just', 'bad', 'sad', 'mad', 'rad', 'ok', 'lil', 'big',
  
  // Spanish / Slang / Titles
  'el_sr', 'la_sra', 'don', 'doña', 'fan_de', 'odio_a', 'soy_el', 'tu_vecino', 'ese_tal', 'capitan', 'comandante', 'general',
  'el_propio', 'la_propia', 'un_tal', 'una_tal', 'aquel', 'aquella', 'casi', 'medio', 'super', 'mega', 're', 'muy',
  'niño', 'niña', 'chico', 'chica', 'pibe', 'piba', 'tio', 'tia', 'primo', 'prima', 'vecino', 'vecina', 'amigo', 'enemigo',
  'jefe', 'jefa', 'rey', 'reina', 'principe', 'princesa', 'lord', 'lady', 'master', 'crack', 'idolo', 'fan', 'hater',
  'senor', 'senora', 'joven', 'abuelo', 'abuela', 'perro', 'gato', 'pollo', 'pato'
];

const funnySuffixes = [
  // English
  'fail', 'lol', 'meme', '404', 'plz', 'stop', 'who', 'nope', 'yep', 'ok', 'bye', 'hi', 'wtf', 'omg', 'uwu', 'owo', 'xd',
  
  // Spanish States/Actions
  'dice', 'sabe', 'loco', 'loca', 'feo', 'guapo', 'tonto', 'listo', 'nomas', 'vip', 'en_paro', 'cansado', 'dormido', 'despierto',
  'comiendo', 'jugando', 'estudiando', 'trabajando', 'pensando', 'soñando', 'viviendo', 'muriendo', 'llorando', 'riendo', 'gritando',
  'feliz', 'triste', 'enojado', 'aburrido', 'ocupado', 'libre', 'solo', 'sola', 'juntos', 'revuelto', 'batido',
  'picante', 'dulce', 'salado', 'agrio', 'amargo', 'frio', 'caliente', 'tibio', 'fresco', 'rancio', 'podrido',
  'toxico', 'toxica', 'drama', 'queen', 'king', 'bebe', 'bb', 'mutante', 'alien', 'zombie', 'robot', 'fantasma',
  'sin_dinero', 'sin_filtro', 'sin_suerte', 'con_sueno', 'con_hambre', 'con_sed', 'con_frio', 'con_calor'
];

// Fallback nouns for randomization
const randomNouns = [
  // Animals
  'panda', 'cactus', 'gato', 'perro', 'oso', 'lobo', 'tigre', 'leon', 'zorro', 'buho', 'pez', 'ave', 'aguila', 'halcon', 'dragon',
  'conejo', 'ciervo', 'koala', 'sloth', 'mono', 'pato', 'cisne', 'tibu', 'delfin', 'ballena', 'pulpo', 'medusa', 'coral',
  
  // Nature
  'luna', 'sol', 'mar', 'cielo', 'rio', 'monte', 'lago', 'ola', 'sal', 'arena', 'roca', 'piedra', 'volcan', 'rayo',
  'hoja', 'arbol', 'pino', 'palma', 'flor', 'rosa', 'lirio', 'loto', 'raiz', 'semilla', 'fruta', 'coco', 'mango', 'kiwi',
  
  // Objects/Tech
  'pixel', 'glitch', 'data', 'code', 'wifi', 'disco', 'vinyl', 'tape', 'radio', 'tv', 'camara', 'lente', 'foco', 'libro',
  'taza', 'vaso', 'mesa', 'silla', 'sofa', 'cama', 'reloj', 'gafas', 'bolso', 'zapato', 'llave', 'mapa',
  
  // Abstract
  'viaje', 'sueño', 'idea', 'plan', 'meta', 'fin', 'inicio', 'norte', 'sur', 'este', 'oeste', 'ruta', 'camino',
  'oro', 'plata', 'bronce', 'hierro', 'acero', 'cobre', 'neon', 'laser', 'plasma', 'aura', 'karma', 'zen'
];

const randomAdjectives = [
  // English
  'happy', 'crazy', 'super', 'mega', 'ultra', 'mini', 'big', 'lit', 'chill', 'cool', 'bad', 'good', 'sad', 'mad',
  
  // Spanish
  'feliz', 'loco', 'gran', 'nuevo', 'viejo', 'dulce', 'lindo', 'puro', 'rico', 'suave', 'fuerte', 'bravo', 'digno',
  'rapido', 'lento', 'alto', 'bajo', 'gordo', 'flaco', 'bueno', 'malo', 'santo', 'diablo', 'divino', 'human',
  'azul', 'rojo', 'negro', 'blanco', 'gris', 'verde', 'rosa', 'lila', 'cián', 'ocre', 'jade', 'rubi', 'ambar'
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
  const { keyword, category, includeNumbers, includePeriods, includeUnderscores } = options;
  
  // Clean input and provide a fallback if empty
  const cleanKeyword = cleanInput(keyword);
  const base = cleanKeyword || randomNouns[Math.floor(Math.random() * randomNouns.length)];
  
  const results: GeneratedName[] = [];
  const generatedSet = new Set<string>(); // Prevent duplicates in the same batch
  
  // Helper to add a result safely
  const add = (name: string, cat: NameCategory) => {
    let finalName = name;

    // Post-processing: Underscores
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

    // Limit length to Instagram max (30 chars)
    if (finalName.length > 30) finalName = finalName.substring(0, 30);

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