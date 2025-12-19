import { GeneratedName, NameCategory, GeneratorOptions } from '../types';

// Word banks for combination
const aestheticPrefixes = ['the', 'its', 'just', 'real', 'iam', 'dear', 'lovely', 'soft', 'pure', 'honey', 'moon', 'star', 'dream', 'soul'];
const aestheticSuffixes = ['gram', 'vibe', 'diary', 'life', 'style', 'love', 'xo', 'heart', 'cloud', 'bloom', 'glow', 'verse', 'zone'];
const businessPrefixes = ['official', 'team', 'weare', 'group', 'club', 'hq', 'pro', 'shop', 'store', 'daily', 'get', 'try'];
const businessSuffixes = ['official', 'biz', 'co', 'inc', 'studio', 'agency', 'hub', 'global', 'app', 'online', 'now'];
const funnyPrefixes = ['mr', 'mrs', 'dont', 'not', 'actually', 'totally', 'maybe', 'yaboy', 'yagirl', 'captain', 'doctor'];
const funnySuffixes = ['fail', 'lol', 'meme', 'says', 'here', 'hidden', 'loading', '404', 'who', 'plz'];

const randomAdjectives = ['happy', 'blue', 'urban', 'neon', 'chill', 'wild', 'free', 'cool', 'sweet', 'brave'];
const randomNouns = ['panda', 'cactus', 'pixel', 'ninja', 'coffee', 'vibes', 'ocean', 'sunset', 'city', 'dream'];

const generateId = () => Math.random().toString(36).substr(2, 9);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const cleanInput = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export const generateNames = (options: GeneratorOptions): GeneratedName[] => {
  const { keyword, category, includeNumbers, includePeriods, includeUnderscores } = options;
  const base = cleanInput(keyword) || randomNouns[Math.floor(Math.random() * randomNouns.length)];
  const results: GeneratedName[] = [];
  
  const addName = (text: string, cat: NameCategory) => {
    // Apply special chars logic randomly or strictly
    let finalName = text;
    
    if (includePeriods && Math.random() > 0.5 && !finalName.includes('.')) {
      // Insert period randomly
      const splitIdx = Math.floor(Math.random() * (finalName.length - 2)) + 1;
      finalName = finalName.slice(0, splitIdx) + '.' + finalName.slice(splitIdx);
    }
    
    if (includeUnderscores && Math.random() > 0.5 && !finalName.includes('_')) {
       finalName = Math.random() > 0.5 ? `_${finalName}` : `${finalName}_`;
    }

    if (includeNumbers && Math.random() > 0.6) {
      finalName += Math.floor(Math.random() * 999);
    }

    results.push({
      id: generateId(),
      name: finalName,
      category: cat
    });
  };

  // 1. Minimal Strategy (Just the keyword variations)
  if (category === NameCategory.ALL || category === NameCategory.MINIMAL) {
    addName(base, NameCategory.MINIMAL);
    addName(`${base}${base}`, NameCategory.MINIMAL);
    addName(`i.am.${base}`, NameCategory.MINIMAL);
    addName(`${base}.ig`, NameCategory.MINIMAL);
  }

  // 2. Aesthetic Strategy
  if (category === NameCategory.ALL || category === NameCategory.AESTHETIC) {
    aestheticPrefixes.forEach(pre => {
        if(Math.random() > 0.7) addName(`${pre}${base}`, NameCategory.AESTHETIC);
    });
    aestheticSuffixes.forEach(suf => {
        if(Math.random() > 0.7) addName(`${base}${suf}`, NameCategory.AESTHETIC);
    });
    addName(`xoxo.${base}`, NameCategory.AESTHETIC);
    addName(`${base}.vibes`, NameCategory.AESTHETIC);
  }

  // 3. Business Strategy
  if (category === NameCategory.ALL || category === NameCategory.BUSINESS) {
    businessPrefixes.forEach(pre => {
         if(Math.random() > 0.7) addName(`${pre}${base}`, NameCategory.BUSINESS);
    });
    businessSuffixes.forEach(suf => {
         if(Math.random() > 0.7) addName(`${base}${suf}`, NameCategory.BUSINESS);
    });
    addName(`${base}hq`, NameCategory.BUSINESS);
  }

  // 4. Funny Strategy
  if (category === NameCategory.ALL || category === NameCategory.FUNNY) {
    funnyPrefixes.forEach(pre => {
        if(Math.random() > 0.7) addName(`${pre}${base}`, NameCategory.FUNNY);
    });
    addName(`${base}_loading`, NameCategory.FUNNY);
    addName(`im_${base}`, NameCategory.FUNNY);
  }

  // 5. Fillers if specific category didn't yield enough
  while (results.length < 12) {
    const adj = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
    const noun = randomNouns[Math.floor(Math.random() * randomNouns.length)];
    const combo = keyword ? `${keyword}${noun}` : `${adj}${noun}`;
    addName(combo, NameCategory.ALL);
  }

  // Shuffle and limit
  return results.sort(() => 0.5 - Math.random()).slice(0, 24);
};