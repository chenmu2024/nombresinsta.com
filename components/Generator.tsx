import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Hash, Type, AtSign } from 'lucide-react';
import { NameCategory, GeneratedName, GeneratorOptions } from '../types';
import { generateNames } from '../utils/nameGenerator';

const Generator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<NameCategory>(NameCategory.ALL);
  const [options, setOptions] = useState({
    includeNumbers: false,
    includePeriods: true,
    includeUnderscores: true
  });
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate slight delay for "processing" feel
    setTimeout(() => {
      const names = generateNames({
        keyword,
        category,
        ...options
      });
      setResults(names);
      setIsGenerating(false);
    }, 400);
  };

  // Generate some initial random names on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="generator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Generador de Nombres para <span className="text-transparent bg-clip-text bg-insta-gradient">Instagram</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Introduce una palabra clave y crea miles de ideas de nombres de usuario originales, estéticos y disponibles.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-xl shadow-pink-100/50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tu Palabra Clave</label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Ej. Sofia, Viajes, Pizza..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition bg-white/50"
                  />
                  <AtSign className="absolute right-3 top-3 text-gray-400" size={20} />
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
                onClick={handleGenerate}
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

        {/* Results */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-pink-200 shadow-sm hover:shadow-md transition flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-slate-800 font-mono tracking-tight group-hover:text-pink-600 transition">
                    @{item.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                    {item.category}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.name, item.id)}
                  className={`p-2.5 rounded-lg transition ${
                    copiedId === item.id
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                  aria-label="Copiar nombre"
                >
                  {copiedId === item.id ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            ))}
          </div>
          
          {results.length === 0 && !isGenerating && (
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