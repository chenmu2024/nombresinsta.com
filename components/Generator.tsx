import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Hash, Type, AtSign, Heart, ExternalLink, Trash2, ClipboardList, X, Star, CalendarDays, Search, Wand2 } from 'lucide-react';
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
      onClick={() => onCopy(item.name, item.id)}
      className={`group relative bg-white rounded-2xl p-4 transition-all duration-300 cursor-pointer flex justify-between items-center ${
        isSavedView 
          ? 'border border-pink-100 shadow-sm' 
          : 'shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-transparent hover:border-pink-100'
      }`}
    >
      <div className="flex flex-col min-w-0 mr-3">
        <span className="text-lg font-bold text-slate-700 font-sans tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all truncate">
          @{item.name}
        </span>
        {!isSavedView && (
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
            {item.category}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100 shadow-inner">
           {/* Check Availability Link */}
          <a 
            href={`https://www.instagram.com/${item.name}/`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-white rounded-lg transition"
            title="Verificar en Instagram"
          >
            <ExternalLink size={16} />
          </a>

          {/* Save/Favorite Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(item); }}
            className={`p-2 rounded-lg transition ${
              isSaved
                ? 'text-red-500 bg-white shadow-sm'
                : 'text-slate-400 hover:text-red-500 hover:bg-white'
            }`}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Copy Indicator */}
        <div
          className={`p-2 rounded-xl transition-all duration-300 ${
            copiedId === item.id
              ? 'bg-green-500 text-white shadow-lg shadow-green-200 scale-110'
              : 'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800'
          }`}
        >
          {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
        </div>
      </div>

       {/* Mobile only copy indicator fallback */}
       <div className={`sm:hidden absolute right-4 top-1/2 -translate-y-1/2 transition-opacity ${copiedId === item.id ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-green-500 text-white p-1.5 rounded-full shadow-md">
             <Check size={14} />
          </div>
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

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    setCurrentDate(`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`);
  }, []);

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

  useEffect(() => {
    localStorage.setItem('nombresinsta_saved', JSON.stringify(savedNames));
  }, [savedNames]);

  const handleGenerate = (overrideKeyword?: string) => {
    setIsGenerating(true);
    const kw = overrideKeyword !== undefined ? overrideKeyword : keyword;
    
    setTimeout(() => {
      const names = generateNames({
        keyword: kw,
        category,
        ...options
      });
      setResults(names);
      setIsGenerating(false);
    }, 500); // Slightly longer for effect
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
    <section id="generator" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Hero Header */}
      <div className="text-center mb-12 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm animate-fade-in-up">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Generador Viral 2025</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Generador de Nombres <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-insta-gradient relative">
            para Instagram
             <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-300 opacity-50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
             </svg>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 font-light">
          El generador de nombres para Instagram más inteligente. Sin registros, 100% gratis y diseñado para destacar.
        </p>
        
        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <span className="text-slate-600 font-semibold">4.9/5</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>1.4k+ Votos</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card-strong p-6 md:p-8 rounded-[2rem] sticky top-24 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10">
            
            {/* Input Area */}
            <div className="relative group mb-6">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <AtSign className="text-pink-500 group-focus-within:text-purple-600 transition-colors" size={20} />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tu nombre o palabra clave..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition-all outline-none text-lg font-medium text-slate-800 placeholder:text-slate-400 shadow-inner"
              />
              {keyword && (
                 <button 
                   onClick={clearKeyword}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition"
                 >
                   <X size={20} />
                 </button>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-900/20 transform transition-all hover:scale-[1.02] active:scale-95 flex justify-center items-center group mb-8"
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin mr-2" />
              ) : (
                <Wand2 className="mr-2 group-hover:rotate-12 transition-transform" />
              )}
              {isGenerating ? 'Creando Magia...' : 'Generar Ideas'}
            </button>

            {/* Settings */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Estilo Visual</label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(NameCategory).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 text-sm rounded-xl border-2 transition-all font-semibold ${
                        category === cat
                          ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-sm'
                          : 'bg-white border-slate-100 text-slate-500 hover:border-pink-200 hover:text-pink-500'
                      }`}
                    >
                      {cat === 'ALL' ? 'Mix' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Personalización</label>
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includeNumbers ? 'bg-pink-500 border-pink-500' : 'bg-white border-slate-300'}`}>
                        {options.includeNumbers && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includeNumbers}
                      onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 text-sm font-medium group-hover:text-pink-600 transition">Números (123)</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includePeriods ? 'bg-pink-500 border-pink-500' : 'bg-white border-slate-300'}`}>
                        {options.includePeriods && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includePeriods}
                      onChange={(e) => setOptions({ ...options, includePeriods: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 text-sm font-medium group-hover:text-pink-600 transition">Puntos (.)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition ${options.includeUnderscores ? 'bg-pink-500 border-pink-500' : 'bg-white border-slate-300'}`}>
                        {options.includeUnderscores && <Check size={12} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={options.includeUnderscores}
                      onChange={(e) => setOptions({ ...options, includeUnderscores: e.target.checked })}
                      className="hidden"
                    />
                    <span className="text-slate-600 text-sm font-medium group-hover:text-pink-600 transition">Guiones (_)</span>
                  </label>
                </div>
              </div>
              
              {/* Trending */}
              <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Tendencias</label>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.slice(0,5).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:border-pink-300 hover:text-pink-600 hover:shadow-sm transition"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
              </div>

            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Saved Names Section */}
          {savedNames.length > 0 && (
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-pink-100 shadow-xl shadow-pink-100/50 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                 <Heart size={120} />
              </div>
              <div className="flex justify-between items-end mb-6 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
                    <Heart className="text-pink-500 mr-2 fill-pink-500" size={24} /> 
                    Tus Favoritos
                    </h3>
                    <p className="text-slate-400 text-sm">Guardados automáticamente en tu navegador</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={copyAllSaved}
                    className={`text-xs px-4 py-2 rounded-xl flex items-center transition font-bold ${
                      allCopied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {allCopied ? <Check size={14} className="mr-2" /> : <ClipboardList size={14} className="mr-2" />}
                    {allCopied ? 'Copiado' : 'Copiar Todo'}
                  </button>
                  <button 
                    onClick={clearSaved}
                    className="text-xs px-4 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition flex items-center font-bold"
                  >
                    <Trash2 size={14} className="mr-2" /> Borrar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
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
          <div className="min-h-[400px]">
             {results.length > 0 ? (
                 <>
                    <div className="flex justify-between items-center px-2 mb-4">
                        <h3 className="text-xl font-bold text-slate-800">Resultados</h3>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{results.length} ideas</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((item, index) => (
                        <div key={item.id} className="animate-fade-in-up" style={{animationDelay: `${index * 50}ms`}}>
                            <NameCard 
                            item={item} 
                            isSaved={savedNames.some(saved => saved.name === item.name)}
                            copiedId={copiedId}
                            onToggleSave={toggleSave}
                            onCopy={copyToClipboard}
                            />
                        </div>
                    ))}
                    </div>
                 </>
             ) : (
                 !isGenerating && savedNames.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white/50">
                        <div className="w-20 h-20 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-pink-400 opacity-80" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Esperando tu inspiración</h3>
                        <p className="text-slate-400 max-w-sm">
                            Escribe una palabra clave arriba (como "arte", "viajes" o tu nombre) para ver la magia.
                        </p>
                    </div>
                 )
             )}
             
             {/* Loading State Overlay */}
             {isGenerating && (
                 <div className="flex flex-col items-center justify-center py-20">
                     <div className="relative">
                         <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                             <Sparkles size={20} className="text-pink-500 animate-pulse" />
                         </div>
                     </div>
                     <p className="mt-6 text-slate-500 font-medium animate-pulse">Mezclando ingredientes aesthetic...</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;