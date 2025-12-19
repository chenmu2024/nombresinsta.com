import React from 'react';
import { Lightbulb, ShieldCheck, Zap, User, Briefcase, Heart, CheckCircle2, XCircle } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rápido y Fácil</h3>
            <p className="text-slate-600">
              Genera cientos de combinaciones en milisegundos. No necesitas registrarte ni descargar nada.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ideas Aesthetic</h3>
            <p className="text-slate-600">
              Nuestros algoritmos están diseñados para seguir las últimas tendencias visuales de Instagram.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">100% Seguro</h3>
            <p className="text-slate-600">
              Todo funciona en tu navegador. No guardamos tus datos ni tus ideas de nombres.
            </p>
          </div>
        </div>

        {/* Long Form SEO Content */}
        <div className="grid lg:grid-cols-12 gap-12" id="tips">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Guía 2025: Cómo elegir el nombre perfecto para Instagram</h2>
              <p className="mb-4">
                Tu nombre de usuario (@usuario) es tu identidad digital. Es lo primero que ven tus seguidores y lo que recordarán. Para crecer en Instagram en 2025, tu nombre debe ser fácil de encontrar y representar tu marca personal.
              </p>
              
              {/* SEO Table: Great for Featured Snippets */}
              <div className="my-8 overflow-hidden border border-slate-200 rounded-xl">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">✅ Lo que SÍ funciona</th>
                      <th className="px-6 py-4">❌ Lo que debes evitar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="px-6 py-3 flex items-start"><CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" /> Nombres cortos y memorables</td>
                      <td className="px-6 py-3 text-slate-500"><XCircle size={16} className="text-red-400 inline mr-1" /> Frases demasiado largas</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="px-6 py-3 flex items-start"><CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" /> Uso limpio de puntos (.)</td>
                      <td className="px-6 py-3 text-slate-500"><XCircle size={16} className="text-red-400 inline mr-1" /> Exceso de números (juan192837)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-3 flex items-start"><CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" /> Palabras clave (ej. 'foto', 'arte')</td>
                      <td className="px-6 py-3 text-slate-500"><XCircle size={16} className="text-red-400 inline mr-1" /> Caracteres difíciles de teclear</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="px-6 py-3 flex items-start"><CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 shrink-0" /> Consistencia en todas las redes</td>
                      <td className="px-6 py-3 text-slate-500"><XCircle size={16} className="text-red-400 inline mr-1" /> Nombres ofensivos o confusos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Targeted SEO Categories */}
            <section className="space-y-8">
              <div id="cat-mujer" className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100 scroll-mt-24">
                <div className="flex items-center mb-3">
                  <Heart className="text-pink-500 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Instagram de Mujer</h3>
                </div>
                <p>
                  ¿Buscas un nombre femenino y delicado? Para chicas, las tendencias actuales incluyen palabras en inglés como <em>"honey", "soft", "angel", "baby"</em> o prefijos como <em>"soy", "miss", "its"</em>. Nuestro generador combina tu nombre con estos elementos para crear opciones elegantes y "aesthetic" que destacan en el feed.
                </p>
              </div>

              <div id="cat-hombre" className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 scroll-mt-24">
                <div className="flex items-center mb-3">
                  <User className="text-blue-500 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Instagram de Hombre</h3>
                </div>
                <p>
                  Para perfiles masculinos, la clave es la simplicidad, el estoicismo y el impacto. Usa el modo <strong>"Minimal"</strong> o <strong>"Funny"</strong>. Palabras como <em>"real", "official", "mr", "the"</em> o simplemente tu nombre con guiones bajos estratégicos suelen funcionar mejor para transmitir confianza.
                </p>
              </div>

              <div id="cat-negocios" className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 scroll-mt-24">
                <div className="flex items-center mb-3">
                  <Briefcase className="text-purple-500 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Nombres para Empresas y Marcas</h3>
                </div>
                <p>
                  Si estás creando una cuenta profesional, selecciona la categoría <strong>"Business"</strong>. El generador añadirá términos profesionales como <em>"studio", "shop", "tienda", "oficial", "bazar"</em> o tu ubicación (<em>"mx", "es", "arg", "col"</em>). Esto es vital para el SEO local de Instagram.
                </p>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Preguntas Frecuentes (FAQ)</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">¿Qué hago si el nombre que quiero está ocupado?</h3>
                  <p>
                    Es el problema #1 en Instagram. Nuestra herramienta soluciona esto sugiriendo variaciones inteligentes: añadiendo puntos (.), guiones bajos (_) o sufijos de moda (como 'gram', 'vibe', 'zone') que mantienen la esencia de tu idea original pero garantizan disponibilidad.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">¿Qué son los nombres "Aesthetic"?</h3>
                  <p>
                    Los nombres aesthetic (estéticos) priorizan la apariencia visual del texto. Suelen utilizar minúsculas, palabras en inglés suaves, caracteres especiales mínimos, y evocan sentimientos de calma o estilo de vida vintage. Ejemplos generados por nuestra app incluyen palabras como 'moon', 'honey', 'soft'.
                  </p>
                </div>
                 <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">¿Es gratis este generador?</h3>
                  <p>
                    Sí, <strong>NombresInsta.com</strong> es 100% gratuito, sin límites y no requiere registro. Puedes usarlo para generar nicks para Instagram, TikTok, Twitter, Roblox y Wattpad.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Table of Contents */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-24">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Categorías Populares</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#cat-mujer" className="flex items-center text-slate-600 hover:text-pink-600 transition group">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 group-hover:scale-125 transition"></span>
                        Nombres Aesthetic Mujer
                      </a>
                    </li>
                    <li>
                      <a href="#cat-hombre" className="flex items-center text-slate-600 hover:text-pink-600 transition group">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 group-hover:scale-125 transition"></span>
                        Para Hombres y Chicos
                      </a>
                    </li>
                    <li>
                      <a href="#cat-negocios" className="flex items-center text-slate-600 hover:text-pink-600 transition group">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 group-hover:scale-125 transition"></span>
                        Para Tiendas y Negocios
                      </a>
                    </li>
                    <li>
                      <a href="#generator" className="flex items-center text-slate-600 hover:text-pink-600 transition group">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 group-hover:scale-125 transition"></span>
                        Nicks Gamers y Otakus
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-400 italic">
                      "Un buen nombre es el primer paso para convertirte en influencer."
                    </p>
                  </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InfoSection;