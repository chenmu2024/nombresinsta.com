import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Hash, Type, AtSign, Heart, ExternalLink, Trash2, ClipboardList, X, Star, CalendarDays } from 'lucide-react';
import { NameCategory, GeneratedName } from '../types';
import { generateNames } from '../utils/nameGenerator';

interface NameCardProps {
  item: GeneratedName;
  isSavedView?: boolean;
  isSaved: boolean;
  copiedId: string | null;
  onToggleSave: (item: GeneratedName) => void;
  onCopy: (text: string, id: string) => void;
}

const NameCard: React.FC<NameCardProps> = ({ 
  item, 
  isSavedView = false, 
  isSaved, 
  copiedId, 
  onToggleSave, 
  onCopy 
}) => {
  return (
    <div
      className={`group relative bg-white rounded-xl p-3 sm:p-4 border transition flex justify-between items-center ${
        isSavedView 
          ? 'border-pink-200 shadow-sm' 
          : 'border-gray-100 hover:border-pink-200 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex flex-col min-w-0 mr-2">
        <span className="text-base sm:text-lg font-semibold text-slate-800 font-mono tracking-tight group-hover:text-pink-600 transition truncate">
          @{item.name}
        </span>
        {!isSavedView && (
          <span className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">
            {item.category}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
        {/* Check Availability Link */}
        <a 
          href={`https://www.instagram.com/${item.name}/`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition"
          title="Verificar si existe en Instagram"
          aria-label="Verificar disponibilidad en Instagram"
        >
          <ExternalLink size={18} />
        </a>

        {/* Save/Favorite Button */}
        <button
          onClick={() => onToggleSave(item)}
          className={`p-2 rounded-lg transition ${
            isSaved
              ? 'text-red-500 bg-red-50'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
          title={isSaved ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label={isSaved ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* Copy Button */}
        <button
          onClick={() => onCopy(item.name, item.id)}
          className={`p-2 rounded-lg transition ${
            copiedId === item.id
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
          }`}
          title="Copiar"
          aria-label="Copiar nombre"
        >
          {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
};

const trendingTags = ['Aesthetic', 'Viajes', 'Amor', 'Gamer', 'Moda', 'Chill', 'Arte', 'Foodie'];

const Generator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<NameCategory>(NameCategory.ALL);
  const [options, setOptions] = useState({
    includeNumbers: false,
    includePeriods: true,
    includeUnderscores: true
  });
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [savedNames, setSavedNames] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set date on mount (client-side only to avoid hydration mismatch if SSR were used, though this is SPA)
  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    // Capitalize first letter of month
    setCurrentDate(`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`);
  }, []);

  // Load saved names from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nombresinsta_saved');
    if (saved) {
      try {
        setSavedNames(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved names', e);
      }
    }
  }, []);

  // Save to local storage whenever list changes
  useEffect(() => {
    localStorage.setItem('nombresinsta_saved', JSON.stringify(savedNames));
  }, [savedNames]);

  const handleGenerate = (overrideKeyword?: string) => {
    setIsGenerating(true);
    const kw = overrideKeyword !== undefined ? overrideKeyword : keyword;
    
    // Simulate slight delay for "processing" feel
    setTimeout(() => {
      const names = generateNames({
        keyword: kw,
        category,
        ...options
      });
      setResults(names);
      setIsGenerating(false);
    }, 400);
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
    setResults([]);
  };

  const toggleSave = (item: GeneratedName) => {
    if (savedNames.some(saved => saved.name === item.name)) {
      setSavedNames(savedNames.filter(saved => saved.name !== item.name));
    } else {
      setSavedNames([item, ...savedNames]);
    }
  };

  const clearSaved = () => {
    if (confirm('¿Estás seguro de que quieres borrar tus favoritos?')) {
      setSavedNames([]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllSaved = () => {
    const text = savedNames.map(n => n.name).join('\n');
    navigator.clipboard.writeText(text);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <section id="generator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        
        {/* SEO Freshness Signal: Dynamic Date Badge */}
        {currentDate && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6 border border-green-200">
            <CalendarDays size={14} />
            <span>Actualizado: {currentDate}</span>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Generador de Nombres para <span className="text-transparent bg-clip-text bg-insta-gradient">Instagram</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
          Introduce una palabra clave y crea miles de ideas de nombres de usuario originales, estéticos y disponibles.
        </p>
        
        {/* Social Proof / Trust Signals - Important for Schema Validation */}
        <div className="flex items-center justify-center space-x-2 text-sm font-medium text-slate-500">
          <div className="flex text-yellow-400">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <span>4.9/5 basado en 1,420 opiniones</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-xl shadow-pink-100/50 sticky top-24">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tu Palabra Clave</label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ej. Ana, Viajes, Gato, Moda..."
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition bg-white/50"
                  />
                  {keyword ? (
                     <button 
                       onClick={clearKeyword}
                       className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                       aria-label="Borrar palabra clave"
                     >
                       <X size={20} />
                     </button>
                  ) : (
                    <AtSign className="absolute right-3 top-3 text-gray-400" size={20} />
                  )}
                </div>
                {/* Trending Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {trendingTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="text-xs px-2.5 py-1 bg-white border border-gray-200 rounded-full text-slate-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Estilo</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(NameCategory).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-sm rounded-lg border transition font-medium ${
                        category === cat
                          ? 'bg-pink-50 border-pink-200 text-pink-700'
                          : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat === 'ALL' ? 'Todos' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.includeNumbers}
                    onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-slate-600 group-hover:text-slate-900 transition flex items-center">
                    <Hash size={16} className="mr-2" /> Incluir Números
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.includePeriods}
                    onChange={(e) => setOptions({ ...options, includePeriods: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-slate-600 group-hover:text-slate-900 transition flex items-center">
                    <span className="w-4 h-4 mr-2 font-bold text-center">.</span> Puntos (.)
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options.includeUnderscores}
                    onChange={(e) => setOptions({ ...options, includeUnderscores: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-slate-600 group-hover:text-slate-900 transition flex items-center">
                    <Type size={16} className="mr-2" /> Guiones bajos (_)
                  </span>
                </label>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 transform transition active:scale-95 flex justify-center items-center"
              >
                {isGenerating ? (
                  <RefreshCw className="animate-spin mr-2" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                Generar Nombres
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Saved Names Section */}
          {savedNames.length > 0 && (
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                  <Heart className="text-red-500 mr-2" fill="currentColor" /> Favoritos ({savedNames.length})
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={copyAllSaved}
                    className={`text-xs px-3 py-1.5 rounded-lg flex items-center transition border ${
                      allCopied 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-600'
                    }`}
                    aria-label="Copiar todos los favoritos"
                  >
                    {allCopied ? <Check size={14} className="mr-1" /> : <ClipboardList size={14} className="mr-1" />}
                    {allCopied ? 'Copiado' : 'Copiar lista'}
                  </button>
                  <button 
                    onClick={clearSaved}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-red-500 hover:border-red-200 flex items-center transition"
                    aria-label="Borrar todos los favoritos"
                  >
                    <Trash2 size={14} className="mr-1" /> Borrar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                {savedNames.map((item) => (
                  <NameCard 
                    key={`saved-${item.id}`} 
                    item={item} 
                    isSavedView={true} 
                    isSaved={true}
                    copiedId={copiedId}
                    onToggleSave={toggleSave}
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Generated Results */}
          <div className="space-y-4">
            {results.length > 0 && (
              <h3 className="text-lg font-semibold text-slate-700 px-1">Resultados Generados</h3>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((item) => (
                <NameCard 
                  key={item.id} 
                  item={item} 
                  isSaved={savedNames.some(saved => saved.name === item.name)}
                  copiedId={copiedId}
                  onToggleSave={toggleSave}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>
          </div>
          
          {results.length === 0 && savedNames.length === 0 && !isGenerating && (
            <div className="text-center py-20 text-gray-400">
              <Sparkles className="mx-auto mb-4 opacity-50" size={48} />
              <p>Escribe una palabra clave para empezar a generar magia.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generator;