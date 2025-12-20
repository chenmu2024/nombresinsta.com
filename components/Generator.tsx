import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, RefreshCw, AtSign, Heart, ExternalLink, Trash2, ClipboardList, X, Star, Search, Wand2, RotateCcw, SlidersHorizontal, Dice5, Share2, ChevronDown, Gamepad2, Plane, Palette, Briefcase, Camera, Cat, Coffee, Instagram, Youtube, Twitter, Music2, AlertCircle, History, AlignLeft, ArrowRightLeft, Eye } from 'lucide-react';
import { NameCategory, GeneratedName, Platform, LengthOption } from '../types';
import { generateNames } from '../utils/nameGenerator';
import { useSEO } from '../hooks/useSEO';
import ProfilePreviewModal from './ProfilePreviewModal';

// --- Toast Component ---
const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => (
  <div className={`fixed bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900/90 dark:bg-white/90 backdrop-blur text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 transition-all duration-300 z-[60] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
    <Check size={18} className="text-green-400 dark:text-green-600" />
    <span className="font-medium text-sm">{message}</span>
  </div>
);

// --- Favorites Modal Component ---
interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedNames: GeneratedName[];
  onRemove: (item: GeneratedName) => void;
  onCopy: (text: string) => void;
  onShare: () => void;
  onClear: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose, savedNames, onRemove, onCopy, onShare, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 w-full md:w-[500px] md:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] animate-slide-up md:animate-scale-in border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 rounded-t-3xl sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-xl text-pink-600 dark:text-pink-400">
               <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Favoritos</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{savedNames.length} guardados</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition" aria-label="Cerrar favoritos">
            <ChevronDown size={24} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {savedNames.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                <Heart size={32} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">Aún no tienes favoritos.<br/>Dale ❤️ a los nombres que te gusten.</p>
              <button onClick={onClose} className="text-pink-600 dark:text-pink-400 font-bold text-sm hover:underline">
                Volver a buscar
              </button>
            </div>
          ) : (
            savedNames.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-pink-200 dark:hover:border-pink-900 transition group">
                <span className="font-bold text-slate-700 dark:text-slate-200">@{item.name}</span>
                <div className="flex space-x-1">
                   <button 
                     onClick={() => onCopy(item.name)}
                     className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
                     title="Copiar"
                   >
                     <Copy size={16} />
                   </button>
                   <button 
                     onClick={() => onRemove(item)}
                     className="p-2 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
                     title="Eliminar"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedNames.length > 0 && (
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-3xl">
            <div className="grid grid-cols-2 gap-3 mb-3">
               <button 
                 onClick={onShare}
                 className="flex justify-center items-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition active:scale-95"
               >
                 <Share2 size={18} />
                 <span>Compartir</span>
               </button>
               <button 
                 onClick={() => onCopy(savedNames.map(n => `@${n.name}`).join('\n'))}
                 className="flex justify-center items-center gap-2 py-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 font-bold hover:bg-pink-100 dark:hover:bg-pink-900/40 transition active:scale-95"
               >
                 <ClipboardList size={18} />
                 <span>Copiar Todo</span>
               </button>
            </div>
            <button 
              onClick={onClear}
              className="w-full py-2 text-xs text-slate-500 hover:text-red-600 font-medium transition"
            >
              Borrar lista
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


interface NameCardProps {
  item: GeneratedName;
  isSavedView?: boolean;
  isSaved: boolean;
  isNew?: boolean; 
  copiedId: string | null;
  platform: Platform;
  onToggleSave: (item: GeneratedName) => void;
  onCopy: (text: string, id: string) => void;
  onPreview: (item: GeneratedName) => void;
}

const NameCard: React.FC<NameCardProps> = ({ 
  item, 
  isSavedView = false, 
  isSaved, 
  isNew = false,
  copiedId, 
  platform,
  onToggleSave, 
  onCopy,
  onPreview
}) => {
  const platformUrl = {
    instagram: `https://www.instagram.com/${item.name}/`,
    tiktok: `https://www.tiktok.com/@${item.name}`,
    twitter: `https://twitter.com/${item.name}`,
    youtube: `https://www.youtube.com/@${item.name}`
  };

  return (
    <div
      onClick={() => onCopy(item.name, item.id)}
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-4 transition-all duration-300 cursor-pointer flex justify-between items-center ${
        isSavedView 
          ? 'border border-pink-100 dark:border-slate-700 shadow-sm' 
          : 'shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-transparent hover:border-pink-100 dark:hover:border-pink-900'
      } ${isNew ? 'ring-2 ring-pink-100 dark:ring-pink-900 ring-offset-2 dark:ring-offset-slate-900' : ''}`}
    >
      {isNew && !isSavedView && (
        <span className="absolute -top-2 -left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">
          NUEVO
        </span>
      )}

      <div className="flex flex-col min-w-0 mr-3">
        <span className="text-lg font-bold text-slate-700 dark:text-slate-200 font-sans tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all truncate">
          @{item.name}
        </span>
        
        <div className="flex items-center mt-1 space-x-2">
            {!isSavedView && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                {item.category}
              </span>
            )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex bg-slate-50 dark:bg-slate-700 rounded-xl p-1 border border-slate-100 dark:border-slate-600 shadow-inner">
          
          <button 
             onClick={(e) => { e.stopPropagation(); onPreview(item); }}
             className="p-2 text-slate-400 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
             title="Vista Previa"
          >
             <Eye size={16} />
          </button>

          <a 
            href={platformUrl[platform]}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
            title={`Verificar en ${platform}`}
            aria-label={`Verificar @${item.name} en ${platform}`}
          >
            <Search size={16} />
          </a>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(item); }}
            className={`p-2 rounded-lg transition ${
              isSaved
                ? 'text-red-500 bg-white dark:bg-slate-800 shadow-sm'
                : 'text-slate-400 hover:text-red-500 dark:text-slate-300 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800'
            }`}
            aria-label={isSaved ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <div
          className={`p-2 rounded-xl transition-all duration-300 ${
            copiedId === item.id
              ? 'bg-green-500 text-white shadow-lg shadow-green-200 scale-110'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-slate-200'
          }`}
        >
          {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
        </div>
      </div>

       <div className={`sm:hidden absolute right-4 top-1/2 -translate-y-1/2 transition-opacity ${copiedId === item.id ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-green-500 text-white p-1.5 rounded-full shadow-md">
             <Check size={14} />
          </div>
       </div>
    </div>
  );
};

// --- Quick Presets Data ---
const QUICK_PRESETS = [
    { label: 'Gamer / Streamer', icon: Gamepad2, color: 'bg-purple-100 text-purple-600', keyword: 'gamer', category: NameCategory.FUNNY },
    { label: 'Estilo Aesthetic', icon: Sparkles, color: 'bg-pink-100 text-pink-600', keyword: 'vibes', category: NameCategory.AESTHETIC },
    { label: 'Viajes & Blog', icon: Plane, color: 'bg-blue-100 text-blue-600', keyword: 'travel', category: NameCategory.AESTHETIC },
    { label: 'Arte & Diseño', icon: Palette, color: 'bg-orange-100 text-orange-600', keyword: 'arte', category: NameCategory.MINIMAL },
    { label: 'Negocios & Tienda', icon: Briefcase, color: 'bg-slate-100 text-slate-600', keyword: 'tienda', category: NameCategory.BUSINESS },
    { label: 'Fotografía', icon: Camera, color: 'bg-indigo-100 text-indigo-600', keyword: 'ph', category: NameCategory.MINIMAL },
    { label: 'Mascotas', icon: Cat, color: 'bg-yellow-100 text-yellow-600', keyword: 'patitas', category: NameCategory.FUNNY },
    { label: 'Foodie / Cocina', icon: Coffee, color: 'bg-emerald-100 text-emerald-600', keyword: 'tasty', category: NameCategory.BUSINESS },
];

const trendingTags = ['Aesthetic', 'Viajes', 'Amor', 'Gamer', 'Moda', 'Chill', 'Arte', 'Foodie'];

const Generator: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<NameCategory>(NameCategory.ALL);
  const [activeTab, setActiveTab] = useState<'results' | 'history'>('results');
  
  // Settings
  const [options, setOptions] = useState({
    includeNumbers: false,
    includePeriods: true,
    includeUnderscores: true,
    lengthPreference: 'any' as LengthOption,
    customPrefix: '',
    customSuffix: ''
  });
  
  // Dynamic SEO based on Platform
  const platformTitles = {
    instagram: "Generador de Nombres para Instagram",
    tiktok: "Generador de Nombres para TikTok",
    twitter: "Generador de Nombres para Twitter (X)",
    youtube: "Generador de Nombres para YouTube"
  };

  useSEO({
    title: platformTitles[platform],
    description: `¿Necesitas un ${platformTitles[platform]}? Crea miles de usuarios aesthetic, para mujer, hombre y negocios. 100% Gratis y Original.`,
    url: "/"
  });
  
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [history, setHistory] = useState<GeneratedName[]>([]); // New History State
  const [latestBatchIds, setLatestBatchIds] = useState<Set<string>>(new Set());

  const [savedNames, setSavedNames] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // New State for Preview
  const [previewName, setPreviewName] = useState<GeneratedName | null>(null);
  
  // UX States
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nombresinsta_saved');
    if (saved) {
      try {
        setSavedNames(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved names', e);
      }
    }
    const savedHistory = localStorage.getItem('nombresinsta_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing history', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nombresinsta_saved', JSON.stringify(savedNames));
  }, [savedNames]);

  useEffect(() => {
    localStorage.setItem('nombresinsta_history', JSON.stringify(history));
  }, [history]);

  const showToastMsg = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleGenerate = (overrideKeyword?: string, overrideCategory?: NameCategory) => {
    setIsGenerating(true);
    setActiveTab('results'); // Switch back to results
    const kw = overrideKeyword !== undefined ? overrideKeyword : keyword;
    const cat = overrideCategory !== undefined ? overrideCategory : category;
    
    if (window.innerWidth < 1024) setShowSettings(false);

    // If it's a preset/chip click, update the state to reflect what happened
    if (overrideKeyword) setKeyword(overrideKeyword);
    if (overrideCategory) setCategory(overrideCategory);

    setTimeout(() => {
      const newNames = generateNames({
        keyword: kw,
        category: cat,
        platform,
        ...options
      });
      
      const newIds = new Set(newNames.map(n => n.id));
      setLatestBatchIds(newIds);

      // Update History (Add to front, keep max 50)
      const newHistory = [...newNames, ...history].slice(0, 50);
      setHistory(newHistory);

      setResults(prev => {
        if (overrideKeyword && overrideKeyword !== keyword) {
             return newNames; // Fresh search
        }
        const combined = [...newNames, ...prev];
        return combined.slice(0, 100); 
      });
      
      setIsGenerating(false);
    }, 600); 
  };

  const handlePresetClick = (preset: typeof QUICK_PRESETS[0]) => {
      setKeyword(preset.keyword);
      setCategory(preset.category);
      handleGenerate(preset.keyword, preset.category);
  };

  const handleSurpriseMe = () => {
    const randomKeywords = ['Luna', 'Vibe', 'Soul', 'Glow', 'Nova', 'Zen', 'Echo', 'Sky'];
    const random = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    setKeyword(random);
    handleGenerate(random);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleTagClick = (tag: string) => {
    setKeyword(tag);
    handleGenerate(tag);
  };

  const clearKeyword = () => {
    setKeyword('');
  };

  const clearResults = () => {
      setResults([]);
      setLatestBatchIds(new Set());
  };
  
  const clearHistory = () => {
      setHistory([]);
  };

  const toggleSave = (item: GeneratedName) => {
    if (savedNames.some(saved => saved.name === item.name)) {
      setSavedNames(savedNames.filter(saved => saved.name !== item.name));
      showToastMsg("Eliminado de favoritos");
    } else {
      setSavedNames([item, ...savedNames]);
      showToastMsg("Guardado en favoritos");
    }
  };

  const removeFromModal = (item: GeneratedName) => {
      setSavedNames(savedNames.filter(saved => saved.name !== item.name));
  }

  const clearSaved = () => {
    if (confirm('¿Estás seguro de que quieres borrar tus favoritos?')) {
      setSavedNames([]);
      showToastMsg("Favoritos borrados");
      setIsFavoritesOpen(false);
    }
  };

  const copyToClipboard = (text: string, id: string | null = null) => {
    navigator.clipboard.writeText(text);
    if (id) {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    }
    showToastMsg("Copiado! Verifica en la app");
  };

  const handleShare = async () => {
      const text = `¡Mira estos nombres para ${platformTitles[platform]} que encontré!\n\n${savedNames.map(n => `@${n.name}`).join('\n')}\n\nCreado en NombresInsta.com`;
      
      if (navigator.share) {
          try {
              await navigator.share({
                  title: 'Mis Nombres Favoritos',
                  text: text,
                  url: 'https://nombresinsta.com'
              });
              showToastMsg("¡Compartido!");
          } catch (error) {
              console.log('Share cancelled');
          }
      } else {
          copyToClipboard(text);
          showToastMsg("Lista copiada (Compartir no soportado)");
      }
  };

  return (
    <section id="generator" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <Toast message={toast.msg} isVisible={toast.visible} />

      <ProfilePreviewModal 
        isOpen={!!previewName} 
        onClose={() => setPreviewName(null)} 
        name={previewName}
        platform={platform}
      />

      {/* Favorites Modal */}
      <FavoritesModal 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)}
        savedNames={savedNames}
        onRemove={removeFromModal}
        onCopy={(text) => copyToClipboard(text)}
        onShare={handleShare}
        onClear={clearSaved}
      />

      {/* Floating Action Button (Favorites Cart) */}
      <button
        onClick={() => setIsFavoritesOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-slate-900 dark:bg-pink-600 text-white p-4 rounded-full shadow-2xl shadow-pink-500/20 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${savedNames.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Ver favoritos guardados"
      >
        <div className="relative">
            <Heart fill="currentColor" size={24} className="text-white" />
            <span className="absolute -top-3 -right-3 bg-pink-500 dark:bg-white dark:text-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 dark:border-pink-600">
                {savedNames.length}
            </span>
        </div>
      </button>

      {/* Hero Header */}
      <div className="text-center mb-12 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm animate-fade-in-up">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Generador Viral 2025</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          {platformTitles[platform]}
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-light">
          El <strong>Generador de Nombres</strong> más completo y original. Sin registros, 100% gratis y diseñado para crear usuarios aesthetic, de negocios o personales que destacan.
        </p>
        
        {/* Platform Switcher Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 custom-scrollbar">
          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex space-x-1">
             {[
               { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600' },
               { id: 'tiktok', label: 'TikTok', icon: Music2, color: 'text-black dark:text-white' },
               { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400' },
               { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600' }
             ].map((p) => (
               <button
                 key={p.id}
                 onClick={() => { setPlatform(p.id as Platform); setResults([]); }}
                 className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                   platform === p.id 
                     ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105' 
                     : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                 }`}
               >
                 <p.icon size={18} className={platform === p.id ? 'text-white dark:text-slate-900' : p.color} />
                 <span className="whitespace-nowrap">{p.label}</span>
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card-strong p-6 md:p-8 rounded-[2rem] sticky top-24 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10">
            
            {/* Input Area */}
            <div className="relative group mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <AtSign className="text-pink-500 group-focus-within:text-purple-600 transition-colors" size={20} />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Palabra clave o Nombre..."
                aria-label="Ingresa tu palabra clave o nombre"
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-pink-300 dark:focus:border-pink-600 focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-900/20 transition-all outline-none text-lg font-medium text-slate-800 dark:text-white placeholder:text-slate-400 shadow-inner"
              />
              {keyword && (
                 <button 
                   onClick={clearKeyword}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition"
                   aria-label="Borrar texto"
                 >
                   <X size={20} />
                 </button>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 transform transition-all hover:scale-[1.02] active:scale-95 flex justify-center items-center group mb-4"
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin mr-2" />
              ) : (
                <Wand2 className="mr-2 group-hover:rotate-12 transition-transform" />
              )}
              {isGenerating ? 'Creando Magia...' : 'Generar Nombres'}
            </button>

            {/* Mobile Toggle for Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="lg:hidden w-full flex items-center justify-center space-x-2 py-3 text-slate-500 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
               <SlidersHorizontal size={16} />
               <span>{showSettings ? 'Ocultar Filtros' : 'Ajustes Avanzados'}</span>
            </button>

            {/* Settings (Collapsible on Mobile, Visible on Desktop) */}
            <div className={`space-y-6 ${showSettings ? 'block' : 'hidden'} lg:block transition-all duration-300 pt-4 lg:pt-0 border-t lg:border-none border-slate-100 dark:border-slate-700 mt-4 lg:mt-0`}>
              
              {/* Category Style Chips */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Estilo Visual</label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(NameCategory).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 text-sm rounded-xl border-2 transition-all font-semibold ${
                        category === cat
                          ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-500 dark:border-pink-500 text-pink-700 dark:text-pink-400 shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-pink-200 dark:hover:border-pink-800 hover:text-pink-500'
                      }`}
                    >
                      {cat === 'ALL' ? 'Mix' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Control Slider */}
              <div>
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Longitud</label>
                 <div className="bg-slate-50 dark:bg-slate-800 p-1 rounded-xl flex">
                    {[
                        { val: 'any', label: 'Cualquiera' },
                        { val: 'short', label: 'Corto (<10)' },
                        { val: 'medium', label: 'Medio' },
                        { val: 'long', label: 'Largo (>15)' }
                    ].map((opt) => (
                        <button
                            key={opt.val}
                            onClick={() => setOptions({...options, lengthPreference: opt.val as LengthOption})}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                                options.lengthPreference === opt.val 
                                ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm' 
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                            }`}
                        >
                            {opt.val === 'any' ? 'Mix' : opt.val === 'short' ? 'Corto' : opt.val === 'medium' ? 'Medio' : 'Largo'}
                        </button>
                    ))}
                 </div>
              </div>

              {/* Custom Prefix / Suffix Inputs */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Personalizar (Opcional)</label>
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 text-slate-300" size={14} />
                        <input 
                            type="text" 
                            placeholder="Prefijo..."
                            value={options.customPrefix}
                            onChange={(e) => setOptions({...options, customPrefix: e.target.value})}
                            className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-pink-300 outline-none dark:text-white"
                        />
                    </div>
                    <div className="relative">
                        <ArrowRightLeft className="absolute left-3 top-3 text-slate-300" size={14} />
                        <input 
                            type="text" 
                            placeholder="Sufijo..."
                            value={options.customSuffix}
                            onChange={(e) => setOptions({...options, customSuffix: e.target.value})}
                            className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-pink-300 outline-none dark:text-white"
                        />
                    </div>
                </div>
              </div>

              {/* Toggles */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Caracteres</label>
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includeNumbers ? 'bg-pink-500 border-pink-500' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                        {options.includeNumbers && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includeNumbers}
                      onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-pink-600 transition">Números (123)</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includePeriods ? 'bg-pink-500 border-pink-500' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                        {options.includePeriods && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includePeriods}
                      onChange={(e) => setOptions({ ...options, includePeriods: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-pink-600 transition">Puntos (.)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includeUnderscores ? 'bg-pink-500 border-pink-500' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                        {options.includeUnderscores && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includeUnderscores}
                      onChange={(e) => setOptions({ ...options, includeUnderscores: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-pink-600 transition">Guiones (_)</span>
                  </label>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs for Results/History */}
          <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-700">
             <button
               onClick={() => setActiveTab('results')}
               className={`pb-3 px-2 text-sm font-bold flex items-center border-b-2 transition ${
                 activeTab === 'results' 
                  ? 'border-pink-500 text-pink-600 dark:text-pink-400' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
               }`}
             >
                <Sparkles size={16} className="mr-2" /> Resultados
             </button>
             <button
               onClick={() => setActiveTab('history')}
               className={`pb-3 px-2 text-sm font-bold flex items-center border-b-2 transition ${
                 activeTab === 'history' 
                  ? 'border-pink-500 text-pink-600 dark:text-pink-400' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
               }`}
             >
                <History size={16} className="mr-2" /> Historial Reciente
             </button>
          </div>

          {/* Generated Results View */}
          <div className="min-h-[400px]">
             {activeTab === 'results' ? (
                results.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center px-2 mb-4">
                            <div className="flex items-baseline space-x-3">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">{results.length} ideas</span>
                            </div>
                            <button 
                            onClick={clearResults}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1 rounded-lg transition"
                            >
                                <RotateCcw size={12} className="mr-1" /> Limpiar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((item, index) => (
                            <div key={item.id} className="animate-fade-in-up" style={{animationDelay: `${index < 10 ? index * 50 : 0}ms`}}>
                                <NameCard 
                                item={item} 
                                isSaved={savedNames.some(saved => saved.name === item.name)}
                                isNew={latestBatchIds.has(item.id)}
                                copiedId={copiedId}
                                platform={platform}
                                onToggleSave={toggleSave}
                                onCopy={copyToClipboard}
                                onPreview={setPreviewName}
                                />
                            </div>
                        ))}
                        </div>

                        {/* Generate More Button */}
                        <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => handleGenerate()}
                            disabled={isGenerating}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-800 font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all flex items-center space-x-2 group"
                        >
                            {isGenerating ? (
                            <RefreshCw size={18} className="animate-spin" />
                            ) : (
                            <Sparkles size={18} className="group-hover:text-yellow-500 transition-colors" />
                            )}
                            <span>{isGenerating ? 'Generando...' : '✨ Generar Más Ideas'}</span>
                        </button>
                        </div>
                    </>
                ) : (
                    !isGenerating && savedNames.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] bg-white/50 dark:bg-slate-800/30">
                            
                            {/* New Visual Quick Presets for "Blank Page Syndrome" */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-tr from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <Sparkles className="text-pink-500 dark:text-pink-400" size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">¿Sin inspiración?</h2>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                    Elige una categoría y nuestro <strong>Generador de Nombres</strong> creará ideas instantáneas para ti.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
                                {QUICK_PRESETS.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => handlePresetClick(preset)}
                                        className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-pink-200 dark:hover:border-pink-800 hover:shadow-md hover:-translate-y-1 transition-all group"
                                    >
                                        <div className={`w-10 h-10 ${preset.color} dark:bg-opacity-20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                            <preset.icon size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">{preset.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-700 w-full max-w-md text-center">
                            <button 
                                onClick={handleSurpriseMe}
                                className="text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-pink-600 dark:hover:text-pink-400 transition flex items-center justify-center mx-auto"
                            >
                                <Dice5 size={16} className="mr-2" /> O dame algo totalmente aleatorio
                            </button>
                            </div>
                        </div>
                    )
                )
             ) : (
                // HISTORY TAB CONTENT
                <div className="animate-fade-in-up">
                    {history.length > 0 ? (
                        <>
                         <div className="flex justify-between items-center px-2 mb-4">
                             <p className="text-sm text-slate-500 dark:text-slate-400">Tus últimas 50 ideas generadas:</p>
                             <button 
                                onClick={clearHistory}
                                className="text-xs text-red-400 hover:text-red-600 flex items-center hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded-lg transition"
                             >
                                <Trash2 size={12} className="mr-1" /> Borrar Historial
                             </button>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {history.map((item) => (
                                <NameCard 
                                    key={`hist-${item.id}`}
                                    item={item} 
                                    isSaved={savedNames.some(saved => saved.name === item.name)}
                                    isSavedView={true} // Reusing saved view style for cleaner look
                                    copiedId={copiedId}
                                    platform={platform}
                                    onToggleSave={toggleSave}
                                    onCopy={copyToClipboard}
                                    onPreview={setPreviewName}
                                />
                            ))}
                         </div>
                        </>
                    ) : (
                        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
                            <History size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Tu historial está vacío.</p>
                        </div>
                    )}
                </div>
             )}
             
             {/* Loading State Overlay */}
             {isGenerating && (
                 <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl">
                     <div className="relative">
                         <div className="w-16 h-16 border-4 border-pink-100 dark:border-pink-900 border-t-pink-500 dark:border-t-pink-500 rounded-full animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                             <Sparkles size={20} className="text-pink-500 animate-pulse" />
                         </div>
                     </div>
                     <p className="mt-6 text-slate-600 dark:text-slate-300 font-medium animate-pulse">Mezclando ingredientes aesthetic...</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;